import Link from "next/link";
import {
  HiArrowLongRight,
  HiOutlineBolt,
  HiOutlineCircleStack,
  HiOutlineCubeTransparent,
  HiOutlineDevicePhoneMobile,
  HiOutlineShoppingBag,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";
import { ScrollAccent } from "@/components/ScrollAccent";
import { ScrollBridge } from "@/components/ScrollBridge";
import { ServiceGrid } from "@/components/ServiceGrid";
import { services } from "@/content/site";

const proofPoints = [
  "Brand-led interface systems",
  "Commerce-ready build foundations",
  "Backend flows that scale cleanly",
  "Launch plans shaped around real users",
];

const workflow = [
  {
    title: "Shape the offer",
    copy: "We turn the commercial objective into a clear site map, product flow, feature set, and launch sequence.",
    icon: HiOutlineSquares2X2,
  },
  {
    title: "Design the experience",
    copy: "Interfaces are structured for attention, conversion, repeat use, and the practical work your team handles every day.",
    icon: HiOutlineDevicePhoneMobile,
  },
  {
    title: "Build the system",
    copy: "Frontend, backend, data, ecommerce, and integrations are developed as one connected product rather than separate moving parts.",
    icon: HiOutlineCubeTransparent,
  },
];

export default function Home() {
  return (
    <>
      <section className="hero hero-light section-grid" data-nav-tone="light">
        <div className="hero-copy">
          <MotionReveal>
            <p className="eyebrow">BRANDD Developments</p>
            <h1>Websites, systems, and commerce builds for brands ready to move.</h1>
            <p className="hero-lede">
              We design and develop sharp digital products across web, backend,
              databases, MVPs, retail operations, and ecommerce.
            </p>
            <div className="hero-actions">
              <Link className="button button-dark" href="/services">
                Explore services <HiArrowLongRight aria-hidden="true" />
              </Link>
              <Link className="button button-outline" href="/contact">
                Start a brief
              </Link>
            </div>
          </MotionReveal>
        </div>

        <MotionReveal className="hero-system" delay={0.12}>
          <div className="interface-frame">
            <div className="frame-topline">
              <span />
              <span />
              <span />
              <strong>Live Build System</strong>
            </div>
            <div className="signal-panel signal-panel-primary">
              <HiOutlineBolt aria-hidden="true" />
              <div>
                <span>Design sprint</span>
                <strong>Brand to prototype</strong>
              </div>
            </div>
            <div className="signal-panel">
              <HiOutlineCircleStack aria-hidden="true" />
              <div>
                <span>Data layer</span>
                <strong>Clean structure</strong>
              </div>
            </div>
            <div className="signal-panel">
              <HiOutlineShoppingBag aria-hidden="true" />
              <div>
                <span>Retail stack</span>
                <strong>Launch ready</strong>
              </div>
            </div>
            <div className="interface-grid" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </MotionReveal>

        <ScrollAccent
          className="accent-rail accent-rail-one"
          rotateFrom={-13}
          rotateTo={4}
          xFrom="-4%"
          xTo="5%"
        />
        <ScrollAccent
          className="accent-rail accent-rail-two"
          rotateFrom={16}
          rotateTo={-5}
          xFrom="4%"
          xTo="-4%"
        />
      </section>

      <ScrollBridge
        tone="dark"
        label="From brand idea to working product"
        variant="long-drift"
      />

      <section className="section dark-section overlap-section" data-nav-tone="dark">
        <div className="section-inner two-column">
          <MotionReveal>
            <p className="eyebrow eyebrow-light">Development studio</p>
            <h2 className="studio-title">
              <span>Built for</span>
              <span>the point where</span>
              <span>brand, product,</span>
              <span>and operations</span>
              <span>meet.</span>
            </h2>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <p className="section-copy">
              A good website is rarely just a website. It is a public brand
              surface, a customer journey, a product database, a sales channel,
              and often the front door to the systems behind the business.
            </p>
            <div className="proof-list">
              {proofPoints.map((point) => (
                <span key={point}>{point}</span>
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>

      <ScrollBridge
        tone="light"
        label="Services shaped for connected growth"
        variant="snap-cross"
      />

      <section className="section light-section services-section" data-nav-tone="light">
        <div className="section-inner">
          <MotionReveal className="section-heading">
            <p className="eyebrow">What we build</p>
            <h2>Services shaped around launches, improvements, and long-term growth.</h2>
          </MotionReveal>
          <ServiceGrid items={services} />
        </div>
      </section>

      <ScrollBridge
        tone="dark"
        label="From service scope to build process"
        variant="rise"
      />

      <section className="section dark-section crossover-section" data-nav-tone="dark">
        <div className="section-inner">
          <div className="crossover-card">
            <ScrollAccent
              className="section-accent section-accent-crossover"
              rotateFrom={-11}
              rotateTo={7}
              xFrom="5%"
              xTo="-4%"
              yFrom="6%"
              yTo="-5%"
            />
            <MotionReveal>
              <p className="eyebrow eyebrow-light">Process</p>
              <h2>Clean direction first. Then fast, careful execution.</h2>
            </MotionReveal>
            <div className="workflow-grid">
              {workflow.map((item, index) => {
                const Icon = item.icon;
                return (
                  <MotionReveal
                    className="workflow-item"
                    delay={index * 0.08}
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
        </div>
      </section>
    </>
  );
}
