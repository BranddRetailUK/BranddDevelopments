import type { Metadata } from "next";
import Link from "next/link";
import {
  HiArrowTopRightOnSquare,
  HiOutlineArrowDownTray,
  HiOutlineChartBarSquare,
  HiOutlineCheckBadge,
  HiOutlineCloudArrowUp,
  HiOutlineMagnifyingGlass,
  HiOutlineMusicalNote,
  HiOutlineRadio,
  HiOutlineShieldCheck,
  HiOutlineShoppingCart,
  HiOutlineSparkles,
  HiOutlineSpeakerWave,
} from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";
import { MvpProductVisual } from "@/components/MvpProductVisual";
import { ScrollBridge } from "@/components/ScrollBridge";
import { mvpShowcases } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Detailed Brandd project breakdowns for SonaCrate, DTF Designer, and focused version-one product builds.",
};

const sonacrateShowcase = mvpShowcases[0];
const dtfShowcase = mvpShowcases[1];

const sonacrateOverview = [
  {
    title: "Listener shell",
    copy: "Home, New Releases, My Tracks, Playlists, Genres, Artists, and Tracks sit inside a persistent player layout.",
    icon: HiOutlineSpeakerWave,
  },
  {
    title: "Real playback",
    copy: "Processed 128 kbps streams resolve through signed media URLs and record playback events in the API.",
    icon: HiOutlineRadio,
  },
  {
    title: "Cart to download",
    copy: "Track rows add music to cart, checkout groups tracks by release, and purchases unlock the 320 kbps file.",
    icon: HiOutlineShoppingCart,
  },
];

const creatorFeatures = [
  {
    title: "Creator Studio",
    copy: "Artist and label accounts get Overview, Releases, Upload, Analytics, and Profile areas instead of a listener rail.",
    icon: HiOutlineMusicalNote,
  },
  {
    title: "Upload flow",
    copy: "Creators can upload audio, cover artwork, release genres, track genres, or import a ZIP of release files.",
    icon: HiOutlineCloudArrowUp,
  },
  {
    title: "Release checks",
    copy: "Publishing is gated by identity verification, rights attestation, copyright scans, and media processing jobs.",
    icon: HiOutlineShieldCheck,
  },
  {
    title: "Sales view",
    copy: "Analytics shows sales, streams, revenue, and release-level activity from real API-backed totals.",
    icon: HiOutlineChartBarSquare,
  },
];

const comparisonItems = [
  {
    title: "Spotify",
    copy: "Great for starting playback and finding a mood quickly, but listeners stream access rather than buying a file they can keep.",
    icon: HiOutlineSpeakerWave,
  },
  {
    title: "Beatport",
    copy: "Strong for buying tracks, but discovery can feel narrow when the listener does not already know the artist, label, chart, or genre lane.",
    icon: HiOutlineArrowDownTray,
  },
  {
    title: "SonaCrate",
    copy: "Built to join both ideas: stream first, browse releases and genres, save tracks, then buy and unlock the 320 kbps download.",
    icon: HiOutlineSparkles,
  },
];

const sonacrateFlow = [
  "Browse New Releases",
  "Filter by Genres",
  "Play 128 kbps",
  "Add to cart",
  "Unlock 320 kbps",
];

function SonaCrateCreatorVisual() {
  return (
    <div className="sonacrate-creator-ui" aria-hidden="true">
      <div className="sonacrate-creator-top">
        <strong>Creator Studio</strong>
        <span>Upload</span>
        <span>Profile</span>
      </div>
      <div className="sonacrate-creator-body">
        <div className="sonacrate-creator-nav">
          {["Overview", "Releases", "Analytics", "My Profile"].map((item, index) => (
            <span className={index === 1 ? "is-active" : ""} key={item}>
              {item}
            </span>
          ))}
        </div>
        <div className="sonacrate-release-workspace">
          <div className="sonacrate-upload-card">
            <span>Release upload</span>
            <strong>Midnight Signal EP</strong>
            <div className="sonacrate-upload-grid">
              <em>Cover art</em>
              <em>Audio files</em>
              <em>Primary genre</em>
              <em>ZIP import</em>
            </div>
          </div>
          <div className="sonacrate-rights-card">
            <strong>Ready to publish</strong>
            {["Verify identity", "Confirm rights", "Copyright scan", "Process media"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="sonacrate-analytics-row">
          {[
            ["Sales", "28"],
            ["Streams", "1,284"],
            ["Revenue", "£27.72"],
          ].map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SonaCrateModelVisual() {
  return (
    <div className="sonacrate-model-ui" aria-hidden="true">
      <div className="sonacrate-model-search">
        <HiOutlineMagnifyingGlass aria-hidden="true" />
        <span>Search tracks, artists, labels, genres</span>
      </div>
      <div className="sonacrate-model-flow">
        {sonacrateFlow.map((item, index) => (
          <span key={item}>
            <em>{String(index + 1).padStart(2, "0")}</em>
            {item}
          </span>
        ))}
      </div>
      <div className="sonacrate-model-track">
        <div>
          <strong>City Lights</strong>
          <span>128 kbps stream ready</span>
        </div>
        <div>
          <strong>£0.99</strong>
          <span>320 kbps download after purchase</span>
        </div>
      </div>
    </div>
  );
}

function FeatureGrid({
  items,
  tone = "dark",
}: {
  items: typeof sonacrateOverview;
  tone?: "dark" | "green";
}) {
  return (
    <div className={`sonacrate-feature-grid sonacrate-feature-grid-${tone}`}>
      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <MotionReveal
            as="article"
            className="sonacrate-feature-card"
            delay={index * 0.06}
            key={item.title}
            once={false}
          >
            <Icon aria-hidden="true" />
            <strong>{item.title}</strong>
            <p>{item.copy}</p>
          </MotionReveal>
        );
      })}
    </div>
  );
}

export default function MvpsPage() {
  return (
    <>
      <section className="page-hero page-hero-dark section-grid" data-nav-tone="dark">
        <MotionReveal className="page-hero-copy" once={false}>
          <p className="eyebrow eyebrow-light">Projects</p>
          <h1>Inside the build.</h1>
          <p>
            Brandd project pages now go deeper than a simple showcase. First up
            is SonaCrate: a music platform built around creator uploads,
            listener discovery, streaming, carts, and paid downloads.
          </p>
          <div className="hero-actions">
            <a
              className="button button-dark"
              href={sonacrateShowcase.href}
              rel="noreferrer"
              target="_blank"
            >
              Open SonaCrate <HiArrowTopRightOnSquare aria-hidden="true" />
            </a>
            <Link className="button button-outline" href="/contact">
              Start a project
            </Link>
          </div>
        </MotionReveal>

        <MotionReveal className="about-mark mvp-mark" delay={0.12} once={false}>
          <span>Stream</span>
          <span>Upload</span>
          <span>Discover</span>
          <span>Download</span>
        </MotionReveal>
      </section>

      <ScrollBridge
        tone="dark"
        label="SonaCrate service overview"
        variant="rise"
      />

      <section className="section dark-section mvp-project-section mvp-sonacrate sonacrate-breakdown-section" data-nav-tone="dark">
        <div className="section-inner mvp-project-panel sonacrate-breakdown-panel">
          <MotionReveal className="mvp-detail-copy sonacrate-copy" once={false}>
            <p className="eyebrow eyebrow-light">{sonacrateShowcase.eyebrow}</p>
            <h2>{sonacrateShowcase.name}</h2>
            <p>{sonacrateShowcase.shortCopy}</p>
            <p>
              The product is built as a real listener and creator system: Next.js
              frontend, Fastify API, Prisma data, BullMQ worker jobs, R2-style
              storage, signed playback URLs, release processing, and a cart path
              for download ownership.
            </p>
            <a
              className="button button-light button-mvp-accent"
              href={sonacrateShowcase.href}
              rel="noreferrer"
              target="_blank"
            >
              Open SonaCrate <HiArrowTopRightOnSquare aria-hidden="true" />
            </a>
          </MotionReveal>
          <MotionReveal className="mvp-project-media" delay={0.12} once={false}>
            <MvpProductVisual slug={sonacrateShowcase.slug} />
          </MotionReveal>
        </div>
        <div className="section-inner sonacrate-feature-wrap">
          <FeatureGrid items={sonacrateOverview} />
        </div>
      </section>

      <section className="section sonacrate-green-section sonacrate-breakdown-section" data-nav-tone="light">
        <div className="section-inner sonacrate-split-panel">
          <MotionReveal className="sonacrate-green-copy" once={false}>
            <p className="eyebrow">Artist and label tools</p>
            <h2>Upload. Check. Track.</h2>
            <p>
              SonaCrate gives artists and labels their own working side of the
              app, not just an upload form. The creator area handles releases,
              artwork, genre data, profile details, identity checks, rights
              confirmation, copyright scans, media processing, and analytics.
            </p>
          </MotionReveal>
          <MotionReveal delay={0.1} once={false}>
            <SonaCrateCreatorVisual />
          </MotionReveal>
        </div>
        <div className="section-inner sonacrate-feature-wrap">
          <FeatureGrid items={creatorFeatures} tone="green" />
        </div>
      </section>

      <section className="section dark-section mvp-project-section mvp-sonacrate sonacrate-breakdown-section" data-nav-tone="dark">
        <div className="section-inner sonacrate-split-panel sonacrate-split-panel-reverse">
          <MotionReveal delay={0.08} once={false}>
            <SonaCrateModelVisual />
          </MotionReveal>
          <MotionReveal className="mvp-detail-copy sonacrate-copy" once={false}>
            <p className="eyebrow eyebrow-light">Stream and own</p>
            <h2>Best of both.</h2>
            <p>
              Spotify is strong for easy listening, but it is stream-only.
              Beatport is strong for downloads, but finding new music can feel
              harder when you do not already know what to search for.
            </p>
            <p>
              SonaCrate is built to sit between those habits: listeners can
              browse new releases, genres, artists, and tracks, stream music
              first, save what matters, then buy the track and unlock a 320 kbps
              download.
            </p>
          </MotionReveal>
        </div>
        <div className="section-inner sonacrate-comparison-grid">
          {comparisonItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <MotionReveal
                as="article"
                className="sonacrate-comparison-card"
                delay={index * 0.08}
                key={item.title}
                once={false}
              >
                <Icon aria-hidden="true" />
                <strong>{item.title}</strong>
                <p>{item.copy}</p>
              </MotionReveal>
            );
          })}
        </div>
      </section>

      <ScrollBridge
        tone="light"
        label="Print workflow project"
        variant="snap-cross"
      />

      <section className="section light-section mvp-project-section mvp-dtf-gang-designer" data-nav-tone="light">
        <div className="section-inner mvp-project-panel">
          <MotionReveal className="mvp-detail-copy" once={false}>
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
          <MotionReveal className="mvp-project-media" delay={0.12} once={false}>
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

      <section className="section dark-section compact-cta" data-nav-tone="dark">
        <div className="section-inner cta-row">
          <MotionReveal once={false}>
            <p className="eyebrow eyebrow-light">Next project</p>
            <h2>Bring the product, the audience, or the workflow.</h2>
          </MotionReveal>
          <Link className="button button-light" href="/contact">
            Start the project <HiOutlineCheckBadge aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
