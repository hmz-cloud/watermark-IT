import { absoluteUrl, siteUrl } from "@/lib/site";

type Props = {
  locale: string;
  slug: string;
  name: string;
  description: string;
  /** Labels for Home › Services › this service. */
  breadcrumb: [string, string, string];
};

/**
 * schema.org Service + BreadcrumbList for one service page. The provider points
 * at the business node from BusinessJsonLd (@id .../#business), so Google ties
 * every service to the same company.
 */
export function ServiceJsonLd({ locale, slug, name, description, breadcrumb }: Props) {
  const url = absoluteUrl(`/${locale}/services/${slug}/`);
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name,
        serviceType: name,
        description,
        url,
        inLanguage: locale,
        provider: { "@type": "ProfessionalService", "@id": `${siteUrl}/#business`, name: "Watermark IT", url: absoluteUrl(`/${locale}/`) },
        areaServed: { "@type": "City", name: "Riyadh" },
        availableChannel: {
          "@type": "ServiceChannel",
          servicePhone: { "@type": "ContactPoint", telephone: "+966538917030", contactType: "sales" },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: breadcrumb[0], item: absoluteUrl(`/${locale}/`) },
          { "@type": "ListItem", position: 2, name: breadcrumb[1], item: absoluteUrl(`/${locale}/#services`) },
          { "@type": "ListItem", position: 3, name: breadcrumb[2], item: url },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
