import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site";
import { services } from "@/components/sections/servicesData";

// Built once into out/sitemap.xml (static export).
export const dynamic = "force-static";

/** Every locale's home page, each listing its language alternates (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(`/${l}/`)]));
  const lastModified = new Date();

  return [
    ...routing.locales.map((locale) => ({
      url: absoluteUrl(`/${locale}/`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: locale === routing.defaultLocale ? 1 : 0.9,
      alternates: { languages: { ...languages, "x-default": absoluteUrl("/") } },
    })),
    ...services.flatMap(({ slug }) => {
      const path = `/services/${slug}/`;
      const alternates = {
        languages: Object.fromEntries([
          ...routing.locales.map((l) => [l, absoluteUrl(`/${l}${path}`)]),
          ["x-default", absoluteUrl(`/en${path}`)],
        ]),
      };
      return routing.locales.map((locale) => ({
        url: absoluteUrl(`/${locale}${path}`),
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates,
      }));
    }),
    {
      url: absoluteUrl("/profile/watermark-it-company-profile-en.pdf"),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: absoluteUrl("/profile/watermark-it-company-profile-ar.pdf"),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];
}
