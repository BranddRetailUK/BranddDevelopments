import Link from "next/link";
import { HiArrowLongRight } from "react-icons/hi2";
import { SiDiscord, SiShopify } from "react-icons/si";
import { MotionReveal } from "@/components/MotionReveal";
import { ServiceGrid } from "@/components/ServiceGrid";
import { ProjectContact } from "@/components/ProjectContact";
import { StructuredData } from "@/components/StructuredData";
import { serviceGroups } from "@/content/site";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  servicesJsonLd,
} from "@/content/seo";

export const metadata = createPageMetadata({
  title: "Website design and software development services",
  description:
    "Websites, online stores, business software, customer portals and integrations from Brandd in Leighton Buzzard, Bedfordshire.",
  path: "/services",
});

const groups = [
  {
    id: "websites",
    title: "Websites and online stores",
    copy: "A new website, a redesign or an online store starts with what customers need to understand and do. We design the pages and build the features around that.",
    points: [
      "Page structure, design and layouts for phones and larger screens",
      "Online stores, product catalogues and checkout",
      "Forms, content management and customer accounts",
    ],
    example: "See the collector storefront",
    href: "/projects/ace-hits-tcg",
  },
  {
    id: "business-software",
    title: "Business software and legacy rebuilds",
    copy: "If your team relies on an old database, desktop software or repeated spreadsheet work, we can help plan its replacement. We keep the workflow people understand and build a system that can be maintained.",
    points: [
      "Microsoft Access and old desktop software rebuilds",
      "Orders, stock, production records and reporting",
      "Data migration, staff testing and a planned move to the new system",
    ],
    example: "Explore legacy system rebuilds",
    href: "/legacy-systems",
  },
  {
    id: "products",
    title: "Customer portals and digital products",
    copy: "Give customers one place to manage their account, check progress and download files. Or turn a new product idea into a focused first release that people can use and help you improve.",
    points: [
      "Customer accounts, subscriptions and order history",
      "Staff dashboards, permissions and reports",
      "Product design, development and launch preparation",
    ],
    example: "See the SonaCrate product",
    href: "/projects/sonacrate",
  },
  {
    id: "integrations",
    title: "Integrations and automation",
    copy: "Connect the tools your business already uses. We build the connections and rules that move information between them, reducing repeated entry and manual handoffs.",
    points: [
      "Shopify, Stripe, Monday.com and Discord connections",
      "Courier tools, label printing and QR tracking",
      "Custom APIs, order updates and scheduled tasks",
    ],
    example: "See connected merchandise tools",
    href: "/projects/good-game-apparel",
  },
];

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
      <section
        className="section dark-section services-service-area-section service-groups-section"
        data-nav-tone="dark"
      >
        <div className="section-inner">
          <MotionReveal className="section-heading">
            <p className="eyebrow eyebrow-light">Services</p>
            <h1>What does your business need next?</h1>
            <p className="section-copy">
              A better website, an online store or software that makes daily
              work easier. We’ll help you work out what to build and how the
              pieces fit together.
            </p>
            <div className="hero-actions">
              <Link className="button button-light" href="/contact">
                Discuss a project <HiArrowLongRight aria-hidden="true" />
              </Link>
            </div>
          </MotionReveal>
          <ServiceGrid items={serviceGroups} />
        </div>
      </section>
      <section
        className="section light-section service-detail-section"
        data-nav-tone="light"
      >
        <div className="section-inner">
          {groups.map((group) => (
            <article
              className="service-detail-row"
              id={group.id}
              key={group.id}
            >
              <MotionReveal>
                <h2>{group.title}</h2>
                <p>{group.copy}</p>
                <Link className="text-link" href={group.href}>
                  {group.example} <HiArrowLongRight aria-hidden="true" />
                </Link>
              </MotionReveal>
              <MotionReveal>
                <ul className="plain-feature-list">
                  {group.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </MotionReveal>
            </article>
          ))}
        </div>
      </section>
      <section
        className="section dark-section specialist-section"
        data-nav-tone="dark"
      >
        <div className="section-inner">
          <MotionReveal className="section-heading">
            <p className="eyebrow eyebrow-light">Specialist development</p>
            <h2>Tools for your store and community.</h2>
          </MotionReveal>
          <div className="specialist-grid">
            <article>
              <SiShopify aria-hidden="true" />
              <h3>Custom Shopify apps</h3>
              <p>
                Manage product rules, order tasks and fulfilment connections
                that your store needs beyond its standard features.
              </p>
              <p className="service-example">
                <strong>For example:</strong> send a paid order to your
                production tool and return its status to the store.
              </p>
              <Link className="text-link" href="/contact?service=shopify">
                Discuss a Shopify app <HiArrowLongRight aria-hidden="true" />
              </Link>
            </article>
            <article>
              <SiDiscord aria-hidden="true" />
              <h3>Discord bots</h3>
              <p>
                Automate member roles, support tasks, store alerts and rewards
                for your community.
              </p>
              <p className="service-example">
                <strong>For example:</strong> give a member the right Discord
                role when their subscription is confirmed.
              </p>
              <Link className="text-link" href="/contact?service=discord">
                Discuss a Discord bot <HiArrowLongRight aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>
      <section
        className="section light-section project-faq-section"
        data-nav-tone="light"
      >
        <div className="section-inner">
          <MotionReveal className="section-heading">
            <h2>Before we start.</h2>
          </MotionReveal>
          <div className="project-faq-grid">
            <article>
              <h3>What should I send?</h3>
              <p>
                A few sentences about your business and the problem are enough.
                Include a link to your current site or tool if you have one.
              </p>
            </article>
            <article>
              <h3>How is the work priced?</h3>
              <p>
                We agree the scope before the build. Your priorities, required
                features and existing systems help define the work and its cost.
              </p>
            </article>
            <article>
              <h3>What happens after launch?</h3>
              <p>
                We offer ongoing support and management where required. The
                project agreement sets out support, hosting, source-code access
                and data arrangements.
              </p>
            </article>
          </div>
        </div>
      </section>
      <ProjectContact title="You don’t need a finished brief to get started." />
    </>
  );
}
