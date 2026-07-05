import { getPostgresPool } from "@/lib/postgres";

export type SiteAnalyticsAttribution = {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
};

export type SiteAnalyticsProperties = Record<string, string | number | boolean | null>;

export type SiteAnalyticsEventInput = {
  eventName: string;
  visitorId: string;
  sessionId: string;
  pageUrl: string | null;
  pagePath: string;
  pageTitle: string | null;
  referrer: string | null;
  landingPage: string | null;
  previousPagePath: string | null;
  attribution: SiteAnalyticsAttribution;
  consentChoice: string;
  viewportWidth: number | null;
  viewportHeight: number | null;
  properties: SiteAnalyticsProperties;
  userAgent: string | null;
};

let tableReady: Promise<void> | null = null;

export function isSiteAnalyticsConfigured() {
  return process.env.SITE_ANALYTICS_DISABLED !== "true" && Boolean(process.env.DATABASE_URL?.trim());
}

function ensureSiteAnalyticsTable() {
  if (!tableReady) {
    tableReady = getPostgresPool()
      .query(`
        CREATE TABLE IF NOT EXISTS site_analytics_events (
          id BIGSERIAL PRIMARY KEY,
          event_name TEXT NOT NULL,
          visitor_id TEXT NOT NULL,
          session_id TEXT NOT NULL,
          page_url TEXT,
          page_path TEXT NOT NULL,
          page_title TEXT,
          referrer TEXT,
          landing_page TEXT,
          previous_page_path TEXT,
          utm_source TEXT,
          utm_medium TEXT,
          utm_campaign TEXT,
          utm_term TEXT,
          utm_content TEXT,
          gclid TEXT,
          gbraid TEXT,
          wbraid TEXT,
          consent_choice TEXT NOT NULL DEFAULT 'accepted',
          viewport_width INTEGER,
          viewport_height INTEGER,
          properties JSONB NOT NULL DEFAULT '{}'::jsonb,
          user_agent TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS site_analytics_events_created_at_idx
          ON site_analytics_events (created_at DESC);

        CREATE INDEX IF NOT EXISTS site_analytics_events_event_name_idx
          ON site_analytics_events (event_name);

        CREATE INDEX IF NOT EXISTS site_analytics_events_session_idx
          ON site_analytics_events (session_id, created_at);

        CREATE INDEX IF NOT EXISTS site_analytics_events_visitor_idx
          ON site_analytics_events (visitor_id, created_at DESC);

        CREATE INDEX IF NOT EXISTS site_analytics_events_page_path_idx
          ON site_analytics_events (page_path);

        CREATE INDEX IF NOT EXISTS site_analytics_events_landing_page_idx
          ON site_analytics_events (landing_page);

        CREATE INDEX IF NOT EXISTS site_analytics_events_utm_campaign_idx
          ON site_analytics_events (utm_campaign);

        CREATE INDEX IF NOT EXISTS site_analytics_events_gclid_idx
          ON site_analytics_events (gclid);
      `)
      .then(() => undefined)
      .catch((error) => {
        tableReady = null;
        throw error;
      });
  }

  return tableReady;
}

export async function createSiteAnalyticsEvent(input: SiteAnalyticsEventInput) {
  await ensureSiteAnalyticsTable();

  await getPostgresPool().query(
    `
      INSERT INTO site_analytics_events (
        event_name,
        visitor_id,
        session_id,
        page_url,
        page_path,
        page_title,
        referrer,
        landing_page,
        previous_page_path,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content,
        gclid,
        gbraid,
        wbraid,
        consent_choice,
        viewport_width,
        viewport_height,
        properties,
        user_agent
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        $13,
        $14,
        $15,
        $16,
        $17,
        $18,
        $19,
        $20,
        $21::jsonb,
        $22
      );
    `,
    [
      input.eventName,
      input.visitorId,
      input.sessionId,
      input.pageUrl,
      input.pagePath,
      input.pageTitle,
      input.referrer,
      input.landingPage,
      input.previousPagePath,
      input.attribution.utmSource,
      input.attribution.utmMedium,
      input.attribution.utmCampaign,
      input.attribution.utmTerm,
      input.attribution.utmContent,
      input.attribution.gclid,
      input.attribution.gbraid,
      input.attribution.wbraid,
      input.consentChoice,
      input.viewportWidth,
      input.viewportHeight,
      JSON.stringify(input.properties),
      input.userAgent,
    ],
  );
}
