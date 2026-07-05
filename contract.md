# Brandd Site Contract

This file describes the current feature shape of the Brandd website. It is a product and implementation contract for the codebase, not a changelog.

## Stack And Runtime

- The site is a Next.js App Router project using TypeScript, React, `next/image`, Framer Motion, and `react-icons`.
- Routes live under `app/`. Shared components live under `components/`. Shared content and navigation data live in `content/site.tsx`.
- Styling is handled through `app/globals.css` with global design tokens, page section classes, component classes, and responsive breakpoints.
- The site is primarily marketing/UI content with server-side contact submission and first-party site analytics APIs. There are no authentication flows or broader server-side business workflows in this repo.
- Contact enquiries use Postgres through `DATABASE_URL`. Optional SendGrid email notification, WhatsApp notification, and database pool settings are documented in `.env.example`.
- First-party site analytics events use Postgres through `DATABASE_URL` and can be disabled with `SITE_ANALYTICS_DISABLED=true`.
- Cloudinary and the Ace Hits Shopify CDN are the configured remote image hosts in `next.config.ts`.
- SEO foundations are implemented through App Router metadata, `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, shared metadata helpers in `content/seo.ts`, and JSON-LD rendered by `StructuredData`.
- Google measurement is environment-driven. `GoogleTag` renders Google Tag Manager or direct gtag in the document head only when public Google environment variables are configured, opts Google scripts out of Cloudflare Rocket Loader, defaults Google consent to denied until the visitor chooses a consent option, disables automatic direct-gtag page views so route changes can be measured explicitly, and supports Google Ads conversion events through the public Ads ID and conversion-label environment variables.
- `next.config.ts` disables the `X-Powered-By` header, redirects `www.brandd.co.uk` to `brandd.co.uk`, and sends basic security headers on all routes.
- Playwright is available as a dev validation tool. `npm run check:mobile-layout` checks key routes at mobile widths against a running local site and writes screenshots to `/private/tmp/brandd-mobile-pass/playwright`.

## Shared Content

`content/site.tsx` is the main shared content source for:

- Brandd logo URLs. Both header tones use the no-strap Cloudinary logo, with CSS inversion on light headers so the white mark remains visible.
- Top-level navigation items.
- Per-route default header tone through `routeTones`; Legacy Systems, Services, and project detail routes default to dark because they start on dark sections.
- SEO route metadata, canonical URLs, sitemap entries, Open Graph/Twitter defaults, and structured-data helpers live in `content/seo.ts`.
- Service offerings used by the homepage and as the source for the Services page service-area grid.
- Project showcase data used by the homepage and Projects page.

The current service offerings are:

- Web Design & UI/UX.
- Frontend Development.
- Backend Services.
- Database Management.
- Legacy System Rebuilds.
- Ecommerce & Creator Commerce.
- Shopify App Building.
- Discord Bot Building.
- Customer Portals & Dashboards.
- Integrations & Automation.
- MVP Design & Build.

The current project showcases are:

- SonaCrate, a music platform project with creator release tools, listener playback, paid downloads, and creator insight messaging. Its accent colour is green.
- DTF Designer, a print workflow project with customer gang sheet uploads, a layout canvas, combined order pricing, order history, and admin status messaging. Its accent colour is purple.

## Site Shell And Navigation

`components/SiteShell.tsx` wraps all pages.

- The header is fixed and uses a centered no-strap Brandd logo with left and right navigation groups.
- The Brandd logo links to the homepage; Home is not repeated as a text navigation item.
- Desktop navigation is split around the logo with large uppercase tab labels. Services and Websites sit on the left of the logo, while Projects, Legacy Systems, and Contact sit on the right. Websites is a plain text navigation link to the Websites page, and Projects links to focused version-one product work.
- Mobile navigation keeps the Brandd logo centered in the header while the menu button sits on the right, and opens top-level links only.
- Header colour is controlled by route defaults and visible section tone. Sections expose `data-nav-tone="light"` or `data-nav-tone="dark"` so the shell can choose the correct logo and text colour while scrolling.
- Route transitions use Framer Motion with a page fade/blur movement and a route-wash overlay.
- The footer repeats the no-strap white logo, top-level navigation links, and a Privacy link.

## Pages

### Home `/`

The homepage presents Brandd as a studio for sharp, functional websites and digital services, with modern animated web experiences made accessible at sensible prices.

- The hero is a light, copy-led section with a large but capped headline, a wider text column, a lede about modern websites, ecommerce experiences, business tools, and sensible pricing, a primary Start a project CTA linking to Services, and a secondary CTA linking to Legacy Systems.
- Scroll accent rails animate across the hero.
- A dark development-studio section explains that websites can include accounts, product data, order flows, stock logic, payments, dashboards, API integrations, reporting, and internal processes.
- A services section renders the first nine shared services through `ServiceGrid` as a 3x3 desktop grid.
- A dark project showcase section renders shared `mvpShowcases` as product cards with animated product-specific visuals for SonaCrate and DTF Designer.
- A process section explains the workflow: shape the offer, design the experience, build the system.
- The homepage ends with a dark Contact CTA linking to the Contact page.

### Websites `/projects`

The Websites page frames Brandd builds as connected websites, products, and systems.

- The hero is dark and includes a stacked website-type visual for creator commerce, operational dashboards, and product platforms.
- The Website Types section lists creator-commerce platforms, operational dashboards, product platforms, ecommerce systems, and business process tools.
- A dark Good Game Apparel showcase section uses the dedicated page's creator-commerce content, Good Game logo, storefront browser mockup, live product imagery, creator-store/subscription/made-to-order details, and links to the case study and live site.
- A dark Ace Hits TCG showcase section uses the dedicated page's collector retail styling, Ace Hits logo, Shopify banner image, category nav strip, and links to the case study and live site.
- A light Ace retail details section uses the dedicated page's collector navigation, drop-led retail, trust-cue, and mobile-shopping cards.
- The page ends with a dark CTA linking to Contact.

### Good Game Apparel `/projects/good-game-apparel`

The Good Game Apparel page presents Brandd-owned creator-commerce platform work as a standalone project page.

- The hero is dark/gold, uses the main Good Game Apparel logo centered at the top, links externally to `https://www.goodgameapparel.co.uk/`, includes a Back to Websites action, uses a Cloudinary-hosted video backdrop, and uses the storefront's "Bring your brand to life" / "Made for Creators" positioning.
- The hero summary cards introduce the three connected services: storefront, creator dashboard, and product creator, using real storefront language around creator stores, subscriptions, UK fulfilment, dashboard tracking, rewards and payouts.
- The storefront service section uses the Create Your Merch and live creator-store language to explain public creator stores, subscription tiers, made-to-order ordering, production, packing, fulfilment and delivery, with a browser-style storefront mockup.
- The creator dashboard service section explains the Creator Hub account, creator earnings, coins, XP, payout state, Discord support, product setup, order activity and store performance, with a dashboard UI mockup.
- The product creator service section explains Product Creator and Logo Generator workflows for artwork, product previews, product details, print methods and storefront publishing, with a product creator workspace mockup.
- The dashboard and product creator mockups use responsive internal grids so metric tiles, row states and queue labels stay readable on desktop, tablet and mobile widths.
- The storefront and product creator mockups use live Good Game product imagery hosted on Cloudinary instead of CSS-drawn product placeholders.
- A connected-platform section shows design, print, shipping and earning as the shared data flow behind the creator account, product records and storefront output.
- The page ends with a dark creator-commerce CTA linking to Contact.

### Ace Hits TCG `/projects/ace-hits-tcg`

The Ace Hits TCG page presents a standalone collector retail storefront project.

- The hero is dark and uses Ace Hits TCG styling cues: black base, bright purple, magenta, yellow and cyan accents, a homepage-scale capped heading, the Ace Hits logo, and a Shopify banner image.
- The page links externally to `https://www.acehitstcg.co.uk/`.
- The storefront section explains collector navigation across product type, language, era, set and accessory categories.
- The commerce section explains product discovery, promotional banners, social proof, cart, account, shipping prompts and checkout.
- The catalogue section shows product-card styling with live Ace Hits product imagery and concise retail signals.
- The page ends with a dark CTA linking to Contact.

### Projects `/mvps`

The Projects page is a detailed project-breakdown surface. It currently focuses on SonaCrate first, with DTF Designer retained as the next project summary.

- The hero is dark and positions project pages as deeper build breakdowns, with SonaCrate-led copy, a SonaCrate external CTA, and a Contact CTA.
- SonaCrate starts with a dark overview section using the SonaCrate green accent, real listener-shell labels, and details about the Next.js frontend, Fastify API, Prisma data, BullMQ worker jobs, storage, signed playback URLs, release processing, carts, and download ownership.
- A green artist-and-label section explains the creator side of SonaCrate: Creator Studio, Overview, Releases, Upload, Analytics, Profile, audio/artwork/ZIP uploads, release and track genres, identity checks, rights confirmation, copyright scans, media processing, and analytics.
- A dark stream-and-own section compares Spotify-style streaming, Beatport-style downloads, and SonaCrate's combined stream, browse, save, cart, checkout, and 320 kbps download model.
- The old Stage 01 product-scoping section is not rendered on the Projects page.
- DTF Designer follows the SonaCrate breakdown and uses a light section with the DTF purple accent and an animated 560mm x 1000mm gang-sheet upload/layout workspace visual based on the DTF Uploader UI.
- The page ends with a dark CTA linking to Contact.

### Legacy Systems `/legacy-systems`

The Legacy Systems page presents Brandd's focused service for rebuilding old internal tools as modern web apps without throwing away the working process.

- The hero is dark and positions the offer around "Legacy systems rebuilt as modern web apps." and "Keep the workflow. Lose the lock-in.", aimed at businesses using Microsoft Access databases, old desktop software, spreadsheet-led admin, or unsupported internal tools.
- The hero includes CTAs to Contact and Services plus a CSS-built anonymised order-detail visual that combines a modern browser shell with deliberately classic database-style screens, grey beveled controls, a blue workspace, a reduced set of readable generic sample client fields, and a dark operations sidebar.
- A light "When this fits" section lists no admin rights, no source code, trapped data, fragile reporting, one-machine workflows, and the need for familiar staff-facing screens.
- A dark anonymised project story explains an old Microsoft Access database and UI rebuilt into a browser-based production hub backed by Postgres, using section-specific desktop spacing, a deliberately smaller sentence-case headline, and the before/after proof cards plus legacy-style order-detail visual compactly aligned close to the right edge.
- A light process section groups the rebuild flow into three phase panels: Discover, Rebuild, and Launch.
- A dark capability bridge links the legacy rebuild offer back to Services, Websites, and Projects so the wider Brandd offering remains part of the journey.
- The page ends with a light CTA linking to Contact.

### Services `/services`

The Services page describes practical digital services for businesses that need more than a simple website.

- The page starts on a dark service areas section using the main Services headline and lede: "Digital services for websites that need to do more." and the short Brandd design/frontend/backend/data/commerce/integrations summary.
- The service areas section renders a nine-card subset of the shared `services` array as the primary service breakdown without an eyebrow label: Web Design & UI/UX, Backend Services, Database Management, Legacy System Rebuilds, Ecommerce & Creator Commerce, Shopify App Building, Discord Bot Building, Customer Portals & Dashboards, and Integrations & Automation. Service cards use accent-specific icon and top-bar gradients.
- On mobile, the service areas section is hidden so the Services route opens directly on the legacy systems priority section.
- A dark priority legacy systems section follows the service grid, using the shared legacy order-detail visual, before/after proof cards, focused legacy-rebuild copy, and a link to the Legacy Systems page.
- A light website design and development section follows the legacy priority section and explains UI/UX, frontend development, backend/data support, and the website build sequence.
- The first Contact CTA on the Services page appears after the website design and development section as a dark "Discuss your requirements" prompt linking to Contact.
- The page has three themed service spotlight sections after the first Contact CTA:
  - Shopify App Building uses a green ecommerce operations theme for private apps, storefront extensions, product and order logic, and webhook automations.
  - Discord Bot Building uses a purple community operations theme for role automation, slash commands, store alerts, and creator rewards.
  - Customer Portals & Dashboards uses a light cyan and amber dashboard theme for self-serve accounts, admin controls, reports, and status views.
- Each themed service spotlight includes a service icon, customer-facing contact CTA, a build-map panel with row-based workflow steps, plain highlight lists, and service-fit metrics.
- The page ends with a dark CTA.

### Contact `/contact`

The Contact page collects project enquiries.

- The page starts with a dark contact section that places `ContactForm` before the project enquiry, planning session, and UK-based online-first cards.
- The light hero section follows the form section and describes projects that may involve legacy database rebuilds, old internal dashboards, websites, customer portals, MVPs, backend data, ecommerce workflows, or custom integrations.
- `ContactForm` renders name, email, service focus, and message fields.
- Service focus options include website/frontend, legacy system rebuilds, backend APIs, database/reporting, ecommerce/product systems, Shopify apps, Discord bots, customer portals or dashboards, MVPs, Monday.com/integrations, warehouse/QR systems, and custom dashboards/internal tools.
- The desktop contact grid keeps the form and supporting cards visible while the project brief textarea is focused, with the form column slightly wider than the original compact layout and the right supporting-card column reduced to balance the page.
- Submitting the form posts to `POST /api/contact`, disables the submit button while sending, resets the form after a successful save, changes the submit button into a persistent green success state with a sweeping flare and centered check icon until page reload, fires a `generate_lead` data-layer/gtag event when Google measurement is available, fires a Google Ads `conversion` event with `send_to` built from the public Ads ID and conversion-label environment variables when configured, and shows success or error feedback.
- The form submits stored first-touch and current-page attribution, including landing page, page path, referrer, UTM fields, Google click identifiers (`gclid`, `gbraid`, `wbraid`), and consent choice.
- The API validates the payload, applies an in-memory per-IP rate limit, creates or migrates the `contact_submissions` table if needed, stores each enquiry with lead attribution, status, lead qualification/upload fields, `email_status`, `email_message_id`, WhatsApp notification fields, IP address, timestamps, and the request user agent, returns the submission id for client-side lead/conversion events, then attempts a SendGrid email notification and an optional Meta WhatsApp Cloud API notification.
- SendGrid contact email notifications are controlled by `SENDGRID_API_KEY`, `CONTACT_EMAIL_TO`, and `CONTACT_EMAIL_FROM`. The default sender display name is Brandd Solutions, emails are sent from the configured verified Brandd enquiries sender to the configured recipient, use `Brandd Enquiry <submission id>` as the subject and visible email title, include the square Brandd profile icon in the HTML notification header, store the accepted SendGrid message id when available, and set the customer's submitted email as the reply-to address. Form submissions still succeed when SendGrid is not configured or email delivery fails; failures are logged and recorded on the submission.
- WhatsApp contact notifications are controlled by `WHATSAPP_CONTACT_NOTIFICATIONS` and the related Meta Cloud API environment variables. Form submissions still succeed when WhatsApp is disabled or a notification attempt fails; failures are logged and recorded on the submission.
- SendGrid and WhatsApp notification requests use bounded timeouts so slow external services do not hold the form request indefinitely.

### Privacy `/privacy`

The Privacy page explains how Brandd handles project enquiries, lead attribution, optional Google measurement, accepted-consent website interaction analytics, notification services, and contact record retention.

- The page starts on a dark hero with privacy-focused copy.
- A light privacy content section explains contact enquiries, lead attribution, notifications, Google measurement, website interaction analytics, and retention/follow-up.
- The page ends with a dark CTA linking to Contact.

## Reusable Components

- `MotionReveal` is a client component using Framer Motion to reveal content on scroll. It respects reduced motion and supports one-time or repeated reveal behavior through its `once` prop.
- `ScrollAccent` is a client component that animates decorative accent rails using scroll progress. It respects reduced motion.
- `ScrollBridge` is a client component for animated transitions between dark and light page sections. It supports multiple movement variants and uses an accessible `aria-label`.
- `ServiceGrid` maps shared service data into icon cards.
- `LegacyDashboardVisual` renders the anonymised legacy order-detail browser mockup used by the Legacy Systems page and the Services page legacy priority section.
- `MvpProductVisual` renders product-specific animated interface visuals for SonaCrate and DTF Designer. The SonaCrate visual reflects the listener shell with Home, New Releases, My Tracks, Playlists, Genres, and Tracks labels.
- `ContactForm` is a client component that submits project enquiries to the contact API, captures lead attribution, fires lead/conversion measurement events after successful saves, and renders pending, persistent animated success, and error states.
- `StructuredData` renders escaped JSON-LD for organization, website, breadcrumb, service, contact, privacy, and project structured data.
- `GoogleTag` conditionally renders Google Tag Manager or direct gtag from public environment variables in the document head and initializes Google consent defaults. `GoogleTagManagerNoScript` renders the GTM fallback iframe in the body when a GTM container is configured.
- `ConsentBanner` explains essential storage, campaign attribution for enquiries, and optional Google measurement for ads and analytics. It lets visitors accept all optional measurement storage or keep essential-only storage, persists the choice locally, and updates Google consent/data-layer state.
- `SiteAnalytics` runs globally as a client component. It persists campaign attribution when visitors arrive with UTM or Google click identifiers, sends accepted-consent page views to Google measurement on initial load and client-side route changes, exposes a `window.branddTrackEvent` hook for first-party analytics, and records accepted-consent site interaction events through `POST /api/site-analytics`.

## Styling Contract

- The primary palette is black, white, off-white paper, muted grey, pink, magenta, violet, cyan, and blue.
- The main Brandd accent is a cyan-to-violet-to-magenta-to-pink gradient.
- Cards, buttons, panels, and framed UI elements generally use `8px` border radius.
- `light-section` and `dark-section` establish page section tone. `data-nav-tone` must be set on major sections so the fixed header stays legible.
- The favicon is generated by `app/icon.tsx` as a padded square image so the wide no-strap Brandd logo is contained rather than cropped.
- The homepage hero has its own grid and heading sizing so its headline is wider and less tall than the global page heading scale.
- The Websites hero uses the same wider, capped heading treatment as the homepage hero.
- Mobile hero headings share a capped scale across homepage, Websites, Projects, Services, Contact, and website/project pages so large uppercase titles fit cleanly on phone screens.
- Mobile buttons wrap their labels safely, and browser-style visual bars truncate long URL labels instead of creating horizontal page overflow.
- Service, project, workflow, contact, and Ace highlight cards scale up slightly on desktop pointer hover for feedback, while reduced-motion users keep static cards.
- Mobile card and tile grids use two columns with compact card typography so repeated service, project, proof, product, highlight, and metric cards remain grid-based on phone widths.
- The Ace Hits TCG project page has its own black retail visual system with purple, magenta, yellow and cyan accents, a wider homepage-style hero heading, product cards, category chips and Shopify-derived imagery.
- The Projects page product sections use CSS variables scoped by product slug:
  - `.mvp-sonacrate` uses green accent variables.
  - `.mvp-dtf-gang-designer` uses purple accent variables.
- The Projects page has additional SonaCrate breakdown styling for dark sections, green sections, feature cards, creator-studio mockups, and stream/download comparison cards.
- The Services page uses CSS variables scoped by service spotlight slug:
  - `.service-theme-shopify` uses a green operations theme.
  - `.service-theme-discord` uses a purple community theme.
  - `.service-theme-portals` uses a light cyan and amber dashboard theme.
- The Services page uses `.services-legacy-*`, `.services-websites-*`, and `.services-requirements-cta` classes for the legacy priority section, website design/development section, and first requirements CTA.
- The Legacy Systems page uses scoped `.legacy-*` classes for its dark service hero, fit cards, anonymised Microsoft Access-inspired order-detail mockup, three-panel process map, and capability bridge. The proof visual keeps a classic database UI treatment inside a modern browser frame, uses a reduced field set so values remain readable, and uses responsive rules so the mobile mockup hides secondary tabs, sidebar navigation, and non-essential fields to stay short.
- The Good Game Apparel project page uses a separate dark/gold visual system based around `#f2c653`, dark navy-black backgrounds, glassy panels, the Good Game logo, a video-backed hero, and animated storefront/dashboard/product-creator mockups.
- The Privacy page uses `.privacy-*` classes for the dark hero and light policy content rows.
- The cookie preferences banner uses `.consent-*` classes and stays fixed above the page content until the visitor chooses a preference.
- Responsive rules collapse grids at tablet sizes and simplify hero/section layouts at mobile sizes.

## Interaction Logic

- Navigation active state is derived from the current pathname.
- External project links open in a new tab and use `rel="noreferrer"`.
- Header tone is recalculated on scroll and resize by sampling the section under the top-middle of the viewport.
- Route and reveal animations use Framer Motion and fall back cleanly when reduced motion is preferred. The Projects page SonaCrate sections use repeated reveal animations so elements move and fade in again when re-entering the viewport.
- Contact form submission is handled by `POST /api/contact`, which stores validated enquiries and advertising attribution in Postgres, sends contact email notifications through SendGrid when configured, optionally sends a WhatsApp notification through Meta WhatsApp Cloud API, and returns the submission id for client-side lead/conversion events.
- Successful contact submissions push a `generate_lead` event to `dataLayer` and gtag, then send a Google Ads `conversion` event with the returned submission id as `transaction_id` when `NEXT_PUBLIC_GOOGLE_ADS_ID` and `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` are configured.
- Consent choice is persisted in local storage and pushed to Google consent/data-layer state when Google measurement is configured.
- First-touch campaign attribution is persisted in local storage as soon as campaign parameters or Google click identifiers are seen, then sent with the contact form payload so Google click IDs and UTM values can be used for campaign reporting and future offline/enhanced lead upload workflows. The stored attribution also keeps the current page path fresh while preserving the first landing page/referrer.
- Accepted-consent site analytics are handled by `POST /api/site-analytics`, which creates the `site_analytics_events` table when needed and stores anonymous visitor/session IDs, page URL/path/title, referrer, landing page, previous page path, UTM and Google click identifiers, viewport size, event properties, user agent, and timestamp. The endpoint ignores non-accepted consent, rate limits requests in memory, and no-ops when `DATABASE_URL` is missing or `SITE_ANALYTICS_DISABLED=true`.
- `SiteAnalytics` records `page_view`, `scroll_depth`, `nav_click`, `cta_click`, `link_click`, `outbound_link_click`, `button_click`, `form_start`, `form_submit_attempt`, and accepted first-party `generate_lead` events. Page views include previous-path context so sessions can be reconstructed into landing pages and journeys through the site.

## Maintenance Expectations

- Update shared service, navigation, logo, and project showcase data in `content/site.tsx` when the same content appears in multiple places.
- New visible sections should include `data-nav-tone`.
- New image hosts should be added to `next.config.ts` if they are rendered through `next/image`.
- Run `npm run check:mobile-layout` against a local server after responsive layout changes.
- After feature, UI, service, route, or interaction changes, update this contract so it describes the current codebase. Keep it descriptive and current-state focused; do not turn it into a list of edits.
