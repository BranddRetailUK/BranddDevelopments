import { getPostgresPool } from "@/lib/postgres";

export type ContactSubmissionInput = {
  name: string;
  email: string;
  focus: string;
  budget: string;
  message: string;
  attribution: ContactSubmissionAttribution;
  ipAddress: string | null;
  userAgent: string | null;
};

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

export type ContactSubmissionRecord = {
  id: string;
  createdAt: string;
};

export type ContactSubmissionWhatsAppStatus =
  | "not_configured"
  | "sent"
  | "failed";

export type ContactSubmissionEmailStatus =
  | "not_configured"
  | "sent"
  | "failed";

let tableReady: Promise<void> | null = null;

function ensureContactSubmissionTable() {
  if (!tableReady) {
    tableReady = getPostgresPool()
      .query(`
        CREATE TABLE IF NOT EXISTS contact_submissions (
          id BIGSERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          focus TEXT NOT NULL,
          budget TEXT NOT NULL,
          message TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'new',
          source TEXT NOT NULL DEFAULT 'contact_page',
          landing_page TEXT,
          page_path TEXT,
          referrer TEXT,
          utm_source TEXT,
          utm_medium TEXT,
          utm_campaign TEXT,
          utm_term TEXT,
          utm_content TEXT,
          gclid TEXT,
          gbraid TEXT,
          wbraid TEXT,
          consent_choice TEXT,
          ip_address TEXT,
          lead_value NUMERIC(12, 2),
          qualified_at TIMESTAMPTZ,
          won_at TIMESTAMPTZ,
          lost_at TIMESTAMPTZ,
          google_ads_conversion_status TEXT NOT NULL DEFAULT 'not_ready',
          google_ads_conversion_error TEXT,
          google_ads_conversion_uploaded_at TIMESTAMPTZ,
          email_status TEXT NOT NULL DEFAULT 'pending',
          email_message_id TEXT,
          email_error TEXT,
          emailed_at TIMESTAMPTZ,
          whatsapp_status TEXT NOT NULL DEFAULT 'not_configured',
          whatsapp_error TEXT,
          whatsapp_message_id TEXT,
          whatsapp_sent_at TIMESTAMPTZ,
          user_agent TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS budget TEXT;

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS email_status TEXT NOT NULL DEFAULT 'pending';

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS email_message_id TEXT;

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS landing_page TEXT;

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS page_path TEXT;

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS referrer TEXT;

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS utm_source TEXT;

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS utm_medium TEXT;

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS utm_campaign TEXT;

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS utm_term TEXT;

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS utm_content TEXT;

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS gclid TEXT;

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS gbraid TEXT;

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS wbraid TEXT;

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS consent_choice TEXT;

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS ip_address TEXT;

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS lead_value NUMERIC(12, 2);

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS qualified_at TIMESTAMPTZ;

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS won_at TIMESTAMPTZ;

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS lost_at TIMESTAMPTZ;

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS google_ads_conversion_status TEXT NOT NULL DEFAULT 'not_ready';

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS google_ads_conversion_error TEXT;

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS google_ads_conversion_uploaded_at TIMESTAMPTZ;

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS email_error TEXT;

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS emailed_at TIMESTAMPTZ;

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS whatsapp_status TEXT NOT NULL DEFAULT 'not_configured';

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS whatsapp_error TEXT;

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS whatsapp_message_id TEXT;

        ALTER TABLE contact_submissions
          ADD COLUMN IF NOT EXISTS whatsapp_sent_at TIMESTAMPTZ;

        CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx
          ON contact_submissions (created_at DESC);

        CREATE INDEX IF NOT EXISTS contact_submissions_status_idx
          ON contact_submissions (status);

        CREATE INDEX IF NOT EXISTS contact_submissions_email_status_idx
          ON contact_submissions (email_status);

        CREATE INDEX IF NOT EXISTS contact_submissions_email_message_id_idx
          ON contact_submissions (email_message_id);

        CREATE INDEX IF NOT EXISTS contact_submissions_whatsapp_status_idx
          ON contact_submissions (whatsapp_status);

        CREATE INDEX IF NOT EXISTS contact_submissions_utm_source_idx
          ON contact_submissions (utm_source);

        CREATE INDEX IF NOT EXISTS contact_submissions_gclid_idx
          ON contact_submissions (gclid);

        CREATE INDEX IF NOT EXISTS contact_submissions_gbraid_idx
          ON contact_submissions (gbraid);

        CREATE INDEX IF NOT EXISTS contact_submissions_wbraid_idx
          ON contact_submissions (wbraid);

        CREATE INDEX IF NOT EXISTS contact_submissions_google_ads_conversion_status_idx
          ON contact_submissions (google_ads_conversion_status);
      `)
      .then(() => undefined)
      .catch((error) => {
        tableReady = null;
        throw error;
      });
  }

  return tableReady;
}

export async function createContactSubmission(input: ContactSubmissionInput) {
  await ensureContactSubmissionTable();

  const result = await getPostgresPool().query<ContactSubmissionRecord>(
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
        ip_address,
        user_agent
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
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
      input.ipAddress,
      input.userAgent,
    ],
  );

  return result.rows[0];
}

export async function updateContactSubmissionEmailStatus({
  id,
  status,
  messageId,
  error,
}: {
  id: string;
  status: ContactSubmissionEmailStatus;
  messageId?: string | null;
  error?: string | null;
}) {
  await ensureContactSubmissionTable();

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
    [id, status, messageId ?? null, error ?? null],
  );
}

export async function updateContactSubmissionWhatsAppStatus({
  id,
  messageId,
  status,
  error,
}: {
  id: string;
  status: ContactSubmissionWhatsAppStatus;
  messageId?: string | null;
  error?: string | null;
}) {
  await ensureContactSubmissionTable();

  await getPostgresPool().query(
    `
      UPDATE contact_submissions
      SET
        whatsapp_status = $2,
        whatsapp_message_id = $3,
        whatsapp_error = $4,
        whatsapp_sent_at = CASE WHEN $2 = 'sent' THEN NOW() ELSE whatsapp_sent_at END,
        updated_at = NOW()
      WHERE id = $1;
    `,
    [id, status, messageId ?? null, error ?? null],
  );
}
