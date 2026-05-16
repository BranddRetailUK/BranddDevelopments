import type { Metadata } from "next";
import Link from "next/link";
import {
  HiArrowLongRight,
  HiOutlineChartBarSquare,
  HiOutlineCpuChip,
  HiOutlineShoppingCart,
  HiOutlineSquares2X2,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";
import { ScrollAccent } from "@/components/ScrollAccent";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Project formats from Brandd across ecommerce, campaign websites, dashboards, and MVP platforms.",
};

const projectTypes = [
  {
    title: "Creator-commerce platforms",
    copy: "For brands that need accounts, product tools, subscriptions, creator stores, revenue logic and fulfilment flows.",
    icon: HiOutlineShoppingCart,
  },
  {
    title: "Operational Dashboards",
    copy: "For teams managing products, orders, stock, customer records, production jobs, uploads, reporting or internal processes.",
    icon: HiOutlineChartBarSquare,
  },
  {
    title: "MVP platforms",
    copy: "For ideas that need a working version one with real users, real data and a clear path to improvement.",
    icon: HiOutlineCpuChip,
  },
  {
    title: "Ecommerce systems",
    copy: "For brands selling products, managing catalogues, improving checkout journeys or connecting stores to fulfilment processes.",
    icon: HiOutlineSquares2X2,
  },
  {
    title: "Business process tools",
    copy: "For companies still relying on manual admin, spreadsheets, disconnected apps or repeated internal tasks.",
    icon: HiOutlineWrenchScrewdriver,
  },
];

export default function ProjectsPage() {
  return (
    <>
      <section className="page-hero page-hero-dark section-grid projects-hero" data-nav-tone="dark">
        <MotionReveal className="page-hero-copy">
          <p className="eyebrow eyebrow-light">Projects</p>
          <h1>Real builds for brands that need the website, the product and the system behind it.</h1>
          <p>
            Brandd works on digital projects where design, development and
            operations meet: public websites, ecommerce platforms, internal
            dashboards, MVPs, backend services, database systems, upload tools,
            production workflows and integrations.
          </p>
        </MotionReveal>
        <MotionReveal className="project-stack" delay={0.12}>
          {projectTypes.slice(0, 3).map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title}>
                <Icon aria-hidden="true" />
                <span>{item.title}</span>
              </article>
            );
          })}
        </MotionReveal>
      </section>

      <section className="section light-section" data-nav-tone="light">
        <div className="section-inner">
          <ScrollAccent
            className="section-accent section-accent-projects"
            rotateFrom={9}
            rotateTo={-8}
            xFrom="-5%"
            xTo="4%"
            yFrom="5%"
            yTo="-4%"
          />
          <MotionReveal className="section-heading">
            <p className="eyebrow">Project types</p>
            <h2>Every build is shaped around a commercial job, a user flow, and the system that has to support it.</h2>
          </MotionReveal>
          <div className="project-grid">
            {projectTypes.map((item, index) => {
              const Icon = item.icon;
              return (
                <MotionReveal
                  className="project-card"
                  delay={index * 0.07}
                  key={item.title}
                >
                  <div className="card-icon">
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section dark-section compact-cta" data-nav-tone="dark">
        <div className="section-inner cta-row">
          <MotionReveal>
            <p className="eyebrow eyebrow-light">Next build</p>
            <h2>Bring the idea, the target, or the messy system.</h2>
          </MotionReveal>
          <Link className="button button-light" href="/contact">
            Plan a project <HiArrowLongRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
