import { after, NextResponse } from "next/server";
import { runDataRetention } from "@/lib/dataRetention";
import {
  consumeRateLimit,
  getClientIp,
  readBoundedJson,
  RequestBodyError,
} from "@/lib/requestSecurity";
import {
  createSiteAnalyticsEvent,
  isSiteAnalyticsConfigured,
  type SiteAnalyticsAttribution,
  type SiteAnalyticsProperties,
} from "@/lib/siteAnalytics";
import {
  isSiteAnalyticsEventName,
  isSiteAnalyticsPropertyName,
} from "@/lib/siteAnalyticsEvents";

export const runtime = "nodejs";

const maxAnalyticsBodyBytes = 32 * 1024;
const analyticsIdPattern = /^(visitor|session)_[a-zA-Z0-9-]{8,100}$/;

function readPositiveInteger(name: string, fallback: number) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? Math.round(value) : fallback;
}

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
  return rounded >= 0 && rounded <= 20_000 ? rounded : null;
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

  for (const [key, rawValue] of Object.entries(value as Record<string, unknown>)) {
    if (!isSiteAnalyticsPropertyName(key)) {
      continue;
    }

    if (typeof rawValue === "string") {
      properties[key] = rawValue.trim().slice(0, 1000) || null;
    } else if (typeof rawValue === "number" && Number.isFinite(rawValue)) {
      properties[key] = rawValue;
    } else if (typeof rawValue === "boolean" || rawValue === null) {
      properties[key] = rawValue;
    }
  }

  return properties;
}

export async function POST(request: Request) {
  if (!isSiteAnalyticsConfigured()) {
    return new Response(null, { status: 202 });
  }

  try {
    const rateLimit = await consumeRateLimit({
      key: getClientIp(request),
      limit: readPositiveInteger("SITE_ANALYTICS_RATE_LIMIT_MAX", 120),
      scope: "site_analytics",
      windowSeconds: readPositiveInteger("SITE_ANALYTICS_RATE_LIMIT_WINDOW_SECONDS", 60),
    });

    if (rateLimit.limited) {
      return new Response(null, { status: 204 });
    }
  } catch (error) {
    console.error("Site analytics rate-limit check failed", error);
    return new Response(null, { status: 202 });
  }

  let body: unknown;

  try {
    body = await readBoundedJson(request, maxAnalyticsBodyBytes);
  } catch (error) {
    const status = error instanceof RequestBodyError ? error.status : 400;
    return NextResponse.json({ message: "Invalid analytics payload." }, { status });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ message: "Missing analytics payload." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const consentChoice = readString(payload.consentChoice, 80);

  if (consentChoice !== "accepted") {
    return new Response(null, { status: 204 });
  }

  const eventName = readString(payload.eventName, 80);

  if (!isSiteAnalyticsEventName(eventName)) {
    return new Response(null, { status: 204 });
  }

  const visitorId = readString(payload.visitorId, 120);
  const sessionId = readString(payload.sessionId, 120);
  const pagePath = readString(payload.pagePath, 1000);

  if (
    !analyticsIdPattern.test(visitorId) ||
    !analyticsIdPattern.test(sessionId) ||
    !pagePath.startsWith("/")
  ) {
    return NextResponse.json({ message: "Invalid analytics identifiers." }, { status: 400 });
  }

  try {
    await createSiteAnalyticsEvent({
      eventName,
      visitorId,
      sessionId,
      pageUrl: readOptionalString(payload.pageUrl, 2000),
      pagePath,
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
    });
    after(runDataRetention);
  } catch (error) {
    console.error("Site analytics event save failed", error);
    return new Response(null, { status: 202 });
  }

  return new Response(null, { status: 204 });
}
