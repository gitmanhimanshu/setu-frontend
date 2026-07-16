import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Nothing useful to a crawler, and it's per-user or internal by definition.
      disallow: ["/dashboard", "/admin"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
