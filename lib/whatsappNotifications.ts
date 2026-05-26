type ContactWhatsAppNotificationInput = {
  id: string;
  name: string;
  email: string;
  focus: string;
  message: string;
  createdAt: string;
};

type WhatsAppNotificationResult =
  | {
      status: "skipped";
      reason: string;
    }
  | {
      status: "sent";
      messageId: string | null;
    };

type WhatsAppConfig =
  | {
      enabled: false;
      reason: string;
    }
  | {
      enabled: true;
      accessToken: string;
      apiVersion: string;
      phoneNumberId: string;
      recipientPhone: string;
      templateLanguage: string;
      templateName: string | null;
    };

type WhatsAppApiResponse = {
  messages?: Array<{
    id?: string;
  }>;
  error?: {
    code?: number;
    message?: string;
    type?: string;
  };
};

function readEnv(name: string) {
  return process.env[name]?.trim() ?? "";
}

function isEnabled(value: string) {
  const normalized = value.toLowerCase();

  return normalized === "true" || normalized === "1" || normalized === "yes";
}

function getApiVersion(value: string) {
  if (!value) {
    return "v22.0";
  }

  return value.startsWith("v") ? value : `v${value}`;
}

function getRecipientPhone(value: string) {
  return value.replace(/[^\d]/g, "");
}

function getWhatsAppConfig(): WhatsAppConfig {
  if (!isEnabled(readEnv("WHATSAPP_CONTACT_NOTIFICATIONS"))) {
    return {
      enabled: false,
      reason: "WhatsApp contact notifications are disabled.",
    };
  }

  const accessToken = readEnv("WHATSAPP_ACCESS_TOKEN");
  const phoneNumberId = readEnv("WHATSAPP_PHONE_NUMBER_ID");
  const recipientPhone = getRecipientPhone(readEnv("WHATSAPP_RECIPIENT_PHONE"));

  const missing = [
    ["WHATSAPP_ACCESS_TOKEN", accessToken],
    ["WHATSAPP_PHONE_NUMBER_ID", phoneNumberId],
    ["WHATSAPP_RECIPIENT_PHONE", recipientPhone],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length > 0) {
    throw new Error(`Missing WhatsApp contact notification config: ${missing.join(", ")}`);
  }

  return {
    enabled: true,
    accessToken,
    apiVersion: getApiVersion(readEnv("WHATSAPP_GRAPH_API_VERSION")),
    phoneNumberId,
    recipientPhone,
    templateLanguage: readEnv("WHATSAPP_TEMPLATE_LANGUAGE") || "en_GB",
    templateName: readEnv("WHATSAPP_TEMPLATE_NAME") || null,
  };
}

function limitText(value: string, maxLength: number) {
  const trimmed = value.trim();

  if (trimmed.length <= maxLength) {
    return trimmed;
  }

  return `${trimmed.slice(0, maxLength - 3).trimEnd()}...`;
}

function buildNotificationText(input: ContactWhatsAppNotificationInput) {
  return limitText(
    [
      `New Brandd contact enquiry #${input.id}`,
      `Received: ${input.createdAt}`,
      "",
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Focus: ${input.focus}`,
      "",
      "Message:",
      input.message,
    ].join("\n"),
    3900,
  );
}

function buildTemplatePayload(
  input: ContactWhatsAppNotificationInput,
  config: Extract<WhatsAppConfig, { enabled: true }>,
) {
  return {
    messaging_product: "whatsapp",
    to: config.recipientPhone,
    type: "template",
    template: {
      name: config.templateName,
      language: {
        code: config.templateLanguage,
      },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: input.id },
            { type: "text", text: limitText(input.name, 120) },
            { type: "text", text: limitText(input.email, 180) },
            { type: "text", text: limitText(input.focus, 160) },
            { type: "text", text: limitText(input.message, 900) },
          ],
        },
      ],
    },
  };
}

function buildTextPayload(
  input: ContactWhatsAppNotificationInput,
  config: Extract<WhatsAppConfig, { enabled: true }>,
) {
  return {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: config.recipientPhone,
    type: "text",
    text: {
      preview_url: false,
      body: buildNotificationText(input),
    },
  };
}

function buildWhatsAppPayload(
  input: ContactWhatsAppNotificationInput,
  config: Extract<WhatsAppConfig, { enabled: true }>,
) {
  if (config.templateName) {
    return buildTemplatePayload(input, config);
  }

  return buildTextPayload(input, config);
}

function getWhatsAppErrorMessage(payload: WhatsAppApiResponse | null, fallback: string) {
  if (!payload?.error) {
    return fallback;
  }

  const parts = [
    payload.error.message,
    payload.error.type ? `type: ${payload.error.type}` : null,
    typeof payload.error.code === "number" ? `code: ${payload.error.code}` : null,
  ].filter(Boolean);

  return parts.join(" ") || fallback;
}

export async function sendContactWhatsAppNotification(
  input: ContactWhatsAppNotificationInput,
): Promise<WhatsAppNotificationResult> {
  const config = getWhatsAppConfig();

  if (!config.enabled) {
    return {
      status: "skipped",
      reason: config.reason,
    };
  }

  const response = await fetch(
    `https://graph.facebook.com/${config.apiVersion}/${config.phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildWhatsAppPayload(input, config)),
    },
  );

  const payload = (await response.json().catch(() => null)) as WhatsAppApiResponse | null;

  if (!response.ok) {
    throw new Error(
      getWhatsAppErrorMessage(payload, `WhatsApp API request failed with ${response.status}.`),
    );
  }

  return {
    status: "sent",
    messageId: payload?.messages?.[0]?.id ?? null,
  };
}
