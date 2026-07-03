import type { MetadataRoute } from "next";
import { absoluteUrl, seoRoutes } from "@/content/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return seoRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
