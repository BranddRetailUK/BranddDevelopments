import {
  HiOutlineCalendarDays,
  HiOutlineEnvelope,
  HiOutlineMapPin,
} from "react-icons/hi2";
import { ContactForm } from "@/components/ContactForm";
import { MotionReveal } from "@/components/MotionReveal";
import { ScrollAccent } from "@/components/ScrollAccent";
import { ScrollBridge } from "@/components/ScrollBridge";
import { StructuredData } from "@/components/StructuredData";
import { absoluteUrl, createBreadcrumbJsonLd, createPageMetadata, organizationId } from "@/content/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Start a project brief with Brandd for legacy system rebuilds, web design, development, backend, database, MVP, retail, and ecommerce services.",
  path: "/contact",
  keywords: ["Brandd contact", "project enquiry", "web development quote", "legacy system rebuild quote"],
});

const contactCards = [
  {
    title: "Email directly",
    copy: (
      <>
        Prefer not to use the form? Email{" "}
        <a href="mailto:enquiries@brandd.co.uk">enquiries@brandd.co.uk</a>.
      </>
    ),
    icon: HiOutlineEnvelope,
  },
  {
    title: "Project enquiries",
    copy: "Share the goal, the current problem, and what needs to happen next.",
    icon: HiOutlineEnvelope,
  },
  {
    title: "Planning sessions",
    copy: "Map the offer, user journey, system needs, integrations, and launch path.",
    icon: HiOutlineCalendarDays,
  },
  {
    title: "UK based, online first",
    copy: "Built for focused collaboration with clear checkpoints and practical delivery.",
    icon: HiOutlineMapPin,
  },
];

export default function ContactPage() {
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
            about: {
              "@id": organizationId,
            },
          },
        ]}
      />
      <section className="section dark-section contact-form-first" data-nav-tone="dark">
        <div className="section-inner contact-layout">
          <ScrollAccent
            className="section-accent section-accent-contact"
            rotateFrom={-10}
            rotateTo={9}
            xFrom="5%"
            xTo="-4%"
            yFrom="-5%"
            yTo="5%"
          />
          <MotionReveal className="contact-form-shell">
            <ContactForm />
          </MotionReveal>
          <div className="contact-info">
            {contactCards.map((item, index) => {
              const Icon = item.icon;
              return (
                <MotionReveal
                  className="contact-card"
                  delay={index * 0.07}
                  key={item.title}
                >
                  <Icon aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <ScrollBridge tone="light" label="Brief to build plan" variant="sweep-right" />

      <section className="page-hero page-hero-light contact-hero" data-nav-tone="light">
        <MotionReveal className="page-hero-copy">
          <p className="eyebrow">Contact</p>
          <h1>Tell us what you are building, improving or trying to fix.</h1>
          <p>
            Whether you need to rebuild a legacy database, replace an old
            internal dashboard, launch a new website, create a customer portal,
            shape an MVP, clean up backend data, or connect an ecommerce
            workflow, Brandd can help shape the next step.
          </p>
        </MotionReveal>
      </section>
    </>
  );
}
