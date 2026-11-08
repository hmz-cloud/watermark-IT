import { useTranslations } from "next-intl";
import { services } from "@/components/sections/servicesData";
import { absoluteUrl, site, siteUrl } from "@/lib/site";

/**
 * schema.org JSON-LD for the business (LocalBusiness → ProfessionalService).
 * Only facts the site already states: no ratings, reviews or street address,
 * which Google penalises when they can't be verified. Add `address.streetAddress`,
 * `postalCode`, `geo` and the VAT/CR `identifier` once confirmed.
 */
export function BusinessJsonLd({ locale }: { locale: string }) {
  const tm = useTranslations("Meta");
  const tc = useTranslations("Common");
  const ts = useTranslations("Services.items");
  const tf = useTranslations("Footer");

  const pageUrl = absoluteUrl(`/${locale}/`);
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#business`,
        name: tc("companyName"),
        alternateName: locale === "ar" ? "Watermark IT" : "واترمارك لتقنية المعلومات",
        slogan: tc("tagline"),
        description: tf("about"),
        url: pageUrl,
        logo: absoluteUrl("/icon.svg"),
        image: absoluteUrl("/icon.svg"),
        telephone: "+966538917030",
        email: site.email,
        priceRange: "$$",
        currenciesAccepted: "SAR",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Riyadh",
          addressRegion: "Riyadh Province",
          addressCountry: "SA",
        },
        areaServed: { "@type": "City", name: "Riyadh" },
        availableLanguage: ["en", "ar"],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
            opens: "08:00",
            closes: "18:00",
          },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+966538917030",
          contactType: "sales",
          areaServed: "SA",
          availableLanguage: ["English", "Arabic"],
        },
        sameAs: [`https://wa.me/${site.whatsappNumber}`],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: tm("title"),
          itemListElement: services.map(({ key }) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: ts(`${key}.title`),
              description: ts(`${key}.description`),
              areaServed: { "@type": "City", name: "Riyadh" },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: tc("companyName"),
        inLanguage: ["en", "ar"],
        publisher: { "@id": `${siteUrl}/#business` },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: tm("title"),
        description: tm("description"),
        inLanguage: locale,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#business` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // `<` escaped so text from the message files can never close the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
