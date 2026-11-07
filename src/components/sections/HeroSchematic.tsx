import type { CSSProperties } from "react";

/**
 * Decorative "cable schematic" for the hero: orthogonal cable runs from field
 * devices (circles) converge on a patch panel of pixel-square ports — the same
 * pixel motif as the logo. Each run draws once on load via the `.trace` class;
 * paths use pathLength="1" so one dash length fits every path.
 */
const runs: { d: string; delay: number; port: [number, number] }[] = [
  { d: "M40 70H150V170H232", delay: 0.1, port: [244, 170] },
  { d: "M60 250H140V206H232", delay: 0.25, port: [244, 206] },
  { d: "M90 400H180V242H232", delay: 0.4, port: [244, 242] },
  { d: "M520 60H440V170H388", delay: 0.2, port: [376, 170] },
  { d: "M530 300H460V242H388", delay: 0.35, port: [376, 242] },
  { d: "M470 430V330H310V290", delay: 0.5, port: [310, 278] },
];

const devices: [number, number][] = [
  [40, 70],
  [60, 250],
  [90, 400],
  [520, 60],
  [530, 300],
  [470, 430],
];

const v = (delay: number) => ({ "--delay": `${delay}s` }) as CSSProperties;

export function HeroSchematic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 480" className={className} aria-hidden="true" focusable="false">
      {/* Cable runs */}
      <g fill="none" stroke="#5BC0EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {runs.map((r, i) => (
          <path key={i} d={r.d} pathLength={1} className="trace" style={v(r.delay)} opacity="0.85" />
        ))}
      </g>

      {/* Patch panel: rows of pixel-square ports */}
      <g>
        <rect x="232" y="140" width="156" height="140" rx="10" fill="#132A59" stroke="#2A4378" strokeWidth="1.5" />
        {Array.from({ length: 4 }).map((_, row) =>
          Array.from({ length: 6 }).map((_, col) => {
            // A few ports are "live" (cyan) — the ones the cables land on.
            const live = (row === 0 && (col === 0 || col === 5)) || (row === 3 && col !== 2 && col % 2 === 0);
            return (
              <rect
                key={`${row}-${col}`}
                x={248 + col * 22}
                y={156 + row * 30}
                width="14"
                height="14"
                rx="2"
                fill={live ? "#5BC0EB" : "#24447F"}
                className="node"
                style={v(0.9 + (row * 6 + col) * 0.02)}
              />
            );
          }),
        )}
      </g>

      {/* Field devices at the far end of each run */}
      <g>
        {devices.map(([x, y], i) => (
          <g key={i} className="node" style={v(0.2 + i * 0.08)}>
            <circle cx={x} cy={y} r="11" fill="#0D1F45" stroke="#5BC0EB" strokeWidth="1.5" />
            <circle cx={x} cy={y} r="3.5" fill="#5BC0EB" />
          </g>
        ))}
      </g>

      {/* Stray pixels breaking off the panel, echoing the logo */}
      <g fill="#2B6CB0">
        <rect x="396" y="122" width="10" height="10" rx="1.5" className="node" style={v(1.4)} />
        <rect x="412" y="104" width="7" height="7" rx="1" className="node" style={v(1.5)} fill="#5BC0EB" />
        <rect x="424" y="120" width="5" height="5" rx="1" className="node" style={v(1.6)} />
      </g>
    </svg>
  );
}
