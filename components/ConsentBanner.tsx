"use client";

import { useEffect, useState } from "react";

type ConsentChoice = "accepted" | "essential";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const storageKey = "brandd_consent_choice";

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

  window.gtag?.("consent", "update", consentState);
  window.dataLayer?.push({
    event: "brandd_consent_update",
    consent_choice: choice,
    ...consentState,
  });
}

export function ConsentBanner() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedChoice = window.localStorage.getItem(storageKey);

    if (storedChoice === "accepted" || storedChoice === "essential") {
      setChoice(storedChoice);
      applyConsent(storedChoice);
    }

    setReady(true);
  }, []);

  function saveChoice(nextChoice: ConsentChoice) {
    window.localStorage.setItem(storageKey, nextChoice);
    setChoice(nextChoice);
    applyConsent(nextChoice);
  }

  if (!ready || choice) {
    return null;
  }

  return (
    <aside className="consent-banner" aria-label="Cookie preferences">
      <div>
        <strong>Cookie preferences</strong>
        <p>
          Brandd uses essential storage for the site and optional Google measurement for ads,
          analytics, and lead attribution.
        </p>
      </div>
      <div className="consent-actions">
        <button className="button button-light" type="button" onClick={() => saveChoice("accepted")}>
          Accept all
        </button>
        <button className="button button-outline" type="button" onClick={() => saveChoice("essential")}>
          Essential only
        </button>
      </div>
    </aside>
  );
}
