import Link from "next/link";
import type { ReactNode } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";
import { StructuredData } from "@/components/StructuredData";
import {
  absoluteUrl,
  createBreadcrumbJsonLd,
  createPageMetadata,
  organizationId,
} from "@/content/seo";

export const metadata = createPageMetadata({
  title: "Privacy",
  description:
    "Privacy information for Brandd enquiries, analytics, advertising measurement, cookies, and contact data handling.",
  path: "/privacy",
  keywords: ["Brandd privacy", "cookie preferences", "advertising measurement", "contact form data"],
});

const privacySections: Array<{ title: string; copy: ReactNode }> = [
  {
    title: "Who controls your data",
    copy: (
      <>
        Brandd Solutions (referred to as Brandd in this notice) is the controller for the
        personal data described here. Privacy questions and rights requests can be sent to{" "}
        <a href="mailto:enquiries@brandd.co.uk">enquiries@brandd.co.uk</a>.
      </>
    ),
  },
  {
    title: "Contact enquiries",
    copy:
      "When you submit the contact form, Brandd stores your name, email address, service focus, budget range, message, current-page and campaign details included with the enquiry, IP address, browser user agent, consent choice, notification status, and timestamps. This is used to assess and respond to your request, prevent duplicate or abusive submissions, maintain an operational record, and take steps you request before a possible contract. The lawful bases are steps before entering a contract and Brandd's legitimate interests in handling genuine enquiries, securing the service, and maintaining appropriate business records.",
  },
  {
    title: "Cookies, attribution and analytics",
    copy:
      "Essential storage remembers your privacy choice and supports site security. Before optional consent, campaign parameters may be included with an enquiry from the page you are currently visiting, but Brandd does not persist first-touch attribution or analytics identifiers in browser storage. If you accept optional measurement, Brandd may store first-touch campaign attribution, anonymous visitor and session identifiers, page views, referrers, scroll milestones, link and CTA clicks, outbound links, and contact-form interaction events. Optional Google Analytics and advertising measurement also load only after consent. Form field contents are not included in interaction analytics. Consent is the lawful basis for optional storage and measurement.",
  },
  {
    title: "Security checks and rate limiting",
    copy:
      "Brandd uses short-lived, pseudonymised request fingerprints to limit automated traffic and may use Cloudflare Turnstile on the enquiry form. Cloudflare may process IP address, browser, and challenge signals to distinguish people from abusive automation. These controls are used under Brandd's legitimate interests in protecting the website, its database, and notification services.",
  },
  {
    title: "Service providers and recipients",
    copy:
      "Personal data is shared only where needed to operate the service. Providers may include Railway and its Postgres service for hosting and storage, Cloudflare for delivery and security, SendGrid for internal enquiry email, Meta's WhatsApp Cloud API when WhatsApp notifications are enabled, and Google only after optional measurement consent. Brandd may also disclose information where required by law or to establish, exercise, or defend legal claims. These providers process data under their own terms and applicable data-processing commitments.",
  },
  {
    title: "International transfers",
    copy:
      "Some providers may process data outside the United Kingdom. Where UK data-protection law requires a transfer safeguard, Brandd relies on an applicable UK adequacy regulation or contractual safeguards such as the UK International Data Transfer Agreement or UK Addendum, together with supplementary protections where appropriate. You can ask for more information about the safeguard relevant to your data.",
  },
  {
    title: "How long data is kept",
    copy:
      "Contact enquiries are retained for up to 24 months after the last recorded activity, unless a longer period is required for an active contract, legal obligation, or legal claim. First-party interaction analytics are retained for up to 395 days. Rate-limit records expire after their short control window, normally between one and ten minutes. A privacy choice remains in the browser until it is changed or local storage is cleared. Notification delivery records follow the related contact enquiry's retention period.",
  },
  {
    title: "Your rights",
    copy: (
      <>
        Depending on the circumstances, you may ask Brandd for access to your personal data,
        correction, deletion, restriction, portability, or object to processing based on
        legitimate interests. You can withdraw optional measurement consent at any time using
        Cookie settings in the site footer; withdrawal does not affect earlier lawful
        processing. Brandd does not use this data for solely automated decisions with legal or
        similarly significant effects. If a concern is not resolved, you can complain to the{" "}
        <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noreferrer">
          UK Information Commissioner&apos;s Office
        </a>
        .
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <StructuredData
        data={[
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Privacy", path: "/privacy" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Brandd privacy information",
            url: absoluteUrl("/privacy"),
            about: {
              "@id": organizationId,
            },
          },
        ]}
      />
      <section className="page-hero page-hero-dark privacy-hero" data-nav-tone="dark">
        <MotionReveal className="page-hero-copy">
          <p className="eyebrow eyebrow-light">Privacy</p>
          <h1>How Brandd handles enquiry and measurement data.</h1>
          <p>
            This notice explains what is collected, why it is used, who receives it,
            how long it is kept, and the choices and rights available to you.
          </p>
          <p className="privacy-updated">Last updated 21 July 2026</p>
        </MotionReveal>
      </section>

      <section className="section light-section" data-nav-tone="light">
        <div className="section-inner privacy-content">
          {privacySections.map((section, index) => (
            <MotionReveal className="privacy-section" delay={index * 0.04} key={section.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{section.title}</h2>
                <p>{section.copy}</p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </section>

      <section className="section dark-section compact-cta" data-nav-tone="dark">
        <div className="section-inner cta-row">
          <MotionReveal>
            <p className="eyebrow eyebrow-light">Questions or requests</p>
            <h2>Ask how your enquiry data is handled.</h2>
          </MotionReveal>
          <Link className="button button-light" href="/contact">
            Contact Brandd <HiArrowLongRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
