import { getPostgresPool } from "@/lib/postgres";

export type ContactSubmissionAttribution = {
  landingPage: string | null;
  pagePath: string | null;
  referrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  consentChoice: string | null;
};

export type ContactSubmissionInput = {
  name: string;
  email: string;
  focus: string;
  budget: string;
  message: string;
  attribution: ContactSubmissionAttribution;
  idempotencyKey: string;
  ipAddress: string | null;
  userAgent: string | null;
};

export type ContactSubmissionRecord = {
  id: string;
  createdAt: string;
  created: boolean;
};

export type ContactNotificationChannel = "email" | "whatsapp";

export type ContactNotificationJob = {
  id: string;
  submissionId: string;
  channel: ContactNotificationChannel;
  attempts: number;
  name: string;
  email: string;
  focus: string;
  budget: string;
  message: string;
  createdAt: string;
  attribution: ContactSubmissionAttribution;
};

export const maxContactNotificationAttempts = 4;

export async function createContactSubmission(input: ContactSubmissionInput) {
  const client = await getPostgresPool().connect();

  try {
    await client.query("BEGIN");

    const insertResult = await client.query<Omit<ContactSubmissionRecord, "created">>(
      `
        INSERT INTO contact_submissions (
          name,
          email,
          focus,
          budget,
          message,
          landing_page,
          page_path,
          referrer,
          utm_source,
          utm_medium,
          utm_campaign,
          utm_term,
          utm_content,
          gclid,
          gbraid,
          wbraid,
          consent_choice,
          idempotency_key,
          ip_address,
          user_agent,
          email_status,
          whatsapp_status
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,
          $12, $13, $14, $15, $16, $17, $18, $19, $20, 'pending', 'pending'
        )
        ON CONFLICT (idempotency_key) WHERE idempotency_key IS NOT NULL
        DO NOTHING
        RETURNING id::text, created_at::text AS "createdAt";
      `,
      [
        input.name,
        input.email,
        input.focus,
        input.budget,
        input.message,
        input.attribution.landingPage,
        input.attribution.pagePath,
        input.attribution.referrer,
        input.attribution.utmSource,
        input.attribution.utmMedium,
        input.attribution.utmCampaign,
        input.attribution.utmTerm,
        input.attribution.utmContent,
        input.attribution.gclid,
        input.attribution.gbraid,
        input.attribution.wbraid,
        input.attribution.consentChoice,
        input.idempotencyKey,
        input.ipAddress,
        input.userAgent,
      ],
    );

    const inserted = insertResult.rows[0];

    if (!inserted) {
      const existingResult = await client.query<Omit<ContactSubmissionRecord, "created">>(
        `
          SELECT id::text, created_at::text AS "createdAt"
          FROM contact_submissions
          WHERE idempotency_key = $1
          LIMIT 1;
        `,
        [input.idempotencyKey],
      );
      const existing = existingResult.rows[0];

      if (!existing) {
        throw new Error("Idempotent contact submission could not be resolved.");
      }

      await client.query("COMMIT");
      return { ...existing, created: false };
    }

    await client.query(
      `
        INSERT INTO contact_notification_jobs (submission_id, channel)
        VALUES ($1, 'email'), ($1, 'whatsapp')
        ON CONFLICT (submission_id, channel) DO NOTHING;
      `,
      [inserted.id],
    );

    await client.query("COMMIT");
    return { ...inserted, created: true };
  } catch (error) {
    await client.query("ROLLBACK").catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}

export async function claimContactNotificationJobs(limit: number) {
  const result = await getPostgresPool().query<{
    id: string;
    submissionId: string;
    channel: ContactNotificationChannel;
    attempts: number;
    name: string;
    email: string;
    focus: string;
    budget: string;
    message: string;
    createdAt: string;
    landingPage: string | null;
    pagePath: string | null;
    referrer: string | null;
    utmSource: string | null;
    utmMedium: string | null;
    utmCampaign: string | null;
    utmTerm: string | null;
    utmContent: string | null;
    gclid: string | null;
    gbraid: string | null;
    wbraid: string | null;
    consentChoice: string | null;
  }>(
    `
      WITH candidates AS (
        SELECT id
        FROM contact_notification_jobs
        WHERE attempts < $1
          AND (
            (status = 'pending' AND available_at <= NOW())
            OR (status = 'processing' AND locked_at < NOW() - INTERVAL '15 minutes')
          )
        ORDER BY available_at, id
        FOR UPDATE SKIP LOCKED
        LIMIT $2
      )
      UPDATE contact_notification_jobs AS job
      SET
        status = 'processing',
        attempts = job.attempts + 1,
        locked_at = NOW(),
        updated_at = NOW()
      FROM candidates, contact_submissions AS submission
      WHERE job.id = candidates.id
        AND submission.id = job.submission_id
      RETURNING
        job.id::text,
        job.submission_id::text AS "submissionId",
        job.channel,
        job.attempts,
        submission.name,
        submission.email,
        submission.focus,
        submission.budget,
        submission.message,
        submission.created_at::text AS "createdAt",
        submission.landing_page AS "landingPage",
        submission.page_path AS "pagePath",
        submission.referrer,
        submission.utm_source AS "utmSource",
        submission.utm_medium AS "utmMedium",
        submission.utm_campaign AS "utmCampaign",
        submission.utm_term AS "utmTerm",
        submission.utm_content AS "utmContent",
        submission.gclid,
        submission.gbraid,
        submission.wbraid,
        submission.consent_choice AS "consentChoice";
    `,
    [maxContactNotificationAttempts, Math.max(1, Math.min(limit, 20))],
  );

  return result.rows.map<ContactNotificationJob>((row) => ({
    id: row.id,
    submissionId: row.submissionId,
    channel: row.channel,
    attempts: row.attempts,
    name: row.name,
    email: row.email,
    focus: row.focus,
    budget: row.budget,
    message: row.message,
    createdAt: row.createdAt,
    attribution: {
      landingPage: row.landingPage,
      pagePath: row.pagePath,
      referrer: row.referrer,
      utmSource: row.utmSource,
      utmMedium: row.utmMedium,
      utmCampaign: row.utmCampaign,
      utmTerm: row.utmTerm,
      utmContent: row.utmContent,
      gclid: row.gclid,
      gbraid: row.gbraid,
      wbraid: row.wbraid,
      consentChoice: row.consentChoice,
    },
  }));
}

async function updateSubmissionNotificationStatus({
  channel,
  error,
  messageId,
  status,
  submissionId,
}: {
  channel: ContactNotificationChannel;
  error: string | null;
  messageId: string | null;
  status: "not_configured" | "sent" | "failed";
  submissionId: string;
}) {
  if (channel === "email") {
    await getPostgresPool().query(
      `
        UPDATE contact_submissions
        SET
          email_status = $2,
          email_message_id = CASE WHEN $2 = 'sent' THEN $3 ELSE email_message_id END,
          email_error = $4,
          emailed_at = CASE WHEN $2 = 'sent' THEN NOW() ELSE emailed_at END,
          updated_at = NOW()
        WHERE id = $1;
      `,
      [submissionId, status, messageId, error],
    );
    return;
  }

  await getPostgresPool().query(
    `
      UPDATE contact_submissions
      SET
        whatsapp_status = $2,
        whatsapp_message_id = CASE WHEN $2 = 'sent' THEN $3 ELSE whatsapp_message_id END,
        whatsapp_error = $4,
        whatsapp_sent_at = CASE WHEN $2 = 'sent' THEN NOW() ELSE whatsapp_sent_at END,
        updated_at = NOW()
      WHERE id = $1;
    `,
    [submissionId, status, messageId, error],
  );
}

export async function markContactNotificationJobSent(
  job: ContactNotificationJob,
  messageId: string | null,
) {
  await getPostgresPool().query(
    `
      UPDATE contact_notification_jobs
      SET status = 'sent', locked_at = NULL, last_error = NULL, updated_at = NOW()
      WHERE id = $1;
    `,
    [job.id],
  );
  await updateSubmissionNotificationStatus({
    channel: job.channel,
    error: null,
    messageId,
    status: "sent",
    submissionId: job.submissionId,
  });
}

export async function markContactNotificationJobSkipped(
  job: ContactNotificationJob,
  reason: string,
) {
  const cleanReason = reason.slice(0, 1000);

  await getPostgresPool().query(
    `
      UPDATE contact_notification_jobs
      SET status = 'skipped', locked_at = NULL, last_error = $2, updated_at = NOW()
      WHERE id = $1;
    `,
    [job.id, cleanReason],
  );
  await updateSubmissionNotificationStatus({
    channel: job.channel,
    error: cleanReason,
    messageId: null,
    status: "not_configured",
    submissionId: job.submissionId,
  });
}

export async function markContactNotificationJobFailed(
  job: ContactNotificationJob,
  message: string,
) {
  const cleanMessage = message.slice(0, 1000);
  const retryDelaySeconds = Math.min(900, 30 * 2 ** Math.max(0, job.attempts - 1));
  const willRetry = job.attempts < maxContactNotificationAttempts;

  await getPostgresPool().query(
    `
      UPDATE contact_notification_jobs
      SET
        status = CASE WHEN $3 THEN 'pending' ELSE 'failed' END,
        available_at = CASE
          WHEN $3 THEN NOW() + ($4::text || ' seconds')::interval
          ELSE available_at
        END,
        locked_at = NULL,
        last_error = $2,
        updated_at = NOW()
      WHERE id = $1;
    `,
    [job.id, cleanMessage, willRetry, retryDelaySeconds],
  );
  await updateSubmissionNotificationStatus({
    channel: job.channel,
    error: cleanMessage,
    messageId: null,
    status: "failed",
    submissionId: job.submissionId,
  });
}
