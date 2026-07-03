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
import { StructuredData } from "@/components/StructuredData";
import { absoluteUrl, createBreadcrumbJsonLd, createPageMetadata, organizationId } from "@/content/seo";

export const metadata = createPageMetadata({
  title: "Ace Hits TCG",
  description:
    "Ace Hits TCG project page for a high-energy collector retail storefront with drops, product navigation, cart, account, and trust-led shopping.",
  path: "/projects/ace-hits-tcg",
  keywords: ["collector retail storefront", "TCG ecommerce", "Shopify storefront", "product navigation"],
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

const aceSignals = [
  "New in",
  "Shop by type",
  "Pokemon TCG",
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
            { name: "Websites", path: "/projects" },
            { name: "Ace Hits TCG", path: "/projects/ace-hits-tcg" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "Ace Hits TCG",
            description:
              "Collector retail storefront work with product drops, category navigation, cart, account, trust cues, and mobile shopping.",
            url: absoluteUrl("/projects/ace-hits-tcg"),
            creator: {
              "@id": organizationId,
            },
          },
        ]}
      />
      <section className="section dark-section ace-project-hero" data-nav-tone="dark">
        <div className="section-inner ace-hero-grid">
          <MotionReveal className="ace-hero-copy">
            <p className="eyebrow eyebrow-light">Ace Hits TCG</p>
            <Image
              alt="Ace Hits TCG"
              className="ace-hero-logo"
              height={220}
              priority
              src={aceLogo}
              width={600}
            />
            <h1>High-energy TCG storefront for collector drops.</h1>
            <p>
              Ace Hits TCG is a fast retail site for Pokemon cards, sealed
              products, accessories and collector drops. The experience is built
              around clear categories, strong product visuals, cart flow and
              trust-led shopping.
            </p>
            <div className="ace-hero-actions">
              <a
                className="button ace-button"
                href="https://www.acehitstcg.co.uk/"
                rel="noreferrer"
                target="_blank"
              >
                View Ace Hits TCG <HiArrowTopRightOnSquare aria-hidden="true" />
              </a>
              <Link className="button button-light ace-secondary-button" href="/projects">
                Back to websites <HiArrowLongRight aria-hidden="true" />
              </Link>
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

      <section className="section light-section ace-retail-section" data-nav-tone="light">
        <div className="section-inner">
          <MotionReveal className="section-heading ace-section-heading">
            <p className="eyebrow">Storefront shape</p>
            <h2>A collector shop built around drops, categories and quick buying decisions.</h2>
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

      <section className="section dark-section ace-commerce-section" data-nav-tone="dark">
        <div className="section-inner ace-commerce-grid">
          <MotionReveal className="ace-commerce-copy">
            <p className="eyebrow eyebrow-light">Commerce flow</p>
            <h2>Product discovery, basket, account and checkout all stay close to the shopper.</h2>
            <p>
              The site keeps key retail actions visible: search, account login,
              cart drawer, product prices, shipping prompts, newsletter signup
              and social channels.
            </p>
          </MotionReveal>
          <MotionReveal className="ace-flow-stack" delay={0.12}>
            {[
              { title: "Shop", copy: "Type, language, era and set categories.", icon: HiOutlineShoppingBag },
              { title: "Promote", copy: "Banners, drops, TikTok proof and newsletter.", icon: HiOutlineMegaphone },
              { title: "Convert", copy: "Cart, account, shipping message and checkout.", icon: HiOutlineShieldCheck },
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

      <section className="section light-section ace-product-section" data-nav-tone="light">
        <div className="section-inner ace-product-grid-wrap">
          <MotionReveal className="ace-product-copy">
            <p className="eyebrow">Product catalogue</p>
            <h2>Trading-card retail needs a catalogue that is easy to scan.</h2>
            <p>
              Product cards carry the essentials first: image, product name,
              price, stock path and checkout intent.
            </p>
          </MotionReveal>
          <div className="ace-product-grid">
            {aceProductDrops.map((item, index) => (
              <MotionReveal className="ace-product-card" delay={index * 0.08} key={item.title}>
                <Image alt={`${item.title} product image`} height={800} src={item.image} width={800} />
                <span>{item.title}</span>
                <strong>{item.price}</strong>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-section compact-cta ace-cta-section" data-nav-tone="dark">
        <div className="section-inner cta-row">
          <MotionReveal>
            <p className="eyebrow eyebrow-light">Retail build</p>
            <h2>Need a store that moves with product drops?</h2>
          </MotionReveal>
          <Link className="button button-light" href="/contact">
            Plan a commerce project <HiArrowLongRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
