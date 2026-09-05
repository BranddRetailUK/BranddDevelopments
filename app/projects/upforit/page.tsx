import Image from "next/image";
import Link from "next/link";
import { HiArrowLongRight, HiArrowTopRightOnSquare } from "react-icons/hi2";
import { MotionReveal } from "@/components/MotionReveal";
import { ProjectBrief } from "@/components/ProjectBrief";
import { ProjectContact } from "@/components/ProjectContact";
import { StructuredData } from "@/components/StructuredData";
import { upForItAssets } from "@/content/work";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  absoluteUrl,
  organizationId,
} from "@/content/seo";

export const metadata = createPageMetadata({
  title: "UpForIt case study",
  description:
    "Brandd’s event website work connects ticket sales, customer QR tickets and staff check-in for UpForIt.",
  path: "/projects/upforit",
});
const upForItTiers = [
  { name: "Early Bird", price: "£5.00", status: "Example tier" },
  { name: "General Release", price: "£7.50", status: "Example tier" },
  { name: "On The Door", price: "£10.00", status: "Example tier" },
];

export default function UpForItPage() {
  return (
    <>
      <StructuredData
        data={[
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Our work", path: "/projects" },
            { name: "UpForIt", path: "/projects/upforit" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "UpForIt",
            url: absoluteUrl("/projects/upforit"),
            description: "Event website, ticket sales and QR check-in.",
            creator: { "@id": organizationId },
          },
        ]}
      />
      <section
        className="section upforit-showcase-section upforit-case-hero"
        data-nav-tone="light"
      >
        <div className="section-inner upforit-showcase-grid">
          <MotionReveal className="upforit-showcase-copy">
            <Link className="case-back-link" href="/projects">
              ← Our work
            </Link>
            <div className="upforit-brand-lockup">
              <Image
                src={upForItAssets.logo}
                alt="UpForIt"
                width={1202}
                height={1174}
              />
              <span>Events and ticketing</span>
            </div>
            <h1>An event website with ticketing built in.</h1>
            <p>
              Brandd’s work brings event discovery, ticket sales and QR check-in
              together for UpForIt. Customers buy tickets on the event website
              and find them in their account when it is time to attend.
            </p>
            <div className="hero-actions">
              <Link className="button upforit-button" href="/contact">
                Discuss an event website <HiArrowLongRight aria-hidden="true" />
              </Link>
              <a
                className="button upforit-secondary-button"
                href="https://www.upforitevents.co.uk/"
                target="_blank"
                rel="noreferrer"
              >
                Visit UpForIt <HiArrowTopRightOnSquare aria-hidden="true" />
              </a>
            </div>
            <p className="visual-caption">
              Ticketing interface preview · example event, tiers and prices.
            </p>
          </MotionReveal>
          <MotionReveal
            className="upforit-browser"
            delay={0.12}
            aria-hidden="true"
          >
            <div className="upforit-browser-bar">
              <span />
              <span />
              <span />
              <strong>upforitevents.co.uk/events/summer-roundup-2026</strong>
            </div>
            <div className="upforit-event-preview">
              <Image
                alt=""
                className="upforit-event-background"
                fill
                sizes="(max-width: 1080px) 92vw, 48vw"
                src={upForItAssets.background}
              />
              <div className="upforit-event-art">
                <Image
                  alt=""
                  height={164}
                  src={upForItAssets.presents}
                  width={840}
                />
                <Image
                  alt=""
                  height={1026}
                  src={upForItAssets.title}
                  width={1865}
                />
              </div>
              <div className="upforit-event-facts">
                <span>
                  <small>Date</small>
                  <strong>26 September</strong>
                </span>
                <span>
                  <small>Time</small>
                  <strong>Noon–11PM</strong>
                </span>
                <span>
                  <small>Venue</small>
                  <strong>McCarthys</strong>
                </span>
              </div>
              <div className="upforit-ticket-panel">
                <div className="upforit-ticket-heading">
                  <strong>Tickets</strong>
                  <span>Example order</span>
                </div>
                <div className="upforit-ticket-tiers">
                  {upForItTiers.map((tier, index) => (
                    <article
                      className={index === 0 ? "is-live" : ""}
                      key={tier.name}
                    >
                      <div>
                        <strong>{tier.name}</strong>
                        <small>{tier.status}</small>
                      </div>
                      <b>{tier.price}</b>
                      {index === 0 ? (
                        <span className="upforit-ticket-quantity">
                          ← <b>1</b> →
                        </span>
                      ) : (
                        <span className="upforit-coming-soon">
                          Example tier
                        </span>
                      )}
                    </article>
                  ))}
                </div>
                <div className="upforit-ticket-total">
                  <span>Total</span>
                  <strong>£5.00</strong>
                  <b>Checkout preview</b>
                </div>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>
      <ProjectBrief
        need="Let customers discover events, buy the right ticket and keep it ready for entry, while giving staff a way to check admissions."
        role="Event website design and development, Stripe checkout, customer ticket accounts and staff QR check-in tools."
        result="Paid orders create downloadable tickets with individual QR codes. Staff can scan them and record admissions to prevent repeat entry."
      />
      <section className="section dark-section" data-nav-tone="dark">
        <div className="section-inner">
          <MotionReveal className="section-heading">
            <h2>From choosing an event to checking in.</h2>
          </MotionReveal>
          <div className="project-faq-grid">
            {[
              [
                "Buy a ticket",
                "Customers choose a ticket tier and quantity, sign in and pay through Stripe checkout.",
              ],
              [
                "Keep it in the account",
                "A ticket wallet stores purchases and downloadable tickets, with a unique QR code for each admission.",
              ],
              [
                "Scan at the door",
                "Staff use a restricted check-in area to validate the ticket and record entry against the order.",
              ],
            ].map(([title, copy]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ProjectContact title="Planning an event website?" />
    </>
  );
}
