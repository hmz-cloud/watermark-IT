import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Contact } from "@/components/sections/Contact";
import { BusinessJsonLd } from "@/components/seo/BusinessJsonLd";

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);

  return (
    <>
      <BusinessJsonLd locale={locale} />
      <Hero />
      <Services />
      <WhyUs />
      <Contact />
    </>
  );
}
