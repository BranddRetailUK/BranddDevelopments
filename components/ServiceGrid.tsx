import type { Service } from "@/content/site";
import { MotionReveal } from "@/components/MotionReveal";

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
          </MotionReveal>
        );
      })}
    </div>
  );
}
