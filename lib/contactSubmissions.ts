import { getPostgresPool } from "@/lib/postgres";

export type ContactSubmissionInput = {
  name: string;
  email: string;
  focus: string;
  message: string;
  userAgent: string | null;
};

export type ContactSubmissionRecord = {
  id: string;
  createdAt: string;
};

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
          message TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'new',
          source TEXT NOT NULL DEFAULT 'contact_page',
          email_status TEXT NOT NULL DEFAULT 'pending',
          email_error TEXT,
          emailed_at TIMESTAMPTZ,
          user_agent TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx
          ON contact_submissions (created_at DESC);

        CREATE INDEX IF NOT EXISTS contact_submissions_status_idx
          ON contact_submissions (status);

        CREATE INDEX IF NOT EXISTS contact_submissions_email_status_idx
          ON contact_submissions (email_status);
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
        message,
        user_agent
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id::text, created_at::text AS "createdAt";
    `,
    [input.name, input.email, input.focus, input.message, input.userAgent],
  );

  return result.rows[0];
}
