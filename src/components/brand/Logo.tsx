import { useId } from "react";
import clsx from "clsx";

type Tone = "light" | "dark";

type LogoMarkProps = {
  className?: string;
  /** "light" for navy backgrounds, "dark" for white backgrounds. */
  tone?: Tone;
};

/**
 * Vector redraw of the Watermark IT mark from the business card:
 * a glossy blue globe with circuit traces ending in nodes, a trail of pixel
 * squares breaking off to the upper right, and two orbit swooshes underneath.
 * Replace with the designer's original SVG when available.
 * Decorative — the accessible name comes from the wordmark beside it.
 */
export function LogoMark({ className, tone = "dark" }: LogoMarkProps) {
  // Unique gradient ids: the mark appears more than once per page (navbar + footer).
  const uid = useId().replace(/:/g, "");
  const globe = `globe-${uid}`;
  const shine = `shine-${uid}`;
  const swoosh = `swoosh-${uid}`;
  const light = tone === "light";

  return (
    <svg viewBox="0 0 64 64" className={clsx("shrink-0", className)} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={globe} cx="0.62" cy="0.34" r="0.75">
          <stop offset="0" stopColor="#9AD8F5" />
          <stop offset="0.35" stopColor="#3B8FDB" />
          <stop offset="0.75" stopColor="#1F56A8" />
          <stop offset="1" stopColor="#132A59" />
        </radialGradient>
        <radialGradient id={shine} cx="0.68" cy="0.28" r="0.32">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.75" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={swoosh} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={light ? "#9AD8F5" : "#2B6CB0"} />
          <stop offset="1" stopColor={light ? "#5BC0EB" : "#132A59"} />
        </linearGradient>
      </defs>

      {/* Orbit swooshes wrapping the left and bottom of the globe */}
      <path d="M9 21C3 33 7 50 22 56c9 3.6 19 2.4 26-2.6C38 57 24 55 15 47 8.6 40.6 6.5 30 9 21Z" fill={`url(#${swoosh})`} />
      <path
        d="M14.5 19.5C10.5 29 13 41.5 23 47.3c6.4 3.7 14 4 20.4 1.4C35 50 26.8 47.6 21 42 15.6 36.6 13.6 27.6 14.5 19.5Z"
        fill={`url(#${swoosh})`}
        opacity="0.65"
      />

      {/* Globe */}
      <circle cx="35" cy="33" r="17" fill={`url(#${globe})`} />
      {/* Faint continents */}
      <path
        d="M38 19.5c3 .8 5.6 2.6 7.4 5-2 .6-3.4 2-3.2 4 .2 1.8-1.4 2.6-3 2-1.6-.7-2.2-2.4-1.4-4 .8-1.5.2-3.4-1.4-4.2 0-1.2.6-2.2 1.6-2.8Zm4.4 15c1.8-.4 3.8.4 4.6 2-.8 2.8-2.4 5.2-4.6 7-1.2-1.4-1.6-3.2-1-5 .4-1.4.2-2.8 1-4Z"
        fill="#9AD8F5"
        opacity="0.35"
      />
      <circle cx="35" cy="33" r="17" fill={`url(#${shine})`} />

      {/* Circuit traces entering from the left, ending in nodes */}
      <g fill="none" stroke="#E6F4FC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 27h6l4-4h4" />
        <path d="M18.5 33h12" />
        <path d="M19 39h6l4 4h4" />
      </g>
      <g fill="#132A59" stroke="#E6F4FC" strokeWidth="1.4">
        <circle cx="34.6" cy="23" r="1.8" />
        <circle cx="32.4" cy="33" r="1.8" />
        <circle cx="34.6" cy="43" r="1.8" />
      </g>

      {/* Pixel squares breaking off to the upper right, shrinking as they go */}
      <g fill={light ? "#5BC0EB" : "#2B6CB0"}>
        <rect x="44" y="12" width="4" height="4" rx="0.5" />
        <rect x="49" y="12" width="4" height="4" rx="0.5" />
        <rect x="49" y="7" width="3.4" height="3.4" rx="0.4" />
        <rect x="54" y="8" width="3.2" height="3.2" rx="0.4" />
        <rect x="54" y="3.4" width="2.6" height="2.6" rx="0.3" opacity="0.8" />
        <rect x="58.4" y="5" width="2.4" height="2.4" rx="0.3" opacity="0.7" />
        <rect x="58.6" y="1" width="2" height="2" rx="0.3" opacity="0.55" />
        <rect x="61.4" y="2.6" width="1.6" height="1.6" rx="0.2" opacity="0.45" />
      </g>
    </svg>
  );
}

type LogoProps = LogoMarkProps & {
  name: string;
  /** Optional line under the name, as on the business card. */
  tagline?: string;
};

/** Mark + wordmark lockup. Text is passed in translated so screen readers hear the right language. */
export function Logo({ name, tagline, tone = "dark", className }: LogoProps) {
  const light = tone === "light";
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <LogoMark tone={tone} className="size-11" />
      <span className="flex flex-col">
        <span className={clsx("text-lg font-bold leading-tight tracking-tight", light ? "text-white" : "text-ink")}>
          {name}
        </span>
        {tagline && (
          <span className={clsx("hidden text-xs leading-tight sm:block", light ? "text-on-navy" : "text-muted")}>{tagline}</span>
        )}
      </span>
    </span>
  );
}
