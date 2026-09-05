import Link from "next/link";
import { HiArrowLongRight } from "react-icons/hi2";

export function ProjectContact({
  title = "What would you like to build?",
}: {
  title?: string;
}) {
  return (
    <section className="section dark-section compact-cta" data-nav-tone="dark">
      <div className="section-inner cta-row">
        <div>
          <h2>{title}</h2>
          <p className="section-copy">
            A few sentences about your business and the problem are enough to
            get started.
          </p>
        </div>
        <Link className="button button-light" href="/contact">
          Discuss a project <HiArrowLongRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
