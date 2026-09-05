import {
  HiOutlineChartBarSquare,
  HiOutlineComputerDesktop,
  HiOutlineShoppingBag,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

export const darkLogo =
  "https://res.cloudinary.com/dhlqooyuk/image/upload/v1778265380/NEW_LOGO_WHT_NO_STRAP_heexb3.png";

export const whiteLogo =
  "https://res.cloudinary.com/dhlqooyuk/image/upload/v1778265380/NEW_LOGO_WHT_NO_STRAP_heexb3.png";

export const navItems = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Our work" },
  { href: "/legacy-systems", label: "Legacy systems" },
  { href: "/#about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export type RouteTone = "light" | "dark";

export const routeTones: Record<string, RouteTone> = {
  "/": "light",
  "/projects": "dark",
  "/projects/good-game-apparel": "dark",
  "/projects/ace-hits-tcg": "dark",
  "/projects/upforit": "light",
  "/projects/sonacrate": "dark",
  "/projects/dtf-designer": "dark",
  "/legacy-systems": "dark",
  "/services": "dark",
  "/contact": "dark",
  "/privacy": "dark",
};

export type Service = {
  title: string;
  copy: string;
  icon: IconType;
  accent: string;
  href?: string;
};

export const serviceGroups: Service[] = [
  {
    title: "Websites and online stores",
    copy: "Help customers understand what you offer, get in touch or buy online.",
    icon: HiOutlineShoppingBag,
    accent: "pink",
    href: "/services#websites",
  },
  {
    title: "Business software and legacy rebuilds",
    copy: "Replace outdated tools and make everyday work easier for your team.",
    icon: HiOutlineComputerDesktop,
    accent: "blue",
    href: "/services#business-software",
  },
  {
    title: "Customer portals and digital products",
    copy: "Give customers their own account area or bring a new product idea to its first release.",
    icon: HiOutlineChartBarSquare,
    accent: "cyan",
    href: "/services#products",
  },
  {
    title: "Integrations and automation",
    copy: "Connect the tools you already use so your team spends less time moving information between them.",
    icon: HiOutlineWrenchScrewdriver,
    accent: "magenta",
    href: "/services#integrations",
  },
];
