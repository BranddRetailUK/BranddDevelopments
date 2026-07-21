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

export function isSiteAnalyticsConfigured() {
  return process.env.SITE_ANALYTICS_DISABLED !== "true" && Boolean(process.env.DATABASE_URL?.trim());
}

export async function createSiteAnalyticsEvent(input: SiteAnalyticsEventInput) {
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
