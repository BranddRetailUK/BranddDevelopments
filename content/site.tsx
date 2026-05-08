import {
  HiOutlineCircleStack,
  HiOutlineCodeBracketSquare,
  HiOutlineComputerDesktop,
  HiOutlineCubeTransparent,
  HiOutlineRocketLaunch,
  HiOutlineShoppingBag,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

export const darkLogo =
  "https://res.cloudinary.com/dhlqooyuk/image/upload/v1778265380/NEW_LOGO_WHT_NO_STRAP_heexb3.png";

export const whiteLogo =
  "https://res.cloudinary.com/dhlqooyuk/image/upload/v1778265380/NEW_LOGO_WHT_NO_STRAP_heexb3.png";

export const navItems = [
  { href: "/", label: "Home" },
  {
    href: "/projects",
    label: "Projects",
    children: [
      {
        href: "/projects#good-game-apparel",
        label: "Good Game Apparel",
        description: "Brandd-owned creator-commerce flagship project.",
      },
    ],
  },
  { href: "/mvps", label: "MVPs" },
  { href: "/services", label: "Services" },
  { href: "/about-us", label: "About us" },
  { href: "/contact", label: "Contact" },
];

export type RouteTone = "light" | "dark";

export const routeTones: Record<string, RouteTone> = {
  "/": "light",
  "/projects": "dark",
  "/mvps": "dark",
  "/services": "light",
  "/about-us": "dark",
  "/contact": "light",
};

export type Service = {
  title: string;
  copy: string;
  icon: IconType;
  accent: string;
};

export const services: Service[] = [
  {
    title: "Web Design & UI/UX",
    copy: "Brand-led interfaces, responsive layouts, landing pages, dashboards, customer portals, and ecommerce journeys.",
    icon: HiOutlineComputerDesktop,
    accent: "pink",
  },
  {
    title: "Frontend Development",
    copy: "React and Next.js builds with reusable components, fast pages, clean structure, and room to grow.",
    icon: HiOutlineCodeBracketSquare,
    accent: "violet",
  },
  {
    title: "Backend Services",
    copy: "APIs, auth, business logic, dashboards, webhooks, automations, and system connections.",
    icon: HiOutlineCubeTransparent,
    accent: "blue",
  },
  {
    title: "Database Management",
    copy: "PostgreSQL structures for products, customers, orders, jobs, users, subscriptions, reporting, and dashboards.",
    icon: HiOutlineCircleStack,
    accent: "cyan",
  },
  {
    title: "Ecommerce & Creator Commerce",
    copy: "Product catalogues, collection systems, product creators, checkout flows, subscriptions, revenue share, and fulfilment logic.",
    icon: HiOutlineShoppingBag,
    accent: "rose",
  },
  {
    title: "Integrations & Automation",
    copy: "Monday.com, Shopify, Discord, Stripe, courier tools, QR tracking, label printing, and custom internal workflows.",
    icon: HiOutlineWrenchScrewdriver,
    accent: "magenta",
  },
  {
    title: "MVP Design & Build",
    copy: "Focused version-one products that can launch, capture users, test demand, and become stronger over time.",
    icon: HiOutlineRocketLaunch,
    accent: "pink",
  },
];

export const serviceTracks = [
  "UI/UX",
  "Frontend",
  "Backend",
  "Databases",
  "Integrations",
  "MVPs",
  "Commerce",
];

export type MvpShowcase = {
  name: string;
  slug: string;
  eyebrow: string;
  href: string;
  headline: string;
  shortCopy: string;
  expandedCopy: string;
  features: Array<{
    title: string;
    copy: string;
  }>;
  signals: string[];
};

export const mvpShowcases: MvpShowcase[] = [
  {
    name: "Beatify",
    slug: "beatify",
    eyebrow: "Music platform MVP",
    href: "https://web-production-359db.up.railway.app/",
    headline: "Music uploads, streaming, and paid downloads.",
    shortCopy:
      "Beatify is a music platform MVP for listeners, artists, and labels: stream tracks, manage releases, and sell high-quality downloads.",
    expandedCopy:
      "Creators can upload releases, artwork, and tracks, import batches, view activity, and manage their profile. Listeners can browse music, play streams, and unlock 320 kbps downloads after purchase.",
    features: [
      {
        title: "Listener accounts",
        copy: "Signup, login, library pages, profile areas, and a clean music dashboard for returning listeners.",
      },
      {
        title: "Creator release tools",
        copy: "Artist and label accounts can create releases, upload tracks and artwork, and publish music from one area.",
      },
      {
        title: "Streaming and downloads",
        copy: "Listeners can stream tracks and buy high-quality 320 kbps downloads when they want to keep a track.",
      },
      {
        title: "Creator insights",
        copy: "Simple release, track, and activity views help creators understand what is being played and purchased.",
      },
    ],
    signals: ["Creator releases", "Listener playback", "Paid downloads"],
  },
  {
    name: "DTF Gang Designer",
    slug: "dtf-gang-designer",
    eyebrow: "Print workflow MVP",
    href: "https://dtf-uploader-production.up.railway.app/",
    headline: "Gang sheet uploads, layout design, and bulk pricing.",
    shortCopy:
      "DTF Gang Designer is a customer upload MVP for DTF print orders, built around 560mm x 1000mm gang sheets and combined-quantity pricing.",
    expandedCopy:
      "Customers can upload multiple gang sheets, set quantities, preview files, create a layout, and send an order. Profiles keep order history while admins can review files and update production status.",
    features: [
      {
        title: "Combined order pricing",
        copy: "Each sheet quantity contributes to one order total, with VAT shown clearly before sending.",
      },
      {
        title: "Customer upload flow",
        copy: "Signed-in customers can add PDFs, preview files, keep drafts, and submit real print jobs.",
      },
      {
        title: "Layout workspace",
        copy: "Customers can arrange artwork on a 560mm x 1000mm canvas and add the generated PDF to their order.",
      },
      {
        title: "Order management",
        copy: "Profiles show order history and admins can move work from received to production or completed.",
      },
    ],
    signals: ["560mm sheets", "Layout canvas", "Order status"],
  },
];
