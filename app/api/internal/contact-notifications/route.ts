import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { processContactNotificationJobs } from "@/lib/contactNotificationProcessor";
import { runDataRetention } from "@/lib/dataRetention";

export const runtime = "nodejs";

function secretsMatch(provided: string, expected: string) {
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);

  return (
    providedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(providedBuffer, expectedBuffer)
  );
}

export async function POST(request: Request) {
  const workerSecret = process.env.CONTACT_NOTIFICATION_WORKER_SECRET?.trim();

  if (!workerSecret) {
    return NextResponse.json(
      { ok: false, message: "Notification worker is not configured." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const authorization = request.headers.get("authorization") ?? "";
  const providedSecret = authorization.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : "";

  if (!secretsMatch(providedSecret, workerSecret)) {
    return NextResponse.json(
      { ok: false, message: "Unauthorized." },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  const result = await processContactNotificationJobs(10);
  await runDataRetention();

  return NextResponse.json(
    { ok: true, ...result },
    { headers: { "Cache-Control": "no-store" } },
  );
}
