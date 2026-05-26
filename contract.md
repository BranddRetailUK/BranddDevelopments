# Brandd Site Contract

This file describes the current feature shape of the Brandd website. It is a product and implementation contract for the codebase, not a changelog.

## Stack And Runtime

- The site is a Next.js App Router project using TypeScript, React, `next/image`, Framer Motion, and `react-icons`.
- Routes live under `app/`. Shared components live under `components/`. Shared content and navigation data live in `content/site.tsx`.
- Styling is handled through `app/globals.css` with global design tokens, page section classes, component classes, and responsive breakpoints.
- The site is primarily marketing/UI content with a server-side contact submission API. There are no authentication flows or broader server-side business workflows in this repo.
- Contact enquiries use Postgres through `DATABASE_URL`. Optional database and WhatsApp notification settings are documented in `.env.example`.
- Cloudinary and the Ace Hits Shopify CDN are the configured remote image hosts in `next.config.ts`.
- Playwright is available as a dev validation tool. `npm run check:mobile-layout` checks key routes at mobile widths against a running local site and writes screenshots to `/private/tmp/brandd-mobile-pass/playwright`.

## Shared Content

`content/site.tsx` is the main shared content source for:

- Brandd logo URLs. Both header tones use the no-strap Cloudinary logo, with CSS inversion on light headers so the white mark remains visible.
- Top-level navigation items and the Websites dropdown children.
- Per-route default header tone through `routeTones`; Services and project detail routes default to dark because they start on dark sections.
- Service offerings used by the homepage and as the source for the Services page service-area grid.
- Project showcase data used by the homepage and Projects page.

The current service offerings are:

- Web Design & UI/UX.
- Frontend Development.
- Backend Services.
- Database Management.
- Ecommerce & Creator Commerce.
- Shopify App Building.
- Discord Bot Building.
- Customer Portals & Dashboards.
- AI Tools & Workflow Assistants.
- Integrations & Automation.
- MVP Design & Build.

The current project showcases are:

- SonaCrate, a music platform project with creator release tools, listener playback, paid downloads, and creator insight messaging. Its accent colour is green.
- DTF Designer, a print workflow project with customer gang sheet uploads, a layout canvas, combined order pricing, order history, and admin status messaging. Its accent colour is purple.

## Site Shell And Navigation

`components/SiteShell.tsx` wraps all pages.

- The header is fixed and uses a centered no-strap Brandd logo with left and right navigation groups.
- The Brandd logo links to the homepage; Home is not repeated as a text navigation item.
- Desktop navigation is split around the logo with large uppercase tab labels. The Websites item has dropdown sub-tabs for the standalone Good Game Apparel and Ace Hits TCG website pages, and the Projects item links to focused version-one product work.
- Mobile navigation keeps the Brandd logo centered in the header while the menu button sits on the right, and opens top-level links plus child subnav links.
- Header colour is controlled by route defaults and visible section tone. Sections expose `data-nav-tone="light"` or `data-nav-tone="dark"` so the shell can choose the correct logo and text colour while scrolling.
- Route transitions use Framer Motion with a page fade/blur movement and a route-wash overlay.
- The footer repeats the no-strap white logo and top-level navigation links.

## Pages

### Home `/`

The homepage presents Brandd as a studio for sharp, functional websites and digital services, with modern animated web experiences made accessible at sensible prices.

- The hero is a light, copy-led section with a large but capped headline, a wider text column, a lede about modern websites, ecommerce experiences, business tools, and sensible pricing, and primary and secondary calls to action.
- Scroll accent rails animate across the hero.
- A dark development-studio section explains that websites can include accounts, product data, order flows, stock logic, payments, dashboards, API integrations, reporting, and internal processes.
- A services section renders the shared `services` array through `ServiceGrid`.
- A dark project showcase section renders shared `mvpShowcases` as product cards with animated product-specific visuals for SonaCrate and DTF Designer.
- A process section explains the workflow: shape the offer, design the experience, build the system.

### Websites `/projects`

The Websites page frames Brandd builds as connected websites, products, and systems.

- The hero is dark and includes a stacked website-type visual for creator commerce, operational dashboards, and product platforms.
- The Website Types section lists creator-commerce platforms, operational dashboards, product platforms, ecommerce systems, and business process tools.
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

The Projects page explains version-one product delivery.

- The hero is dark with design/build/launch/learn messaging, a short Projects headline, and a single-sentence lede about focused first versions.
- SonaCrate appears after the hero and uses a dark section with the SonaCrate green accent and an animated listener-dashboard visual based on the SonaCrate music platform UI.
- Product scoping appears after SonaCrate as Stage 01.
- DTF Designer appears after Product scoping and uses a light section with the DTF purple accent and an animated 560mm x 1000mm gang-sheet upload/layout workspace visual based on the DTF Uploader UI.
- The page ends with a dark CTA linking to Contact.

### Services `/services`

The Services page describes practical digital services for businesses that need more than a simple website.

- The page starts on a dark service areas section using the main Services headline and lede: "Digital services for websites that need to do more." and the short Brandd design/frontend/backend/data/commerce/integrations summary.
- The service areas section renders a nine-card subset of the shared `services` array in a dark 3x3 grid as the primary service breakdown without an eyebrow label: Web Design & UI/UX, Backend Services, Database Management, Ecommerce & Creator Commerce, Shopify App Building, Discord Bot Building, Customer Portals & Dashboards, AI Tools & Workflow Assistants, and Integrations & Automation. Service cards use accent-specific icon and top-bar gradients.
- The page has four themed service spotlight sections after the grid:
  - Shopify App Building uses a green ecommerce operations theme for private apps, storefront extensions, product and order logic, and webhook automations.
  - Discord Bot Building uses a purple community operations theme for role automation, slash commands, store alerts, and creator rewards.
  - Customer Portals & Dashboards uses a light cyan and amber dashboard theme for self-serve accounts, admin controls, reports, and status views.
  - AI Tools & Workflow Assistants uses a coral and cyan workflow theme for quote assistants, support triage, product content helpers, and admin workflow support.
- Each themed service spotlight includes a service icon, customer-facing contact CTA, a build-map visual, workflow steps, highlight tiles, and service-fit metrics.
- The delivery section lists engagement types for website/frontend sprints, Shopify apps and store extensions, Discord bots, customer portals and dashboards, AI workflow assistants, and MVP builds.
- The page ends with a dark CTA.

### Contact `/contact`

The Contact page collects project enquiries.

- The page starts with a dark contact section that places `ContactForm` before the project enquiry, planning session, and UK-based online-first cards.
- The light hero section follows the form section and describes projects that may involve websites, customer portals, MVPs, backend systems, database clean-up, ecommerce workflows, or custom integrations.
- `ContactForm` renders name, email, service focus, and message fields.
- Service focus options include website/frontend, backend APIs, database/reporting, ecommerce/product systems, Shopify apps, Discord bots, customer portals or dashboards, AI workflow assistants, MVPs, Monday.com/integrations, warehouse/QR systems, and custom dashboards/internal tools.
- On desktop layouts, focusing the project brief textarea expands the form across the contact grid and animates the supporting contact cards out of view so the user has more space to write.
- Submitting the form posts to `POST /api/contact`, disables the form while sending, resets the form after a successful save, and shows success or error feedback.
- The API validates the payload, creates or migrates the `contact_submissions` table if needed, stores each enquiry with `status`, `email_status`, WhatsApp notification fields, timestamps, and the request user agent, then attempts an optional Meta WhatsApp Cloud API notification to the configured recipient phone.
- WhatsApp contact notifications are controlled by `WHATSAPP_CONTACT_NOTIFICATIONS` and the related Meta Cloud API environment variables. Form submissions still succeed when WhatsApp is disabled or a notification attempt fails; failures are logged and recorded on the submission.

## Reusable Components

- `MotionReveal` is a client component using Framer Motion to reveal content on scroll. It respects reduced motion.
- `ScrollAccent` is a client component that animates decorative accent rails using scroll progress. It respects reduced motion.
- `ScrollBridge` is a client component for animated transitions between dark and light page sections. It supports multiple movement variants and uses an accessible `aria-label`.
- `ServiceGrid` maps shared service data into icon cards.
- `MvpProductVisual` renders product-specific animated interface visuals for SonaCrate and DTF Designer.
- `ContactForm` is a client component that submits project enquiries to the contact API and renders pending, success, and error states.

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
- Mobile card and tile grids use two columns with compact card typography so repeated service, project, proof, product, highlight, and metric cards remain grid-based on phone widths.
- The Ace Hits TCG project page has its own black retail visual system with purple, magenta, yellow and cyan accents, a wider homepage-style hero heading, product cards, category chips and Shopify-derived imagery.
- The Projects page product sections use CSS variables scoped by product slug:
  - `.mvp-sonacrate` uses green accent variables.
  - `.mvp-dtf-gang-designer` uses purple accent variables.
- The Services page uses CSS variables scoped by service spotlight slug:
  - `.service-theme-shopify` uses a green operations theme.
  - `.service-theme-discord` uses a purple community theme.
  - `.service-theme-portals` uses a light cyan and amber dashboard theme.
  - `.service-theme-ai` uses a coral and cyan workflow theme.
- The Good Game Apparel project page uses a separate dark/gold visual system based around `#f2c653`, dark navy-black backgrounds, glassy panels, the Good Game logo, a video-backed hero, and animated storefront/dashboard/product-creator mockups.
- Responsive rules collapse grids at tablet sizes and simplify hero/section layouts at mobile sizes.

## Interaction Logic

- Navigation active state is derived from the current pathname and supports dropdown child website links.
- External project links open in a new tab and use `rel="noreferrer"`.
- Header tone is recalculated on scroll and resize by sampling the section under the top-middle of the viewport.
- Route and reveal animations use Framer Motion and fall back cleanly when reduced motion is preferred.
- Contact form submission is handled by `POST /api/contact`, which stores validated enquiries in Postgres and optionally sends a WhatsApp notification through Meta WhatsApp Cloud API.

## Maintenance Expectations

- Update shared service, navigation, logo, and project showcase data in `content/site.tsx` when the same content appears in multiple places.
- New visible sections should include `data-nav-tone`.
- New image hosts should be added to `next.config.ts` if they are rendered through `next/image`.
- Run `npm run check:mobile-layout` against a local server after responsive layout changes.
- After feature, UI, service, route, or interaction changes, update this contract so it describes the current codebase. Keep it descriptive and current-state focused; do not turn it into a list of edits.
