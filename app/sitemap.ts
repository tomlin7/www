import type { MetadataRoute } from "next";
import data from "@/content/portfolio.json";
import { navigation, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...navigation.map(({ href }) => ({
      url: `${siteUrl}${href === "/" ? "" : href}`,
      changeFrequency: "monthly" as const,
      priority: href === "/" ? 1 : 0.8,
    })),
    ...data.posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(`${post.date}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
