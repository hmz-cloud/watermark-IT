import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  CircleCheck,
  Home,
  MessageCircle,
  Store,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { buttonClasses } from "@/components/ui/Button";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { serviceBySlug, servicePath, services } from "@/components/sections/servicesData";
import { sectionIds, shareImage, siteUrl, whatsappLink } from "@/lib/site";

type Params = { locale: string; service: string };
type QA = { q: string; a: string };
type Item = { title: string; description: string };

// Static export: one page per service per locale, nothing else.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ service: slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, service } = await params;
  const entry = serviceBySlug(service);
  if (!entry) return {};
  const t = await getTranslations({ locale: locale as Locale, namespace: `ServicePages.${entry.key}` });
  const tc = await getTranslations({ locale: locale as Locale, namespace: "Common" });
  const path = `/services/${entry.slug}/`;

  return {
    metadataBase: new URL(siteUrl),
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { en: `/en${path}`, ar: `/ar${path}`, "x-default": `/en${path}` },
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: `/${locale}${path}`,
      siteName: tc("companyName"),
      title: t("metaTitle"),
      description: t("metaDescription"),
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_SA"],
      images: [shareImage(locale, tc("companyName"))],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: [shareImage(locale, tc("companyName")).url],
    },
  };
}

const steps = ["survey", "design", "supply", "install", "test", "support"] as const;
const sectors: { key: "offices" | "retail" | "restaurants" | "homes"; icon: LucideIcon }[] = [
  { key: "offices", icon: Building2 },
  { key: "retail", icon: Store },
  { key: "restaurants", icon: UtensilsCrossed },
  { key: "homes", icon: Home },
];

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { locale, service } = await params;
  const entry = serviceBySlug(service);
  if (!entry) notFound();
  setRequestLocale(locale as Locale);

  const t = await getTranslations(`ServicePages.${entry.key}`);
  const tp = await getTranslations("ServicePage");
  const ts = await getTranslations("Services.items");
  const tprof = await getTranslations("Profile");
  const thero = await getTranslations("Hero");

  const name = ts(`${entry.key}.title`);
  const includes = t.raw("includes") as Item[];
  const faqs = [...(t.raw("faqs") as QA[]), ...(tp.raw("faqShared") as QA[])];
  const others = services.filter((s) => s.key !== entry.key);
  const wa = whatsappLink(tp("whatsappTemplate", { service: name }));
  const Icon = entry.icon;

  return (
    <>
      <ServiceJsonLd
        locale={locale}
        slug={entry.slug}
        name={name}
        description={t("metaDescription")}
        breadcrumb={[tp("breadcrumbHome"), tp("breadcrumbServices"), name]}
      />

      {/* Hero */}
      <section aria-labelledby="service-title" className="on-navy bg-navy-900">
        <Container className="py-14 sm:py-20">
          <nav aria-label={tp("breadcrumbLabel")}>
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-on-navy">
              <li>
                <Link href="/" className="hover:text-cyan">{tp("breadcrumbHome")}</Link>
              </li>
              <ChevronRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
              <li>
                <Link href={{ pathname: "/", hash: sectionIds.services }} className="hover:text-cyan">
                  {tp("breadcrumbServices")}
                </Link>
              </li>
              <ChevronRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
              <li aria-current="page" className="text-white">{name}</li>
            </ol>
          </nav>

          <div className="mt-10 max-w-3xl">
            <span className="inline-flex size-14 items-center justify-center rounded-[var(--radius-control)] bg-navy-800 text-cyan">
              <Icon className="size-7" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h1
              id="service-title"
              className="mt-6 text-4xl font-semibold leading-[1.1] tracking-[-0.025em] text-balance text-white sm:text-5xl"
            >
              {t("h1")}
            </h1>
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-on-navy">{t("intro")}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={{ pathname: "/", hash: sectionIds.contact }} className={buttonClasses("accent", "lg")}>
                {tp("ctaQuote")}
              </Link>
              <a href={wa} target="_blank" rel="noopener noreferrer" className={buttonClasses("outlineLight", "lg")}>
                <MessageCircle className="size-5" aria-hidden="true" />
                {tp("ctaWhatsapp")}
              </a>
            </div>

            <ul className="mt-10 grid gap-3 border-t border-line-dark pt-6 text-sm text-on-navy sm:grid-cols-3 sm:gap-6">
              {(["survey", "engineers", "bilingual"] as const).map((k) => (
                <li key={k} className="flex items-start gap-2">
                  <CircleCheck className="mt-0.5 size-4 shrink-0 text-cyan" aria-hidden="true" />
                  {thero(`points.${k}`)}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* What's included */}
      <section aria-labelledby="included-title" className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading id="included-title" title={tp("includedTitle")} />
          <ul className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-line bg-line sm:grid-cols-2">
            {includes.map((item) => (
              <li key={item.title} className="flex gap-4 bg-white p-6 sm:p-7">
                <CircleCheck className="mt-1 size-5 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Process */}
      <section aria-labelledby="process-title" className="bg-paper py-16 sm:py-20">
        <Container>
          <SectionHeading id="process-title" title={tprof("processTitle")} />
          <ol className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((k, i) => (
              <li key={k} className="bg-white p-6 sm:p-7">
                <span className="font-mono text-sm font-semibold text-brand" dir="ltr">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-ink">{tprof(`process.${k}.title`)}</h3>
                <p className="mt-2 leading-relaxed text-muted">{tprof(`process.${k}.description`)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Sectors + FAQ */}
      <section aria-labelledby="faq-title" className="bg-white py-16 sm:py-20">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">{tprof("sectorsTitle")}</h2>
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {sectors.map(({ key, icon: SIcon }) => (
                <li key={key} className="flex flex-col gap-3 rounded-[var(--radius-control)] bg-paper p-4 text-sm font-medium text-ink">
                  <SIcon className="size-5 text-brand" aria-hidden="true" />
                  {tprof(`sectors.${key}`)}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-8">
            <h2 id="faq-title" className="text-2xl font-semibold tracking-tight text-ink">{tp("faqTitle")}</h2>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {faqs.map(({ q, a }) => (
                <div key={q} className="py-5">
                  <dt className="font-semibold text-ink">{q}</dt>
                  <dd className="mt-2 leading-relaxed text-muted">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Other services */}
      <section aria-labelledby="other-title" className="bg-paper py-16 sm:py-20">
        <Container>
          <SectionHeading id="other-title" title={tp("otherTitle")} />
          <ul className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {others.map(({ key, slug, icon }) => (
              <li key={key} className="bg-white">
                <ServiceCard
                  icon={icon}
                  title={ts(`${key}.title`)}
                  description={ts(`${key}.description`)}
                  href={servicePath(slug)}
                  headingLevel="h3"
                />
              </li>
            ))}
            {/* 7 services leave one cell in a 4-column grid: fill it with the way back to all of them. */}
            <li className="bg-navy">
              <Link
                href={{ pathname: "/", hash: sectionIds.services }}
                className="group flex h-full min-h-40 flex-col justify-between p-6 text-white transition-colors duration-200 hover:bg-navy-800 sm:p-7"
              >
                <span className="text-lg font-semibold">{tp("allServices")}</span>
                <ArrowRight
                  className="size-5 text-cyan transition-transform duration-200 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </li>
          </ul>
        </Container>
      </section>

      {/* Closing call to action */}
      <section aria-labelledby="cta-title" className="on-navy bg-navy-900 py-16 sm:py-20">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 id="cta-title" className="text-3xl font-semibold tracking-tight text-white">{tp("ctaTitle")}</h2>
            <p className="mt-3 text-lg leading-relaxed text-on-navy">{tp("ctaBody")}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href={{ pathname: "/", hash: sectionIds.contact }} className={buttonClasses("accent", "lg")}>
              {tp("ctaQuote")}
            </Link>
            <a href={wa} target="_blank" rel="noopener noreferrer" className={buttonClasses("outlineLight", "lg")}>
              <MessageCircle className="size-5" aria-hidden="true" />
              {tp("ctaWhatsapp")}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
