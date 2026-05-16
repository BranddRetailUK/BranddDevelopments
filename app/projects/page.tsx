import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  HiArrowLongRight,
  HiArrowTopRightOnSquare,
  HiOutlineChartBarSquare,
  HiOutlineCpuChip,
  HiOutlineShoppingCart,
  HiOutlineSquares2X2,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";
import { ScrollAccent } from "@/components/ScrollAccent";
import { ScrollBridge } from "@/components/ScrollBridge";

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

const goodGamePlatformLayers = [
  {
    title: "Storefront",
    label: "Public commerce",
    copy: "A Next.js storefront for creator collections, product detail pages, customer accounts, carts, checkout, subscriptions, policies and SEO landing pages.",
    icon: HiOutlineShoppingCart,
  },
  {
    title: "Creator dashboard",
    label: "Account hub",
    copy: "Authenticated creator tools for products, orders, earnings, subscriptions, rewards, saved artwork, support chat and storefront profile control.",
    icon: HiOutlineChartBarSquare,
  },
  {
    title: "Product creator",
    label: "Render pipeline",
    copy: "Artwork upload, template selection, colour previews, product rendering, DB-native product rows, Cloudinary imagery and storefront publishing.",
    icon: HiOutlineSquares2X2,
  },
];

const goodGameToolSections = [
  {
    label: "Storefront service",
    title: "A public storefront built around creator collections.",
    copy: "The storefront is a full ecommerce surface rather than a theme-only shop: creator collection routes, collection directories, product pages, search-led discovery, cart and checkout flows, customer accounts, subscriptions and public SEO pages all read from the platform data underneath.",
    points: [
      "Creator collection and product routes",
      "Cart, checkout and customer account flows",
      "Subscriptions, packages and SEO landing pages",
    ],
  },
  {
    label: "Creator dashboard service",
    title: "A dashboard for running the creator account.",
    copy: "The dashboard brings the operational side into one account area: creators manage their profile, storefront status, product listings, order history, earnings, coins, payout state, support conversations, saved assets and subscription settings.",
    points: [
      "Product, order and revenue management",
      "Saved artwork, logo tools and support chat",
      "Subscription, package and storefront activation controls",
    ],
  },
  {
    label: "Product creator service",
    title: "A product creator that saves real storefront products.",
    copy: "The product creator lets creators upload artwork, pick templates, preview garment colours, manage print placement and queue render jobs that create local product, variant, image and artwork records for the storefront.",
    points: [
      "Artwork validation, uploads and template selection",
      "Colour previews, print placement and render jobs",
      "DB-native product, variant and image creation",
    ],
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

      <section
        className="section dark-section flagship-project-section good-game-project-section"
        data-nav-tone="dark"
        id="good-game-apparel"
      >
        <div className="section-inner flagship-project-panel">
          <MotionReveal className="flagship-project-copy">
            <p className="eyebrow eyebrow-light">Flagship project</p>
            <h2>Good Game Apparel: Brandd&apos;s own creator-commerce platform.</h2>
            <p>
              Good Game Apparel is the clearest example of what Brandd can build
              when a brand needs more than a standard website. It combines
              a public storefront, creator onboarding, subscriptions,
              creator-owned storefronts, product creation tools, revenue
              tracking, fulfilment logic and dashboard-based account management
              into one connected platform.
            </p>
            <p>
              Because Good Game Apparel is owned by Brandd, it also works as a
              live product lab: storefront routes, creator dashboard data,
              product creation jobs, sales logic, subscription tiers and
              fulfilment requirements all have to work together cleanly.
            </p>
            <a
              className="button good-game-button"
              href="https://www.goodgameapparel.co.uk/"
              rel="noreferrer"
              target="_blank"
            >
              View Good Game Apparel <HiArrowTopRightOnSquare aria-hidden="true" />
            </a>
          </MotionReveal>
          <MotionReveal className="flagship-project-visual good-game-visual" delay={0.12} aria-hidden="true">
            <video className="good-game-video" autoPlay loop muted playsInline preload="metadata">
              <source
                src="https://res.cloudinary.com/dhlqooyuk/video/upload/v1777315888/bannervid_ikakzu.mp4"
                type="video/mp4"
              />
            </video>
            <div className="good-game-visual-overlay" />
            <div className="good-game-visual-content">
              <div className="good-game-logo-lockup">
                <Image
                  alt=""
                  height={164}
                  src="https://res.cloudinary.com/dhlqooyuk/image/upload/v1778143541/Good_Game_Apparel_Gold_Logo_nlmdt2.png"
                  width={340}
                />
                <span>www.goodgameapparel.co.uk</span>
              </div>
              <strong>Bring your brand to life.</strong>
              <span>Made for creators.</span>
            </div>
            <div className="good-game-divider" />
          </MotionReveal>
        </div>
      </section>

      <section className="section dark-section good-game-platform-section" data-nav-tone="dark">
        <div className="section-inner">
          <MotionReveal className="good-game-section-heading">
            <p className="eyebrow eyebrow-light">Good Game platform</p>
            <h2>Storefront, creator dashboard and product creator in one connected platform.</h2>
          </MotionReveal>
          <div className="good-game-platform-grid">
            {goodGamePlatformLayers.map((item, index) => {
              const Icon = item.icon;
              return (
                <MotionReveal
                  className="good-game-platform-card"
                  delay={index * 0.06}
                  key={item.title}
                >
                  <div className="good-game-platform-card-top">
                    <Icon aria-hidden="true" />
                    <span>{item.label}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section dark-section good-game-tools-section" data-nav-tone="dark">
        <div className="section-inner good-game-tools-grid">
          {goodGameToolSections.map((item, index) => (
            <MotionReveal className="good-game-tool-panel" delay={index * 0.08} key={item.title}>
              <p className="eyebrow eyebrow-light">{item.label}</p>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
              <ul className="good-game-tool-list">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </MotionReveal>
          ))}
        </div>
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
