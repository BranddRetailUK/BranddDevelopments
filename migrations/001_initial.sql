CREATE TABLE IF NOT EXISTS contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  focus TEXT NOT NULL,
  budget TEXT,
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
  idempotency_key TEXT,
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
  whatsapp_status TEXT NOT NULL DEFAULT 'pending',
  whatsapp_error TEXT,
  whatsapp_message_id TEXT,
  whatsapp_sent_at TIMESTAMPTZ,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS budget TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS landing_page TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS page_path TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS referrer TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS utm_source TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS utm_medium TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS utm_campaign TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS utm_term TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS utm_content TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS gclid TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS gbraid TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS wbraid TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS consent_choice TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS ip_address TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS idempotency_key TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS lead_value NUMERIC(12, 2);
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS qualified_at TIMESTAMPTZ;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS won_at TIMESTAMPTZ;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS lost_at TIMESTAMPTZ;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS google_ads_conversion_status TEXT NOT NULL DEFAULT 'not_ready';
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS google_ads_conversion_error TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS google_ads_conversion_uploaded_at TIMESTAMPTZ;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS email_status TEXT NOT NULL DEFAULT 'pending';
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS email_message_id TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS email_error TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS emailed_at TIMESTAMPTZ;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS whatsapp_status TEXT NOT NULL DEFAULT 'pending';
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS whatsapp_error TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS whatsapp_message_id TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS whatsapp_sent_at TIMESTAMPTZ;

CREATE UNIQUE INDEX IF NOT EXISTS contact_submissions_idempotency_key_idx
  ON contact_submissions (idempotency_key)
  WHERE idempotency_key IS NOT NULL;
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

CREATE TABLE IF NOT EXISTS contact_notification_jobs (
  id BIGSERIAL PRIMARY KEY,
  submission_id BIGINT NOT NULL REFERENCES contact_submissions(id) ON DELETE CASCADE,
  channel TEXT NOT NULL CHECK (channel IN ('email', 'whatsapp')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'sent', 'skipped', 'failed')),
  attempts INTEGER NOT NULL DEFAULT 0,
  available_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  locked_at TIMESTAMPTZ,
  last_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (submission_id, channel)
);

CREATE INDEX IF NOT EXISTS contact_notification_jobs_pending_idx
  ON contact_notification_jobs (status, available_at, id);

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

CREATE TABLE IF NOT EXISTS api_rate_limits (
  scope TEXT NOT NULL,
  client_key TEXT NOT NULL,
  window_start TIMESTAMPTZ NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 1,
  expires_at TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (scope, client_key, window_start)
);

CREATE INDEX IF NOT EXISTS api_rate_limits_expiry_idx
  ON api_rate_limits (expires_at);
