import Link from "next/link";
import { HiArrowLongRight } from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";
import { WorkGrid } from "@/components/WorkGrid";
import { ProjectContact } from "@/components/ProjectContact";
import { StructuredData } from "@/components/StructuredData";
import { work } from "@/content/work";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  projectShowcaseJsonLd,
} from "@/content/seo";

export const metadata = createPageMetadata({
  title: "Our work",
  description:
    "Explore Brandd’s work in event ticketing, online retail, creator merchandise, music and print-ordering software.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <StructuredData
        data={[
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Our work", path: "/projects" },
          ]),
          projectShowcaseJsonLd,
        ]}
      />
      <section
        className="page-hero page-hero-dark work-intro"
        data-nav-tone="dark"
      >
        <MotionReveal className="page-hero-copy">
          <p className="eyebrow eyebrow-light">Our work</p>
          <h1>Websites and products we’ve built.</h1>
          <p>
            From selling event tickets to managing a merchandise business, these
            projects show the work behind the screens. Explore what each needed,
            what Brandd built and how it works.
          </p>
          <div className="hero-actions">
            <Link className="button button-light" href="/contact">
              Discuss a project <HiArrowLongRight aria-hidden="true" />
            </Link>
            <a className="button button-outline" href="#projects">
              Explore the projects
            </a>
          </div>
        </MotionReveal>
      </section>
      <section
        className="section light-section work-list-section"
        id="projects"
        data-nav-tone="light"
      >
        <div className="section-inner">
          <WorkGrid projects={work} />
        </div>
      </section>
      <section
        className="section light-section work-legacy-link"
        data-nav-tone="light"
      >
        <div className="section-inner cta-row">
          <div>
            <p className="eyebrow">Business software</p>
            <h2>Replacing an old Access database?</h2>
            <p>
              See how a production system became a browser-based dashboard while
              keeping familiar screens for staff.
            </p>
          </div>
          <Link className="button button-dark" href="/legacy-systems#project">
            Read the rebuild story <HiArrowLongRight aria-hidden="true" />
          </Link>
        </div>
      </section>
      <ProjectContact title="Need something similar for your business?" />
    </>
  );
}
