"use client";

import { useEffect } from "react";
import {
  consentChangeEventName,
  consentStorageKey,
  readBrowserStorage,
} from "@/lib/clientAttribution";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const deniedConsent = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  functionality_storage: "granted",
  security_storage: "granted",
};

function ensureGoogleQueue() {
  window.dataLayer ??= [];
  window.gtag ??= (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
}

function loadGoogleTag({
  gaMeasurementId,
  googleAdsId,
  tagManagerId,
}: {
  gaMeasurementId: string;
  googleAdsId: string;
  tagManagerId: string;
}) {
  ensureGoogleQueue();

  if (tagManagerId) {
    if (document.getElementById("google-tag-manager")) {
      return;
    }

    window.dataLayer?.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const script = document.createElement("script");
    script.id = "google-tag-manager";
    script.async = true;
    script.dataset.cfasync = "false";
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(tagManagerId)}`;
    document.head.append(script);
    return;
  }

  const tagId = gaMeasurementId || googleAdsId;

  if (!tagId || document.getElementById("google-tag-script")) {
    return;
  }

  const script = document.createElement("script");
  script.id = "google-tag-script";
  script.async = true;
  script.dataset.cfasync = "false";
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tagId)}`;
  document.head.append(script);

  window.gtag?.("js", new Date());

  if (gaMeasurementId) {
    window.gtag?.("config", gaMeasurementId, { send_page_view: false });
  }

  if (googleAdsId && googleAdsId !== gaMeasurementId) {
    window.gtag?.("config", googleAdsId);
  }
}

export function GoogleTag() {
  const tagManagerId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID?.trim() ?? "";
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() ?? "";

  useEffect(() => {
    if (!tagManagerId && !gaMeasurementId && !googleAdsId) {
      return;
    }

    ensureGoogleQueue();
    window.gtag?.("consent", "default", {
      ...deniedConsent,
      wait_for_update: 500,
    });

    const handleConsent = (event?: Event) => {
      const eventChoice =
        event instanceof CustomEvent
          ? (event.detail as { choice?: string } | undefined)?.choice
          : undefined;
      const choice = eventChoice ?? readBrowserStorage(consentStorageKey);

      if (choice === "accepted") {
        loadGoogleTag({ gaMeasurementId, googleAdsId, tagManagerId });
      }
    };

    handleConsent();
    window.addEventListener(consentChangeEventName, handleConsent);
    return () => window.removeEventListener(consentChangeEventName, handleConsent);
  }, [gaMeasurementId, googleAdsId, tagManagerId]);

  return null;
}
