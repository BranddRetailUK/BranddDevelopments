import Image from "next/image";
import Link from "next/link";
import {
  HiArrowLongRight,
  HiArrowTopRightOnSquare,
  HiOutlineChartBarSquare,
  HiOutlineCircleStack,
  HiOutlineShoppingBag,
  HiOutlineSparkles,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";
import { StructuredData } from "@/components/StructuredData";
import { absoluteUrl, createBreadcrumbJsonLd, createPageMetadata, organizationId } from "@/content/seo";

export const metadata = createPageMetadata({
  title: "Good Game Apparel | Made for Creators",
  description:
    "Good Game Apparel helps creators launch made-to-order apparel and merch with creator tools, storefronts, UK fulfilment, dashboard tracking, and subscription options.",
  path: "/projects/good-game-apparel",
  keywords: ["creator commerce", "merch storefront", "product creator", "creator dashboard"],
});

const goodGameLogo =
  "/images/good-game/good-game-apparel-logo.png";

const goodGameVideo =
  "https://res.cloudinary.com/dhlqooyuk/video/upload/v1777315888/bannervid_ikakzu.mp4";

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

const heroSystems = [
  {
    title: "Storefront",
    copy: "Creator stores, subscriptions, product discovery, cart and checkout for made-to-order merch.",
    icon: HiOutlineShoppingBag,
  },
  {
    title: "Creator dashboard",
    copy: "One login for designs, storefront, production, fulfilment, rewards, payouts and support.",
    icon: HiOutlineChartBarSquare,
  },
  {
    title: "Product creator",
    copy: "Artwork uploads, product previews, logo-generator ideas and range management from the dashboard.",
    icon: HiOutlineSquares2X2,
  },
];

const storefrontDetails = [
  ["Creator Stores", "Dedicated collection pages let shoppers browse live creator ranges and product drops."],
  ["Subscription tiers", "Free, Starter, Core and Pro options control listings, support and creator tools."],
  ["Made to order", "Orders move through production, packing, fulfilment and delivery without creators buying stock upfront."],
];

const dashboardDetails = [
  ["Creator earnings", "Revenue share, coins, XP and payout state sit beside product and order activity."],
  ["Launch support", "Discord support, subscription questions and product setup all stay close to the creator account."],
  ["Store performance", "Products, orders and reward progress help creators see what is selling and what to launch next."],
];

const creatorDetails = [
  ["Create artwork", "Creators can upload a logo, use existing artwork, or generate new ideas with dashboard tools."],
  ["Build the collection", "Products, design placement, previews, titles and pricing are managed before launch."],
  ["Print methods", "Transfer print, embroidery and UV printing support apparel, accessories and hard goods."],
];

export default function GoodGameApparelPage() {
  return (
    <>
      <StructuredData
        data={[
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Websites", path: "/projects" },
            { name: "Good Game Apparel", path: "/projects/good-game-apparel" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Good Game Apparel",
            description:
              "Creator-commerce platform work with storefronts, dashboard tracking, product creation, subscriptions, and UK fulfilment.",
            url: absoluteUrl("/projects/good-game-apparel"),
            creator: {
              "@id": organizationId,
            },
          },
        ]}
      />
      <section className="section dark-section good-game-page-hero" data-nav-tone="dark">
        <video className="good-game-hero-video" autoPlay loop muted playsInline preload="metadata">
          <source src={goodGameVideo} type="video/mp4" />
        </video>
        <div className="good-game-hero-shade" />
        <div className="section-inner good-game-hero-inner">
          <MotionReveal className="good-game-hero-brand">
            <Image
              alt="Good Game Apparel"
              className="good-game-hero-logo"
              height={644}
              priority
              src={goodGameLogo}
              unoptimized
              width={1000}
            />
            <span>www.goodgameapparel.co.uk</span>
          </MotionReveal>

          <MotionReveal className="good-game-hero-copy" delay={0.08}>
            <p className="eyebrow eyebrow-light">Good Game Apparel</p>
            <h1>
              Bring your brand to <span>life.</span>
            </h1>
            <p>
              Premium print-on-demand apparel and merch, made for creators.
              Brandd built the platform behind that promise: creator tools,
              storefronts, UK fulfilment, dashboard tracking and subscriptions
              for growing communities.
            </p>
            <div className="good-game-hero-actions">
              <a
                className="button good-game-button"
                href="https://www.goodgameapparel.co.uk/"
                rel="noreferrer"
                target="_blank"
              >
                View Good Game Apparel <HiArrowTopRightOnSquare aria-hidden="true" />
              </a>
              <Link className="button button-light good-game-secondary-button" href="/projects">
                Back to websites <HiArrowLongRight aria-hidden="true" />
              </Link>
            </div>
          </MotionReveal>

          <div className="good-game-hero-system">
            {heroSystems.map((item, index) => {
              const Icon = item.icon;
              return (
                <MotionReveal className="good-game-system-card" delay={0.12 + index * 0.06} key={item.title}>
                  <Icon aria-hidden="true" />
                  <strong>{item.title}</strong>
                  <span>{item.copy}</span>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section dark-section good-game-service-section" data-nav-tone="dark">
        <div className="section-inner good-game-service-layout">
          <MotionReveal className="good-game-service-copy">
            <p className="eyebrow eyebrow-light">Storefront service</p>
            <h2>Start your collection and explore live creator stores.</h2>
            <p>
              The storefront turns the Create Your Merch flow into public
              creator stores, subscriptions, product pages, search, cart,
              account, checkout and support journeys for made-to-order merch.
            </p>
            <div className="good-game-detail-list">
              {storefrontDetails.map(([title, copy]) => (
                <article key={title}>
                  <strong>{title}</strong>
                  <span>{copy}</span>
                </article>
              ))}
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
              <Image alt="" height={644} src={goodGameLogo} unoptimized width={1000} />
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
      </section>

      <section className="section dark-section good-game-service-section good-game-service-reverse" data-nav-tone="dark">
        <div className="section-inner good-game-service-layout">
          <MotionReveal className="good-game-service-copy">
            <p className="eyebrow eyebrow-light">Creator dashboard service</p>
            <h2>One login for your merch collection and creator earnings.</h2>
            <p>
              The creator account connects designs, storefront, production,
              fulfilment, rewards and payouts. It is where creators manage
              products, track orders, watch reward progress and get setup
              support.
            </p>
            <div className="good-game-detail-list">
              {dashboardDetails.map(([title, copy]) => (
                <article key={title}>
                  <strong>{title}</strong>
                  <span>{copy}</span>
                </article>
              ))}
            </div>
          </MotionReveal>

          <MotionReveal className="good-game-dashboard-ui" delay={0.12} aria-hidden="true">
            <aside className="good-game-dashboard-rail">
              <Image alt="" height={644} src={goodGameLogo} unoptimized width={1000} />
              {["Products", "Orders", "Earnings", "Assets", "Support"].map((item, index) => (
                <span className={index === 0 ? "is-active" : undefined} key={item}>
                  {item}
                </span>
              ))}
            </aside>
            <div className="good-game-dashboard-main">
              <div className="good-game-dashboard-topline">
                <div>
                  <span>Creator dashboard</span>
                  <strong>Creator Hub</strong>
                </div>
                <em>Collection live</em>
              </div>
              <div className="good-game-dashboard-stats">
                <article>
                  <span>Orders</span>
                  <strong>128</strong>
                </article>
                <article>
                  <span>Creator sales</span>
                  <strong>£6.4k</strong>
                </article>
                <article>
                  <span>Coins</span>
                  <strong>2,840</strong>
                </article>
              </div>
              <div className="good-game-dashboard-table">
                {[
                  ["Creator hoodie", "Live", "24 orders"],
                  ["Logo Generator", "Ready", "5 credits"],
                  ["Discord support", "Open", "2 replies"],
                ].map(([title, status, meta]) => (
                  <article key={title}>
                    <HiOutlineSparkles aria-hidden="true" />
                    <strong>{title}</strong>
                    <span>{status}</span>
                    <em>{meta}</em>
                  </article>
                ))}
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="section dark-section good-game-service-section" data-nav-tone="dark">
        <div className="section-inner good-game-service-layout">
          <MotionReveal className="good-game-service-copy">
            <p className="eyebrow eyebrow-light">Product creator service</p>
            <h2>Create products and launch fast.</h2>
            <p>
              Product Creator and Logo Generator tools help creators move from
              artwork to sellable merch without leaving the dashboard. The
              workflow covers product choice, mockup previews, product details
              and storefront publishing.
            </p>
            <div className="good-game-detail-list">
              {creatorDetails.map(([title, copy]) => (
                <article key={title}>
                  <strong>{title}</strong>
                  <span>{copy}</span>
                </article>
              ))}
            </div>
          </MotionReveal>

          <MotionReveal className="good-game-creator-ui" delay={0.12} aria-hidden="true">
            <div className="good-game-creator-controls">
              <strong>Product creator</strong>
              <label>
                Template
                <span>Premium T-Shirt - front print</span>
              </label>
              <label>
                Artwork
                <span>creator-logo.png ready</span>
              </label>
              <div className="good-game-colour-row">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="good-game-creator-canvas">
              <div className="good-game-creator-template-image">
                <Image alt="" height={800} src={productTemplateImages[0].src} width={640} />
              </div>
              <span>Print placement preview</span>
            </div>
            <div className="good-game-render-queue">
              <strong>Render queue</strong>
              {[
                ["Product row", "Created"],
                ["Mockups", "Previewed"],
                ["Print method", "Transfer"],
                ["Storefront", "Published"],
              ].map(([title, status]) => (
                <article key={title}>
                  <HiOutlineCircleStack aria-hidden="true" />
                  <span>{title}</span>
                  <em>{status}</em>
                </article>
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="section dark-section good-game-system-section" data-nav-tone="dark">
        <div className="section-inner">
          <MotionReveal className="good-game-section-heading">
            <p className="eyebrow eyebrow-light">Connected platform</p>
            <h2>Design, print, ship and earn as one connected platform.</h2>
          </MotionReveal>
          <div className="good-game-data-flow">
            {[
              ["Creator account", "Designs, storefront, production, fulfilment, rewards and payouts stay tied to one login."],
              ["Product records", "Artwork, mockups, print method, products and subscription limits feed the storefront."],
              ["Storefront output", "Creator stores, products, checkout, UK fulfilment and customer support complete the loop."],
            ].map(([title, copy], index) => (
              <MotionReveal className="good-game-data-node" delay={index * 0.06} key={title}>
                <strong>{title}</strong>
                <span>{copy}</span>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-section compact-cta good-game-cta-section" data-nav-tone="dark">
        <div className="section-inner cta-row">
          <MotionReveal>
            <p className="eyebrow eyebrow-light">Creator commerce build</p>
            <h2>Need creator tools, storefronts and fulfilment in one merch platform?</h2>
          </MotionReveal>
          <Link className="button good-game-button" href="/contact">
            Plan a commerce project <HiArrowLongRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
