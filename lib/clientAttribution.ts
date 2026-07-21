"use client";

export type LeadAttribution = {
  landingPage: string;
  pagePath: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  gclid: string;
  gbraid: string;
  wbraid: string;
  consentChoice: string;
};

export const attributionStorageKey = "brandd_first_touch_attribution";
export const consentStorageKey = "brandd_consent_choice";
export const consentChangeEventName = "brandd:consent-change";
export const consentSettingsEventName = "brandd:open-consent-settings";
export const analyticsVisitorStorageKey = "brandd_analytics_visitor_id";
export const analyticsSessionStorageKey = "brandd_analytics_session_id";
export const analyticsSessionActivityStorageKey = "brandd_analytics_session_last_activity";

export function readBrowserStorage(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeBrowserStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable in hardened/private browser modes.
  }
}

export function removeBrowserStorage(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Storage can be unavailable in hardened/private browser modes.
  }
}

export function clearOptionalMeasurementStorage() {
  removeBrowserStorage(attributionStorageKey);
  removeBrowserStorage(analyticsVisitorStorageKey);

  try {
    window.sessionStorage.removeItem(analyticsSessionStorageKey);
    window.sessionStorage.removeItem(analyticsSessionActivityStorageKey);
  } catch {
    // Storage can be unavailable in hardened/private browser modes.
  }

  const cookieNames = document.cookie
    .split(";")
    .map((entry) => entry.split("=", 1)[0]?.trim())
    .filter(
      (name): name is string =>
        Boolean(name) &&
        (name.startsWith("_ga") ||
          name.startsWith("_gid") ||
          name.startsWith("_gat") ||
          name.startsWith("_gcl") ||
          name.startsWith("_dc_gtm")),
    );
  const hostname = window.location.hostname;
  const domains = ["", hostname, `.${hostname}`, ".brandd.co.uk"];

  for (const name of cookieNames) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${
        domain ? `; Domain=${domain}` : ""
      }`;
    }
  }
}

function readSearchParam(params: URLSearchParams, key: string) {
  return params.get(key)?.trim() ?? "";
}

export function hasCampaignAttribution(attribution: LeadAttribution) {
  return Boolean(
    attribution.utmSource ||
      attribution.utmMedium ||
      attribution.utmCampaign ||
      attribution.utmTerm ||
      attribution.utmContent ||
      attribution.gclid ||
      attribution.gbraid ||
      attribution.wbraid,
  );
}

export function parseStoredAttribution(value: string | null) {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as Partial<LeadAttribution>;

    return {
      landingPage: parsed.landingPage ?? "",
      pagePath: parsed.pagePath ?? "",
      referrer: parsed.referrer ?? "",
      utmSource: parsed.utmSource ?? "",
      utmMedium: parsed.utmMedium ?? "",
      utmCampaign: parsed.utmCampaign ?? "",
      utmTerm: parsed.utmTerm ?? "",
      utmContent: parsed.utmContent ?? "",
      gclid: parsed.gclid ?? "",
      gbraid: parsed.gbraid ?? "",
      wbraid: parsed.wbraid ?? "",
      consentChoice: parsed.consentChoice ?? "",
    };
  } catch {
    return null;
  }
}

export function getCurrentAttribution(): LeadAttribution {
  const url = new URL(window.location.href);
  const params = url.searchParams;

  return {
    landingPage: window.location.href,
    pagePath: `${url.pathname}${url.search}`,
    referrer: document.referrer,
    utmSource: readSearchParam(params, "utm_source"),
    utmMedium: readSearchParam(params, "utm_medium"),
    utmCampaign: readSearchParam(params, "utm_campaign"),
    utmTerm: readSearchParam(params, "utm_term"),
    utmContent: readSearchParam(params, "utm_content"),
    gclid: readSearchParam(params, "gclid"),
    gbraid: readSearchParam(params, "gbraid"),
    wbraid: readSearchParam(params, "wbraid"),
    consentChoice: readBrowserStorage(consentStorageKey) ?? "",
  };
}

export function getStoredAttribution() {
  return parseStoredAttribution(readBrowserStorage(attributionStorageKey));
}

export function syncLeadAttribution({
  storeWithoutCampaign,
}: {
  storeWithoutCampaign: boolean;
}) {
  const currentAttribution = getCurrentAttribution();

  if (currentAttribution.consentChoice !== "accepted") {
    return currentAttribution;
  }

  const storedAttribution = getStoredAttribution();

  if (!storedAttribution) {
    if (!storeWithoutCampaign && !hasCampaignAttribution(currentAttribution)) {
      return currentAttribution;
    }

    writeBrowserStorage(attributionStorageKey, JSON.stringify(currentAttribution));
    return currentAttribution;
  }

  const nextAttribution = hasCampaignAttribution(currentAttribution)
    ? {
        ...storedAttribution,
        ...currentAttribution,
        landingPage: storedAttribution.landingPage || currentAttribution.landingPage,
        referrer: storedAttribution.referrer || currentAttribution.referrer,
      }
    : {
        ...storedAttribution,
        pagePath: currentAttribution.pagePath,
        consentChoice: currentAttribution.consentChoice || storedAttribution.consentChoice,
      };

  writeBrowserStorage(attributionStorageKey, JSON.stringify(nextAttribution));
  return nextAttribution;
}

export function captureCampaignAttribution() {
  return syncLeadAttribution({ storeWithoutCampaign: false });
}

export function getLeadAttribution() {
  return syncLeadAttribution({ storeWithoutCampaign: true });
}
