import { ContactForm } from "@/components/ContactForm";
import { MotionReveal } from "@/components/MotionReveal";
import { StructuredData } from "@/components/StructuredData";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  absoluteUrl,
  organizationId,
} from "@/content/seo";
import { contactServicePresets } from "@/lib/contactOptions";

export const metadata = createPageMetadata({
  title: "Discuss a project",
  description:
    "Tell Brandd what you want to build or improve. Based in Leighton Buzzard, Bedfordshire, with a typical reply time of one hour.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const { service } = await searchParams;
  const initialFocus =
    typeof service === "string" && Object.hasOwn(contactServicePresets, service)
      ? contactServicePresets[service]
      : undefined;
  return (
    <>
      <StructuredData
        data={[
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Brandd",
            url: absoluteUrl("/contact"),
            about: { "@id": organizationId },
          },
        ]}
      />
      <section
        className="section dark-section contact-form-first"
        data-nav-tone="dark"
      >
        <div className="section-inner">
          <MotionReveal className="section-heading contact-introduction">
            <p className="eyebrow eyebrow-light">Contact Brandd</p>
            <h1>Tell us about your project.</h1>
            <p className="section-copy">
              What would you like to build or improve? A few sentences about
              your business and the problem are enough to get started.
            </p>
          </MotionReveal>
          <div className="contact-layout">
            <MotionReveal className="contact-form-shell">
              <ContactForm initialFocus={initialFocus} />
            </MotionReveal>
            <div className="contact-info">
              <article className="contact-card">
                <h2>What happens next?</h2>
                <p>
                  We’ll review your message and reply by email, typically within
                  one hour. We can then discuss the requirements and agree the
                  next step.
                </p>
              </article>
              <article className="contact-card">
                <h2>Prefer to email?</h2>
                <p>
                  <a href="mailto:enquiries@brandd.co.uk">
                    enquiries@brandd.co.uk
                  </a>
                </p>
                <p>Based in Leighton Buzzard, Bedfordshire.</p>
              </article>
              <article className="contact-card">
                <h2>Support after launch</h2>
                <p>
                  We offer ongoing support and management where required. Let us
                  know if you need help maintaining an existing website or
                  system.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
