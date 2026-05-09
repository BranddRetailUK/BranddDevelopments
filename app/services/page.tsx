import type { Metadata } from "next";
import Link from "next/link";
import { HiArrowLongRight } from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";
import { ScrollAccent } from "@/components/ScrollAccent";
import { ServiceGrid } from "@/components/ServiceGrid";
import { services } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "UI/UX, frontend development, backend services, databases, ecommerce systems, MVP delivery, and business integrations from Brandd.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero page-hero-light services-hero" data-nav-tone="light">
        <MotionReveal className="page-hero-copy">
          <p className="eyebrow">Services</p>
          <h1>Digital services for websites that need to do more.</h1>
          <p>
            Brandd brings together design, frontend, backend, data, commerce
            and integrations so the site works as part of the business.
          </p>
        </MotionReveal>
      </section>

      <section className="section dark-section" data-nav-tone="dark">
        <div className="section-inner">
          <ScrollAccent
            className="section-accent section-accent-services"
            rotateFrom={-7}
            rotateTo={10}
            xFrom="5%"
            xTo="-4%"
            yFrom="-4%"
            yTo="5%"
          />
          <MotionReveal className="section-heading">
            <p className="eyebrow eyebrow-light">Service areas</p>
            <h2>Specialist work that stays connected to the customer journey and the business underneath it.</h2>
          </MotionReveal>
          <ServiceGrid items={services} />
        </div>
      </section>

      <section className="section light-section" data-nav-tone="light">
        <div className="section-inner two-column">
          <MotionReveal>
            <p className="eyebrow">Delivery</p>
            <h2>Choose the engagement that fits the stage of the business.</h2>
          </MotionReveal>
          <div className="engagement-list">
            {[
              "A focused website, UI/UX, or frontend sprint for a launch date.",
              "A backend, database, or dashboard clean-up for systems that need structure.",
              "An ecommerce or creator-commerce build with product, checkout, and fulfilment logic.",
              "A business integration for Monday.com, Shopify, Discord, Stripe, QR tracking, or label printing.",
              "An MVP team to turn the first version into a real product.",
            ].map((item, index) => (
              <MotionReveal delay={index * 0.06} key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-section compact-cta" data-nav-tone="dark">
        <div className="section-inner cta-row">
          <MotionReveal>
            <p className="eyebrow eyebrow-light">Scope it properly</p>
            <h2>Start with what needs to change, then build what matters.</h2>
          </MotionReveal>
          <Link className="button button-light" href="/contact">
            Start a brief <HiArrowLongRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
