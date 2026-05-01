import type { Ring } from "./ring.ts";

const RINGS: Ring[] = [
  { cx: -1, cy: 2.5, rx: 37, ry: 7, stroke: "#61bdef", strokeWidth: 1.5, fill: "none", strokeOpacity: 0.65 },
  { cx: -1, cy: 2.5, rx: 41, ry: 10, stroke: "#47c0fd", strokeWidth: 2.5, fill: "none", strokeOpacity: 0.55 },
];

function ringDash(rx: number) {
  return `${(rx / 30) * 80} 200`;
}

const RING_ROTATION = -30;

export function BluePlanet() {
  return (
    <svg width="220" height="220" viewBox="-35 -35 70 70" overflow="visible">
      <defs>
        <radialGradient id="bg" cx="35%" cy="28%" r="62%">
          <stop offset="0%" stopColor="#a0e4ff"/>
          <stop offset="52%" stopColor="#1868d8"/>
          <stop offset="100%" stopColor="#061e60"/>
        </radialGradient>

        <linearGradient
          id="ringFade"
          gradientUnits="userSpaceOnUse"
          x1="-35"
          y1="0"
          x2="35"
          y2="0"
        >
          <stop offset="0%" stopColor="black" stopOpacity="0"/>
          <stop offset="20%" stopColor="white" stopOpacity="1"/>
          <stop offset="80%" stopColor="white" stopOpacity="1"/>
          <stop offset="100%" stopColor="black" stopOpacity="0"/>
        </linearGradient>

        <mask id="ringFadeMask">
          <rect x="-100" y="-100" width="200" height="200" fill="url(#ringFade)"/>
        </mask>
      </defs>

      {/* back rings */}
      <g transform={`rotate(${RING_ROTATION})`} >
        {RINGS.map((r, i) => (
          <ellipse
            {...r}
            key={`back-${i}`}
            fill="none"
            strokeOpacity={r.strokeOpacity * 0.5}
          />
        ))}
      </g>

      {/* planet */}
      <circle cx="0" cy="0" r="19" fill="url(#bg)"/>

      {/* front ring */}
      <g transform={`rotate(${RING_ROTATION})`}>
        {RINGS.map((r, i) => (
          <ellipse
            {...r}
            key={`front-${i}`}
            fill="none"
            mask="url(#ringFadeMask)"
            strokeDasharray={ringDash(r.rx)}
            strokeDashoffset={20}
          />
        ))}
      </g>
    </svg>
  );
}