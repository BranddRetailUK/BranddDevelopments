import type { Metadata } from "next";
import Link from "next/link";
import { HiArrowLongRight, HiOutlineSparkles } from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";
import { ScrollAccent } from "@/components/ScrollAccent";
import { ScrollBridge } from "@/components/ScrollBridge";
import { ServiceGrid } from "@/components/ServiceGrid";
import { services, serviceTracks } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web design, web development, backend services, database management, MVP delivery, retail, and ecommerce services from BRANDD Developments.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero page-hero-light section-grid" data-nav-tone="light">
        <MotionReveal className="page-hero-copy">
          <p className="eyebrow">Services</p>
          <h1>Practical digital services for brands that need more than a brochure site.</h1>
          <p>
            From first design direction to complex operational systems, we build
            the parts that let a brand sell, manage, measure, and grow online.
          </p>
        </MotionReveal>
        <MotionReveal className="service-orbit" delay={0.12}>
          {serviceTracks.map((track) => (
            <span key={track}>{track}</span>
          ))}
          <div>
            <HiOutlineSparkles aria-hidden="true" />
            <strong>Connected delivery</strong>
          </div>
        </MotionReveal>
      </section>

      <ScrollBridge tone="dark" label="Design, data, build, launch" variant="reverse-rise" />

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
            <h2>Specialist work that stays connected to the whole customer journey.</h2>
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
              "A focused design and build sprint for a launch date.",
              "A technical partner for a growing ecommerce operation.",
              "A backend and database clean-up for systems that need structure.",
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
