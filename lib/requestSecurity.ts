import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { getPostgresPool } from "@/lib/postgres";

export class RequestBodyError extends Error {
  constructor(
    message: string,
    readonly status: 400 | 413 | 415,
  ) {
    super(message);
    this.name = "RequestBodyError";
  }
}

function normalizeIp(value: string | null) {
  if (!value) {
    return null;
  }

  let candidate = value.trim();

  if (candidate.startsWith("[") && candidate.includes("]")) {
    candidate = candidate.slice(1, candidate.indexOf("]"));
  } else if (candidate.includes(".") && candidate.lastIndexOf(":") > candidate.lastIndexOf(".")) {
    candidate = candidate.slice(0, candidate.lastIndexOf(":"));
  }

  return isIP(candidate) ? candidate : null;
}

function readForwardedIp(request: Request) {
  const values = request.headers
    .get("x-forwarded-for")
    ?.split(",")
    .map((value) => normalizeIp(value))
    .filter((value): value is string => Boolean(value));

  return values?.at(-1) ?? null;
}

export function getClientIp(request: Request) {
  const configuredHeader = process.env.TRUSTED_CLIENT_IP_HEADER?.trim().toLowerCase();

  if (configuredHeader) {
    const configuredIp = normalizeIp(request.headers.get(configuredHeader));

    if (configuredIp) {
      return configuredIp;
    }
  }

  const cloudflareIp = normalizeIp(request.headers.get("cf-connecting-ip"));

  if (cloudflareIp) {
    return cloudflareIp;
  }

  return normalizeIp(request.headers.get("x-real-ip")) ?? readForwardedIp(request) ?? "unknown";
}

export function createRequestFingerprint(value: string) {
  const secret =
    process.env.RATE_LIMIT_HASH_SECRET?.trim() || "brandd-expiring-rate-limit-v1";

  return createHmac("sha256", secret).update(value).digest("hex");
}

export async function consumeRateLimit({
  key,
  limit,
  scope,
  windowSeconds,
}: {
  key: string;
  limit: number;
  scope: string;
  windowSeconds: number;
}) {
  const result = await getPostgresPool().query<{
    requestCount: number;
    resetAt: string;
  }>(
    `
      WITH expired AS (
        SELECT ctid
        FROM api_rate_limits
        WHERE expires_at < NOW()
        LIMIT 250
      ),
      cleanup AS (
        DELETE FROM api_rate_limits
        WHERE ctid IN (SELECT ctid FROM expired)
      ),
      current_window AS (
        SELECT TO_TIMESTAMP(
          FLOOR(EXTRACT(EPOCH FROM NOW()) / $3::integer) * $3::integer
        ) AS window_start
      )
      INSERT INTO api_rate_limits (
        scope,
        client_key,
        window_start,
        request_count,
        expires_at
      )
      SELECT
        $1,
        $2,
        window_start,
        1,
        window_start + ($3::text || ' seconds')::interval
      FROM current_window
      ON CONFLICT (scope, client_key, window_start)
      DO UPDATE SET request_count = api_rate_limits.request_count + 1
      RETURNING
        request_count AS "requestCount",
        expires_at::text AS "resetAt";
    `,
    [scope, createRequestFingerprint(key), windowSeconds],
  );

  const bucket = result.rows[0];

  return {
    limited: bucket.requestCount > limit,
    remaining: Math.max(0, limit - bucket.requestCount),
    resetAt: bucket.resetAt,
  };
}

export async function readBoundedJson(request: Request, maxBytes: number) {
  const contentType = request.headers.get("content-type")?.split(";", 1)[0]?.trim();

  if (contentType !== "application/json") {
    throw new RequestBodyError("Content-Type must be application/json.", 415);
  }

  const contentLengthValue = request.headers.get("content-length");

  if (contentLengthValue) {
    const contentLength = Number(contentLengthValue);

    if (!Number.isFinite(contentLength) || contentLength < 0) {
      throw new RequestBodyError("Invalid Content-Length header.", 400);
    }

    if (contentLength > maxBytes) {
      throw new RequestBodyError("Request payload is too large.", 413);
    }
  }

  if (!request.body) {
    throw new RequestBodyError("Request payload is missing.", 400);
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let receivedBytes = 0;

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    receivedBytes += value.byteLength;

    if (receivedBytes > maxBytes) {
      await reader.cancel();
      throw new RequestBodyError("Request payload is too large.", 413);
    }

    chunks.push(value);
  }

  if (receivedBytes === 0) {
    throw new RequestBodyError("Request payload is missing.", 400);
  }

  const body = new Uint8Array(receivedBytes);
  let offset = 0;

  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return JSON.parse(new TextDecoder().decode(body)) as unknown;
  } catch {
    throw new RequestBodyError("Request payload is not valid JSON.", 400);
  }
}
