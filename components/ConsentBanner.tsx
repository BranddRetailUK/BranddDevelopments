"use client";

import { useEffect, useState } from "react";
import {
  clearOptionalMeasurementStorage,
  consentChangeEventName,
  consentSettingsEventName,
  consentStorageKey,
  readBrowserStorage,
  writeBrowserStorage,
} from "@/lib/clientAttribution";

type ConsentChoice = "accepted" | "essential";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function applyConsent(choice: ConsentChoice) {
  const granted = choice === "accepted";
  const consentState = {
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  };

  if (!granted) {
    clearOptionalMeasurementStorage();
  }

  window.dataLayer ??= [];
  window.gtag ??= (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.gtag("consent", "update", consentState);
  window.dataLayer.push({
    event: "brandd_consent_update",
    consent_choice: choice,
    ...consentState,
  });
  window.dispatchEvent(
    new CustomEvent(consentChangeEventName, {
      detail: { choice },
    }),
  );
}

export function ConsentBanner() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedChoice = readBrowserStorage(consentStorageKey);

    if (storedChoice === "accepted" || storedChoice === "essential") {
      setChoice(storedChoice);
      applyConsent(storedChoice);
    } else {
      setOpen(true);
    }

    const openSettings = () => setOpen(true);
    window.addEventListener(consentSettingsEventName, openSettings);
    setReady(true);

    return () => window.removeEventListener(consentSettingsEventName, openSettings);
  }, []);

  function saveChoice(nextChoice: ConsentChoice) {
    writeBrowserStorage(consentStorageKey, nextChoice);
    setChoice(nextChoice);
    setOpen(false);
    applyConsent(nextChoice);
  }

  if (!ready || !open) {
    return null;
  }

  return (
    <aside className="consent-banner" aria-label="Cookie preferences">
      <div>
        <strong>Cookie preferences</strong>
        <p>
          Brandd uses essential storage to operate and secure the site. Optional Google
          measurement and stored campaign attribution run only if you accept them. You can
          change this choice at any time.
        </p>
      </div>
      <div className="consent-actions">
        <button className="button button-light" type="button" onClick={() => saveChoice("accepted")}>
          Accept optional
        </button>
        <button className="button button-light" type="button" onClick={() => saveChoice("essential")}>
          Essential only
        </button>
        {choice ? (
          <button className="consent-close" type="button" onClick={() => setOpen(false)}>
            Close
          </button>
        ) : null}
      </div>
    </aside>
  );
}
