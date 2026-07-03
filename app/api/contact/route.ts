import { NextResponse } from "next/server";
import {
  createContactSubmission,
  type ContactSubmissionAttribution,
  updateContactSubmissionEmailStatus,
  updateContactSubmissionWhatsAppStatus,
} from "@/lib/contactSubmissions";
import { sendContactEmailNotification } from "@/lib/emailNotifications";
import { sendContactWhatsAppNotification } from "@/lib/whatsappNotifications";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  focus: string;
  message: string;
  attribution: ContactSubmissionAttribution;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rateLimitWindowMs = 60_000;
const rateLimitMaxRequests = 8;
const requestBuckets = new Map<string, { count: number; resetAt: number }>();

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function readOptionalString(value: unknown, maxLength: number) {
  const cleaned = readString(value);

  if (!cleaned) {
    return null;
  }

  return cleaned.slice(0, maxLength);
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
    consentChoice: readOptionalString(payload.consentChoice, 80),
  };
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

function validatePayload(body: unknown): {
  input?: ContactPayload;
  message?: string;
} {
  if (!body || typeof body !== "object") {
    return { message: "Please complete the form and try again." };
  }

  const payload = body as Record<string, unknown>;
  const input = {
    name: readString(payload.name),
    email: readString(payload.email).toLowerCase(),
    focus: readString(payload.focus),
    message: readString(payload.message),
    attribution: readAttribution(payload.attribution),
  };

  if (input.name.length < 2 || input.name.length > 120) {
    return { message: "Please enter your name." };
  }

  if (!emailPattern.test(input.email) || input.email.length > 180) {
    return { message: "Please enter a valid email address." };
  }

  if (input.focus.length < 2 || input.focus.length > 160) {
    return { message: "Please choose a service focus." };
  }

  if (input.message.length < 10) {
    return { message: "Please add a little more detail about the project." };
  }

  if (input.message.length > 5000) {
    return { message: "Please keep the project message under 5,000 characters." };
  }

  return { input };
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown notification error.";
}

async function notifyByEmail(
  submission: {
    id: string;
    createdAt: string;
  },
  input: ContactPayload,
) {
  try {
    const result = await sendContactEmailNotification({
      ...input,
      id: submission.id,
      createdAt: submission.createdAt,
    });

    if (result.status === "sent") {
      await updateContactSubmissionEmailStatus({
        id: submission.id,
        status: "sent",
      });

      return;
    }

    await updateContactSubmissionEmailStatus({
      id: submission.id,
      status: "not_configured",
      error: result.reason.slice(0, 1000),
    });
  } catch (error) {
    const message = getErrorMessage(error);

    console.error("SendGrid contact email notification failed", error);

    try {
      await updateContactSubmissionEmailStatus({
        id: submission.id,
        status: "failed",
        error: message.slice(0, 1000),
      });
    } catch (statusError) {
      console.error("Email status update failed", statusError);
    }
  }
}

async function notifyByWhatsApp(
  submission: {
    id: string;
    createdAt: string;
  },
  input: ContactPayload,
) {
  try {
    const result = await sendContactWhatsAppNotification({
      ...input,
      id: submission.id,
      createdAt: submission.createdAt,
    });

    if (result.status === "sent") {
      await updateContactSubmissionWhatsAppStatus({
        id: submission.id,
        status: "sent",
        messageId: result.messageId,
      });
    }
  } catch (error) {
    const message = getErrorMessage(error);

    console.error("WhatsApp contact notification failed", error);

    try {
      await updateContactSubmissionWhatsAppStatus({
        id: submission.id,
        status: "failed",
        error: message.slice(0, 1000),
      });
    } catch (statusError) {
      console.error("WhatsApp status update failed", statusError);
    }
  }
}

export async function POST(request: Request) {
  if (isRateLimited(request)) {
    return NextResponse.json(
      { ok: false, message: "Too many attempts. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Please complete the form and try again." },
      { status: 400 },
    );
  }

  if (body && typeof body === "object") {
    const payload = body as Record<string, unknown>;

    if (readString(payload.companyWebsite)) {
      return NextResponse.json(
        {
          ok: true,
          message: "Thanks. Your enquiry has been received.",
        },
        { status: 201 },
      );
    }
  }

  const validation = validatePayload(body);

  if (!validation.input) {
    return NextResponse.json(
      {
        ok: false,
        message: validation.message ?? "Please check the form and try again.",
      },
      { status: 400 },
    );
  }

  try {
    const submission = await createContactSubmission({
      ...validation.input,
      ipAddress: getClientIp(request),
      userAgent: request.headers.get("user-agent"),
    });

    await notifyByEmail(submission, validation.input);
    await notifyByWhatsApp(submission, validation.input);

    return NextResponse.json(
      {
        ok: true,
        message: "Thanks. Your enquiry has been received.",
        submissionId: submission.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Contact submission failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "We could not save the enquiry. Please try again shortly.",
      },
      { status: 500 },
    );
  }
}
