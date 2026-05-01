import { Moon } from "./Moon.tsx";

export function PurplePlanet({ planetSize = 30 }: { planetSize?: number }) {
  return (
    <svg width="220" height="220" viewBox="-50 -50 100 100" overflow="visible">

      <defs>
        <radialGradient id="planetBase" cx="35%" cy="28%" r="70%">
          <stop offset="0%" stop-color="#e8c8ff"/>
          <stop offset="18%" stop-color="#b57aee"/>
          <stop offset="45%" stop-color="#6a28b8"/>
          <stop offset="72%" stop-color="#3a0e7a"/>
          <stop offset="100%" stop-color="#16054a"/>
        </radialGradient>

        <radialGradient id="nightSide" cx="72%" cy="70%" r="68%">
          <stop offset="0%" stop-color="#06001e" stop-opacity="0.5"/>
          <stop offset="45%" stop-color="#06001e" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#06001e" stop-opacity="0"/>
        </radialGradient>

        <radialGradient id="daySide" cx="30%" cy="24%" r="35%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.18"/>
          <stop offset="55%" stop-color="#c9a0ff" stop-opacity="0.09"/>
          <stop offset="100%" stop-color="#c9a0ff" stop-opacity="0"/>
        </radialGradient>

        <radialGradient id="moonBase" cx="32%" cy="28%" r="70%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="55%" stop-color="#c8c0ff"/>
          <stop offset="100%" stop-color="#6050a0"/>
        </radialGradient>
        <radialGradient id="tinyMoonBase" cx="32%" cy="28%" r="70%">
          <stop offset="0%" stop-color="#e0d8ff"/>
          <stop offset="60%" stop-color="#9070c0"/>
          <stop offset="100%" stop-color="#2a1860"/>
        </radialGradient>

        <radialGradient id="moonShadow" cx="75%" cy="68%" r="60%">
          <stop offset="0%" stop-color="#06001e" stop-opacity="0.75"/>
          <stop offset="100%" stop-color="#06001e" stop-opacity="0"/>
        </radialGradient>

        <clipPath id="planetClip">
          <circle cx="0" cy="0" r={planetSize}/>
        </clipPath>

        <mask id="planetOcclusionMask">
          {/* everything visible */}
          <rect x="-200" y="-200" width="400" height="400" fill="white"/>

          {/* planet hides moons behind it */}
          <circle cx="0" cy="0" r={planetSize} fill="url(#planetOcclusionMaskShade)"/>
        </mask>

        <linearGradient id="planetOcclusionMaskShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="black"/>
          <stop offset="45%" stopColor="black"/>
          <stop offset="55%" stopColor="white"/>
          <stop offset="100%" stopColor="white"/>
        </linearGradient>

        <filter id="bandBlur" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="1.5 0.7"/>
        </filter>
        <filter id="softBlur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.8"/>
        </filter>
      </defs>


      <circle cx="0" cy="0" r={planetSize} fill="url(#planetBase)"/>

      <g clip-path="url(#planetClip)" filter="url(#bandBlur)">
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

      <g clip-path="url(#planetClip)" filter="url(#softBlur)" opacity="0.55">
        <ellipse cx="2" cy="-4" rx="22" ry="2.2" fill="#d8b0ff" opacity="0.35" transform="rotate(-5)"/>
        <ellipse cx="-4" cy="10" rx="18" ry="1.8" fill="#cc99ff" opacity="0.30" transform="rotate(7)"/>
        <ellipse cx="8" cy="-18" rx="14" ry="1.5" fill="#e0c0ff" opacity="0.28" transform="rotate(3)"/>
        <ellipse cx="-6" cy="24" rx="12" ry="1.5" fill="#c8a0f8" opacity="0.25" transform="rotate(-3)"/>
        <ellipse cx="14" cy="4" rx="10" ry="1.2" fill="#f0d8ff" opacity="0.22" transform="rotate(14)"/>
      </g>

      <circle cx="0" cy="0" r={planetSize} fill="url(#nightSide)"/>
      <circle cx="0" cy="0" r={planetSize} fill="url(#daySide)"/>


      <g mask="url(#planetOcclusionMask)">
        <Moon
          orbitRx={45}
          orbitRy={10}
          orbitTilt={16}
          radius={5.5}
          duration="32s"
          begin="-15s"
          baseId="tinyMoonBase"
          shadowId="moonShadow"
        />

        <Moon
          orbitRx={55}
          orbitRy={15}
          orbitTilt={-3}
          radius={2.8}
          duration="7s"
          begin="-9s"
          baseId="moonBase"
          shadowId="moonShadow"
        />
      </g>

    </svg>
  );
}