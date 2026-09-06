import Image from "next/image";
import Link from "next/link";
import {
  HiArrowLongRight,
  HiOutlineMusicalNote,
  HiOutlinePrinter,
} from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";
import type { WorkProject } from "@/content/work";

export function WorkGrid({ projects }: { projects: WorkProject[] }) {
  return (
    <div className="work-grid">
      {projects.map((project, index) => (
        <MotionReveal
          as="article"
          className={`work-card work-${project.slug}`}
          key={project.slug}
          delay={index * 0.04}
        >
          <Link
            className="work-card-link"
            href={project.href}
            aria-label={`View ${project.name} case study`}
          >
            <div className="work-card-art">
              {project.image ? (
                <Image
                  src={project.image}
                  unoptimized={project.slug === "good-game-apparel"}
                  alt={project.imageAlt}
                  width={900}
                  height={500}
                  sizes="(max-width: 720px) 92vw, (max-width: 1080px) 45vw, 30vw"
                />
              ) : (
                <div className="work-product-mark" aria-hidden="true">
                  {project.slug === "sonacrate" ? (
                    <HiOutlineMusicalNote />
                  ) : (
                    <HiOutlinePrinter />
                  )}
                  <span>
                    {project.slug === "sonacrate"
                      ? "Stream. Discover. Own."
                      : "Upload. Arrange. Order."}
                  </span>
                </div>
              )}
            </div>
            <div className="work-card-copy">
              <p className="work-category">{project.category}</p>
              <h3>{project.name}</h3>
              <p>{project.copy}</p>
              <p className="work-role">
                <strong>Our work:</strong> {project.role}
              </p>
              <span className="text-link">
                View case study <HiArrowLongRight aria-hidden="true" />
              </span>
            </div>
          </Link>
        </MotionReveal>
      ))}
    </div>
  );
}
