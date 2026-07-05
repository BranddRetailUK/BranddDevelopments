import Link from "next/link";
import { HiArrowLongRight } from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";
import { StructuredData } from "@/components/StructuredData";
import { absoluteUrl, createBreadcrumbJsonLd, createPageMetadata, organizationId } from "@/content/seo";

export const metadata = createPageMetadata({
  title: "Privacy",
  description:
    "Privacy information for Brandd enquiries, analytics, advertising measurement, cookies, and contact data handling.",
  path: "/privacy",
  keywords: ["Brandd privacy", "cookie preferences", "advertising measurement", "contact form data"],
});

const privacySections = [
  {
    title: "Contact enquiries",
    copy: "When you submit the contact form, Brandd stores your name, email address, selected service focus, message, request details, and the time the enquiry was received so the project can be reviewed and answered.",
  },
  {
    title: "Lead attribution",
    copy: "If you arrive from a campaign link, the site may store landing-page details, referrer details, UTM parameters, Google click identifiers such as gclid, gbraid or wbraid, and your cookie preference. This helps connect enquiries to the campaign that created them.",
  },
  {
    title: "Notifications",
    copy: "Enquiries can trigger internal email notifications through SendGrid and optional WhatsApp notifications through Meta WhatsApp Cloud API. The contact form can still save an enquiry if those notification services are unavailable.",
  },
  {
    title: "Google measurement",
    copy: "Optional Google measurement is used only when the relevant site configuration is present and the visitor grants consent. Visitors can choose essential-only storage from the cookie preferences banner.",
  },
  {
    title: "Website interaction analytics",
    copy: "When optional measurement is accepted, Brandd may store anonymous visitor and session identifiers, page views, landing pages, referrers, campaign fields, scroll-depth milestones, link and CTA clicks, outbound links, and contact-form start or submit events. Form field contents are not stored in website analytics events.",
  },
  {
    title: "Retention and follow-up",
    copy: "Contact records are kept for project follow-up, lead quality review, campaign reporting, and operational audit. Records can be reviewed or removed when they are no longer needed.",
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
            Brandd collects the information needed to respond to project enquiries,
            understand campaign performance, and keep the website operating reliably.
          </p>
        </MotionReveal>
      </section>

      <section className="section light-section" data-nav-tone="light">
        <div className="section-inner privacy-content">
          {privacySections.map((section, index) => (
            <MotionReveal className="privacy-section" delay={index * 0.06} key={section.title}>
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
            <p className="eyebrow eyebrow-light">Questions</p>
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
