type TurnstileResponse = {
  success?: boolean;
  "error-codes"?: string[];
};

const turnstileTimeoutMs = 5_000;

export async function verifyTurnstileToken({
  ipAddress,
  token,
}: {
  ipAddress: string;
  token: string;
}) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY?.trim();

  if (!secretKey) {
    return {
      configured: false as const,
      success: process.env.REQUIRE_TURNSTILE !== "true",
    };
  }

  if (!token) {
    return { configured: true as const, success: false };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), turnstileTimeoutMs);

  try {
    const body = new URLSearchParams({
      secret: secretKey,
      response: token,
    });

    if (ipAddress !== "unknown") {
      body.set("remoteip", ipAddress);
    }

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body,
        signal: controller.signal,
      },
    );
    const payload = (await response.json().catch(() => null)) as TurnstileResponse | null;

    return {
      configured: true as const,
      success: response.ok && payload?.success === true,
    };
  } catch (error) {
    console.error("Turnstile verification failed", error);
    return { configured: true as const, success: false };
  } finally {
    clearTimeout(timeout);
  }
}
