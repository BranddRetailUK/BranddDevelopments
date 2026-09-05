import Link from "next/link";
import {
  HiArrowLongRight,
  HiOutlineArrowPath,
  HiOutlineChartBarSquare,
  HiOutlineCircleStack,
  HiOutlineComputerDesktop,
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
import { StructuredData } from "@/components/StructuredData";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  legacyServiceJsonLd,
} from "@/content/seo";

export const metadata = createPageMetadata({
  title: "Legacy Systems",
  description:
    "Replace old Access databases and business software with maintainable web apps. Brandd plans the rebuild, data move and support around your team.",
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
    title: "Tied to one machine",
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
    steps: ["Review daily tasks", "Map screens, data, and rules"],
  },
  {
    phase: "Rebuild",
    title: "Rebuild the working process",
    copy: "Recreate familiar screens where they help staff, then migrate the records and check them against the original system.",
    icon: HiOutlineWrenchScrewdriver,
    steps: ["Rebuild the interface", "Migrate and check records"],
  },
  {
    phase: "Launch",
    title: "Test before the move",
    copy: "Test the rebuilt workflow with the people who use it, release the first stable version, then improve reporting and automation.",
    icon: HiOutlineArrowPath,
    steps: ["Test with staff", "Launch, support, and improve"],
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
      <section
        className="page-hero page-hero-dark section-grid legacy-hero"
        data-nav-tone="dark"
      >
        <MotionReveal className="page-hero-copy legacy-hero-copy">
          <p className="eyebrow eyebrow-light">Legacy Systems</p>
          <h1>Legacy systems rebuilt as modern web apps.</h1>
          <p>
            Replace Microsoft Access databases, old desktop software and
            spreadsheet workarounds with a web app. Keep the workflow your team
            knows, with a planned move away from unsupported tools.
          </p>
          <div className="hero-actions">
            <Link className="button button-light" href="/contact">
              Discuss a rebuild <HiArrowLongRight aria-hidden="true" />
            </Link>
            <Link className="button button-outline" href="/services">
              Explore our services
            </Link>
          </div>
        </MotionReveal>
        <MotionReveal className="legacy-hero-visual" delay={0.12}>
          <LegacyDashboardVisual />
          <p className="visual-caption">
            A browser-based rebuild that keeps familiar screens for staff.
            Example records shown.
          </p>
        </MotionReveal>
      </section>

      <section
        className="section light-section legacy-fit-section"
        data-nav-tone="light"
      >
        <div className="section-inner">
          <MotionReveal className="section-heading">
            <p className="eyebrow">When this fits</p>
            <h2>Signs your current system needs replacing.</h2>
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

      <section
        id="project"
        className="section dark-section legacy-story-section"
        data-nav-tone="dark"
      >
        <div className="section-inner legacy-story-layout">
          <MotionReveal className="legacy-story-copy">
            <p className="eyebrow eyebrow-light">An Access production system</p>
            <h2>
              From an Access database to a browser-based production dashboard.
            </h2>
            <p className="section-copy">
              A client relied on an old database and screens every day, but had
              no admin rights or access to the code. Brandd rebuilt the workflow
              as a web dashboard backed by Postgres. It keeps familiar screens
              for staff while running in a browser.
            </p>
          </MotionReveal>
          <MotionReveal className="legacy-story-panel" delay={0.1}>
            <div className="legacy-before-after">
              <article>
                <HiOutlineTableCells aria-hidden="true" />
                <span>Before</span>
                <strong>Locked Access database</strong>
                <p>An Access database with no admin or code access.</p>
              </article>
              <article>
                <HiOutlineServerStack aria-hidden="true" />
                <span>After</span>
                <strong>Browser-based dashboard</strong>
                <p>The production workflow rebuilt as a web app.</p>
              </article>
            </div>
            <p className="visual-caption">
              Client details are withheld. The preview above uses example
              records.
            </p>
          </MotionReveal>
        </div>
      </section>

      <section
        className="section light-section legacy-process-section"
        data-nav-tone="light"
      >
        <div className="section-inner legacy-process-layout">
          <MotionReveal className="section-heading">
            <p className="eyebrow">Process</p>
            <h2>Plan the move around your team.</h2>
          </MotionReveal>
          <div className="legacy-process-map">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <MotionReveal
                  as="article"
                  delay={index * 0.08}
                  key={step.title}
                >
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

      <section
        className="section dark-section project-faq-section"
        data-nav-tone="dark"
      >
        <div className="section-inner">
          <MotionReveal className="section-heading">
            <h2>What we work through with you.</h2>
          </MotionReveal>
          <div className="project-faq-grid">
            <article>
              <h3>Access and data</h3>
              <p>
                We assess the screens, records and exports available before
                agreeing the rebuild. The plan includes checking data during the
                move.
              </p>
            </article>
            <article>
              <h3>Testing with staff</h3>
              <p>
                We review the daily tasks and exceptions with the people using
                the system, then plan the switch around the work they need to
                keep doing.
              </p>
            </article>
            <article>
              <h3>Access and ongoing support</h3>
              <p>
                The project agreement sets out source-code access, hosting and
                data arrangements. Ongoing support and management are available
                where required.
              </p>
            </article>
          </div>
          <Link className="text-link" href="/services#integrations">
            Need to connect the system to other tools?{" "}
            <HiArrowLongRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section
        className="section light-section compact-cta legacy-cta-section"
        data-nav-tone="light"
      >
        <div className="section-inner cta-row">
          <MotionReveal>
            <p className="eyebrow">Start with the old system</p>
            <h2>Show us the system your business relies on.</h2>
          </MotionReveal>
          <Link className="button button-dark" href="/contact">
            Discuss a rebuild <HiArrowLongRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
