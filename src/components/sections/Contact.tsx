import { useTranslations } from "next-intl";
import { Clock, MapPin, MessageCircle, Phone, UserRound, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "./ContactForm";
import { sectionIds, site, whatsappLink } from "@/lib/site";

function InfoRow({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <Icon className="mt-0.5 size-5 shrink-0 text-cyan" aria-hidden="true" />
      <div>
        <dt className="text-sm text-on-navy">{label}</dt>
        <dd className="mt-0.5 font-medium text-white">{children}</dd>
      </div>
    </div>
  );
}

export function Contact() {
  const t = useTranslations("Contact");
  const tw = useTranslations("WhatsApp");
  const linkClass = "underline-offset-4 decoration-cyan/60 hover:text-cyan hover:underline";

  return (
    <section id={sectionIds.contact} aria-labelledby="contact-title" className="bg-paper py-20 sm:py-24">
      <Container>
        <SectionHeading id="contact-title" title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-12 grid overflow-hidden rounded-[var(--radius-panel)] border border-line lg:grid-cols-12">
          {/* Direct-contact panel */}
          <aside className="on-navy bg-navy p-7 sm:p-9 lg:col-span-5">
            <h3 className="text-xl font-semibold text-white">{t("infoTitle")}</h3>
            <dl className="mt-8 space-y-6">
              <InfoRow icon={UserRound} label={t("contactRole")}>
                {t("contactPerson")}
              </InfoRow>
              <InfoRow icon={Phone} label={t("phoneLabel")}>
                <a href={site.phoneHref} className={linkClass}>
                  <span dir="ltr">{site.phoneDisplay}</span>
                </a>
              </InfoRow>
              <InfoRow icon={MessageCircle} label={t("whatsappLabel")}>
                <a href={whatsappLink(tw("greeting"))} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <span dir="ltr">{site.phoneDisplay}</span>
                </a>
              </InfoRow>
              <InfoRow icon={MapPin} label={t("locationLabel")}>
                {t("location")}
              </InfoRow>
              <InfoRow icon={Clock} label={t("hoursLabel")}>
                {t("hours")}
              </InfoRow>
            </dl>
          </aside>

          <div className="bg-white p-7 sm:p-9 lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
