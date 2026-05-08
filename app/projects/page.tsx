import type { Metadata } from "next";
import Link from "next/link";
import {
  HiArrowLongRight,
  HiOutlineChartBarSquare,
  HiOutlineCpuChip,
  HiOutlineMegaphone,
  HiOutlineShoppingCart,
} from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";
import { ScrollAccent } from "@/components/ScrollAccent";
import { ScrollBridge } from "@/components/ScrollBridge";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Project formats from BRANDD Developments across ecommerce, campaign websites, dashboards, and MVP platforms.",
};

const projectTypes = [
  {
    title: "Commerce Launch Systems",
    copy: "Storefronts, product structures, payment journeys, collection logic, and the operational details needed to sell cleanly from day one.",
    icon: HiOutlineShoppingCart,
    tags: ["Ecommerce", "Retail", "Checkout"],
  },
  {
    title: "Operational Dashboards",
    copy: "Internal tools that make stock, orders, customers, content, fulfilment, and reporting easier to manage without adding friction.",
    icon: HiOutlineChartBarSquare,
    tags: ["Data", "Admin", "Automation"],
  },
  {
    title: "Campaign Websites",
    copy: "High-impact public pages for launches, partnerships, collections, events, and brand moments that need a strong first impression.",
    icon: HiOutlineMegaphone,
    tags: ["Design", "Frontend", "Content"],
  },
  {
    title: "MVP Product Platforms",
    copy: "Focused digital products that validate a model, onboard users, capture demand, and create a technical base for the next stage.",
    icon: HiOutlineCpuChip,
    tags: ["MVP", "Backend", "Scale"],
  },
];

export default function ProjectsPage() {
  return (
    <>
      <section className="page-hero page-hero-dark section-grid" data-nav-tone="dark">
        <MotionReveal className="page-hero-copy">
          <p className="eyebrow eyebrow-light">Projects</p>
          <h1>Digital builds designed to look sharp and work under pressure.</h1>
          <p>
            We create the public-facing experiences and behind-the-scenes
            systems that help brands launch, sell, manage, and improve.
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

      <ScrollBridge
        tone="light"
        label="Project formats with connected delivery"
        variant="sweep-left"
      />

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
            <h2>Every build is shaped around a commercial job, not a template.</h2>
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
                  <div className="tag-row">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
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
