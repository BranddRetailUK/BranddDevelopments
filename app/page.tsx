import Link from "next/link";
import Image from "next/image";
import { HiArrowLongRight } from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";
import { ServiceGrid } from "@/components/ServiceGrid";
import { WorkGrid } from "@/components/WorkGrid";
import { ProjectContact } from "@/components/ProjectContact";
import { StructuredData } from "@/components/StructuredData";
import { serviceGroups } from "@/content/site";
import { work } from "@/content/work";
import homepageBanner from "@/public/images/brandd/homepage-banner.png";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  defaultDescription,
  projectShowcaseJsonLd,
  servicesJsonLd,
} from "@/content/seo";

export const metadata = createPageMetadata({
  title: "Websites and software for your business",
  description: defaultDescription,
  path: "/",
});

export default function Home() {
  return (
    <>
      <StructuredData
        data={[
          createBreadcrumbJsonLd([{ name: "Home", path: "/" }]),
          servicesJsonLd,
          projectShowcaseJsonLd,
        ]}
      />
      <section className="hero hero-light home-intro" data-nav-tone="light">
        <div className="home-intro-art" aria-hidden="true">
          <Image
            src={homepageBanner}
            alt=""
            sizes="(min-width: 2000px) 2000px, 100vw"
            priority
          />
        </div>
        <MotionReveal className="hero-copy">
          <p className="eyebrow">Brandd · Design and development</p>
          <h1>Websites and software built around your business.</h1>
          <p className="hero-lede">
            We design websites, build online stores and replace outdated
            business software. From the pages your customers see to the tools
            your team uses, we help you plan, design and build what you need.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/contact">
              Discuss a project <HiArrowLongRight aria-hidden="true" />
            </Link>
            <Link className="button button-outline" href="/projects">
              See our work
            </Link>
          </div>
        </MotionReveal>
      </section>
      <section
        className="section dark-section selected-work-section"
        data-nav-tone="dark"
      >
        <div className="section-inner">
          <MotionReveal className="section-heading heading-with-link">
            <div>
              <p className="eyebrow eyebrow-light">Selected work</p>
              <h2>See what we’ve built.</h2>
            </div>
            <Link className="text-link" href="/projects">
              All our work <HiArrowLongRight aria-hidden="true" />
            </Link>
          </MotionReveal>
          <WorkGrid
            projects={work.filter((project) =>
              ["good-game-apparel", "upforit", "ace-hits-tcg"].includes(
                project.slug,
              ),
            )}
          />
        </div>
      </section>
      <section
        className="section light-section service-groups-section"
        data-nav-tone="light"
      >
        <div className="section-inner">
          <MotionReveal className="section-heading">
            <p className="eyebrow">How we can help</p>
            <h2>What do you need to improve?</h2>
          </MotionReveal>
          <ServiceGrid items={serviceGroups} />
        </div>
      </section>
      <section
        className="section dark-section about-section"
        id="about"
        data-nav-tone="dark"
      >
        <div className="section-inner two-column">
          <MotionReveal>
            <p className="eyebrow eyebrow-light">About Brandd</p>
            <h2>
              Design and development, from the website to the work behind it.
            </h2>
          </MotionReveal>
          <MotionReveal className="about-copy">
            <p>
              Brandd is a design and development studio based in Leighton
              Buzzard, Bedfordshire. Our work spans event ticketing, retail,
              music, print ordering and internal production systems.
            </p>
            <p>
              We also build our own products, including Good Game Apparel. That
              work connects the customer experience with the product tools,
              orders and fulfilment behind it.
            </p>
            <p>
              Whether you need a focused website or a more involved system, we
              start by understanding the problem and agreeing what the work
              needs to achieve. Ongoing support and management are available
              where required.
            </p>
            <Link className="text-link" href="/contact">
              Tell us what you have in mind{" "}
              <HiArrowLongRight aria-hidden="true" />
            </Link>
          </MotionReveal>
        </div>
      </section>
      <section
        className="section light-section process-section"
        data-nav-tone="light"
      >
        <div className="section-inner">
          <MotionReveal className="section-heading">
            <p className="eyebrow">Working together</p>
            <h2>From first conversation to launch.</h2>
          </MotionReveal>
          <div className="workflow-grid">
            {[
              [
                "01",
                "Agree the scope",
                "Work through the problem, priorities and what the first release needs to include.",
              ],
              [
                "02",
                "Review the design",
                "See how the pages and key tasks will work, with room to discuss the details.",
              ],
              [
                "03",
                "Build and test",
                "Check the website or system against the agreed requirements and prepare it for launch.",
              ],
            ].map(([step, title, copy]) => (
              <MotionReveal as="article" className="workflow-item" key={step}>
                <span className="step-number">{step}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </MotionReveal>
            ))}
          </div>
          <p className="process-note">
            The project scope sets out the work, costs and arrangements for
            launch, access and ongoing support.
          </p>
        </div>
      </section>
      <ProjectContact title="Tell us what you need to improve." />
    </>
  );
}
