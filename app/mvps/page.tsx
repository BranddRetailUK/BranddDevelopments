import type { Metadata } from "next";
import Link from "next/link";
import {
  HiArrowLongRight,
  HiArrowTopRightOnSquare,
  HiOutlineCheckBadge,
  HiOutlineCursorArrowRays,
  HiOutlineRocketLaunch,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";
import { MvpProductVisual } from "@/components/MvpProductVisual";
import { ScrollBridge } from "@/components/ScrollBridge";
import { mvpShowcases } from "@/content/site";

export const metadata: Metadata = {
  title: "MVPs",
  description:
    "One-off project builds and version-one MVP design and development from Brandd.",
};

const buildStages = [
  {
    title: "Product scoping",
    eyebrow: "Stage 01",
    headline: "Turn the rough idea into a buildable product shape.",
    copy: "Product scoping turns the first idea into a clear feature set, user journey, commercial test, and launch plan.",
    detail:
      "This is where the must-have flow, user roles, data needs, integration points, and first release boundary get defined before design or development starts.",
    icon: HiOutlineSquares2X2,
    imageTitle: "Scope map",
    imageItems: ["Audience", "Core flow", "Feature boundary"],
  },
  {
    title: "Prototype to product",
    eyebrow: "Stage 02",
    headline: "Move from prototype screens into a usable version one.",
    copy: "The first usable product needs proper frontend, backend, and database foundations, even when the feature set is focused.",
    detail:
      "The build is structured so the MVP can onboard users, collect real data, support the first workflow, and be improved without throwing the first version away.",
    icon: HiOutlineRocketLaunch,
    imageTitle: "Product build",
    imageItems: ["Frontend UI", "Backend logic", "Data layer"],
  },
  {
    title: "Accounts and dashboards",
    eyebrow: "Stage 03",
    headline: "Add the account areas and dashboards the product depends on.",
    copy: "Many MVPs need signup, login, saved data, customer profiles, creator accounts, order lists, and admin views from the start.",
    detail:
      "This layer is where user activity, uploads, pricing rules, purchase logic, profile data, and team management tools become visible and useful.",
    icon: HiOutlineCursorArrowRays,
    imageTitle: "Dashboard layer",
    imageItems: ["User account", "Saved data", "Admin view"],
  },
];

const beatifyShowcase = mvpShowcases[0];
const dtfShowcase = mvpShowcases[1];

const deliverySteps = [
  "Define the outcome, audience, offer, and must-have feature set.",
  "Design the user journey and interface around the first commercial test.",
  "Build the frontend, backend, data structure, and integrations needed for launch.",
  "Add the account, upload, pricing, payment, dashboard, or purchase logic the MVP depends on.",
  "Release a version-one product with a practical improvement path.",
];

function MvpStageSection({
  item,
  index,
}: {
  item: (typeof buildStages)[number];
  index: number;
}) {
  const Icon = item.icon;

  return (
    <section className="section dark-section mvp-stage-section" data-nav-tone="dark">
      <div className="section-inner mvp-stage-panel">
        <MotionReveal className="mvp-stage-copy" delay={index * 0.04}>
          <div className="mvp-stage-icon">
            <Icon aria-hidden="true" />
          </div>
          <p className="eyebrow eyebrow-light">{item.eyebrow}</p>
          <h2>{item.headline}</h2>
          <p>{item.copy}</p>
          <p>{item.detail}</p>
        </MotionReveal>
        <MotionReveal className="mvp-stage-media" delay={0.1 + index * 0.04}>
          <div className="mvp-stage-media-top">
            <span>{item.title}</span>
            <strong>{item.imageTitle}</strong>
          </div>
          <div className="mvp-stage-media-body" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="mvp-stage-media-list">
            {item.imageItems.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}

export default function MvpsPage() {
  const [productScopingStage, prototypeStage, dashboardStage] = buildStages;

  return (
    <>
      <section className="page-hero page-hero-dark section-grid" data-nav-tone="dark">
        <MotionReveal className="page-hero-copy">
          <p className="eyebrow eyebrow-light">MVPs</p>
          <h1>MVPs built to test the idea.</h1>
          <p>
            Brandd builds focused first versions that launch quickly, onboard
            real users and give the next build clear direction.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/contact">
              Scope an MVP <HiArrowLongRight aria-hidden="true" />
            </Link>
            <Link className="button button-outline" href="/projects">
              View project types
            </Link>
          </div>
        </MotionReveal>

        <MotionReveal className="about-mark mvp-mark" delay={0.12}>
          <span>Design</span>
          <span>Build</span>
          <span>Launch</span>
          <span>Learn</span>
        </MotionReveal>
      </section>

      <ScrollBridge
        tone="dark"
        label="Focused scope with launch momentum"
        variant="rise"
      />

      <section className="section dark-section mvp-project-section mvp-beatify" data-nav-tone="dark">
        <div className="section-inner mvp-project-panel">
          <MotionReveal className="mvp-detail-copy">
            <p className="eyebrow eyebrow-light">{beatifyShowcase.eyebrow}</p>
            <h2>{beatifyShowcase.name}</h2>
            <p>{beatifyShowcase.shortCopy}</p>
            <p>{beatifyShowcase.expandedCopy}</p>
            <a
              className="button button-light button-mvp-accent"
              href={beatifyShowcase.href}
              rel="noreferrer"
              target="_blank"
            >
              Open Beatify <HiArrowTopRightOnSquare aria-hidden="true" />
            </a>
          </MotionReveal>
          <MotionReveal className="mvp-project-media" delay={0.12}>
            <MvpProductVisual slug={beatifyShowcase.slug} />
            <ul className="mvp-feature-list mvp-feature-list-dark">
              {beatifyShowcase.features.map((feature) => (
                <li key={feature.title}>
                  <strong>{feature.title}</strong>
                  <span>{feature.copy}</span>
                </li>
              ))}
            </ul>
          </MotionReveal>
        </div>
      </section>

      <MvpStageSection item={productScopingStage} index={0} />

      <ScrollBridge
        tone="light"
        label="Print workflow MVP"
        variant="snap-cross"
      />

      <section className="section light-section mvp-project-section mvp-dtf-gang-designer" data-nav-tone="light">
        <div className="section-inner mvp-project-panel">
          <MotionReveal className="mvp-detail-copy">
            <p className="eyebrow">{dtfShowcase.eyebrow}</p>
            <h2>{dtfShowcase.name}</h2>
            <p>{dtfShowcase.shortCopy}</p>
            <p>{dtfShowcase.expandedCopy}</p>
            <a
              className="button button-dark button-mvp-accent"
              href={dtfShowcase.href}
              rel="noreferrer"
              target="_blank"
            >
              Open DTF Designer <HiArrowTopRightOnSquare aria-hidden="true" />
            </a>
          </MotionReveal>
          <MotionReveal className="mvp-project-media" delay={0.12}>
            <MvpProductVisual slug={dtfShowcase.slug} />
            <ul className="mvp-feature-list">
              {dtfShowcase.features.map((feature) => (
                <li key={feature.title}>
                  <strong>{feature.title}</strong>
                  <span>{feature.copy}</span>
                </li>
              ))}
            </ul>
          </MotionReveal>
        </div>
      </section>

      <ScrollBridge
        tone="dark"
        label="MVP build stages"
        variant="sweep-left"
      />

      {[prototypeStage, dashboardStage].map((item, index) => (
        <MvpStageSection item={item} index={index + 1} key={item.title} />
      ))}

      <ScrollBridge
        tone="light"
        label="Launchable version one"
        variant="sweep-right"
      />

      <section className="section light-section delivery-section" data-nav-tone="light">
        <div className="section-inner two-column">
          <MotionReveal>
            <p className="eyebrow">Delivery shape</p>
            <h2>A direct path from idea to usable version one.</h2>
          </MotionReveal>
          <div className="engagement-list">
            {deliverySteps.map((item, index) => (
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
            <p className="eyebrow eyebrow-light">Ready to test</p>
            <h2>Bring the idea, the deadline, or the first customer problem.</h2>
          </MotionReveal>
          <Link className="button button-light" href="/contact">
            Start the build <HiOutlineCheckBadge aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
