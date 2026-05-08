import type { Metadata } from "next";
import {
  HiOutlineCalendarDays,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { ContactForm } from "@/components/ContactForm";
import { MotionReveal } from "@/components/MotionReveal";
import { ScrollAccent } from "@/components/ScrollAccent";
import { ScrollBridge } from "@/components/ScrollBridge";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project brief with BRANDD Developments for web design, development, backend, database, MVP, retail, and ecommerce services.",
};

const contactCards = [
  {
    title: "Project enquiries",
    copy: "Share the goal, the current problem, and what needs to happen next.",
    icon: HiOutlineEnvelope,
  },
  {
    title: "Planning sessions",
    copy: "Map the offer, user journey, system needs, integrations, and launch path.",
    icon: HiOutlineCalendarDays,
  },
  {
    title: "UK based, online first",
    copy: "Built for focused collaboration with clear checkpoints and practical delivery.",
    icon: HiOutlineMapPin,
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="page-hero page-hero-light section-grid contact-hero" data-nav-tone="light">
        <MotionReveal className="page-hero-copy">
          <p className="eyebrow">Contact</p>
          <h1>Tell us what you are building, improving or trying to fix.</h1>
          <p>
            Whether you need a new website, a customer portal, an MVP, a backend
            system, a database clean-up, an ecommerce workflow or a custom
            business integration, Brandd can help shape the next step.
          </p>
        </MotionReveal>
        <MotionReveal className="contact-signal" delay={0.12}>
          <HiOutlineSparkles aria-hidden="true" />
          <strong>Brief received</strong>
          <span>Scope, direction, and delivery path</span>
        </MotionReveal>
      </section>

      <ScrollBridge tone="dark" label="Brief to build plan" variant="sweep-left" />

      <section className="section dark-section" data-nav-tone="dark">
        <div className="section-inner contact-layout">
          <ScrollAccent
            className="section-accent section-accent-contact"
            rotateFrom={-10}
            rotateTo={9}
            xFrom="5%"
            xTo="-4%"
            yFrom="-5%"
            yTo="5%"
          />
          <div className="contact-info">
            {contactCards.map((item, index) => {
              const Icon = item.icon;
              return (
                <MotionReveal
                  className="contact-card"
                  delay={index * 0.07}
                  key={item.title}
                >
                  <Icon aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </MotionReveal>
              );
            })}
          </div>
          <MotionReveal delay={0.12}>
            <ContactForm />
          </MotionReveal>
        </div>
      </section>
    </>
  );
}
