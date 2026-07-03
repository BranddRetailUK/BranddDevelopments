import { NextResponse } from "next/server";
import {
  createContactSubmission,
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
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
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
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Please complete the form and try again." },
      { status: 400 },
    );
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
      userAgent: request.headers.get("user-agent"),
    });

    await notifyByEmail(submission, validation.input);
    await notifyByWhatsApp(submission, validation.input);

    return NextResponse.json(
      {
        ok: true,
        message: "Thanks. Your enquiry has been received.",
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
