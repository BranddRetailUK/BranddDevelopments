# Brandd Site Contract

This file describes the current feature shape of the Brandd website. It is a product and implementation contract for the codebase, not a changelog.

## Stack And Runtime

- The site is a Next.js App Router project using TypeScript, React, `next/image`, Framer Motion, and `react-icons`.
- Routes live under `app/`. Shared components live under `components/`. Shared content and navigation data live in `content/site.tsx`.
- Styling is handled through `app/globals.css` with global design tokens, page section classes, component classes, and responsive breakpoints.
- The site is primarily marketing/UI content with server-side contact submission and first-party site analytics APIs. There are no authentication flows or broader server-side business workflows in this repo.
- Contact enquiries use Postgres through `DATABASE_URL`. Schema changes are applied before deployment through versioned SQL migrations and `npm run db:migrate`, with optional separate schema-owner credentials in `DATABASE_MIGRATION_URL`. Runtime requests do not create or alter database tables.
- Contact abuse controls use bounded JSON parsing, a shared Postgres-backed rate limiter, strict service-focus and budget allowlists, idempotency keys, a hidden honeypot, a minimum form-fill interval, and optional Cloudflare Turnstile verification. Trusted client-IP, rate-limit, request-fingerprint, and Turnstile settings are documented in `.env.example`.
- Contact notification delivery uses a durable Postgres outbox. Accepted enquiries return before SendGrid or WhatsApp work completes, after-response processing handles the first delivery attempt, and the secret-protected internal notification endpoint supports scheduled retries.
- First-party site analytics events use Postgres through `DATABASE_URL`, accept only the documented event and property names, use bounded request bodies and the shared Postgres rate limiter, and can be disabled with `SITE_ANALYTICS_DISABLED=true`.
- Cloudinary and the Ace Hits Shopify CDN are the configured remote image hosts in `next.config.ts`.
- SEO foundations are implemented through App Router metadata, `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, shared metadata helpers in `content/seo.ts`, and JSON-LD rendered by `StructuredData`.
- Google measurement is environment-driven. `GoogleTag` creates a local consent queue with Google storage denied, but does not request Google Tag Manager or gtag until the visitor accepts optional measurement. Direct gtag disables automatic page views so route changes can be measured explicitly, and Google Ads conversion events use the public Ads ID and conversion-label environment variables only after accepted consent.
- `next.config.ts` disables the `X-Powered-By` header, redirects `www.brandd.co.uk` to `brandd.co.uk`, and sends security headers on all routes. `middleware.ts` enforces a source-allowlist Content Security Policy compatible with Next.js inline bootstrap scripts and Cloudflare Rocket Loader, redirects non-canonical page hosts, rejects API calls sent to non-approved hosts, and lets Railway call the dedicated `/api/health` liveness route. `railway.json` runs migrations before deployment and configures that health check.
- Playwright is available as a dev validation tool. `npm run check:mobile-layout` checks key routes at mobile widths against a running local site and writes screenshots to `/private/tmp/brandd-mobile-pass/playwright`.

## Shared Content

- `content/site.tsx` holds Brandd logo URLs, navigation items, route header tones and the four service groups used on Home and Services.
- The service groups are Websites and online stores; Business software and legacy rebuilds; Customer portals and digital products; Integrations and automation.
- `content/work.ts` holds the five portfolio summaries, internal case-study URLs, project artwork and UpForIt image assets, with Good Game Apparel first. Good Game Apparel is explicitly identified as a Brandd-owned product; the other summaries describe their sector and Brandd's contribution without assuming ownership. SonaCrate remains in the wider portfolio with its existing music-platform description and is not a homepage highlight.
- `content/seo.ts` holds route metadata helpers, sitemap entries, organization and project structured data. Organization data identifies Leighton Buzzard, Bedfordshire, UK, without a street address.
- `lib/contactOptions.ts` defines the visible service and budget options and the specialist service presets. Its validators also accept a fixed list of previous options so a form opened before an update can still submit.

## Site Shell And Navigation

`components/SiteShell.tsx` wraps all pages.

- The fixed desktop header has a centred Brandd logo, Services and Our work on the left, and Legacy systems, About and a labelled Discuss a project action on the right.
- The logo links to Home. About links to the homepage's `#about` section. Our work is the single portfolio entry point at `/projects`.
- Mobile navigation keeps the logo centred, a visible Enquire link on the left and the menu toggle on the right. The menu contains the same top-level destinations and closes when a link is selected, including the homepage About anchor.
- Header colour follows route defaults and visible sections marked with `data-nav-tone`.
- Route transitions use Framer Motion with a page fade/blur movement and a route-wash overlay. Reduced motion disables the overlay in CSS; its initial position is the same in server and client rendering.
- The footer contains the logo, a short website/software description, Leighton Buzzard location, direct enquiries email, navigation, Privacy and Cookie settings.

## Pages

### Home `/`

- A compact light hero presents “Websites and software built around your business.” Its primary Discuss a project link goes to Contact; See our work goes to `/projects`. Location is shown below the actions.
- The desktop hero uses `public/images/brandd/homepage-banner.png`, generated artwork showing an illustrative business website, online shop and connected order-management screen in Brandd colours on the right, with white space behind the text. These are service illustrations rather than client screenshots. The decorative image uses Next.js image optimisation and an empty alt attribute. Below 1081px it is hidden so the text and enquiry actions retain the full width.
- Selected work immediately follows the hero. Three cards feature Good Game Apparel, UpForIt and Ace Hits TCG in that order, with artwork, project type, Brandd's role and internal case-study links. These are live businesses/services. SonaCrate appears only in the wider portfolio. An All our work link leads to the full portfolio.
- A light section presents the four service groups as linked cards.
- The dark `#about` section describes Brandd as a design and development studio in Leighton Buzzard, Bedfordshire, explains the experience from its own Good Game Apparel product, and offers ongoing support and management where required.
- A three-step process explains Agree the scope, Review the design, and Build and test. Scope covers costs, launch, access and support arrangements.
- A final Contact action invites visitors to describe what they need to improve.
- Section boundaries are compact. There are no standalone decorative scroll-transition sections on the homepage.

### Our work `/projects`

- A compact dark hero introduces the portfolio and offers an enquiry action and a jump to the projects.
- Five cards show Good Game Apparel, UpForIt, Ace Hits TCG, SonaCrate and DTF Designer. Each explains the work and links to its own case study.
- Cards use existing project artwork, the local Good Game logo, or simple music/print illustrations. The Good Game logo bypasses image optimisation, matching its case-study treatment.
- A short Access rebuild feature links to `/legacy-systems#project`.
- The page ends with a Contact action. External product visits are secondary actions on the case-study pages.

### Previous Projects route `/mvps`

- This route permanently redirects to `/projects` and is not listed in navigation or the sitemap.

### Shared case-study structure

- Each project has an introduction, an Our work return link, an early enquiry action and a secondary external site link.
- `ProjectBrief` presents The need, Brandd’s role and What it enables, followed by a relevant enquiry link. Descriptions explain delivered capabilities rather than unverified commercial results.
- Illustrative interfaces and figures are labelled as previews or sample data.
- Case studies retain their project colours and artwork, with shared reading hierarchy and enquiry placement.

### UpForIt `/projects/upforit`

- The hero uses the existing cyan/yellow/pink event artwork and explains event discovery, ticket sales and QR check-in.
- A ticketing preview shows example event details, tier names and prices; the caption and tier labels identify it as an example rather than live availability. Its mock controls are decorative.
- The project summary explains the event website, Stripe checkout, ticket accounts and staff check-in work.
- Three steps cover buying tickets, keeping downloadable QR tickets in an account and scanning them at the door.
- The page links to `https://www.upforitevents.co.uk/` and Contact.

### Good Game Apparel `/projects/good-game-apparel`

- The page identifies Good Game Apparel as a Brandd-owned merchandise platform. It uses the existing logo, video backdrop, near-black/acid-green/orange palette and Manrope type.
- Its hero introduces creator tools, storefronts and ordering without creators holding stock. The early primary action is to discuss a commerce project.
- The project summary explains Brandd's work across creator accounts, product tools, subscriptions, storefronts and fulfilment.
- Sections cover a storefront for each creator, products/orders/earnings in one dashboard, and turning artwork into products.
- Existing storefront, dashboard and product-builder mockups remain. The dashboard is explicitly labelled as illustrative, with sample data rather than business results.
- Product images use the existing Cloudinary sources. The external destination is `https://www.goodgameapparel.co.uk/`.

### Ace Hits TCG `/projects/ace-hits-tcg`

- The page presents a trading-card store built for collectors, with the existing logo, Shopify banner and colourful retail styling.
- The summary identifies Brandd's work as Shopify storefront design and development, including catalogue navigation, product displays and mobile shopping.
- Sections explain shopping by type/language/set, keeping search/basket/account links within reach and displaying product image, name and price.
- Product displays are labelled as examples with illustrative prices. Brandd-authored copy uses Pokémon consistently.
- The page links to `https://www.acehitstcg.co.uk/` and offers early and closing online-store enquiry actions.

### SonaCrate `/projects/sonacrate`

- The hero explains streaming music and buying tracks to keep, with the existing green-accent listener preview and a sample-data caption.
- The summary covers product design, listener accounts, creator tools, media processing, checkout and purchased downloads.
- The green creator section explains uploads, release details, identity/rights checks and release-level activity. `SonaCrateCreatorVisual` shows an illustrative dashboard with clearly labelled sample figures.
- The listening section describes browsing, saving, buying and downloading music without competitor comparisons.
- A collapsed Technical details disclosure contains the Next.js/Fastify/Prisma/BullMQ implementation and audio file specifications.
- The external destination is `https://www.sonacrate.com/`.

### DTF Designer `/projects/dtf-designer`

- The hero introduces a print-ordering tool for artwork uploads, sheet layout, quantity-based pricing and production status.
- The existing purple print-layout visual has a caption identifying the artwork and prices as examples.
- The summary covers customer accounts, file uploads, the layout canvas, pricing and staff production tools.
- Three explanatory steps cover preparing artwork on 560mm × 1000mm sheets, reviewing quantities/price/VAT and following the order through production.
- The external destination remains `https://dtf-uploader-production.up.railway.app/`.

### Legacy systems `/legacy-systems`

- The dark hero describes replacing Access databases, unsupported desktop tools and spreadsheet workarounds while keeping familiar workflows. It has direct Contact and Services actions.
- The legacy-style browser mockup is labelled as a browser-based rebuild that keeps familiar staff screens, using example records.
- A light fit section describes recognisable problems such as no admin rights, no code access, trapped data, fragile reporting and reliance on one machine.
- The `#project` story explains a client Access database rebuilt as a Postgres-backed web dashboard. Compact before/after cards describe the actual difference; client details are withheld.
- Discover, Rebuild and Launch explain assessing daily work, migrating and checking records and testing with staff.
- Practical guidance covers available access/data, staff testing, source-code/hosting/data arrangements and optional ongoing support and management. A relevant integration link connects to Services.
- The page ends with a rebuild enquiry action.

### Services `/services`

- The dark opening heading and four service-group cards are visible on desktop and mobile. An enquiry action appears in the introduction.
- The four detailed service rows use anchors `#websites`, `#business-software`, `#products` and `#integrations`, explaining customer needs, included capabilities and related work.
- Two specialist cards cover custom Shopify apps and Discord bots, with plainly labelled example workflows and service-specific enquiry links.
- Specialist links use `/contact?service=shopify` and `/contact?service=discord` to preselect an allowlisted service option. Unknown query values use the default choice.
- Practical guidance explains what to send, how scope informs pricing and optional support/management after launch. Source-code access, hosting and data arrangements are covered by the project agreement.
- A final enquiry action reassures visitors that a finished brief is not required.

### Contact `/contact`

- A short dark introduction appears immediately above the form: a few sentences about the business and problem are enough to get started.
- The form asks for name, email, what help is needed, approximate budget and a project message. Browser length limits match the main server text limits.
- Visible service choices are Not sure yet, Website, Online store, Business software, Legacy system rebuild, Customer portal, New product, Integration or automation, Shopify app, Discord bot and Ongoing support.
- Budget is required, with Not sure yet available. The ranges are Under £1,000; £1,000 to under £5,000; £5,000 to under £10,000; £10,000 to under £20,000; £20,000 or more. Controls have radio indicators and support only one selection.
- Adjacent cards explain that Brandd replies by email, typically within one hour; show `enquiries@brandd.co.uk` and Leighton Buzzard, Bedfordshire; and offer ongoing support and management where required.
- A Privacy link sits beside the submission area. Errors preserve the entered values and provide the direct email fallback. User-facing errors do not expose idempotency terminology.
- Successful submissions reset the fields, lock the form and show a persistent green button with a check icon and visible Enquiry sent text. The confirmation explains email follow-up and the typical one-hour response.
- The existing stable idempotency key is retained for retries. The hidden honeypot, timing signal and optional Turnstile check remain.
- The API validates against the shared allowlists, applies bounded JSON parsing and Postgres-backed rate limiting, stores the enquiry and attribution, and queues notifications. Known old option values remain accepted for already-open forms.
- Lead attribution and consent-gated analytics/Ads conversion behaviour are unchanged. SendGrid and optional WhatsApp delivery run through the durable notification outbox; delivery failure does not reject an accepted enquiry.

### Privacy `/privacy`

- The compact heading is “How we use your information.” The policy uses shorter paragraphs and explains browser/device information, source attribution and repeated-request protection in plainer language.
- The policy retains controller information, enquiry uses, legal bases, optional measurement consent, security checks, processors/recipients, international-transfer safeguards, retention periods and data rights.
- Cookie choices are Accept optional tracking and Use essential only, with equal prominence. The shorter banner explains essential storage, Google tools, website use and advertising results. Cookie settings remains available in the footer.

## Reusable Components

- `MotionReveal` is a client component using Framer Motion to reveal content on scroll. It respects reduced motion and supports one-time or repeated reveal behavior through its `once` prop.
- `ScrollAccent` is an available client component for decorative accent rails; current pages do not render it.
- `ScrollBridge` is an available transition component; current pages use compact section boundaries instead.
- `ServiceGrid` maps the four service groups into linked icon cards. `WorkGrid` renders the shared project summaries. `ProjectBrief` and `ProjectContact` provide case-study summaries and enquiry actions.
- `LegacyDashboardVisual` renders the anonymised legacy order-detail browser mockup used by the Legacy Systems hero.
- `MvpProductVisual` renders product-specific animated interface visuals for SonaCrate and DTF Designer. The SonaCrate visual reflects the listener shell with Home, New Releases, My Tracks, Playlists, Genres, and Tracks labels.
- `ContactForm` is a client component that submits project enquiries to the contact API, captures lead attribution, fires lead/conversion measurement events after successful saves, and renders pending, persistent animated success, and error states.
- `StructuredData` renders escaped JSON-LD for organization, website, breadcrumb, service, contact, privacy, and project structured data.
- `GoogleTag` initializes denied Google consent locally and loads Google Tag Manager or direct gtag only after an accepted optional-measurement choice. There is no pre-consent GTM iframe fallback.
- `ConsentBanner` distinguishes essential security and preference storage from optional Google measurement and stored campaign attribution. It gives the two primary choices equal prominence, persists the choice locally, updates Google consent/data-layer state, clears optional attribution/analytics storage and accessible Google cookies on withdrawal, and can be reopened from the footer.
- `SiteAnalytics` runs globally as a client component. It persists campaign attribution and creates visitor/session identifiers only after accepted consent, sends accepted-consent page views to Google measurement on initial load and client-side route changes, exposes a consent-gated `window.branddTrackEvent` hook for first-party analytics, and records accepted-consent site interaction events through `POST /api/site-analytics`.

## Styling Contract

- The Brandd palette remains black, white, off-white, cyan, violet, magenta and pink, with an 8px radius on cards and controls.
- Body copy uses the bundled Manrope variable font with regular/medium weight. Main headings use sentence case, a capped scale and a readable line height. Short category and eyebrow labels retain uppercase styling.
- The homepage has a white hero with a gradient border and right-aligned Brandd-colour artwork. Desktop copy occupies the white left portion; smaller screens use the full text width without the decorative image. Standalone `ScrollBridge` transitions and decorative rails are not rendered on the current pages.
- `light-section` and `dark-section` establish section tone; major sections expose `data-nav-tone` for header contrast.
- Portfolio cards have a three-column desktop grid, two columns at tablet widths and one on phones. Artwork and project descriptions remain together with the case-study action.
- Service groups use two desktop columns and one mobile column. Explanatory service, process, fit and project-summary cards use single columns on phones; body text remains approximately 16px.
- Header navigation uses a visible labelled project CTA on desktop and an Enquire link alongside the centred mobile logo.
- Shared `.project-brief-*`, `.project-faq-*`, `.text-link`, `.case-back-link` and `.visual-caption` classes keep case-study summaries and navigation consistent.
- The Good Game, Ace Hits, SonaCrate, DTF and UpForIt visuals retain their scoped palettes and existing interface illustrations. Dashboard figures and decorative retail/ticket prices are identified as examples.
- Contact uses a wider form column and supporting cards on desktop, stacked on smaller screens. Budget tiles have circular radio indicators and visible keyboard focus.
- Cookie choices sit beside one another where space allows; the banner remains fixed until a choice is made and can be reopened from the footer.
- Browser bars truncate long labels, buttons wrap safely, and responsive rules keep content within the viewport.
- Existing reduced-motion support and first-party consent handling remain in place.

## Interaction Logic

- Navigation active state is derived from the current pathname.
- External project links open in a new tab and use `rel="noreferrer"`.
- Header tone is recalculated on scroll and resize by sampling the section under the top-middle of the viewport.
- Route and reveal animations use Framer Motion and fall back cleanly when reduced motion is preferred. Current content sections use one-time reveals so text remains visible when revisited.
- Contact form submission is handled by `POST /api/contact`, which applies shared abuse controls, stores validated and idempotent enquiries and advertising attribution in Postgres, enqueues SendGrid and optional Meta WhatsApp Cloud API notification jobs, and returns the submission id without waiting for third-party delivery.
- Successful contact submissions push a `generate_lead` event with service focus and budget range to `dataLayer` and gtag only after optional measurement consent, then send a Google Ads `conversion` event with the returned submission id as `transaction_id` when the Ads environment variables are configured. First-party lead analytics are also consent-gated.
- Consent choice is persisted in local storage and pushed to Google consent/data-layer state. Choosing essential-only after acceptance withdraws Google storage consent and removes Brandd's optional browser identifiers, stored attribution, and accessible Google measurement cookies.
- First-touch campaign attribution is persisted only after optional measurement consent. Without consent, the contact form can still include attribution present on the current enquiry page without writing it to browser storage. With consent, stored attribution keeps the current page path fresh while preserving the first landing page/referrer.
- Accepted-consent site analytics are handled by `POST /api/site-analytics`, which stores anonymous visitor/session IDs, page URL/path/title, referrer, landing page, previous page path, UTM and Google click identifiers, viewport size, allowlisted event properties, user agent, and timestamp. The endpoint ignores non-accepted or unknown events, uses a shared Postgres rate limit, and no-ops when `DATABASE_URL` is missing or `SITE_ANALYTICS_DISABLED=true`.
- `SiteAnalytics` records `page_view`, `scroll_depth`, `nav_click`, `cta_click`, `link_click`, `outbound_link_click`, `button_click`, `form_start`, `form_submit_attempt`, and accepted first-party `generate_lead` events. Page views include previous-path context so sessions can be reconstructed into landing pages and journeys through the site.

## Maintenance Expectations

- Keep shared service, navigation and logo data in `content/site.tsx`, and shared portfolio content in `content/work.ts`.
- New visible sections should include `data-nav-tone`.
- New image hosts should be added to `next.config.ts` if they are rendered through `next/image`.
- Run `npm run check:mobile-layout` against a local server after responsive layout changes. It includes every current public page. `npm run check:site-experience` checks internal destinations, the old Projects redirect, responsive navigation, visible mobile services and form recovery with locally intercepted submissions; it rejects non-local base URLs.
- Apply schema updates with `npm run db:migrate` before starting a release. Railway runs this command as its pre-deploy step and uses `/api/health` for deployment health checks.
- After feature, UI, service, route, or interaction changes, update this contract so it describes the current codebase. Keep it descriptive and current-state focused; do not turn it into a list of edits.
