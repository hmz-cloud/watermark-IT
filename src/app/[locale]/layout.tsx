import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, getDirection } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { shareImage, siteUrl } from "@/lib/site";
import "../globals.css";

// Both fonts are exposed as CSS variables; globals.css picks one via :lang().
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

// Static export: only the locales below exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as "en" | "ar", namespace: "Meta" });
  const tc = await getTranslations({ locale: locale as "en" | "ar", namespace: "Common" });
  // Trailing slashes match the exported URLs (trailingSlash: true); "/en" would 301.
  return {
    metadataBase: new URL(siteUrl),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/`,
      languages: { en: "/en/", ar: "/ar/", "x-default": "/" },
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: `/${locale}/`,
      siteName: tc("companyName"),
      title: t("title"),
      description: t("description"),
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_SA"],
      images: [shareImage(locale, tc("companyName"))],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [shareImage(locale, tc("companyName")).url],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enables static rendering for this locale.
  setRequestLocale(locale);
  const t = await getTranslations("Common");

  return (
    <html lang={locale} dir={getDirection(locale)} className={`${inter.variable} ${plexArabic.variable}`}>
      <body className="min-h-dvh">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
          >
            {t("skipToContent")}
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
