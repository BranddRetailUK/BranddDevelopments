export const siteAnalyticsEventNames = [
  "page_view",
  "scroll_depth",
  "nav_click",
  "cta_click",
  "link_click",
  "outbound_link_click",
  "button_click",
  "form_start",
  "form_submit_attempt",
  "generate_lead",
] as const;

export type SiteAnalyticsEventName = (typeof siteAnalyticsEventNames)[number];

export const siteAnalyticsPropertyNames = [
  "link_text",
  "link_url",
  "link_path",
  "link_type",
  "interaction_area",
  "opens_new_tab",
  "is_cta",
  "button_label",
  "button_type",
  "form_name",
  "scroll_depth",
  "budget_range",
  "service_focus",
  "lead_id",
] as const;

const eventNameSet = new Set<string>(siteAnalyticsEventNames);
const propertyNameSet = new Set<string>(siteAnalyticsPropertyNames);

export function isSiteAnalyticsEventName(value: string): value is SiteAnalyticsEventName {
  return eventNameSet.has(value);
}

export function isSiteAnalyticsPropertyName(value: string) {
  return propertyNameSet.has(value);
}
