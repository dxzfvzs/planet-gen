import type { Ring } from "./ring.ts";
import { RotatingRingGroup } from "./Rotation.tsx";

const RINGS: Ring[] = [
  { cx: 0, cy: 2.5, rx: 37, ry: 7, stroke: "#61bdef", strokeWidth: 2, fill: "none", strokeOpacity: 0.65 },
  { cx: 0, cy: 2.5, rx: 44, ry: 11, stroke: "#61bdef", strokeWidth: 2.5, fill: "none", strokeOpacity: 0.35 },
];

function ringDash(rx: number) {
  return `${(rx / 30) * 80} 200`;
}

export function BluePlanet({ planetSize = 25 }: { planetSize?: number }) {
  return (
    <svg width="220" height="220" viewBox="-50 -50 100 100" overflow="visible">
      <defs>
        <radialGradient id="planet" cx="35%" cy="28%" r="62%">
          <stop offset="0%" stopColor="#a0e4ff"/>
          <stop offset="52%" stopColor="#1868d8"/>
          <stop offset="100%" stopColor="#061e60"/>
        </radialGradient>

        <linearGradient id="ringFade" gradientUnits="userSpaceOnUse" x1="-50" y1="0" x2="50" y2="0">
          <stop offset="0%" stopColor="black" stopOpacity="0"/>
          <stop offset="20%" stopColor="white" stopOpacity="1"/>
          <stop offset="80%" stopColor="white" stopOpacity="1"/>
          <stop offset="100%" stopColor="black" stopOpacity="0"/>
        </linearGradient>

        <mask id="ringFadeMask">
          <rect x="-100" y="-100" width="200" height="200" fill="url(#ringFade)"/>
        </mask>
      </defs>

      <RotatingRingGroup duration={140}>
        <g>
          {RINGS.map((r, i) => (
            <ellipse
              key={`back-${i}`}
              {...r}
              strokeOpacity={r.strokeOpacity * 0.45}
            />
          ))}
        </g>
      </RotatingRingGroup>

      <circle cx="0" cy="0" r={planetSize} fill="url(#planet)"/>

      <RotatingRingGroup duration={140}>
        <g>
          {RINGS.map((r, i) => (
            <ellipse
              key={`front-${i}`}
              {...r}
              fill="none"
              mask="url(#ringFadeMask)"
              strokeDasharray={ringDash(r.rx)}
              strokeDashoffset={20}
            />
          ))}
        </g>
      </RotatingRingGroup>
    </svg>
  );
}