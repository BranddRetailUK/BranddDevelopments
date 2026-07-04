"use client";

import { FormEvent, useEffect, useState } from "react";
import { HiArrowLongRight, HiOutlineCheckCircle } from "react-icons/hi2";

type FormState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "sent"; message: string }
  | { status: "error"; message: string };

type ContactAttribution = {
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

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const attributionStorageKey = "brandd_first_touch_attribution";
const consentStorageKey = "brandd_consent_choice";

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function readSearchParam(params: URLSearchParams, key: string) {
  return params.get(key)?.trim() ?? "";
}

function hasCampaignAttribution(attribution: ContactAttribution) {
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

function parseStoredAttribution(value: string | null) {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as Partial<ContactAttribution>;

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

function getCurrentAttribution(): ContactAttribution {
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
    consentChoice: window.localStorage.getItem(consentStorageKey) ?? "",
  };
}

function getLeadAttribution() {
  const currentAttribution = getCurrentAttribution();
  const storedAttribution = parseStoredAttribution(
    window.localStorage.getItem(attributionStorageKey),
  );

  if (!storedAttribution) {
    window.localStorage.setItem(attributionStorageKey, JSON.stringify(currentAttribution));
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

  window.localStorage.setItem(attributionStorageKey, JSON.stringify(nextAttribution));
  return nextAttribution;
}

function trackLeadConversion({
  focus,
  submissionId,
}: {
  focus: string;
  submissionId: string | null;
}) {
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

  window.dataLayer?.push({
    event: "generate_lead",
    form_name: "contact",
    lead_id: submissionId,
    service_focus: focus,
  });

  window.gtag?.("event", "generate_lead", {
    event_category: "Lead",
    event_label: focus,
    lead_id: submissionId,
  });

  if (googleAdsId && conversionLabel) {
    window.gtag?.("event", "conversion", {
      send_to: `${googleAdsId}/${conversionLabel}`,
      transaction_id: submissionId ?? undefined,
    });
  }
}

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>({ status: "idle" });
  const [attribution, setAttribution] = useState<ContactAttribution | null>(null);

  useEffect(() => {
    setAttribution(getLeadAttribution());
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const focus = getFormString(formData, "focus");

    setFormState({ status: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: getFormString(formData, "name"),
          email: getFormString(formData, "email"),
          focus,
          message: getFormString(formData, "message"),
          companyWebsite: getFormString(formData, "companyWebsite"),
          attribution: attribution ?? getLeadAttribution(),
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        message?: string;
        submissionId?: string;
      } | null;

      if (!response.ok) {
        throw new Error(payload?.message ?? "We could not send the enquiry. Please try again.");
      }

      trackLeadConversion({
        focus,
        submissionId: payload?.submissionId ?? null,
      });

      form.reset();
      setFormState({
        status: "sent",
        message: payload?.message ?? "Thanks. Your enquiry has been received.",
      });
    } catch (error) {
      setFormState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not send the enquiry. Please try again.",
      });
    }
  }

  const isSending = formState.status === "sending";
  const isSent = formState.status === "sent";

  return (
    <form className="contact-form" onSubmit={handleSubmit} aria-busy={isSending}>
      <div className="form-heading">
        <span>Project brief</span>
        {isSent ? <HiOutlineCheckCircle aria-hidden="true" /> : null}
      </div>
      <label>
        Name
        <input name="name" type="text" autoComplete="name" required disabled={isSending} />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required disabled={isSending} />
      </label>
      <label>
        Service focus
        <select
          name="focus"
          defaultValue="Website design and frontend build"
          disabled={isSending}
        >
          <option>Website design and frontend build</option>
          <option>Legacy system rebuild</option>
          <option>Backend services and APIs</option>
          <option>Database structure and reporting</option>
          <option>Ecommerce and product systems</option>
          <option>Shopify app build</option>
          <option>Discord bot build</option>
          <option>Customer portal or dashboard</option>
          <option>MVP design and build</option>
          <option>Monday.com and business integrations</option>
          <option>Warehouse, stock and QR tracking systems</option>
          <option>Custom dashboards and internal tools</option>
        </select>
      </label>
      <label className="brief-field">
        What are you building, improving or trying to fix?
        <textarea name="message" rows={5} required disabled={isSending} />
      </label>
      <label className="form-honeypot" aria-hidden="true">
        Company website
        <input
          name="companyWebsite"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          disabled={isSending}
        />
      </label>
      <button className="button button-light" type="submit" disabled={isSending}>
        {isSending ? "Sending enquiry" : "Send enquiry"} <HiArrowLongRight aria-hidden="true" />
      </button>
      {formState.status === "sent" ? (
        <p className="form-success" aria-live="polite">
          {formState.message}
        </p>
      ) : null}
      {formState.status === "error" ? (
        <p className="form-error" aria-live="polite">
          {formState.message}
        </p>
      ) : null}
    </form>
  );
}
