import Image from "next/image";
import Link from "next/link";
import {
  HiArrowLongRight,
  HiArrowTopRightOnSquare,
  HiOutlineDevicePhoneMobile,
  HiOutlineMegaphone,
  HiOutlineShieldCheck,
  HiOutlineShoppingBag,
  HiOutlineSparkles,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";
import { ProjectBrief } from "@/components/ProjectBrief";
import { StructuredData } from "@/components/StructuredData";
import {
  absoluteUrl,
  createBreadcrumbJsonLd,
  createPageMetadata,
  organizationId,
} from "@/content/seo";

export const metadata = createPageMetadata({
  title: "Ace Hits TCG case study",
  description:
    "Brandd’s Shopify storefront work for Ace Hits TCG: collector navigation, product displays and clear paths to checkout.",
  path: "/projects/ace-hits-tcg",
  keywords: [
    "collector retail storefront",
    "TCG ecommerce",
    "Shopify storefront",
    "product navigation",
  ],
});

const aceLogo =
  "https://www.acehitstcg.co.uk/cdn/shop/files/new_logo.png?v=1777271622&width=600";

const aceHeroBanner =
  "https://www.acehitstcg.co.uk/cdn/shop/files/Ascended_Heroes_Website_Banner_copy.webp?v=1777114282&width=1600";

const aceProductDrops = [
  {
    title: "Sealed boxes",
    price: "£104.99",
    image:
      "https://www.acehitstcg.co.uk/cdn/shop/files/9d3175ca9e0d4a499fe910ba66dd7801_tplv-t5fjg24jzw-origin-jpeg.jpg?v=1777740628&width=800",
  },
  {
    title: "Booster packs",
    price: "£6.99",
    image:
      "https://www.acehitstcg.co.uk/cdn/shop/files/c73c0590650046dea1a2922b4d4e2c2d_tplv-t5fjg24jzw-origin-jpeg.jpg?v=1777740627&width=800",
  },
  {
    title: "Card protection",
    price: "£2.49",
    image:
      "https://www.acehitstcg.co.uk/cdn/shop/files/984b71e932bf495c8bb97c9c0e73f9cc_tplv-t5fjg24jzw-origin-jpeg.jpg?v=1777740617&width=800",
  },
];

const aceHighlights = [
  {
    title: "Collector navigation",
    copy: "Shop by type, language, era, set and accessory category.",
    icon: HiOutlineSquares2X2,
  },
  {
    title: "New releases",
    copy: "Featured collections and banners introduce the latest products.",
    icon: HiOutlineSparkles,
  },
  {
    title: "Buying information",
    copy: "Reviews, delivery information and payment options help shoppers make a decision.",
    icon: HiOutlineShieldCheck,
  },
  {
    title: "Mobile shopping",
    copy: "Search, account and basket controls stay within reach on a phone.",
    icon: HiOutlineDevicePhoneMobile,
  },
];

const aceSignals = [
  "New in",
  "Shop by type",
  "Pokémon TCG",
  "English",
  "Japanese",
  "Korean",
  "Card protection",
  "Merch",
];

export default function AceHitsTcgPage() {
  return (
    <>
      <StructuredData
        data={[
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Our work", path: "/projects" },
            { name: "Ace Hits TCG", path: "/projects/ace-hits-tcg" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Ace Hits TCG",
            description:
              "Shopify storefront design with collector categories, product displays and mobile shopping.",
            url: absoluteUrl("/projects/ace-hits-tcg"),
            creator: {
              "@id": organizationId,
            },
          },
        ]}
      />
      <section
        className="section dark-section ace-project-hero"
        data-nav-tone="dark"
      >
        <div className="section-inner ace-hero-grid">
          <MotionReveal className="ace-hero-copy">
            <Link className="case-back-link" href="/projects">
              ← Our work
            </Link>
            <p className="eyebrow eyebrow-light">
              Ace Hits TCG · Online retail
            </p>
            <Image
              alt="Ace Hits TCG"
              className="ace-hero-logo"
              height={220}
              priority
              src={aceLogo}
              width={600}
            />
            <h1>A trading-card store built for collectors.</h1>
            <p>
              Brandd’s storefront work for Ace Hits TCG brings Pokémon cards,
              sealed products and accessories into a Shopify store organised
              around how collectors search and shop.
            </p>
            <div className="ace-hero-actions">
              <Link className="button ace-button" href="/contact">
                Discuss an online store <HiArrowLongRight aria-hidden="true" />
              </Link>
              <a
                className="button ace-secondary-button"
                href="https://www.acehitstcg.co.uk/"
                rel="noreferrer"
                target="_blank"
              >
                Visit Ace Hits TCG{" "}
                <HiArrowTopRightOnSquare aria-hidden="true" />
              </a>
            </div>
          </MotionReveal>

          <MotionReveal
            className="ace-storefront-visual"
            delay={0.12}
            aria-hidden="true"
          >
            <div className="ace-browser-bar">
              <span />
              <span />
              <span />
              <strong>acehitstcg.co.uk</strong>
            </div>
            <div className="ace-visual-banner">
              <Image
                alt=""
                height={780}
                priority
                src={aceHeroBanner}
                width={1600}
              />
            </div>
            <div className="ace-nav-strip">
              {aceSignals.slice(0, 6).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>

      <ProjectBrief
        need="Help collectors browse trading cards and accessories by the details that matter to them, including type, language and set."
        role="Storefront design and development on Shopify, including catalogue navigation, product presentation and the mobile shopping experience."
        result="Shoppers can browse collector categories, discover new releases and reach their basket and account as they shop."
      />

      <section
        className="section light-section ace-retail-section"
        data-nav-tone="light"
      >
        <div className="section-inner">
          <MotionReveal className="section-heading ace-section-heading">
            <p className="eyebrow">Finding the right product</p>
            <h2>Shop by type, language and set.</h2>
          </MotionReveal>
          <div className="ace-highlight-grid">
            {aceHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <MotionReveal
                  className="ace-highlight-card"
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
        className="section dark-section ace-commerce-section"
        data-nav-tone="dark"
      >
        <div className="section-inner ace-commerce-grid">
          <MotionReveal className="ace-commerce-copy">
            <p className="eyebrow eyebrow-light">From browsing to checkout</p>
            <h2>Keep the next step easy to find.</h2>
            <p>
              Search, basket and account links stay easy to reach while
              customers shop. Product prices and delivery information help them
              check the details before buying.
            </p>
          </MotionReveal>
          <MotionReveal className="ace-flow-stack" delay={0.12}>
            {[
              {
                title: "Shop",
                copy: "Type, language, era and set categories.",
                icon: HiOutlineShoppingBag,
              },
              {
                title: "Promote",
                copy: "Featured products, TikTok content and email updates.",
                icon: HiOutlineMegaphone,
              },
              {
                title: "Buy",
                copy: "Review the basket, delivery information and checkout.",
                icon: HiOutlineShieldCheck,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title}>
                  <Icon aria-hidden="true" />
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.copy}</span>
                  </div>
                </article>
              );
            })}
          </MotionReveal>
        </div>
      </section>

      <section
        className="section light-section ace-product-section"
        data-nav-tone="light"
      >
        <div className="section-inner ace-product-grid-wrap">
          <MotionReveal className="ace-product-copy">
            <p className="eyebrow">Product catalogue</p>
            <h2>The product details shoppers need.</h2>
            <p>
              Product cards put the image, name and price first so collectors
              can browse the range and choose what to explore.
            </p>
          </MotionReveal>
          <div>
            <p className="visual-caption">
              Product display examples · prices shown for illustration.
            </p>
            <div className="ace-product-grid">
              {aceProductDrops.map((item, index) => (
                <MotionReveal
                  className="ace-product-card"
                  delay={index * 0.08}
                  key={item.title}
                >
                  <Image
                    alt={`${item.title} product image`}
                    height={800}
                    src={item.image}
                    width={800}
                  />
                  <span>{item.title}</span>
                  <strong>{item.price}</strong>
                </MotionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="section dark-section compact-cta ace-cta-section"
        data-nav-tone="dark"
      >
        <div className="section-inner cta-row">
          <MotionReveal>
            <p className="eyebrow eyebrow-light">Retail build</p>
            <h2>Need an online store for a changing product range?</h2>
          </MotionReveal>
          <Link className="button button-light" href="/contact">
            Discuss an online store <HiArrowLongRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
