import Link from "next/link";
import {
  HiArrowLongRight,
  HiOutlineArrowPath,
  HiOutlineChartBarSquare,
  HiOutlineCircleStack,
  HiOutlineClipboardDocumentCheck,
  HiOutlineComputerDesktop,
  HiOutlineCubeTransparent,
  HiOutlineDocumentMagnifyingGlass,
  HiOutlineLockClosed,
  HiOutlineServerStack,
  HiOutlineTableCells,
  HiOutlineWindow,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";
import type { IconType } from "react-icons";
import { LegacyDashboardVisual } from "@/components/LegacyDashboardVisual";
import { MotionReveal } from "@/components/MotionReveal";
import { ScrollAccent } from "@/components/ScrollAccent";
import { ScrollBridge } from "@/components/ScrollBridge";
import { StructuredData } from "@/components/StructuredData";
import { createBreadcrumbJsonLd, createPageMetadata, legacyServiceJsonLd } from "@/content/seo";

export const metadata = createPageMetadata({
  title: "Legacy Systems",
  description:
    "Legacy system rebuilds from Brandd for Microsoft Access databases, old desktop tools, spreadsheet workflows, internal dashboards, and Postgres-backed web apps.",
  path: "/legacy-systems",
  keywords: [
    "legacy system rebuilds",
    "Microsoft Access database rebuild",
    "old desktop software replacement",
    "Postgres web app",
  ],
});

type LegacyCard = {
  title: string;
  copy: string;
  icon: IconType;
};

const fitSignals: LegacyCard[] = [
  {
    title: "No admin rights",
    copy: "The system runs the business, but nobody can safely change users, screens, permissions, or reporting.",
    icon: HiOutlineLockClosed,
  },
  {
    title: "No source code",
    copy: "The original build is locked away, unsupported, or owned by someone who is no longer available.",
    icon: HiOutlineDocumentMagnifyingGlass,
  },
  {
    title: "Trapped data",
    copy: "Customer, order, job, stock, or production records live inside an old database that is hard to query or export.",
    icon: HiOutlineCircleStack,
  },
  {
    title: "Fragile reporting",
    copy: "Important reports depend on manual exports, copied spreadsheets, repeated checks, or one person's workaround.",
    icon: HiOutlineChartBarSquare,
  },
  {
    title: "One-machine workflows",
    copy: "The tool only works on a specific office machine, local network, remote desktop, or patched-together setup.",
    icon: HiOutlineComputerDesktop,
  },
  {
    title: "Staff need familiarity",
    copy: "A full redesign would create risk, so the first version keeps the screens and workflow people already understand.",
    icon: HiOutlineWindow,
  },
];

const processSteps = [
  {
    phase: "Discover",
    title: "Understand the live system",
    copy: "Start with the screens, reports, exceptions, users, permissions, and daily handoffs that already keep the business moving.",
    icon: HiOutlineDocumentMagnifyingGlass,
    steps: ["Audit live workflow", "Map screens, data, and rules"],
  },
  {
    phase: "Rebuild",
    title: "Keep what works, replace the risk",
    copy: "Recreate the familiar flow where it helps staff, then move the core records into a database the business can own and extend.",
    icon: HiOutlineWrenchScrewdriver,
    steps: ["Rebuild the interface", "Move core data to Postgres"],
  },
  {
    phase: "Launch",
    title: "Move over with control",
    copy: "Test the rebuilt workflow with the people who use it, release the first stable version, then improve reporting and automation.",
    icon: HiOutlineArrowPath,
    steps: ["Test with staff", "Launch, support, and improve"],
  },
];

const capabilityLinks = [
  {
    href: "/services",
    title: "Services",
    copy: "Backend logic, databases, dashboards, integrations, automation support, and practical delivery options.",
    icon: HiOutlineWrenchScrewdriver,
  },
  {
    href: "/projects",
    title: "Websites",
    copy: "Public websites, ecommerce platforms, operational dashboards, and product systems with frontend polish.",
    icon: HiOutlineCubeTransparent,
  },
  {
    href: "/mvps",
    title: "Projects",
    copy: "Detailed build breakdowns showing how Brandd handles account logic, upload flows, pricing, and operations.",
    icon: HiOutlineClipboardDocumentCheck,
  },
];

export default function LegacySystemsPage() {
  return (
    <>
      <StructuredData
        data={[
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Legacy Systems", path: "/legacy-systems" },
          ]),
          legacyServiceJsonLd,
        ]}
      />
      <section className="page-hero page-hero-dark section-grid legacy-hero" data-nav-tone="dark">
        <MotionReveal className="page-hero-copy legacy-hero-copy">
          <p className="eyebrow eyebrow-light">Legacy Systems</p>
          <h1>Legacy systems rebuilt as modern web apps.</h1>
          <p>
            For businesses stuck with Microsoft Access databases, old desktop
            software, spreadsheet-led admin, or unsupported internal tools.
            Keep the workflow people know. Lose the lock-in holding the
            business back.
          </p>
          <div className="hero-actions">
            <Link className="button button-light" href="/contact">
              Discuss a rebuild <HiArrowLongRight aria-hidden="true" />
            </Link>
            <Link className="button button-outline" href="/services">
              See supporting services
            </Link>
          </div>
        </MotionReveal>
        <MotionReveal className="legacy-hero-visual" delay={0.12}>
          <LegacyDashboardVisual />
        </MotionReveal>
      </section>

      <ScrollBridge tone="light" label="From locked software to controlled system" variant="snap-cross" />

      <section className="section light-section legacy-fit-section" data-nav-tone="light">
        <div className="section-inner">
          <ScrollAccent
            className="section-accent section-accent-legacy"
            rotateFrom={8}
            rotateTo={-7}
            xFrom="-5%"
            xTo="4%"
            yFrom="4%"
            yTo="-5%"
          />
          <MotionReveal className="section-heading">
            <p className="eyebrow">When this fits</p>
            <h2>Useful when the old tool still matters, but the business has outgrown the risk.</h2>
          </MotionReveal>
          <div className="legacy-fit-grid">
            {fitSignals.map((item, index) => {
              const Icon = item.icon;
              return (
                <MotionReveal
                  as="article"
                  className="legacy-fit-card"
                  delay={index * 0.06}
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

      <ScrollBridge tone="dark" label="Anonymised project story" variant="rise" />

      <section className="section dark-section legacy-story-section" data-nav-tone="dark">
        <div className="section-inner legacy-story-layout">
          <MotionReveal className="legacy-story-copy">
            <p className="eyebrow eyebrow-light">Anonymised project story</p>
            <h2>From locked Microsoft Access database to browser-based production hub.</h2>
            <p className="section-copy">
              A client had an old database and UI they depended on every day,
              but they had no admin rights and no code access. Brandd rebuilt
              the working flow as a web-based dashboard backed by Postgres,
              keeping familiar legacy styling where it helped staff move over
              confidently.
            </p>
          </MotionReveal>
          <MotionReveal className="legacy-story-panel" delay={0.1}>
            <div className="legacy-before-after">
              <article>
                <HiOutlineTableCells aria-hidden="true" />
                <span>Before</span>
                <strong>Locked Access database</strong>
                <p>Daily operations tied to a fragile legacy setup.</p>
              </article>
              <article>
                <HiOutlineServerStack aria-hidden="true" />
                <span>After</span>
                <strong>Owned web system</strong>
                <p>Same operational flow rebuilt on maintainable foundations.</p>
              </article>
            </div>
            <LegacyDashboardVisual />
          </MotionReveal>
        </div>
      </section>

      <section className="section light-section legacy-process-section" data-nav-tone="light">
        <div className="section-inner legacy-process-layout">
          <MotionReveal className="section-heading">
            <p className="eyebrow">Process</p>
            <h2>Modernise the system without throwing away the way the team works.</h2>
          </MotionReveal>
          <div className="legacy-process-map">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <MotionReveal as="article" delay={index * 0.08} key={step.title}>
                  <div className="legacy-process-card-top">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <p className="legacy-process-phase">{step.phase}</p>
                  <div className="legacy-process-copy">
                    <strong>{step.title}</strong>
                    <p>{step.copy}</p>
                  </div>
                  <div className="legacy-process-steps">
                    {step.steps.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section dark-section legacy-capability-section" data-nav-tone="dark">
        <div className="section-inner">
          <MotionReveal className="section-heading">
            <p className="eyebrow eyebrow-light">Still Brandd</p>
            <h2>Legacy rebuilds connect into the wider websites, services, and project work.</h2>
          </MotionReveal>
          <div className="legacy-capability-grid">
            {capabilityLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <MotionReveal
                  as="article"
                  className="legacy-capability-card"
                  delay={index * 0.08}
                  key={item.href}
                >
                  <Icon aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <Link href={item.href}>
                    Open {item.title} <HiArrowLongRight aria-hidden="true" />
                  </Link>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section light-section compact-cta legacy-cta-section" data-nav-tone="light">
        <div className="section-inner cta-row">
          <MotionReveal>
            <p className="eyebrow">Start with the old system</p>
            <h2>Show us what the business relies on now. We will map what it should become.</h2>
          </MotionReveal>
          <Link className="button button-dark" href="/contact">
            Start a legacy rebuild <HiArrowLongRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
