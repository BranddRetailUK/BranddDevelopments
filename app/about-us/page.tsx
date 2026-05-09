import type { Metadata } from "next";
import Link from "next/link";
import {
  HiArrowLongRight,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineChartBarSquare,
  HiOutlineCommandLine,
  HiOutlinePresentationChartLine,
} from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";
import { ScrollAccent } from "@/components/ScrollAccent";
import { ScrollBridge } from "@/components/ScrollBridge";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Brandd is a practical web design and development studio for brand-led businesses.",
};

const principles = [
  {
    title: "Brand-led, system-minded",
    copy: "The product should look like it belongs to the brand and work like it belongs to the business.",
    icon: HiOutlinePresentationChartLine,
  },
  {
    title: "Useful before flashy",
    copy: "Every page, dashboard and workflow should help the user do something clearly.",
    icon: HiOutlineCommandLine,
  },
  {
    title: "Built for the next stage",
    copy: "The first version should be clean enough to launch and structured enough to improve.",
    icon: HiOutlineAdjustmentsHorizontal,
  },
  {
    title: "Commercially grounded",
    copy: "We build around the real outcome: more sales, cleaner operations, better customer experience, stronger reporting or faster delivery.",
    icon: HiOutlineChartBarSquare,
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero page-hero-dark section-grid" data-nav-tone="dark">
        <MotionReveal className="page-hero-copy">
          <p className="eyebrow eyebrow-light">About us</p>
          <h1>Brandd builds the digital systems behind ambitious brands.</h1>
          <p>
            We work where design, development and operations overlap. That
            means polished public websites, but also the backend services,
            databases, dashboards, integrations and workflow tools that keep a
            business moving after the first click.
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
            <h2>For founders, operators and growing brands that have outgrown simple websites and off-the-shelf tools.</h2>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <p className="section-copy dark-copy">
              We help shape the offer, design the user journey, build the
              system and connect the moving parts. The work can be a new
              storefront, a product creator, a customer portal, an MVP, a
              stock-management tool, a dashboard, a QR tracking flow or a
              custom integration between the tools your team already uses.
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
