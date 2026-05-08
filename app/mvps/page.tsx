import type { Metadata } from "next";
import Link from "next/link";
import {
  HiArrowLongRight,
  HiOutlineCheckBadge,
  HiOutlineCursorArrowRays,
  HiOutlineRocketLaunch,
  HiOutlineSquares2X2,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";
import { ScrollAccent } from "@/components/ScrollAccent";
import { ScrollBridge } from "@/components/ScrollBridge";

export const metadata: Metadata = {
  title: "MVP's",
  description:
    "One-off project builds and version-one MVP design and development from BRANDD Developments.",
};

const buildTypes = [
  {
    title: "Single Project Builds",
    copy: "A defined digital product, campaign platform, tool, or storefront delivered with a clear scope and launch target.",
    icon: HiOutlineSquares2X2,
  },
  {
    title: "Version-One MVPs",
    copy: "A focused first release that proves the offer, captures users, and creates the technical base for what comes next.",
    icon: HiOutlineRocketLaunch,
  },
  {
    title: "Product Experiments",
    copy: "Lean customer journeys, booking flows, calculators, portals, dashboards, and commerce pilots built for real feedback.",
    icon: HiOutlineCursorArrowRays,
  },
];

const deliverySteps = [
  "Define the outcome, audience, offer, and must-have feature set.",
  "Design the user journey and interface around the first commercial test.",
  "Build the frontend, backend, data structure, and integrations needed for launch.",
  "Release a version-one product with a practical improvement path.",
];

export default function MvpsPage() {
  return (
    <>
      <section className="page-hero page-hero-dark section-grid" data-nav-tone="dark">
        <MotionReveal className="page-hero-copy">
          <p className="eyebrow eyebrow-light">MVP&apos;s</p>
          <h1>One-off builds and version-one products for ideas ready to move.</h1>
          <p>
            We turn focused briefs into useful first releases: sharp enough to
            launch, strong enough to learn from, and structured enough to grow.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/contact">
              Scope an MVP <HiArrowLongRight aria-hidden="true" />
            </Link>
            <Link className="button button-outline" href="/projects">
              View project types
            </Link>
          </div>
        </MotionReveal>

        <MotionReveal className="about-mark mvp-mark" delay={0.12}>
          <span>Design</span>
          <span>Build</span>
          <span>Launch</span>
          <span>Learn</span>
        </MotionReveal>
      </section>

      <ScrollBridge
        tone="dark"
        label="Focused scope with launch momentum"
        variant="rise"
      />

      <section className="section dark-section" data-nav-tone="dark">
        <div className="section-inner">
          <ScrollAccent
            className="section-accent section-accent-mvps"
            rotateFrom={10}
            rotateTo={-9}
            xFrom="-5%"
            xTo="4%"
            yFrom="5%"
            yTo="-4%"
          />
          <MotionReveal className="section-heading">
            <p className="eyebrow eyebrow-light">What this is for</p>
            <h2>When the brief needs a real product, not months of theory.</h2>
          </MotionReveal>
          <div className="principle-grid">
            {buildTypes.map((item, index) => {
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

      <ScrollBridge
        tone="light"
        label="From first release to next decision"
        variant="snap-cross"
      />

      <section className="section light-section" data-nav-tone="light">
        <div className="section-inner two-column">
          <MotionReveal>
            <p className="eyebrow">Delivery shape</p>
            <h2>A direct path from idea to usable version one.</h2>
          </MotionReveal>
          <div className="engagement-list">
            {deliverySteps.map((item, index) => (
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
            <p className="eyebrow eyebrow-light">Ready to test</p>
            <h2>Bring the idea, the deadline, or the first customer problem.</h2>
          </MotionReveal>
          <Link className="button button-light" href="/contact">
            Start the build <HiOutlineCheckBadge aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
