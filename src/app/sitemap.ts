import type { MetadataRoute } from "next";
import { GUIDES_PATH, SITE_URL, authorPath, pillarPath, pillars, postPath, posts, postsByPillar } from "@/data/posts";
import { infoPages } from "@/data/pages";

// Required for the static export
export const dynamic = "force-static";

function latestUpdate(dates: string[]) {
  return [...dates].sort().at(-1);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUpdated = latestUpdate(posts.map((post) => post.updatedAt));

  return [
    { url: SITE_URL, lastModified: siteUpdated, changeFrequency: "weekly", priority: 1 },
    ...pillars.map((pillar) => ({
      url: `${SITE_URL}${pillarPath(pillar)}`,
      lastModified: latestUpdate(postsByPillar(pillar.id).map((post) => post.updatedAt)),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}${postPath(post)}`,
      // Changes only when a post is substantively updated
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}${GUIDES_PATH}`, lastModified: siteUpdated, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}${authorPath}`, lastModified: siteUpdated, changeFrequency: "monthly", priority: 0.5 },
    ...infoPages.map((page) => ({
      url: `${SITE_URL}/${page.slug}`,
      lastModified: page.updatedAt,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
