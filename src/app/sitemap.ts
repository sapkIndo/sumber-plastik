import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/data/categories";
import { SITE_URL } from "@/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const categoryUrls: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/product/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [
    { url: SITE_URL,                   lastModified: now, changeFrequency: "daily",   priority: 1.0 },
    { url: `${SITE_URL}/product`,      lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${SITE_URL}/about`,        lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`,      lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...categoryUrls,
  ];
}
