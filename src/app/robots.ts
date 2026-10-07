import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/posts";

// Required for the static export
export const dynamic = "force-static";

// All crawlers, including AI crawlers, may read the site
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
