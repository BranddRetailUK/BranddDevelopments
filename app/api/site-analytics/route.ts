import { NextResponse } from "next/server";
import {
  createSiteAnalyticsEvent,
  isSiteAnalyticsConfigured,
  type SiteAnalyticsAttribution,
  type SiteAnalyticsProperties,
} from "@/lib/siteAnalytics";

export const runtime = "nodejs";

const rateLimitWindowMs = 60_000;
const rateLimitMaxRequests = 180;
const requestBuckets = new Map<string, { count: number; resetAt: number }>();

function readString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function readOptionalString(value: unknown, maxLength: number) {
  const cleaned = readString(value, maxLength);
  return cleaned || null;
}

function readInteger(value: unknown) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }

  const rounded = Math.round(value);

  if (rounded < 0 || rounded > 20_000) {
    return null;
  }

  return rounded;
}

function sanitizeEventName(value: unknown) {
  const eventName = readString(value, 80)
    .toLowerCase()
    .replace(/[^a-z0-9_:-]/g, "_")
    .replace(/_{2,}/g, "_")
    .replace(/^_+|_+$/g, "");

  return eventName || "interaction";
}

function readAttribution(value: unknown): SiteAnalyticsAttribution {
  const payload = value && typeof value === "object" ? (value as Record<string, unknown>) : {};

  return {
    utmSource: readOptionalString(payload.utmSource, 300),
    utmMedium: readOptionalString(payload.utmMedium, 300),
    utmCampaign: readOptionalString(payload.utmCampaign, 300),
    utmTerm: readOptionalString(payload.utmTerm, 300),
    utmContent: readOptionalString(payload.utmContent, 300),
    gclid: readOptionalString(payload.gclid, 500),
    gbraid: readOptionalString(payload.gbraid, 500),
    wbraid: readOptionalString(payload.wbraid, 500),
  };
}

function readProperties(value: unknown): SiteAnalyticsProperties {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  const properties: SiteAnalyticsProperties = {};
  const entries = Object.entries(value as Record<string, unknown>).slice(0, 40);

  for (const [key, rawValue] of entries) {
    const cleanKey = key.trim().slice(0, 80).replace(/[^a-zA-Z0-9_:-]/g, "_");

    if (!cleanKey) {
      continue;
    }

    if (typeof rawValue === "string") {
      properties[cleanKey] = rawValue.trim().slice(0, 1000) || null;
    } else if (typeof rawValue === "number" && Number.isFinite(rawValue)) {
      properties[cleanKey] = rawValue;
    } else if (typeof rawValue === "boolean" || rawValue === null) {
      properties[cleanKey] = rawValue;
    }
  }

  return properties;
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const connectingIp = request.headers.get("cf-connecting-ip")?.trim();

  return forwardedFor || realIp || connectingIp || "unknown";
}

function isRateLimited(request: Request) {
  const key = getClientIp(request);
  const now = Date.now();
  const currentBucket = requestBuckets.get(key);

  if (!currentBucket || currentBucket.resetAt <= now) {
    requestBuckets.set(key, {
      count: 1,
      resetAt: now + rateLimitWindowMs,
    });

    return false;
  }

  currentBucket.count += 1;

  return currentBucket.count > rateLimitMaxRequests;
}

async function readPayload(request: Request) {
  const text = await request.text();

  if (!text) {
    return null;
  }

  return JSON.parse(text) as Record<string, unknown>;
}

export async function POST(request: Request) {
  if (!isSiteAnalyticsConfigured()) {
    return new Response(null, { status: 202 });
  }

  if (isRateLimited(request)) {
    return new Response(null, { status: 204 });
  }

  let payload: Record<string, unknown> | null;

  try {
    payload = await readPayload(request);
  } catch {
    return NextResponse.json({ message: "Invalid analytics payload." }, { status: 400 });
  }

  if (!payload) {
    return NextResponse.json({ message: "Missing analytics payload." }, { status: 400 });
  }

  const consentChoice = readString(payload.consentChoice, 80);

  if (consentChoice !== "accepted") {
    return new Response(null, { status: 204 });
  }

  const event = {
    eventName: sanitizeEventName(payload.eventName),
    visitorId: readString(payload.visitorId, 120),
    sessionId: readString(payload.sessionId, 120),
    pageUrl: readOptionalString(payload.pageUrl, 2000),
    pagePath: readString(payload.pagePath, 1000),
    pageTitle: readOptionalString(payload.pageTitle, 300),
    referrer: readOptionalString(payload.referrer, 2000),
    landingPage: readOptionalString(payload.landingPage, 2000),
    previousPagePath: readOptionalString(payload.previousPagePath, 1000),
    attribution: readAttribution(payload.attribution),
    consentChoice,
    viewportWidth: readInteger(payload.viewportWidth),
    viewportHeight: readInteger(payload.viewportHeight),
    properties: readProperties(payload.properties),
    userAgent: readOptionalString(request.headers.get("user-agent"), 1000),
  };

  if (!event.visitorId || !event.sessionId || !event.pagePath) {
    return NextResponse.json({ message: "Missing required analytics fields." }, { status: 400 });
  }

  try {
    await createSiteAnalyticsEvent(event);
  } catch (error) {
    console.error("Site analytics event save failed", error);
    return new Response(null, { status: 202 });
  }

  return new Response(null, { status: 204 });
}
