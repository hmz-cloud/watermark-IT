import { useTranslations } from "next-intl";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { services } from "@/components/sections/servicesData";
import { site, sectionIds, whatsappLink } from "@/lib/site";

export function Footer() {
  const t = useTranslations("Footer");
  const tn = useTranslations("Nav");
  const ts = useTranslations("Services.items");
  const tc = useTranslations("Contact");
  const tcommon = useTranslations("Common");

  const linkClass = "inline-block py-1 text-on-navy transition-colors duration-200 hover:text-cyan";

  return (
    <footer className="on-navy bg-navy-900 text-on-navy">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo name={tcommon("companyName")} tone="light" />
          <p className="mt-4 max-w-sm leading-relaxed">{t("about")}</p>
        </div>

        <nav aria-labelledby="footer-company" className="lg:col-span-2">
          <h2 id="footer-company" className="font-semibold text-white">{t("quickLinks")}</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link href="/" className={linkClass}>{tn("home")}</Link></li>
            <li><Link href={{ pathname: "/", hash: sectionIds.whyUs }} className={linkClass}>{tn("whyUs")}</Link></li>
            <li><Link href={{ pathname: "/", hash: sectionIds.contact }} className={linkClass}>{tn("getQuote")}</Link></li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-services" className="lg:col-span-3">
          <h2 id="footer-services" className="font-semibold text-white">{t("servicesTitle")}</h2>
          <ul className="mt-4 grid grid-cols-1 gap-2.5">
            {services.map(({ key }) => (
              <li key={key}>
                <Link href={{ pathname: "/", hash: sectionIds.services }} className={linkClass}>
                  {ts(`${key}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="font-semibold text-white">{t("contactTitle")}</h2>
          <address className="mt-4 space-y-3 not-italic">
            <p className="text-white">{tc("contactPerson")}</p>
            <p>
              <a href={site.phoneHref} className={`inline-flex items-center gap-2 ${linkClass}`}>
                <Phone className="size-4" aria-hidden="true" />
                {/* Phone numbers always read left-to-right, even in Arabic. */}
                <span dir="ltr">{site.phoneDisplay}</span>
              </a>
            </p>
            <p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 ${linkClass}`}
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                {tc("whatsappLabel")}
              </a>
            </p>
            <p className="inline-flex items-center gap-2">
              <MapPin className="size-4" aria-hidden="true" />
              {tc("location")}
            </p>
          </address>
        </div>
      </Container>

      <div className="border-t border-line-dark">
        <Container className="flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>{t("rights", { year: new Date().getFullYear() })}</p>
          {/* VAT / CR — values live in lib/site.ts; placeholder text until issued. */}
          <dl className="flex flex-wrap gap-x-6 gap-y-1">
            <div className="flex gap-1.5">
              <dt>{t("vat")}:</dt>
              <dd className="text-white" dir={site.vatNumber ? "ltr" : undefined}>{site.vatNumber ?? t("placeholder")}</dd>
            </div>
            <div className="flex gap-1.5">
              <dt>{t("cr")}:</dt>
              <dd className="text-white" dir={site.crNumber ? "ltr" : undefined}>{site.crNumber ?? t("placeholder")}</dd>
            </div>
          </dl>
        </Container>
      </div>
    </footer>
  );
}
