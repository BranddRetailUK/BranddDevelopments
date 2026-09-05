import Link from "next/link";
import { HiArrowLongRight, HiArrowTopRightOnSquare } from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";
import { MvpProductVisual } from "@/components/MvpProductVisual";
import { SonaCrateCreatorVisual } from "@/components/SonaCrateCreatorVisual";
import { ProjectBrief } from "@/components/ProjectBrief";
import { ProjectContact } from "@/components/ProjectContact";
import { StructuredData } from "@/components/StructuredData";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  absoluteUrl,
  organizationId,
} from "@/content/seo";

export const metadata = createPageMetadata({
  title: "SonaCrate case study",
  description:
    "How Brandd connects music discovery, streaming, paid downloads and creator release tools in SonaCrate.",
  path: "/projects/sonacrate",
});

export default function SonaCratePage() {
  return (
    <>
      <StructuredData
        data={[
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Our work", path: "/projects" },
            { name: "SonaCrate", path: "/projects/sonacrate" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "SonaCrate",
            url: absoluteUrl("/projects/sonacrate"),
            description:
              "Music streaming, paid downloads and creator release tools.",
            creator: { "@id": organizationId },
          },
        ]}
      />
      <section
        className="page-hero page-hero-dark product-case-hero mvp-sonacrate"
        data-nav-tone="dark"
      >
        <div className="section-inner two-column">
          <MotionReveal className="page-hero-copy">
            <Link className="case-back-link" href="/projects">
              ← Our work
            </Link>
            <p className="eyebrow eyebrow-light">SonaCrate · Music platform</p>
            <h1>Stream music. Buy the tracks you want to keep.</h1>
            <p>
              SonaCrate brings listening and music purchases into one platform.
              Artists and labels manage releases, while listeners discover
              tracks, play them and buy downloads.
            </p>
            <div className="hero-actions">
              <Link className="button button-light" href="/contact">
                Discuss a product <HiArrowLongRight aria-hidden="true" />
              </Link>
              <a
                className="button button-outline"
                href="https://www.sonacrate.com/"
                target="_blank"
                rel="noreferrer"
              >
                Visit SonaCrate <HiArrowTopRightOnSquare aria-hidden="true" />
              </a>
            </div>
          </MotionReveal>
          <MotionReveal className="product-case-visual">
            <MvpProductVisual slug="sonacrate" />
            <p className="visual-caption">
              Listener interface preview · sample music and activity.
            </p>
          </MotionReveal>
        </div>
      </section>
      <ProjectBrief
        need="Bring discovery, listening and music purchases together, with a separate workspace for the artists and labels publishing releases."
        role="Product design and development across listener accounts, creator tools, media processing, checkout and purchased downloads."
        result="Creators can prepare and manage releases. Listeners can discover music, save tracks and buy files to keep."
      />
      <section
        className="section sonacrate-green-section"
        data-nav-tone="light"
      >
        <div className="section-inner sonacrate-split-panel">
          <MotionReveal>
            <p className="eyebrow">The creator tools</p>
            <h2>From an audio upload to a published release.</h2>
            <p className="section-copy">
              The Creator Studio brings audio, artwork and release details into
              one workspace. Before publishing, creators verify their identity
              and confirm their rights to the music. Processing and copyright
              checks form part of the release workflow.
            </p>
            <ul className="plain-feature-list">
              <li>Upload audio, cover artwork and batches of release files.</li>
              <li>Manage releases, genres and profile details.</li>
              <li>Review sales, streams and revenue by release.</li>
            </ul>
          </MotionReveal>
          <MotionReveal>
            <SonaCrateCreatorVisual />
            <p className="visual-caption">
              Illustrative creator dashboard · sample data.
            </p>
          </MotionReveal>
        </div>
      </section>
      <section className="section dark-section" data-nav-tone="dark">
        <div className="section-inner two-column">
          <MotionReveal>
            <p className="eyebrow eyebrow-light">The listening experience</p>
            <h2>Discover a track, then decide how to keep listening.</h2>
            <p className="section-copy">
              Browse new releases, artists and genres without leaving the
              player. Saved tracks and playlists help listeners return to music,
              and purchases unlock downloadable files in their account.
            </p>
          </MotionReveal>
          <MotionReveal>
            <ol className="plain-feature-list numbered-features">
              <li>Browse releases and play a track.</li>
              <li>Save it to a library or playlist.</li>
              <li>Add tracks to the basket and check out.</li>
              <li>Download purchased music from the account.</li>
            </ol>
          </MotionReveal>
        </div>
      </section>
      <section
        className="section light-section technical-section"
        data-nav-tone="light"
      >
        <div className="section-inner">
          <details>
            <summary>Technical details</summary>
            <p>
              Next.js handles the web interface, with a Fastify API and Prisma
              for data access. BullMQ processes background media jobs. Signed
              playback URLs control access to processed audio, and purchase
              records determine download access. Streams use 128 kbps files;
              purchased downloads use 320 kbps files.
            </p>
          </details>
        </div>
      </section>
      <ProjectContact title="Have an idea for a digital product?" />
    </>
  );
}
