import Link from "next/link";
import { HiArrowLongRight } from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";

export function ProjectBrief({
  need,
  role,
  result,
  note,
}: {
  need: string;
  role: string;
  result: string;
  note?: string;
}) {
  return (
    <section
      className="section light-section project-brief-section"
      data-nav-tone="light"
      aria-label="Project summary"
    >
      <div className="section-inner">
        <div className="project-brief-grid">
          {[
            ["The need", need],
            ["Brandd’s role", role],
            ["What it enables", result],
          ].map(([title, copy]) => (
            <MotionReveal as="article" key={title}>
              <h2>{title}</h2>
              <p>{copy}</p>
            </MotionReveal>
          ))}
        </div>
        {note ? <p className="visual-caption">{note}</p> : null}
        <Link className="text-link" href="/contact">
          Discuss a similar project <HiArrowLongRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
