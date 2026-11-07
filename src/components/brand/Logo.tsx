import clsx from "clsx";

type LogoMarkProps = {
  className?: string;
  /** "light" for navy backgrounds, "dark" for white backgrounds. */
  tone?: "light" | "dark";
};

/**
 * Placeholder brand mark: a wireframe globe whose grid intersections are
 * network nodes, with pixel squares breaking away from the upper edge.
 * Purely decorative — the accessible name comes from the wordmark beside it.
 */
export function LogoMark({ className, tone = "dark" }: LogoMarkProps) {
  const stroke = tone === "light" ? "#C9D5EA" : "#132A59";
  const node = tone === "light" ? "#4FD1C5" : "#2B6CB0";

  return (
    <svg
      viewBox="0 0 48 48"
      className={clsx("shrink-0", className)}
      aria-hidden="true"
      focusable="false"
    >
      {/* Globe outline, meridian and parallels */}
      <g fill="none" stroke={stroke} strokeWidth="1.6">
        <circle cx="22" cy="26" r="17" />
        <ellipse cx="22" cy="26" rx="7.5" ry="17" />
        <path d="M5.5 21h33M5.5 31h33" />
      </g>
      {/* Network links between nodes */}
      <path
        d="M14.5 21 22 31l7.5-10M14.5 31 22 21"
        fill="none"
        stroke={node}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Nodes on the grid intersections */}
      <g fill={node}>
        <circle cx="14.5" cy="21" r="2.2" />
        <circle cx="29.5" cy="21" r="2.2" />
        <circle cx="14.5" cy="31" r="2.2" />
        <circle cx="29.5" cy="31" r="2.2" />
        <circle cx="22" cy="21" r="2.2" />
        <circle cx="22" cy="31" r="2.2" />
      </g>
      {/* Pixel squares dissolving off the globe */}
      <rect x="34" y="6" width="5" height="5" rx="0.6" fill="#4FD1C5" />
      <rect x="41" y="2" width="4" height="4" rx="0.5" fill="#2B6CB0" />
      <rect x="40" y="12" width="3.5" height="3.5" rx="0.4" fill={node} opacity="0.7" />
      <rect x="45" y="9" width="2.5" height="2.5" rx="0.3" fill="#4FD1C5" opacity="0.6" />
    </svg>
  );
}

type LogoProps = LogoMarkProps & { name: string };

/** Mark + wordmark lockup. `name` is translated so screen readers hear the right language. */
export function Logo({ name, tone = "dark", className }: LogoProps) {
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <LogoMark tone={tone} className="size-10" />
      <span
        className={clsx(
          "text-lg font-semibold leading-none tracking-tight",
          tone === "light" ? "text-white" : "text-ink",
        )}
      >
        {name}
      </span>
    </span>
  );
}
