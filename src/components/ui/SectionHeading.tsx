import clsx from "clsx";

type Props = {
  id?: string;
  title: string;
  subtitle?: string;
  tone?: "light" | "dark";
  className?: string;
};

/** Start-aligned section heading (flips with text direction). */
export function SectionHeading({ id, title, subtitle, tone = "dark", className }: Props) {
  return (
    <div className={clsx("max-w-2xl", className)}>
      <h2
        id={id}
        className={clsx(
          "text-3xl font-semibold tracking-tight text-balance sm:text-4xl",
          tone === "light" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            "mt-3 text-lg leading-relaxed text-pretty",
            tone === "light" ? "text-on-navy" : "text-muted",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
