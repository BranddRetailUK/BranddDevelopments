import Link from "next/link";
import {
  HiArrowLongRight,
  HiOutlineChartBarSquare,
  HiOutlineCodeBracketSquare,
  HiOutlineComputerDesktop,
  HiOutlineCubeTransparent,
  HiOutlineServerStack,
  HiOutlineTableCells,
} from "react-icons/hi2";
import { SiDiscord, SiShopify } from "react-icons/si";
import type { IconType } from "react-icons";
import { LegacyDashboardVisual } from "@/components/LegacyDashboardVisual";
import { MotionReveal } from "@/components/MotionReveal";
import { ScrollAccent } from "@/components/ScrollAccent";
import { ServiceGrid } from "@/components/ServiceGrid";
import { StructuredData } from "@/components/StructuredData";
import { services } from "@/content/site";
import { createBreadcrumbJsonLd, createPageMetadata, servicesJsonLd } from "@/content/seo";

type ServiceSpotlight = {
  slug: string;
  navTone: "light" | "dark";
  eyebrow: string;
  title: string;
  copy: string;
  icon: IconType;
  highlights: string[];
  workflow: string[];
  metrics: Array<{
    label: string;
    value: string;
  }>;
};

const websiteServicePoints: Array<{
  title: string;
  copy: string;
  icon: IconType;
}> = [
  {
    title: "Brand-led UI/UX",
    copy: "Clear page structure, responsive layouts, launch pages, product journeys, and interfaces shaped around what users need first.",
    icon: HiOutlineComputerDesktop,
  },
  {
    title: "Frontend development",
    copy: "Fast Next.js builds with reusable components, polished animation, clean content systems, and practical responsive behaviour.",
    icon: HiOutlineCodeBracketSquare,
  },
  {
    title: "Backend and data support",
    copy: "Forms, accounts, dashboards, product data, order flows, API integrations, and admin tools when the website needs to do more.",
    icon: HiOutlineCubeTransparent,
  },
];

const websiteWorkflow = ["Position", "Design", "Build", "Connect"];

const serviceSpotlights: ServiceSpotlight[] = [
  {
    slug: "shopify",
    navTone: "dark",
    eyebrow: "Shopify app building",
    title: "Shopify apps that handle the operation behind the store.",
    copy:
      "Private apps and store extensions for the jobs theme code cannot cover alone: product rules, fulfilment flows, creator products, admin actions, and external services.",
    icon: SiShopify,
    highlights: [
      "Private admin apps",
      "Storefront extensions",
      "Product and order logic",
      "Webhook automations",
    ],
    workflow: ["Store event", "App logic", "Admin action", "Customer outcome"],
    metrics: [
      { label: "Connects", value: "Products, orders, customers" },
      { label: "Built for", value: "Shopify operations" },
      { label: "Useful when", value: "Theme code is not enough" },
    ],
  },
  {
    slug: "discord",
    navTone: "dark",
    eyebrow: "Discord bot building",
    title: "Discord bots for communities, support, and commerce flows.",
    copy:
      "Custom bots for role automation, support queues, store alerts, creator rewards, slash commands, moderation workflows, and dashboard-connected community tools.",
    icon: SiDiscord,
    highlights: [
      "Role automation",
      "Slash commands",
      "Store and order alerts",
      "Creator rewards",
    ],
    workflow: ["Member action", "Bot command", "Store or dashboard", "Role, alert, or report"],
    metrics: [
      { label: "Connects", value: "Discord, Shopify, Stripe, data" },
      { label: "Built for", value: "Communities and support" },
      { label: "Useful when", value: "Manual server work grows" },
    ],
  },
  {
    slug: "portals",
    navTone: "light",
    eyebrow: "Customer portals & dashboards",
    title: "Portals and dashboards that give users the right control.",
    copy:
      "Account areas for customers, creators, staff, or clients with order history, downloads, project status, subscriptions, reports, permissions, and admin controls.",
    icon: HiOutlineChartBarSquare,
    highlights: [
      "Customer accounts",
      "Admin dashboards",
      "Reports and exports",
      "Order and project status",
    ],
    workflow: ["Sign in", "View status", "Take action", "Track outcome"],
    metrics: [
      { label: "Connects", value: "Users, orders, jobs, reports" },
      { label: "Built for", value: "Self-serve workflows" },
      { label: "Useful when", value: "Support needs structure" },
    ],
  },
];

const hiddenServiceAreaTitles = new Set(["Frontend Development", "MVP Design & Build"]);
const serviceAreaServices = services.filter((service) => !hiddenServiceAreaTitles.has(service.title));

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "Legacy system rebuilds, UI/UX, frontend development, backend services, databases, ecommerce systems, Shopify apps, Discord bots, MVP delivery, and business integrations from Brandd.",
  path: "/services",
  keywords: [
    "digital services",
    "website design",
    "legacy system rebuilds",
    "Shopify app development",
    "customer portals",
    "business integrations",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <StructuredData
        data={[
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          servicesJsonLd,
        ]}
      />
      <section className="section dark-section services-service-area-section" data-nav-tone="dark">
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
            <h1>Digital services for websites that need to do more.</h1>
            <p className="section-copy">
              Brandd brings together design, frontend, backend, data, commerce
              and integrations so the site works as part of the business.
            </p>
          </MotionReveal>
          <ServiceGrid items={serviceAreaServices} />
        </div>
      </section>

      <section className="section dark-section services-legacy-priority-section" data-nav-tone="dark">
        <div className="section-inner services-legacy-layout">
          <MotionReveal className="services-legacy-copy">
            <p className="eyebrow eyebrow-light">Priority service</p>
            <h2>Legacy systems rebuilt into owned web apps.</h2>
            <p>
              For businesses relying on Microsoft Access databases, old desktop
              software, spreadsheet-led operations, or unsupported internal
              dashboards. Brandd keeps the workflow people understand and moves
              the risk into a maintainable web system with owned data.
            </p>
            <Link className="button button-light" href="/legacy-systems">
              Explore legacy rebuilds <HiArrowLongRight aria-hidden="true" />
            </Link>
          </MotionReveal>

          <MotionReveal className="services-legacy-panel" delay={0.1}>
            <div className="legacy-before-after services-legacy-proof">
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

      <section className="section light-section services-websites-section" data-nav-tone="light">
        <div className="section-inner services-websites-layout">
          <MotionReveal className="services-websites-copy">
            <p className="eyebrow">Website design and development</p>
            <h2>Sharp websites with the system thinking behind them.</h2>
            <p>
              Website work can stay focused on a launch, campaign, or redesign,
              or expand into customer accounts, product data, order flows,
              dashboards, and integrations when the business needs more than a
              brochure site.
            </p>
            <div className="services-website-cards">
              {websiteServicePoints.map((item, index) => {
                const Icon = item.icon;

                return (
                  <MotionReveal
                    as="article"
                    className="services-website-card"
                    delay={index * 0.06}
                    key={item.title}
                  >
                    <Icon aria-hidden="true" />
                    <strong>{item.title}</strong>
                    <p>{item.copy}</p>
                  </MotionReveal>
                );
              })}
            </div>
          </MotionReveal>

          <MotionReveal className="services-website-panel" delay={0.08}>
            <div className="services-website-browser-bar">
              <span />
              <span />
              <span />
              <strong>brandd.co.uk/build-plan</strong>
            </div>
            <ol className="services-website-flow">
              {websiteWorkflow.map((step, index) => (
                <li key={step}>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  {step}
                </li>
              ))}
            </ol>
            <div className="services-website-preview">
              <div>
                <span>Public site</span>
                <strong>Clear pages, fast journeys, polished UI.</strong>
              </div>
              <div>
                <span>Business layer</span>
                <strong>Forms, data, dashboards, and integrations.</strong>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="section dark-section compact-cta services-requirements-cta" data-nav-tone="dark">
        <div className="section-inner cta-row">
          <MotionReveal>
            <p className="eyebrow eyebrow-light">Ready to scope it</p>
            <h2>Bring the current workflow, website goal, or operational problem.</h2>
          </MotionReveal>
          <Link className="button button-light" href="/contact">
            Discuss your requirements <HiArrowLongRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      {serviceSpotlights.map((spotlight, index) => {
        const Icon = spotlight.icon;

        return (
          <section
            className={`section service-theme-section service-theme-${spotlight.slug}${
              index % 2 === 1 ? " service-theme-reverse" : ""
            }`}
            data-nav-tone={spotlight.navTone}
            key={spotlight.slug}
          >
            <div className="section-inner service-theme-layout">
              <MotionReveal className="service-theme-copy">
                <span className="service-theme-icon">
                  <Icon aria-hidden="true" />
                </span>
                <p className="eyebrow service-theme-eyebrow">{spotlight.eyebrow}</p>
                <h2>{spotlight.title}</h2>
                <p>{spotlight.copy}</p>
                <Link className="service-theme-link" href="/contact">
                  Talk to us about this <HiArrowLongRight aria-hidden="true" />
                </Link>
              </MotionReveal>

              <MotionReveal className="service-theme-panel" delay={0.08}>
                <div className="service-theme-panel-top">
                  <span>{spotlight.eyebrow}</span>
                  <strong>Build map</strong>
                </div>
                <ol className="service-theme-flow">
                  {spotlight.workflow.map((step, stepIndex) => (
                    <li key={step}>
                      <small>{String(stepIndex + 1).padStart(2, "0")}</small>
                      {step}
                    </li>
                  ))}
                </ol>
                <ul className="service-theme-feature-list">
                  {spotlight.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div className="service-theme-metrics">
                  {spotlight.metrics.map((metric) => (
                    <div key={metric.label}>
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                    </div>
                  ))}
                </div>
              </MotionReveal>
            </div>
          </section>
        );
      })}

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
