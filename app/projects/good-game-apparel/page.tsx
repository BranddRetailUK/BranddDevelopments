import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Good Game Apparel",
  description:
    "Good Game Apparel project page covering a creator-commerce storefront, creator dashboard, and product creator platform.",
};

const goodGameLogo =
  "https://res.cloudinary.com/dhlqooyuk/image/upload/v1778143541/Good_Game_Apparel_Gold_Logo_nlmdt2.png";

const goodGameVideo =
  "https://res.cloudinary.com/dhlqooyuk/video/upload/v1777315888/bannervid_ikakzu.mp4";

const heroSystems = [
  {
    title: "Storefront",
    copy: "Creator collections, product pages, cart, checkout, accounts, subscriptions and SEO pages.",
    icon: HiOutlineShoppingBag,
  },
  {
    title: "Creator dashboard",
    copy: "Profile, storefront status, products, orders, earnings, coins, payouts, support and saved assets.",
    icon: HiOutlineChartBarSquare,
  },
  {
    title: "Product creator",
    copy: "Artwork upload, template selection, colour preview, placement controls, render jobs and product records.",
    icon: HiOutlineSquares2X2,
  },
];

const storefrontDetails = [
  ["Creator routes", "/<collection> and /<collection>/<product> pages for public creator shops."],
  ["Commerce paths", "Cart, checkout, customer accounts, policies and subscriptions stay connected to live data."],
  ["Discovery", "Collection directories, product search, creator collections and public SEO landing pages."],
];

const dashboardDetails = [
  ["Storefront control", "Creators can manage their profile, public status, subscription state and package access."],
  ["Operations", "Product listings, order history, revenue, coins, payouts and support conversations sit in one account area."],
  ["Creative assets", "Saved artwork, logo tools and product creator launch points keep repeat work close to the dashboard."],
];

const creatorDetails = [
  ["Artwork intake", "Uploads are validated before creators choose templates, garment colours and print placement."],
  ["Render workflow", "The creator queues jobs that create preview imagery and production-ready product assets."],
  ["Storefront output", "Local product, variant, image and artwork records are created for publishing to the storefront."],
];

export default function GoodGameApparelPage() {
  return (
    <>
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
              height={164}
              priority
              src={goodGameLogo}
              width={340}
            />
            <span>www.goodgameapparel.co.uk</span>
          </MotionReveal>

          <MotionReveal className="good-game-hero-copy" delay={0.08}>
            <p className="eyebrow eyebrow-light">Good Game Apparel</p>
            <h1>Creator commerce with the storefront, dashboard and product creator built together.</h1>
            <p>
              Good Game Apparel is a Brandd-owned creator-commerce platform.
              The work joins a public ecommerce storefront, authenticated
              creator account area, product creation tools, subscriptions,
              order data, revenue tracking and fulfilment logic into one
              connected product.
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
                Back to projects <HiArrowLongRight aria-hidden="true" />
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
            <h2>A public storefront built around creator collections.</h2>
            <p>
              The storefront is a full commerce surface rather than a static
              theme. It supports creator shops, product detail pages,
              collection directories, search-led discovery, carts, checkout,
              accounts, subscriptions and SEO pages.
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
              <Image alt="" height={82} src={goodGameLogo} width={170} />
              <div>
                <span>Collections</span>
                <span>Products</span>
                <span>Creators</span>
                <span>Cart</span>
              </div>
            </div>
            <div className="good-game-storefront-hero-card">
              <span>Creator collection</span>
              <strong>Team GG drop</strong>
              <p>Public collection route, creator profile, products and subscription entry points.</p>
            </div>
            <div className="good-game-product-board">
              {["Oversized tee", "Creator hoodie", "Limited drop"].map((item, index) => (
                <article key={item}>
                  <div className={`good-game-product-thumb good-game-product-thumb-${index + 1}`} />
                  <strong>{item}</strong>
                  <span>{index === 0 ? "From £24.99" : index === 1 ? "From £44.99" : "Members only"}</span>
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
            <h2>An account hub for running the creator side of the platform.</h2>
            <p>
              The dashboard gives creators a practical operating area for the
              things that sit behind the public store: storefront status,
              products, order history, earnings, coins, payouts, subscriptions,
              saved assets and support.
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
              <Image alt="" height={64} src={goodGameLogo} width={132} />
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
                  <strong>Team GG account</strong>
                </div>
                <em>Storefront active</em>
              </div>
              <div className="good-game-dashboard-stats">
                <article>
                  <span>Orders</span>
                  <strong>128</strong>
                </article>
                <article>
                  <span>Revenue</span>
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
                  ["Oversized tee", "Draft", "Render ready"],
                  ["Support thread", "Open", "2 replies"],
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
            <h2>A product creator that turns artwork into real storefront products.</h2>
            <p>
              The product creator handles the work between an uploaded artwork
              file and a sellable storefront product. Creators choose templates,
              preview garment colours, adjust print placement and queue render
              jobs that write the product records the storefront needs.
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
                <span>Oversized tee - front print</span>
              </label>
              <label>
                Artwork
                <span>team-gg-mark.png validated</span>
              </label>
              <div className="good-game-colour-row">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="good-game-creator-canvas">
              <div className="good-game-shirt-shape">
                <div>GG</div>
              </div>
              <span>Print placement preview</span>
            </div>
            <div className="good-game-render-queue">
              <strong>Render queue</strong>
              {[
                ["Product row", "Created"],
                ["Variants", "6 colours"],
                ["Images", "Cloudinary"],
                ["Storefront", "Ready"],
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
            <h2>The public store, creator account and product creator share the same product data.</h2>
          </MotionReveal>
          <div className="good-game-data-flow">
            {[
              ["Creator account", "Profile, subscription, package access, saved assets, support and payout state."],
              ["Product records", "Products, variants, artwork, images, render status and storefront publishing state."],
              ["Storefront output", "Creator collections, product pages, search results, cart, checkout and SEO routes."],
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
            <h2>Need a storefront with the operating system behind it?</h2>
          </MotionReveal>
          <Link className="button good-game-button" href="/contact">
            Plan a commerce project <HiArrowLongRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
