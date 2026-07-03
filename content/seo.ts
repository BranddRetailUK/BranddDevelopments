import type { Metadata, MetadataRoute } from "next";
import { mvpShowcases, services } from "@/content/site";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://brandd.co.uk"
).replace(/\/+$/, "");

export const siteName = "Brandd";

export const defaultTitle = "Brandd | Websites, Product Platforms & Business Systems";

export const defaultDescription =
  "Brandd designs and builds websites, product platforms, backend systems, databases, projects, ecommerce workflows, integrations, and operational tools.";

export const ogImagePath = "/opengraph-image";

type SeoRoute = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

export const seoRoutes: SeoRoute[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/services", priority: 0.95, changeFrequency: "monthly" },
  { path: "/legacy-systems", priority: 0.95, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.85, changeFrequency: "monthly" },
  { path: "/mvps", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects/good-game-apparel", priority: 0.72, changeFrequency: "monthly" },
  { path: "/projects/ace-hits-tcg", priority: 0.72, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.35, changeFrequency: "yearly" },
];

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${siteUrl}${normalizedPath}`;
}

function metadataTitle(title: string) {
  return title.includes(siteName) ? title : `${title} | ${siteName}`;
}

export function createPageMetadata({
  description,
  path,
  title,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const fullTitle = metadataTitle(title);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName,
      images: [
        {
          url: ogImagePath,
          width: 1200,
          height: 630,
          alt: `${siteName} website and digital product studio`,
        },
      ],
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImagePath],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "Web design and software development",
  keywords: [
    "Brandd",
    "web design",
    "frontend development",
    "backend development",
    "legacy system rebuilds",
    "Shopify apps",
    "customer portals",
    "business automation",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
    siteName,
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        alt: `${siteName} website and digital product studio`,
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [ogImagePath],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon", sizes: "128x128", type: "image/png" }],
    apple: [{ url: "/icon", sizes: "128x128", type: "image/png" }],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export const organizationId = absoluteUrl("#organization");

export const websiteId = absoluteUrl("#website");

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": organizationId,
  name: siteName,
  url: siteUrl,
  logo: absoluteUrl("/icon"),
  description: defaultDescription,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      areaServed: "GB",
      availableLanguage: ["en-GB"],
      url: absoluteUrl("/contact"),
    },
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  name: siteName,
  url: siteUrl,
  publisher: {
    "@id": organizationId,
  },
  inLanguage: "en-GB",
};

export function createBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Brandd digital services",
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.title,
      description: service.copy,
      provider: {
        "@id": organizationId,
      },
      areaServed: "GB",
      url: absoluteUrl("/services"),
    },
  })),
};

export const legacyServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Legacy System Rebuilds",
  serviceType: "Legacy system rebuilds",
  description:
    "Microsoft Access databases, old desktop tools, spreadsheet workflows, and unsupported internal systems rebuilt as owned web apps.",
  provider: {
    "@id": organizationId,
  },
  areaServed: "GB",
  url: absoluteUrl("/legacy-systems"),
};

export const projectShowcaseJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Brandd project showcases",
  itemListElement: mvpShowcases.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "CreativeWork",
      name: project.name,
      description: project.expandedCopy,
      url: project.href,
      creator: {
        "@id": organizationId,
      },
    },
  })),
};
