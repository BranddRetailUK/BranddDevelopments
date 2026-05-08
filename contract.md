# BRANDD Developments Site Contract

This file describes the current feature shape of the BRANDD Developments website. It is a product and implementation contract for the codebase, not a changelog.

## Stack And Runtime

- The site is a Next.js App Router project using TypeScript, React, `next/image`, Framer Motion, and `react-icons`.
- Routes live under `app/`. Shared components live under `components/`. Shared content and navigation data live in `content/site.tsx`.
- Styling is handled through `app/globals.css` with global design tokens, page section classes, component classes, and responsive breakpoints.
- The site is primarily static marketing/UI content. There are no API routes, database calls, authentication flows, or server-side business workflows in this repo.
- Cloudinary is the configured remote image host in `next.config.ts`.

## Shared Content

`content/site.tsx` is the main shared content source for:

- BRANDD logo URLs. Both header tones use the no-strap Cloudinary logo, with CSS inversion on light headers so the white mark remains visible.
- Top-level navigation items and the Projects dropdown child.
- Per-route default header tone through `routeTones`.
- Service offerings used by the homepage and Services page.
- Service track labels used in the Services hero.
- MVP showcase data used by the homepage and MVPs page.

The current service offerings are:

- Web Design & UI/UX.
- Frontend Development.
- Backend Services.
- Database Management.
- Ecommerce & Creator Commerce.
- Integrations & Automation.
- MVP Design & Build.

The current MVP showcases are:

- Beatify, a music platform MVP with creator release tools, listener playback, paid downloads, and creator insight messaging. Its accent colour is green.
- DTF Gang Designer, a print workflow MVP with customer gang sheet uploads, a layout canvas, combined order pricing, order history, and admin status messaging. Its accent colour is purple.

## Site Shell And Navigation

`components/SiteShell.tsx` wraps all pages.

- The header is fixed and uses a centered no-strap BRANDD logo with left and right navigation groups.
- Desktop navigation is split around the logo. The Projects item has a dropdown with a single Good Game Apparel sub-tab linking to `/projects#good-game-apparel`.
- Mobile navigation opens from an icon button and renders top-level links plus child subnav links.
- Header colour is controlled by route defaults and visible section tone. Sections expose `data-nav-tone="light"` or `data-nav-tone="dark"` so the shell can choose the correct logo and text colour while scrolling.
- Route transitions use Framer Motion with a page fade/blur movement and a route-wash overlay.
- The footer repeats the no-strap white logo and top-level navigation links.

## Pages

### Home `/`

The homepage presents BRANDD as a studio for websites, product platforms, and business systems.

- The hero is a light section with a large but capped headline, a wider text column, a lede, primary and secondary calls to action, and a right-side interface visual.
- The interface visual represents product, data, and operations layers through stacked signal panels.
- Scroll accent rails animate across the hero.
- A dark development-studio section explains that websites can include accounts, product data, order flows, stock logic, payments, dashboards, API integrations, reporting, and internal processes.
- A services section renders the shared `services` array through `ServiceGrid`.
- A dark MVP showcase section renders shared `mvpShowcases` as product cards with browser-style visuals.
- A process section explains the workflow: shape the offer, design the experience, build the system.

### Projects `/projects`

The Projects page frames BRANDD builds as connected websites, products, and systems.

- The hero is dark and includes a stacked project-type visual for creator commerce, operational dashboards, and MVP platforms.
- The Good Game Apparel section is the flagship project section and has the `id="good-game-apparel"` anchor.
- Good Game Apparel is presented as BRANDD-owned creator-commerce platform work covering creator storefronts, product creator tools, subscriptions, revenue share, dashboard logic, referrals, and rewards.
- The Good Game section uses dark storefront-inspired styling, gold accents, the gold Good Game Apparel logo, the `www.goodgameapparel.co.uk` public link, and a Cloudinary-hosted banner video.
- The Project Types section lists creator-commerce platforms, operational dashboards, MVP platforms, ecommerce systems, and business process tools.
- The page ends with a dark CTA linking to Contact.

### MVPs `/mvps`

The MVPs page explains version-one product delivery.

- The hero is dark with design/build/launch/learn messaging.
- The first explanatory section is "What this is for".
- Beatify appears as the third content section and uses a dark section with the Beatify green accent.
- Product scoping appears after Beatify as Stage 01.
- DTF Gang Designer appears as the fifth content section and uses a light section with the DTF purple accent.
- Prototype to product and Accounts and dashboards appear after DTF as Stage 02 and Stage 03.
- The delivery section lists the first-release path from outcome definition through release and improvement.
- The page ends with a dark CTA linking to Contact.

### Services `/services`

The Services page describes practical digital services for businesses that need more than a simple website.

- The hero is light and includes service track chips around a connected-delivery signal.
- The service areas section renders the shared `services` array in a dark grid.
- The delivery section lists engagement types for website/frontend sprints, backend/database/dashboard clean-up, ecommerce and creator commerce, integrations, and MVP builds.
- The page ends with a dark CTA.

### About Us `/about-us`

The About page positions BRANDD as a practical web design and development studio for brand-led businesses.

- The hero is dark and uses a four-item mark: Design, Build, Manage, Improve.
- The position section explains work for founders, operators, and growing brands that have outgrown simple websites and off-the-shelf tools.
- The principles section lists four principles: Brand-led, system-minded; Useful before flashy; Built for the next stage; Commercially grounded.
- The page ends with a light CTA linking to Contact.

### Contact `/contact`

The Contact page collects project enquiries.

- The hero is light and describes projects that may involve websites, customer portals, MVPs, backend systems, database clean-up, ecommerce workflows, or custom integrations.
- The dark contact section shows cards for project enquiries, planning sessions, and UK-based online-first work.
- `ContactForm` renders name, email, service focus, and message fields.
- Submitting the form prevents default browser submission and toggles local success state. It does not send data to a backend, email service, CRM, or database.

## Reusable Components

- `MotionReveal` is a client component using Framer Motion to reveal content on scroll. It respects reduced motion.
- `ScrollAccent` is a client component that animates decorative accent rails using scroll progress. It respects reduced motion.
- `ScrollBridge` is a client component for animated transitions between dark and light page sections. It supports multiple movement variants and uses an accessible `aria-label`.
- `ServiceGrid` maps shared service data into icon cards.
- `ContactForm` is a client-only visual form with local submitted state.

## Styling Contract

- The primary palette is black, white, off-white paper, muted grey, pink, magenta, violet, cyan, and blue.
- The main BRANDD accent is a cyan-to-violet-to-magenta-to-pink gradient.
- Cards, buttons, panels, and framed UI elements generally use `8px` border radius.
- `light-section` and `dark-section` establish page section tone. `data-nav-tone` must be set on major sections so the fixed header stays legible.
- The favicon is generated by `app/icon.tsx` as a padded square image so the wide no-strap BRANDD logo is contained rather than cropped.
- The homepage hero has its own grid and heading sizing so its headline is wider and less tall than the global page heading scale.
- The Projects hero uses the same wider, capped heading treatment as the homepage hero.
- The MVP pages use CSS variables scoped by product slug:
  - `.mvp-beatify` uses green accent variables.
  - `.mvp-dtf-gang-designer` uses purple accent variables.
- The Good Game flagship section uses a separate dark/gold visual system based around `#f2c653`, dark navy-black backgrounds, readable gold feature pills, glassy panels, the Good Game logo, and a video-backed visual.
- Responsive rules collapse grids at tablet sizes and simplify hero/section layouts at mobile sizes.

## Interaction Logic

- Navigation active state is derived from the current pathname and supports child links with hash anchors.
- External project links open in a new tab and use `rel="noreferrer"`.
- Header tone is recalculated on scroll and resize by sampling the section under the top-middle of the viewport.
- Route and reveal animations use Framer Motion and fall back cleanly when reduced motion is preferred.
- Contact form submission is local-only UI feedback.

## Maintenance Expectations

- Update shared service, navigation, logo, and MVP data in `content/site.tsx` when the same content appears in multiple places.
- New visible sections should include `data-nav-tone`.
- New image hosts should be added to `next.config.ts` if they are rendered through `next/image`.
- After feature, UI, service, route, or interaction changes, update this contract so it describes the current codebase. Keep it descriptive and current-state focused; do not turn it into a list of edits.
