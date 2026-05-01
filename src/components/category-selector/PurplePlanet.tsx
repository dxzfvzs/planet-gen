import { Moon } from "./Moon.tsx";
import { Jiggle, RotateToFollowSun } from "./Rotation.tsx";
import type { Ring } from "./ring.ts";

const RINGS: Ring[] = [
  { cx: 0, cy: 2.5, rx: 50, ry: 7, stroke: "#e8b9f8", strokeWidth: 1, fill: "none", strokeOpacity: 0.65 },
  { cx: 0, cy: 2.5, rx: 60, ry: 11, stroke: "#cc61ef", strokeWidth: 2.5, fill: "none", strokeOpacity: 0.35 },
];

export function PurplePlanet({ planetSize = 30 }: { planetSize?: number }) {
  return (
    <svg width="220" height="220" viewBox="-50 -50 100 100" overflow="visible">
      <defs>
        <radialGradient id="purplePlanetBase" cx="35%" cy="28%" r="62%">
          <stop offset="5%" stopColor="#b57aee"/>
          <stop offset="52%" stopColor="#6a28b8"/>
          <stop offset="100%" stopColor="#241255"/>
        </radialGradient>

        <clipPath id="purplePlanetClip">
          <circle cx="0" cy="0" r={planetSize}/>
        </clipPath>

        <mask id="purplePlanetOcclusionMask">
          <rect x="-200" y="-200" width="400" height="400" fill="white"/>
          <circle cx="0" cy="0" r={planetSize} fill="url(#planetOcclusionMaskShade)"/>
        </mask>
      </defs>

      <RotateToFollowSun>
        <circle cx="0" cy="0" r={planetSize} fill="url(#purplePlanetBase)"/>
      </RotateToFollowSun>

      <Jiggle duration={25} angle={15}>
        <Jiggle duration={20} angle={5}>
          <g clipPath="url(#purplePlanetClip)" filter="url(#bandBlur)">
            <ellipse cx="0" cy="8" rx="50" ry="5" fill="#4a1288" opacity="0.38"/>
            <ellipse cx="0" cy="14" rx="50" ry="3.5" fill="#7030c0" opacity="0.22"/>
            <ellipse cx="0" cy="-6" rx="50" ry="4" fill="#3a0e6a" opacity="0.30"/>
            <ellipse cx="0" cy="-14" rx="50" ry="3" fill="#6025a8" opacity="0.20"/>
            <ellipse cx="0" cy="22" rx="50" ry="3" fill="#2e0860" opacity="0.28"/>
            <ellipse cx="0" cy="-22" rx="50" ry="2.5" fill="#7838c0" opacity="0.18"/>
            <ellipse cx="-12" cy="6" rx="8" ry="4" fill="#9955e8" opacity="0.20" transform="rotate(12)"/>
            <ellipse cx="16" cy="-8" rx="6" ry="3" fill="#3a1280" opacity="0.22" transform="rotate(-8)"/>
            <ellipse cx="8" cy="18" rx="5" ry="2.5" fill="#8833cc" opacity="0.18" transform="rotate(5)"/>
            <ellipse cx="-20" cy="-10" rx="7" ry="3" fill="#5522a0" opacity="0.20" transform="rotate(20)"/>
            <ellipse cx="0" cy="-36" rx="18" ry="9" fill="#9966dd" opacity="0.20"/>
            <ellipse cx="0" cy="36" rx="16" ry="8" fill="#5511a8" opacity="0.18"/>
          </g>
        </Jiggle>

        <Jiggle duration={20} angle={15}>
          <g clipPath="url(#purplePlanetClip)" filter="url(#softBlur)" opacity="0.55">
            <ellipse cx="2" cy="-4" rx="22" ry="2.2" fill="#d8b0ff" opacity="0.35" transform="rotate(-5)"/>
            <ellipse cx="-4" cy="10" rx="18" ry="1.8" fill="#cc99ff" opacity="0.30" transform="rotate(7)"/>
            <ellipse cx="8" cy="-18" rx="14" ry="1.5" fill="#e0c0ff" opacity="0.28" transform="rotate(3)"/>
            <ellipse cx="-6" cy="24" rx="12" ry="1.5" fill="#c8a0f8" opacity="0.25" transform="rotate(-3)"/>
            <ellipse cx="14" cy="4" rx="10" ry="1.2" fill="#f0d8ff" opacity="0.22" transform="rotate(14)"/>
          </g>
        </Jiggle>

        <g>
          {RINGS.map((r, i) => (
            <ellipse key={`${i}`}{...r} fill="none" mask="url(#purplePlanetOcclusionMask)"/>
          ))}
        </g>
      </Jiggle>

      <g>
        <Jiggle duration={20} angle={15}>
          <g mask="url(#purplePlanetOcclusionMask)">
            <Moon
              id={"purple-1"}
              orbitRx={55} orbitRy={15} orbitTilt={-3}
              radius={2.8}
              duration="7s" begin={-6.2}
              baseId="moonBase"
            />

            <Moon
              id={"purple-2"}
              orbitRx={45} orbitRy={10} orbitTilt={16}
              radius={5.5}
              duration="6s" begin={-6}
              baseId="moonBase"
            />
          </g>
        </Jiggle>
      </g>
    </svg>
  );
}