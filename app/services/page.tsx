import Link from "next/link";
import {
  HiArrowLongRight,
  HiOutlineChartBarSquare,
  HiOutlineCpuChip,
} from "react-icons/hi2";
import { SiDiscord, SiShopify } from "react-icons/si";
import type { IconType } from "react-icons";
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
  {
    slug: "ai",
    navTone: "dark",
    eyebrow: "AI tools & workflow assistants",
    title: "AI assistants that sit inside real business workflows.",
    copy:
      "Practical AI features for quote support, product content, support triage, internal admin tasks, structured summaries, and repetitive business process automation.",
    icon: HiOutlineCpuChip,
    highlights: [
      "Quote assistants",
      "Support triage",
      "Product content helpers",
      "Admin workflow support",
    ],
    workflow: ["Business input", "AI draft", "Human review", "Saved action"],
    metrics: [
      { label: "Connects", value: "Forms, data, content, tickets" },
      { label: "Built for", value: "Repeatable decisions" },
      { label: "Useful when", value: "Teams lose time to admin" },
    ],
  },
];

const hiddenServiceAreaTitles = new Set(["Frontend Development", "MVP Design & Build"]);
const serviceAreaServices = services.filter((service) => !hiddenServiceAreaTitles.has(service.title));

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "Legacy system rebuilds, UI/UX, frontend development, backend services, databases, ecommerce systems, Shopify apps, Discord bots, AI tools, MVP delivery, and business integrations from Brandd.",
  path: "/services",
  keywords: [
    "digital services",
    "Shopify app development",
    "customer portals",
    "AI workflow assistants",
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
                <div className="service-theme-flow">
                  {spotlight.workflow.map((step, stepIndex) => (
                    <span key={step}>
                      <small>{String(stepIndex + 1).padStart(2, "0")}</small>
                      {step}
                    </span>
                  ))}
                </div>
                <div className="service-theme-feature-grid">
                  {spotlight.highlights.map((highlight) => (
                    <span key={highlight}>{highlight}</span>
                  ))}
                </div>
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

      <section className="section light-section" data-nav-tone="light">
        <div className="section-inner two-column">
          <MotionReveal>
            <p className="eyebrow">Delivery</p>
            <h2>Choose the engagement that fits the stage of the business.</h2>
          </MotionReveal>
          <div className="engagement-list">
            {[
              "A legacy system rebuild for Microsoft Access databases, old internal dashboards, or spreadsheet-led operations.",
              "A focused website, UI/UX, or frontend sprint for a launch date.",
              "A Shopify app or store extension for operational work that has outgrown theme code.",
              "A Discord bot for community operations, support, alerts, roles, or creator rewards.",
              "A customer portal or dashboard for self-serve accounts, admin controls, and reporting.",
              "An AI workflow assistant for quoting, support triage, product content, or internal admin.",
              "An MVP team to turn the first version into a real product.",
            ].map((item, index) => (
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
