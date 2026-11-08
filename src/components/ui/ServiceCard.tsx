import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Locale-relative path of the service page; makes the whole card a link. */
  href?: string;
  headingLevel?: "h2" | "h3";
};

/** One cell of the services panel. Presentational only; text comes in translated. */
export function ServiceCard({ icon: Icon, title, description, href, headingLevel = "h3" }: Props) {
  const Heading = headingLevel;
  const body = (
    <>
      <span className="inline-flex size-12 items-center justify-center rounded-[var(--radius-control)] bg-navy text-cyan transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
        <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <Heading className="mt-5 text-lg font-semibold text-ink">{title}</Heading>
      <p className="mt-2 leading-relaxed text-muted">{description}</p>
      {href && (
        <span className="mt-auto pt-5 text-brand" aria-hidden="true">
          <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
        </span>
      )}
    </>
  );

  const className = "group flex h-full flex-col p-6 transition-colors duration-200 hover:bg-brand-50 sm:p-7";

  return href ? (
    <Link href={href} className={className}>
      {body}
    </Link>
  ) : (
    <article className={className}>{body}</article>
  );
}
