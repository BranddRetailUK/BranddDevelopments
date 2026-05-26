import Link from "next/link";
import {
  HiArrowLongRight,
  HiArrowTopRightOnSquare,
  HiOutlineCubeTransparent,
  HiOutlineDevicePhoneMobile,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";
import { MvpProductVisual } from "@/components/MvpProductVisual";
import { ScrollAccent } from "@/components/ScrollAccent";
import { ScrollBridge } from "@/components/ScrollBridge";
import { ServiceGrid } from "@/components/ServiceGrid";
import { mvpShowcases, services } from "@/content/site";

const proofPoints = [
  "Brand-led frontend UI/UX",
  "Database-backed product systems",
  "Business integrations and automations",
  "Ecommerce operations that connect cleanly",
];

const workflow = [
  {
    title: "Shape the offer",
    copy: "We turn the commercial objective into a clear user journey, feature set, system shape, and launch sequence.",
    icon: HiOutlineSquares2X2,
  },
  {
    title: "Design the experience",
    copy: "Interfaces are structured around what users need to understand first, where they click next, and what the business needs to manage.",
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
      <section className="hero hero-light" data-nav-tone="light">
        <div className="hero-copy">
          <MotionReveal>
            <p className="eyebrow">Brandd</p>
            <h1>Create sharp, functional websites and digital services.</h1>
            <p className="hero-lede">
              We build modern, animated websites, ecommerce experiences and
              business tools for growing brands. The kind of polished,
              high-end web experience that used to need a much bigger budget is
              now within reach at a sensible price.
            </p>
            <div className="hero-actions">
              <Link className="button button-dark" href="/contact">
                Start a project <HiArrowLongRight aria-hidden="true" />
              </Link>
              <Link className="button button-outline" href="/services">
                View what we build
              </Link>
            </div>
          </MotionReveal>
        </div>

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
              <span>Digital products</span>
              <span>with frontend,</span>
              <span>backend, and</span>
              <span>operations</span>
              <span>built in.</span>
            </h2>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <p className="section-copy">
              A website is usually only one part of the job. Behind the public
              interface there may be customer accounts, product data, order
              flows, stock logic, payment journeys, admin dashboards, API
              integrations, reporting tools, and internal processes that need to
              work together.
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
            <h2>Digital products with the front end, backend and operational thinking built in.</h2>
          </MotionReveal>
          <ServiceGrid items={services} />
        </div>
      </section>

      <ScrollBridge
        tone="dark"
        label="Projects built for real users and workflows"
        variant="rise"
      />

      <section className="section dark-section mvp-showcase-section" data-nav-tone="dark">
        <div className="section-inner">
          <ScrollAccent
            className="section-accent section-accent-mvp-showcase"
            rotateFrom={-9}
            rotateTo={8}
            xFrom="5%"
            xTo="-4%"
            yFrom="-4%"
            yTo="5%"
          />
          <MotionReveal className="section-heading">
            <p className="eyebrow eyebrow-light">Project showcase</p>
            <h2>Version-one products with account logic, upload flows, pricing rules, and real operational shape.</h2>
          </MotionReveal>
          <div className="mvp-showcase-grid">
            {mvpShowcases.map((product, index) => (
              <MotionReveal
                className={`mvp-showcase-card mvp-${product.slug}`}
                delay={index * 0.08}
                key={product.name}
              >
                <div className="mvp-card-copy">
                  <p className="eyebrow eyebrow-light">{product.eyebrow}</p>
                  <h3>{product.name}</h3>
                  <p>{product.shortCopy}</p>
                  <ul>
                    {product.features.slice(0, 3).map((feature) => (
                      <li key={feature.title}>{feature.title}</li>
                    ))}
                  </ul>
                  <a
                    className="button button-light"
                    href={product.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Open {product.name} <HiArrowTopRightOnSquare aria-hidden="true" />
                  </a>
                </div>
                <MvpProductVisual slug={product.slug} />
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollBridge
        tone="light"
        label="From service scope to build process"
        variant="snap-cross"
      />

      <section className="section light-section crossover-section" data-nav-tone="light">
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
              <p className="eyebrow">Process</p>
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
