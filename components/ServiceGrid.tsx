import type { Service } from "@/content/site";
import { MotionReveal } from "@/components/MotionReveal";
import Link from "next/link";
import { HiArrowLongRight } from "react-icons/hi2";

export function ServiceGrid({ items }: { items: Service[] }) {
  return (
    <div className="service-grid">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <MotionReveal
            className={`service-card accent-${item.accent}`}
            delay={index * 0.06}
            key={item.title}
          >
            <div className="card-icon">
              <Icon aria-hidden="true" />
            </div>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
            {item.href ? (
              <Link
                className="text-link"
                href={item.href}
                aria-label={`Explore this service: ${item.title}`}
              >
                Explore this service <HiArrowLongRight aria-hidden="true" />
              </Link>
            ) : null}
          </MotionReveal>
        );
      })}
    </div>
  );
}
