import type { Metadata } from "next";
import Link from "next/link";
import {
  HiArrowLongRight,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineCommandLine,
  HiOutlinePresentationChartLine,
} from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";
import { ScrollAccent } from "@/components/ScrollAccent";
import { ScrollBridge } from "@/components/ScrollBridge";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "BRANDD Developments is a practical web design and development studio for brand-led businesses.",
};

const principles = [
  {
    title: "Brand before interface",
    copy: "The product should feel unmistakably connected to the business behind it.",
    icon: HiOutlinePresentationChartLine,
  },
  {
    title: "Systems before shortcuts",
    copy: "Strong structures make content, orders, customers, and operations easier to manage later.",
    icon: HiOutlineCommandLine,
  },
  {
    title: "Momentum with control",
    copy: "Fast work still needs clean decisions, careful sequencing, and technical discipline.",
    icon: HiOutlineAdjustmentsHorizontal,
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero page-hero-dark section-grid" data-nav-tone="dark">
        <MotionReveal className="page-hero-copy">
          <p className="eyebrow eyebrow-light">About us</p>
          <h1>A development partner for brand-led businesses with real operational needs.</h1>
          <p>
            BRANDD Developments sits between creative direction and technical
            execution, building digital products that feel considered from the
            first visit to the final workflow.
          </p>
        </MotionReveal>
        <MotionReveal className="about-mark" delay={0.12}>
          <span>Design</span>
          <span>Build</span>
          <span>Manage</span>
          <span>Improve</span>
        </MotionReveal>
      </section>

      <ScrollBridge
        tone="light"
        label="Creative standards with technical depth"
        variant="long-drift"
      />

      <section className="section light-section" data-nav-tone="light">
        <div className="section-inner two-column">
          <MotionReveal>
            <p className="eyebrow">Position</p>
            <h2>We build the digital layer a modern brand relies on.</h2>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <p className="section-copy dark-copy">
              The work can begin as a new website, a retail idea, a data issue,
              a backend requirement, or an MVP that needs to become real. The
              standard stays the same: make it clear, make it useful, make it
              strong enough to carry the next stage.
            </p>
          </MotionReveal>
        </div>
      </section>

      <section className="section dark-section" data-nav-tone="dark">
        <div className="section-inner">
          <ScrollAccent
            className="section-accent section-accent-about"
            rotateFrom={12}
            rotateTo={-10}
            xFrom="-5%"
            xTo="4%"
            yFrom="6%"
            yTo="-4%"
          />
          <MotionReveal className="section-heading">
            <p className="eyebrow eyebrow-light">Principles</p>
            <h2>The way we approach every build.</h2>
          </MotionReveal>
          <div className="principle-grid">
            {principles.map((item, index) => {
              const Icon = item.icon;
              return (
                <MotionReveal
                  className="principle-card"
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

      <section className="section light-section compact-cta" data-nav-tone="light">
        <div className="section-inner cta-row">
          <MotionReveal>
            <p className="eyebrow">Work with us</p>
            <h2>Tell us where the brand needs to go next.</h2>
          </MotionReveal>
          <Link className="button button-dark" href="/contact">
            Start the conversation <HiArrowLongRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
