"use client";

import Script from "next/script";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import {
  HiArrowLongRight,
  HiCheck,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import {
  consentStorageKey,
  getLeadAttribution,
  readBrowserStorage,
} from "@/lib/clientAttribution";
import {
  contactBudgetOptions,
  contactFocusOptions,
  type ContactFocusOption,
} from "@/lib/contactOptions";

type FormState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "sent"; message: string }
  | { status: "error"; message: string };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    branddTrackEvent?: (
      eventName: string,
      properties?: Record<string, unknown>,
    ) => void;
    turnstile?: {
      reset: () => void;
    };
  }
}

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function trackLeadConversion({
  budget,
  focus,
  submissionId,
}: {
  budget: string;
  focus: string;
  submissionId: string | null;
}) {
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

  if (readBrowserStorage(consentStorageKey) === "accepted") {
    window.dataLayer?.push({
      event: "generate_lead",
      form_name: "contact",
      lead_id: submissionId,
      budget_range: budget,
      service_focus: focus,
    });

    window.gtag?.("event", "generate_lead", {
      event_category: "Lead",
      event_label: focus,
      budget_range: budget,
      lead_id: submissionId,
    });

    if (googleAdsId && conversionLabel) {
      window.gtag?.("event", "conversion", {
        send_to: `${googleAdsId}/${conversionLabel}`,
        transaction_id: submissionId ?? undefined,
      });
    }
  }

  window.branddTrackEvent?.("generate_lead", {
    form_name: "contact",
    lead_id: submissionId,
    budget_range: budget,
    service_focus: focus,
  });
}

export function ContactForm({
  initialFocus,
}: {
  initialFocus?: ContactFocusOption;
}) {
  const [formState, setFormState] = useState<FormState>({ status: "idle" });
  const formStartedAtRef = useRef(Date.now());
  const idempotencyKeyRef = useRef<string | null>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const budget = getFormString(formData, "budget");
    const focus = getFormString(formData, "focus");
    const idempotencyKey =
      idempotencyKeyRef.current ??
      (typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `contact-${Date.now()}-${Math.random().toString(36).slice(2)}`);

    idempotencyKeyRef.current = idempotencyKey;

    setFormState({ status: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify({
          name: getFormString(formData, "name"),
          email: getFormString(formData, "email"),
          focus,
          budget,
          message: getFormString(formData, "message"),
          website: getFormString(formData, "website"),
          startedAt: formStartedAtRef.current,
          turnstileToken: getFormString(formData, "cf-turnstile-response"),
          attribution: getLeadAttribution(),
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        message?: string;
        submissionId?: string;
      } | null;

      if (!response.ok) {
        throw new Error(
          payload?.message ??
            "We could not send the enquiry. Please try again.",
        );
      }

      if (payload?.submissionId) {
        trackLeadConversion({
          budget,
          focus,
          submissionId: payload.submissionId,
        });
      }

      form.reset();
      idempotencyKeyRef.current = null;
      setFormState({
        status: "sent",
        message:
          "Thanks. We’ll review your message and reply by email, typically within one hour.",
      });
    } catch (error) {
      window.turnstile?.reset();
      setFormState({
        status: "error",
        message:
          error instanceof Error && !(error instanceof TypeError)
            ? error.message
            : "We could not send the enquiry. Please try again.",
      });
    }
  }

  const isSending = formState.status === "sending";
  const isSent = formState.status === "sent";
  const isSubmitLocked = isSending || isSent;

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      aria-busy={isSending}
    >
      <div className="form-heading">
        <span>Your project</span>
        {isSent ? <HiOutlineCheckCircle aria-hidden="true" /> : null}
      </div>
      <label>
        Name
        <input
          name="name"
          type="text"
          autoComplete="name"
          minLength={2}
          maxLength={120}
          required
          disabled={isSubmitLocked}
        />
      </label>
      <div className="form-honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label>
        Email
        <input
          name="email"
          type="email"
          autoComplete="email"
          maxLength={180}
          required
          disabled={isSubmitLocked}
        />
      </label>
      <label>
        What do you need help with?
        <select
          name="focus"
          defaultValue={initialFocus ?? "Not sure yet"}
          disabled={isSubmitLocked}
        >
          {contactFocusOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <fieldset className="budget-field">
        <legend>Approximate budget</legend>
        <div className="budget-options">
          {contactBudgetOptions.map((option) => (
            <label className="budget-option" key={option}>
              <input
                name="budget"
                type="radio"
                value={option}
                required
                disabled={isSubmitLocked}
              />
              <span className="budget-check" aria-hidden="true" />
              <span className="budget-option-text">{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="brief-field">
        What are you building, improving or trying to fix?
        <textarea
          name="message"
          rows={5}
          minLength={10}
          maxLength={5000}
          required
          disabled={isSubmitLocked}
        />
      </label>
      {turnstileSiteKey ? (
        <>
          <Script
            id="cloudflare-turnstile"
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
          />
          <div
            className="cf-turnstile"
            data-sitekey={turnstileSiteKey}
            data-theme="dark"
            data-action="contact"
          />
        </>
      ) : null}
      <button
        className={`button button-light contact-submit-button${
          isSending ? " submit-sending" : ""
        }${isSent ? " submit-success" : ""}`}
        type="submit"
        disabled={isSubmitLocked}
        aria-label={isSent ? "Enquiry sent" : undefined}
      >
        {isSent ? (
          <>
            <span className="submit-success-mark" aria-hidden="true">
              <HiCheck />
            </span>
            <span>Enquiry sent</span>
          </>
        ) : (
          <>
            <span>{isSending ? "Sending enquiry" : "Send enquiry"}</span>
            <HiArrowLongRight aria-hidden="true" />
          </>
        )}
      </button>
      <p className="form-privacy">
        Read <Link href="/privacy">how we use your information</Link>.
      </p>
      {formState.status === "sent" ? (
        <p className="form-success" aria-live="polite">
          {formState.message}
        </p>
      ) : null}
      {formState.status === "error" ? (
        <p className="form-error" aria-live="polite">
          {formState.message} You can also email{" "}
          <a href="mailto:enquiries@brandd.co.uk">enquiries@brandd.co.uk</a>.
        </p>
      ) : null}
    </form>
  );
}
