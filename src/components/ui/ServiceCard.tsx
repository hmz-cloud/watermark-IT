import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
};

/** One cell of the services panel. Presentational only; text comes in translated. */
export function ServiceCard({ icon: Icon, title, description }: Props) {
  return (
    <article className="group flex h-full flex-col p-6 transition-colors duration-200 hover:bg-brand-50 sm:p-7">
      <span className="inline-flex size-12 items-center justify-center rounded-[var(--radius-control)] bg-navy text-cyan transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
        <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 leading-relaxed text-muted">{description}</p>
    </article>
  );
}
