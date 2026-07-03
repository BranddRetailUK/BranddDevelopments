"use client";

import { FormEvent, useState } from "react";
import { HiArrowLongRight, HiOutlineCheckCircle } from "react-icons/hi2";

type FormState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "sent"; message: string }
  | { status: "error"; message: string };

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>({ status: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

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
          focus: getFormString(formData, "focus"),
          message: getFormString(formData, "message"),
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(payload?.message ?? "We could not send the enquiry. Please try again.");
      }

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
          <option>AI workflow assistant</option>
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
