import type { ContactSubmissionAttribution } from "@/lib/contactSubmissions";

type ContactEmailNotificationInput = {
  id: string;
  name: string;
  email: string;
  focus: string;
  message: string;
  createdAt: string;
  attribution?: ContactSubmissionAttribution;
};

type EmailAddress = {
  email: string;
  name?: string;
};

type ContactEmailNotificationResult =
  | {
      status: "skipped";
      reason: string;
    }
  | {
      status: "sent";
      messageId: string | null;
    };

type EmailConfig =
  | {
      enabled: false;
      reason: string;
    }
  | {
      enabled: true;
      apiKey: string;
      from: EmailAddress;
      to: EmailAddress[];
    };

type SendGridApiError = {
  errors?: Array<{
    message?: string;
    field?: string;
    help?: string;
  }>;
};

const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const sendGridTimeoutMs = 8_000;
const branddEmailLogoUrl =
  "https://res.cloudinary.com/dhlqooyuk/image/upload/v1783248569/BRANDD_PP_web_yp3rvi.jpg";

function readEnv(name: string) {
  return process.env[name]?.trim() ?? "";
}

function cleanDisplayName(value: string) {
  return value.trim().replace(/^["']|["']$/g, "").trim();
}

function parseEmailIdentity(value: string, label: string): EmailAddress {
  const trimmed = value.trim();
  const bracketStart = trimmed.lastIndexOf("<");

  if (bracketStart > -1 && trimmed.endsWith(">")) {
    const name = cleanDisplayName(trimmed.slice(0, bracketStart));
    const email = trimmed.slice(bracketStart + 1, -1).trim();

    if (!emailPattern.test(email)) {
      throw new Error(`Invalid ${label} email address.`);
    }

    return name ? { email, name } : { email };
  }

  if (!emailPattern.test(trimmed)) {
    throw new Error(`Invalid ${label} email address.`);
  }

  return { email: trimmed };
}

function parseRecipientList(value: string) {
  return value
    .split(",")
    .map((recipient) => recipient.trim())
    .filter(Boolean)
    .map((recipient, index) => parseEmailIdentity(recipient, `CONTACT_EMAIL_TO recipient ${index + 1}`));
}

function getEmailConfig(): EmailConfig {
  const apiKey = readEnv("SENDGRID_API_KEY");
  const from = readEnv("CONTACT_EMAIL_FROM");
  const to = readEnv("CONTACT_EMAIL_TO");

  const missing = [
    ["SENDGRID_API_KEY", apiKey],
    ["CONTACT_EMAIL_FROM", from],
    ["CONTACT_EMAIL_TO", to],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length > 0) {
    return {
      enabled: false,
      reason: `SendGrid contact email config is missing: ${missing.join(", ")}`,
    };
  }

  return {
    enabled: true,
    apiKey,
    from: parseEmailIdentity(from, "CONTACT_EMAIL_FROM"),
    to: parseRecipientList(to),
  };
}

function limitText(value: string, maxLength: number) {
  const trimmed = value.trim();

  if (trimmed.length <= maxLength) {
    return trimmed;
  }

  return `${trimmed.slice(0, maxLength - 3).trimEnd()}...`;
}

function escapeHtml(value: string) {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return value.replace(/[&<>"']/g, (character) => entities[character] ?? character);
}

function buildSubject(input: ContactEmailNotificationInput) {
  return limitText(`Brandd Enquiry ${input.id}`, 150);
}

function buildPlainText(input: ContactEmailNotificationInput) {
  const attributionLines = input.attribution
    ? [
        "",
        "Attribution:",
        `Landing page: ${input.attribution.landingPage ?? "Not captured"}`,
        `Referrer: ${input.attribution.referrer ?? "Not captured"}`,
        `UTM source: ${input.attribution.utmSource ?? "Not captured"}`,
        `UTM campaign: ${input.attribution.utmCampaign ?? "Not captured"}`,
        `Google click ID: ${input.attribution.gclid ?? input.attribution.gbraid ?? input.attribution.wbraid ?? "Not captured"}`,
        `Consent choice: ${input.attribution.consentChoice ?? "Not captured"}`,
      ]
    : [];

  return [
    `Brandd Enquiry ${input.id}`,
    `Received: ${input.createdAt}`,
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Service focus: ${input.focus}`,
    "",
    "Message:",
    input.message,
    ...attributionLines,
  ].join("\n");
}

function buildHtml(input: ContactEmailNotificationInput) {
  const rows = [
    ["Enquiry ID", input.id],
    ["Received", input.createdAt],
    ["Name", input.name],
    ["Email", input.email],
    ["Service focus", input.focus],
    ["Landing page", input.attribution?.landingPage ?? "Not captured"],
    ["Referrer", input.attribution?.referrer ?? "Not captured"],
    ["UTM source", input.attribution?.utmSource ?? "Not captured"],
    ["UTM campaign", input.attribution?.utmCampaign ?? "Not captured"],
    [
      "Google click ID",
      input.attribution?.gclid ??
        input.attribution?.gbraid ??
        input.attribution?.wbraid ??
        "Not captured",
    ],
    ["Consent choice", input.attribution?.consentChoice ?? "Not captured"],
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#161616;line-height:1.5">
      <div style="display:inline-block;margin:0 0 14px">
        <img src="${branddEmailLogoUrl}" width="56" height="56" alt="Brandd Solutions" style="display:block;border:0;border-radius:12px;outline:none;text-decoration:none">
      </div>
      <h1 style="font-size:22px;margin:0 0 18px">${escapeHtml(buildSubject(input))}</h1>
      <table style="border-collapse:collapse;margin:0 0 20px;width:100%;max-width:680px">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <th style="border:1px solid #dedede;background:#f6f6f6;padding:10px;text-align:left;width:150px">${escapeHtml(label)}</th>
                  <td style="border:1px solid #dedede;padding:10px">${escapeHtml(value)}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
      <h2 style="font-size:16px;margin:0 0 8px">Message</h2>
      <div style="border:1px solid #dedede;background:#fbfbfb;padding:14px;white-space:normal;max-width:680px">
        ${escapeHtml(input.message).replace(/\n/g, "<br>")}
      </div>
    </div>
  `;
}

function getSendGridErrorMessage(payload: SendGridApiError | null, fallback: string) {
  const messages = payload?.errors
    ?.map((error) => error.message)
    .filter((message): message is string => Boolean(message));

  return messages?.join(" ") || fallback;
}

export async function sendContactEmailNotification(
  input: ContactEmailNotificationInput,
): Promise<ContactEmailNotificationResult> {
  const config = getEmailConfig();

  if (!config.enabled) {
    return {
      status: "skipped",
      reason: config.reason,
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), sendGridTimeoutMs);

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: config.to,
            custom_args: {
              contact_submission_id: input.id,
            },
          },
        ],
        from: config.from,
        reply_to: {
          email: input.email,
          name: input.name,
        },
        subject: buildSubject(input),
        content: [
          {
            type: "text/plain",
            value: buildPlainText(input),
          },
          {
            type: "text/html",
            value: buildHtml(input),
          },
        ],
      }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as SendGridApiError | null;

      throw new Error(
        getSendGridErrorMessage(payload, `SendGrid API request failed with ${response.status}.`),
      );
    }

    return {
      status: "sent",
      messageId: response.headers.get("x-message-id"),
    };
  } finally {
    clearTimeout(timeout);
  }
}
