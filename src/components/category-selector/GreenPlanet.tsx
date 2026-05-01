import type { Ring } from "./ring.ts";
import { Jiggle, RotateToFollowSun, RotatingGroup } from "./Rotation.tsx";
import { Moon } from "./Moon.tsx";

const RINGS: Ring[] = [];

export function GreenPlanet({ planetSize = 20 }: { planetSize?: number }) {
  return (
    <svg width="220" height="220" viewBox="-50 -50 100 100" overflow="visible">
      <defs>
        <radialGradient id="greenPlanetBase" cx="35%" cy="28%" r="62%">
          <stop offset="0%" stopColor="#b0f070"/>
          <stop offset="55%" stopColor="#2a9e35"/>
          <stop offset="100%" stopColor="#155020"/>
        </radialGradient>

        <clipPath id="greenPlanetClip">
          <circle cx="0" cy="0" r={planetSize}/>
        </clipPath>

        <mask id="greenPlanetOcclusionMask">
          <rect x="-200" y="-200" width="400" height="400" fill="white"/>
          <circle cx="0" cy="0" r={planetSize} fill="url(#planetOcclusionMaskShade)"/>
        </mask>
      </defs>

      <RotateToFollowSun>
        <circle cx="0" cy="0" r={planetSize} fill="url(#greenPlanetBase)"/>
      </RotateToFollowSun>

      <RotatingGroup duration={17}>

        <Jiggle duration={20} angle={1}>
          <g clipPath="url(#greenPlanetClip)" filter="url(#bandBlur)">
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

        <Jiggle duration={20} angle={2}>
          <g clipPath="url(#greenPlanetClip)" filter="url(#softBlur)" opacity="0.55">
            <ellipse cx="2" cy="-4" rx="22" ry="2.2" fill="#d8b0ff" opacity="0.35" transform="rotate(-5)"/>
            <ellipse cx="-4" cy="10" rx="18" ry="1.8" fill="#cc99ff" opacity="0.30" transform="rotate(7)"/>
            <ellipse cx="8" cy="-18" rx="14" ry="1.5" fill="#e0c0ff" opacity="0.28" transform="rotate(3)"/>
            <ellipse cx="-6" cy="24" rx="12" ry="1.5" fill="#c8a0f8" opacity="0.25" transform="rotate(-3)"/>
            <ellipse cx="14" cy="4" rx="10" ry="1.2" fill="#f0d8ff" opacity="0.22" transform="rotate(14)"/>
          </g>
        </Jiggle>

        {RINGS.map((r, i) => (
          <ellipse key={`${i}`}{...r} fill="none" mask="url(#greenPlanetOcclusionMask)"/>
        ))}
      </RotatingGroup>

      <g mask="url(#greenPlanetOcclusionMask)">
        <Moon
          id={"green-1"}
          orbitRx={30} orbitRy={11} orbitTilt={30}
          radius={3.5}
          duration="5s" begin={-5}
          baseId="moonBase"
        />
      </g>

    </svg>
  );
}