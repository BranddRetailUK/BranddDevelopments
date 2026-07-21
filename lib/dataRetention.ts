import { getPostgresPool } from "@/lib/postgres";

const retentionIntervalMs = 6 * 60 * 60 * 1000;
const globalForRetention = globalThis as typeof globalThis & {
  branddLastRetentionRun?: number;
};

function readRetentionDays(name: string, fallback: number) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value >= 30 ? Math.round(value) : fallback;
}

export async function runDataRetention() {
  const now = Date.now();

  if (
    globalForRetention.branddLastRetentionRun &&
    now - globalForRetention.branddLastRetentionRun < retentionIntervalMs
  ) {
    return;
  }

  globalForRetention.branddLastRetentionRun = now;

  try {
    await getPostgresPool().query(
      `
        WITH analytics_cleanup AS (
          DELETE FROM site_analytics_events
          WHERE created_at < NOW() - ($1::text || ' days')::interval
          RETURNING 1
        ),
        contact_cleanup AS (
          DELETE FROM contact_submissions
          WHERE updated_at < NOW() - ($2::text || ' days')::interval
          RETURNING 1
        ),
        rate_limit_cleanup AS (
          DELETE FROM api_rate_limits
          WHERE expires_at < NOW()
          RETURNING 1
        )
        SELECT
          (SELECT COUNT(*) FROM analytics_cleanup) AS analytics_deleted,
          (SELECT COUNT(*) FROM contact_cleanup) AS contacts_deleted,
          (SELECT COUNT(*) FROM rate_limit_cleanup) AS rate_limits_deleted;
      `,
      [
        readRetentionDays("SITE_ANALYTICS_RETENTION_DAYS", 395),
        readRetentionDays("CONTACT_RETENTION_DAYS", 730),
      ],
    );
  } catch (error) {
    globalForRetention.branddLastRetentionRun = undefined;
    console.error("Data retention cleanup failed", error);
  }
}
