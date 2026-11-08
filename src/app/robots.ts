import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Built once into out/robots.txt (static export).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Next.js build internals: nothing to rank, and crawling them wastes budget.
        // Page JS/CSS lives under /_next/static and stays allowed so Google can render.
        disallow: ["/_next/data/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
