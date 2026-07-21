import { after, NextResponse } from "next/server";
import { processContactNotificationJobs } from "@/lib/contactNotificationProcessor";
import {
  createContactSubmission,
  type ContactSubmissionAttribution,
} from "@/lib/contactSubmissions";
import {
  isContactBudgetOption,
  isContactFocusOption,
} from "@/lib/contactOptions";
import { runDataRetention } from "@/lib/dataRetention";
import {
  consumeRateLimit,
  getClientIp,
  readBoundedJson,
  RequestBodyError,
} from "@/lib/requestSecurity";
import { verifyTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  focus: string;
  budget: string;
  message: string;
  attribution: ContactSubmissionAttribution;
  turnstileToken: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const idempotencyKeyPattern = /^[a-zA-Z0-9._:-]{16,120}$/;
const maxContactBodyBytes = 16 * 1024;
const minimumFormFillMs = 1_800;

function readPositiveInteger(name: string, fallback: number) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? Math.round(value) : fallback;
}

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function readOptionalString(value: unknown, maxLength: number) {
  const cleaned = readString(value);
  return cleaned ? cleaned.slice(0, maxLength) : null;
}

function readConsentChoice(value: unknown) {
  const choice = readString(value);
  return choice === "accepted" || choice === "essential" ? choice : null;
}

function readAttribution(value: unknown): ContactSubmissionAttribution {
  const payload = value && typeof value === "object" ? (value as Record<string, unknown>) : {};

  return {
    landingPage: readOptionalString(payload.landingPage, 2000),
    pagePath: readOptionalString(payload.pagePath, 1000),
    referrer: readOptionalString(payload.referrer, 2000),
    utmSource: readOptionalString(payload.utmSource, 300),
    utmMedium: readOptionalString(payload.utmMedium, 300),
    utmCampaign: readOptionalString(payload.utmCampaign, 300),
    utmTerm: readOptionalString(payload.utmTerm, 300),
    utmContent: readOptionalString(payload.utmContent, 300),
    gclid: readOptionalString(payload.gclid, 500),
    gbraid: readOptionalString(payload.gbraid, 500),
    wbraid: readOptionalString(payload.wbraid, 500),
    consentChoice: readConsentChoice(payload.consentChoice),
  };
}

function validatePayload(body: unknown): {
  input?: ContactPayload;
  message?: string;
  spam?: boolean;
} {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { message: "Please complete the form and try again." };
  }

  const payload = body as Record<string, unknown>;

  if (readString(payload.website)) {
    return { spam: true };
  }

  const startedAt =
    typeof payload.startedAt === "number" && Number.isFinite(payload.startedAt)
      ? payload.startedAt
      : 0;

  if (!startedAt || Date.now() - startedAt < minimumFormFillMs) {
    return { message: "Please wait a moment, then submit the form again." };
  }

  const input = {
    name: readString(payload.name),
    email: readString(payload.email).toLowerCase(),
    focus: readString(payload.focus),
    budget: readString(payload.budget),
    message: readString(payload.message),
    attribution: readAttribution(payload.attribution),
    turnstileToken: readString(payload.turnstileToken).slice(0, 4096),
  };

  if (input.name.length < 2 || input.name.length > 120) {
    return { message: "Please enter your name." };
  }

  if (!emailPattern.test(input.email) || input.email.length > 180) {
    return { message: "Please enter a valid email address." };
  }

  if (!isContactFocusOption(input.focus)) {
    return { message: "Please choose a service focus." };
  }

  if (!isContactBudgetOption(input.budget)) {
    return { message: "Please choose a project budget." };
  }

  if (input.message.length < 10) {
    return { message: "Please add a little more detail about the project." };
  }

  if (input.message.length > 5000) {
    return { message: "Please keep the project message under 5,000 characters." };
  }

  return { input };
}

function jsonResponse(body: Record<string, unknown>, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

export async function POST(request: Request) {
  const idempotencyKey = request.headers.get("idempotency-key")?.trim() ?? "";

  if (!idempotencyKeyPattern.test(idempotencyKey)) {
    return jsonResponse(
      { ok: false, message: "The form request is missing a valid idempotency key." },
      400,
    );
  }

  const clientIp = getClientIp(request);

  try {
    const rateLimit = await consumeRateLimit({
      key: clientIp,
      limit: readPositiveInteger("CONTACT_RATE_LIMIT_MAX", 5),
      scope: "contact",
      windowSeconds: readPositiveInteger("CONTACT_RATE_LIMIT_WINDOW_SECONDS", 600),
    });

    if (rateLimit.limited) {
      const retryAfter = Math.max(
        1,
        Math.ceil((new Date(rateLimit.resetAt).getTime() - Date.now()) / 1000),
      );

      return jsonResponse(
        { ok: false, message: "Too many attempts. Please wait and try again." },
        429,
        { "Retry-After": String(retryAfter) },
      );
    }
  } catch (error) {
    console.error("Contact rate-limit check failed", error);
    return jsonResponse(
      { ok: false, message: "The enquiry service is temporarily unavailable." },
      503,
    );
  }

  let body: unknown;

  try {
    body = await readBoundedJson(request, maxContactBodyBytes);
  } catch (error) {
    if (error instanceof RequestBodyError) {
      const message =
        error.status === 413
          ? "The form request is too large. Please shorten the project message."
          : "Please complete the form and try again.";

      return jsonResponse({ ok: false, message }, error.status);
    }

    throw error;
  }

  const validation = validatePayload(body);

  if (validation.spam) {
    return jsonResponse(
      { ok: true, message: "Thanks. Your enquiry has been received." },
      201,
    );
  }

  if (!validation.input) {
    return jsonResponse(
      {
        ok: false,
        message: validation.message ?? "Please check the form and try again.",
      },
      400,
    );
  }

  const turnstile = await verifyTurnstileToken({
    ipAddress: clientIp,
    token: validation.input.turnstileToken,
  });

  if (!turnstile.success) {
    const message = turnstile.configured
      ? "Please complete the security check and try again."
      : "The enquiry security check is temporarily unavailable.";
    return jsonResponse({ ok: false, message }, turnstile.configured ? 400 : 503);
  }

  try {
    const { turnstileToken: _turnstileToken, ...input } = validation.input;
    const submission = await createContactSubmission({
      ...input,
      idempotencyKey,
      ipAddress: clientIp === "unknown" ? null : clientIp,
      userAgent: request.headers.get("user-agent")?.slice(0, 1000) ?? null,
    });

    after(async () => {
      await processContactNotificationJobs(4).catch((error) => {
        console.error("Contact notification queue processing failed", error);
      });
      await runDataRetention();
    });

    return jsonResponse(
      {
        ok: true,
        message: "Thanks. Your enquiry has been received.",
        submissionId: submission.id,
      },
      submission.created ? 201 : 200,
    );
  } catch (error) {
    console.error("Contact submission failed", error);

    return jsonResponse(
      {
        ok: false,
        message: "We could not save the enquiry. Please try again shortly.",
      },
      500,
    );
  }
}
