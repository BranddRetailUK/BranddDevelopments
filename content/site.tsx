import {
  HiOutlineCircleStack,
  HiOutlineCodeBracketSquare,
  HiOutlineComputerDesktop,
  HiOutlineCubeTransparent,
  HiOutlineRocketLaunch,
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

export const darkLogo =
  "https://res.cloudinary.com/dhlqooyuk/image/upload/v1778178820/LOGO_STRAP_dark_j4tyyu.png";

export const whiteLogo =
  "https://res.cloudinary.com/dhlqooyuk/image/upload/v1778178760/LOGO_STRAP_WHITE_copy_psgshz.png";

export const navItems = [
  { href: "/", label: "Home" },
  {
    href: "/projects",
    label: "Projects",
    children: [
      {
        href: "/projects",
        label: "Project formats",
        description: "Commerce, dashboards, campaign sites, and product platforms.",
      },
      {
        href: "/mvps",
        label: "MVP's",
        description: "One-off builds and version-one products ready for launch.",
      },
    ],
  },
  { href: "/mvps", label: "MVP's" },
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
    title: "Web Design",
    copy: "Clear, confident interfaces with brand direction, responsive layouts, conversion paths, and the polish needed for a public launch.",
    icon: HiOutlineComputerDesktop,
    accent: "pink",
  },
  {
    title: "Web Development",
    copy: "Modern React and Next.js builds with fast pages, reusable components, CMS-ready structures, and thoughtful interaction.",
    icon: HiOutlineCodeBracketSquare,
    accent: "violet",
  },
  {
    title: "Backend Services",
    copy: "APIs, business logic, authentication flows, integrations, automation, and technical foundations that support real operations.",
    icon: HiOutlineCubeTransparent,
    accent: "blue",
  },
  {
    title: "Database Management",
    copy: "Data models, migrations, reporting structures, cleanup work, and reliable storage patterns for products, customers, orders, and content.",
    icon: HiOutlineCircleStack,
    accent: "cyan",
  },
  {
    title: "MVP Design & Build",
    copy: "Focused product definition, prototype direction, first-version delivery, and launch support for ideas that need market feedback quickly.",
    icon: HiOutlineRocketLaunch,
    accent: "magenta",
  },
  {
    title: "Retail & Ecommerce",
    copy: "Storefronts, catalogue systems, checkout journeys, stock workflows, merchandising surfaces, and customer experience improvements.",
    icon: HiOutlineShoppingBag,
    accent: "rose",
  },
];

export const serviceTracks = [
  "Web design",
  "Frontend",
  "Backend",
  "Databases",
  "MVPs",
  "Ecommerce",
];
