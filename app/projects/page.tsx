import Image from "next/image";
import Link from "next/link";
import {
  HiArrowLongRight,
  HiArrowTopRightOnSquare,
  HiOutlineChartBarSquare,
  HiOutlineCpuChip,
  HiOutlineDevicePhoneMobile,
  HiOutlineShieldCheck,
  HiOutlineShoppingCart,
  HiOutlineSparkles,
  HiOutlineSquares2X2,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";
import { ScrollAccent } from "@/components/ScrollAccent";
import { StructuredData } from "@/components/StructuredData";
import { absoluteUrl, createBreadcrumbJsonLd, createPageMetadata, organizationId } from "@/content/seo";

export const metadata = createPageMetadata({
  title: "Websites",
  description:
    "Website formats from Brandd across ecommerce, campaign websites, dashboards, and product platforms.",
  path: "/projects",
  keywords: ["website design", "ecommerce websites", "operational dashboards", "product platforms"],
});

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
    title: "Product platforms",
    copy: "For ideas that need a working website with real users, real data and a clear path to improvement.",
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

const goodGameLogo =
  "https://res.cloudinary.com/dhlqooyuk/image/upload/v1778143541/Good_Game_Apparel_Gold_Logo_nlmdt2.png";

const productTemplateImages = [
  {
    title: "Premium T-Shirt",
    status: "Made to order",
    src: "https://res.cloudinary.com/dhlqooyuk/image/upload/c_fill,g_auto,ar_4:5,w_640,h_800,f_auto,q_auto/v1771159715/product_imagery/MC%20Gaming/FIRE%20%7C%20Premium%20T-Shirt/product-10431588041031-image-67433574793543.jpg",
  },
  {
    title: "Phone Case",
    status: "Accessory range",
    src: "https://res.cloudinary.com/dhlqooyuk/image/upload/c_fill,g_auto,ar_4:5,w_640,h_800,f_auto,q_auto/v1777835859/product_imagery/RainDropz/Phone%20Case/phone-case-front-mockup-default-perspective-front-perspective-default-moq5kfvn.png",
  },
  {
    title: "Water Bottle",
    status: "UV printed",
    src: "https://res.cloudinary.com/dhlqooyuk/image/upload/c_fill,g_auto,ar_4:5,w_640,h_800,f_auto,q_auto/v1771162528/product_imagery/Jammy/Metal%20Water%20Bottle/product-10622686822727-image-72072151302471.jpg",
  },
];

const goodGameSystems = [
  {
    title: "Storefront",
    copy: "Creator stores, subscriptions, product discovery, cart and checkout for made-to-order merch.",
    icon: HiOutlineShoppingCart,
  },
  {
    title: "Creator dashboard",
    copy: "One login for designs, storefront, production, fulfilment, rewards, payouts and support.",
    icon: HiOutlineChartBarSquare,
  },
  {
    title: "Product creator",
    copy: "Artwork uploads, product previews and range management from the creator dashboard.",
    icon: HiOutlineSquares2X2,
  },
];

const storefrontDetails = [
  ["Creator Stores", "Dedicated collection pages let shoppers browse live creator ranges and product drops."],
  ["Subscription tiers", "Free, Starter, Core and Pro options control listings, support and creator tools."],
  ["Made to order", "Orders move through production, packing, fulfilment and delivery without creators buying stock upfront."],
];

const aceLogo =
  "https://www.acehitstcg.co.uk/cdn/shop/files/new_logo.png?v=1777271622&width=600";

const aceHeroBanner =
  "https://www.acehitstcg.co.uk/cdn/shop/files/Ascended_Heroes_Website_Banner_copy.webp?v=1777114282&width=1600";

const aceSignals = [
  "New in",
  "Shop by type",
  "Pokemon TCG",
  "English",
  "Japanese",
  "Korean",
];

const aceHighlights = [
  {
    title: "Collector navigation",
    copy: "Shop by type, language, era, set and accessory category.",
    icon: HiOutlineSquares2X2,
  },
  {
    title: "Drop-led retail",
    copy: "New-in products, featured banners, prices and fast purchase paths.",
    icon: HiOutlineSparkles,
  },
  {
    title: "Trust cues",
    copy: "Reviews, shipping messages, secure payments and social proof.",
    icon: HiOutlineShieldCheck,
  },
  {
    title: "Mobile shopping",
    copy: "Compact menu, account access, cart drawer and mobile toolbar.",
    icon: HiOutlineDevicePhoneMobile,
  },
];

export default function ProjectsPage() {
  return (
    <>
      <StructuredData
        data={[
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Websites", path: "/projects" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Websites and product platforms",
            description:
              "Connected websites, ecommerce systems, operational dashboards, and product platforms built by Brandd.",
            provider: {
              "@id": organizationId,
            },
            areaServed: "GB",
            url: absoluteUrl("/projects"),
          },
        ]}
      />
      <section className="page-hero page-hero-dark section-grid projects-hero" data-nav-tone="dark">
        <MotionReveal className="page-hero-copy">
          <p className="eyebrow eyebrow-light">Websites</p>
          <h1>Real websites for brands that need the frontend, the product and the system behind it.</h1>
          <p>
            Brandd works on websites where design, development and
            operations meet: public websites, ecommerce platforms, internal
            dashboards, product platforms, backend services, database systems, upload tools,
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
            <p className="eyebrow">Website types</p>
            <h2>Every website is shaped around a commercial job, a user flow, and the system that has to support it.</h2>
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

      <section className="section dark-section good-game-service-section websites-good-game-showcase" data-nav-tone="dark">
        <div className="section-inner good-game-service-layout">
          <MotionReveal className="good-game-service-copy">
            <p className="eyebrow eyebrow-light">Creator commerce example</p>
            <h2>Good Game Apparel connects storefronts, creator tools and fulfilment.</h2>
            <p>
              The Good Game Apparel work shows how a website can become a full
              creator-commerce platform: public stores, subscriptions, product
              creation, account dashboards, rewards, payouts and UK fulfilment
              all moving through one connected system.
            </p>
            <div className="good-game-detail-list">
              {storefrontDetails.map(([title, copy]) => (
                <article key={title}>
                  <strong>{title}</strong>
                  <span>{copy}</span>
                </article>
              ))}
            </div>
            <div className="websites-showcase-actions">
              <Link className="button good-game-button" href="/projects/good-game-apparel">
                View case study <HiArrowLongRight aria-hidden="true" />
              </Link>
              <a
                className="button good-game-secondary-button"
                href="https://www.goodgameapparel.co.uk/"
                rel="noreferrer"
                target="_blank"
              >
                Open live site <HiArrowTopRightOnSquare aria-hidden="true" />
              </a>
            </div>
          </MotionReveal>

          <MotionReveal className="good-game-storefront-ui" delay={0.12} aria-hidden="true">
            <div className="good-game-browser-bar">
              <span />
              <span />
              <span />
              <strong>goodgameapparel.co.uk/team-gg</strong>
            </div>
            <div className="good-game-storefront-nav">
              <Image alt="" height={82} src={goodGameLogo} width={170} />
              <div>
                <span>Collections</span>
                <span>Products</span>
                <span>Creators</span>
                <span>Cart</span>
              </div>
            </div>
            <div className="good-game-storefront-hero-card">
              <span>Creator merch launch flow</span>
              <strong>Design Print Ship Earn</strong>
              <p>Creator stores, subscriptions and made-to-order fulfilment in one public storefront.</p>
            </div>
            <div className="good-game-product-board">
              {productTemplateImages.map((item) => (
                <article key={item.title}>
                  <div className="good-game-product-image">
                    <Image alt="" height={800} src={item.src} width={640} />
                  </div>
                  <strong>{item.title}</strong>
                  <span>{item.status}</span>
                </article>
              ))}
            </div>
            <div className="good-game-checkout-strip">
              <span>Cart</span>
              <strong>3 items</strong>
              <em>Checkout ready</em>
            </div>
          </MotionReveal>
        </div>

        <div className="section-inner good-game-hero-system websites-good-game-system">
          {goodGameSystems.map((item, index) => {
            const Icon = item.icon;
            return (
              <MotionReveal className="good-game-system-card" delay={index * 0.06} key={item.title}>
                <Icon aria-hidden="true" />
                <strong>{item.title}</strong>
                <span>{item.copy}</span>
              </MotionReveal>
            );
          })}
        </div>
      </section>

      <section className="section dark-section ace-commerce-section websites-ace-showcase" data-nav-tone="dark">
        <div className="section-inner ace-commerce-grid">
          <MotionReveal className="ace-commerce-copy">
            <p className="eyebrow eyebrow-light">Collector retail example</p>
            <Image
              alt="Ace Hits TCG"
              className="ace-hero-logo websites-ace-logo"
              height={220}
              src={aceLogo}
              width={600}
            />
            <h2>Ace Hits TCG turns collector drops into a fast retail storefront.</h2>
            <p>
              The Ace Hits TCG work brings together product navigation, drop
              banners, category signals, cart flow, account access and trust-led
              shopping for a high-energy trading-card retail site.
            </p>
            <div className="websites-showcase-actions">
              <Link className="button ace-button" href="/projects/ace-hits-tcg">
                View case study <HiArrowLongRight aria-hidden="true" />
              </Link>
              <a
                className="button ace-secondary-button"
                href="https://www.acehitstcg.co.uk/"
                rel="noreferrer"
                target="_blank"
              >
                Open live site <HiArrowTopRightOnSquare aria-hidden="true" />
              </a>
            </div>
          </MotionReveal>

          <MotionReveal className="ace-storefront-visual" delay={0.12} aria-hidden="true">
            <div className="ace-browser-bar">
              <span />
              <span />
              <span />
              <strong>acehitstcg.co.uk</strong>
            </div>
            <div className="ace-visual-banner">
              <Image alt="" height={780} src={aceHeroBanner} width={1600} />
            </div>
            <div className="ace-nav-strip">
              {aceSignals.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="section light-section ace-retail-section websites-ace-retail-section" data-nav-tone="light">
        <div className="section-inner">
          <MotionReveal className="section-heading ace-section-heading">
            <p className="eyebrow">Retail website details</p>
            <h2>Specific catalogue decisions make ecommerce easier to scan and buy from.</h2>
          </MotionReveal>
          <div className="ace-highlight-grid">
            {aceHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <MotionReveal className="ace-highlight-card" delay={index * 0.06} key={item.title}>
                  <Icon aria-hidden="true" />
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
            Plan a website <HiArrowLongRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
