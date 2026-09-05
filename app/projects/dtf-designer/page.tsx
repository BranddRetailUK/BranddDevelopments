import Link from "next/link";
import { HiArrowLongRight, HiArrowTopRightOnSquare } from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";
import { MvpProductVisual } from "@/components/MvpProductVisual";
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
  title: "DTF Designer case study",
  description:
    "Brandd’s print-ordering tool connects artwork uploads, sheet layout, quantity-based pricing and production status.",
  path: "/projects/dtf-designer",
});

export default function DtfDesignerPage() {
  return (
    <>
      <StructuredData
        data={[
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Our work", path: "/projects" },
            { name: "DTF Designer", path: "/projects/dtf-designer" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "DTF Designer",
            url: absoluteUrl("/projects/dtf-designer"),
            description:
              "Print ordering with artwork uploads, layout tools and production status.",
            creator: { "@id": organizationId },
          },
        ]}
      />
      <section
        className="page-hero page-hero-dark product-case-hero mvp-dtf-gang-designer"
        data-nav-tone="dark"
      >
        <div className="section-inner two-column">
          <MotionReveal className="page-hero-copy">
            <Link className="case-back-link" href="/projects">
              ← Our work
            </Link>
            <p className="eyebrow eyebrow-light">
              DTF Designer · Print ordering
            </p>
            <h1>From customer artwork to a print-ready order.</h1>
            <p>
              A print-ordering tool where customers upload artwork, arrange
              print sheets and submit orders with quantity-based pricing. Staff
              can review the files and update production status.
            </p>
            <div className="hero-actions">
              <Link className="button button-light" href="/contact">
                Discuss an ordering tool <HiArrowLongRight aria-hidden="true" />
              </Link>
              <a
                className="button button-outline"
                href="https://dtf-uploader-production.up.railway.app/"
                target="_blank"
                rel="noreferrer"
              >
                Explore DTF Designer{" "}
                <HiArrowTopRightOnSquare aria-hidden="true" />
              </a>
            </div>
          </MotionReveal>
          <MotionReveal className="product-case-visual">
            <MvpProductVisual slug="dtf-gang-designer" />
            <p className="visual-caption">
              Layout interface preview · example artwork and pricing.
            </p>
          </MotionReveal>
        </div>
      </section>
      <ProjectBrief
        need="Give print customers one place to prepare files, specify quantities and submit an order that staff can review for production."
        role="Customer accounts, artwork uploads, a print-sheet layout canvas, order pricing and production-status tools."
        result="Customers can keep drafts, preview files and view previous orders. Staff can review submitted files and move orders through production."
      />
      <section className="section light-section" data-nav-tone="light">
        <div className="section-inner">
          <MotionReveal className="section-heading">
            <h2>One order, from layout to production.</h2>
          </MotionReveal>
          <div className="project-faq-grid">
            {[
              [
                "Prepare the artwork",
                "Upload existing PDFs or arrange artwork on a 560mm × 1000mm print sheet. The layout can be saved as a PDF and included in the order.",
              ],
              [
                "Check quantities and price",
                "Each sheet’s quantity contributes to the order total. Customers can review the price and VAT before submitting.",
              ],
              [
                "Follow the order",
                "Customer accounts keep an order history. Staff review the files and update the status as work is received, produced and completed.",
              ],
            ].map(([title, copy]) => (
              <MotionReveal as="article" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>
      <ProjectContact title="Could your customers do more online?" />
    </>
  );
}
