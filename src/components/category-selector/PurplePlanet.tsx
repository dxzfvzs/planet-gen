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
          <stop offset="0%" stop-color="#06001e" stop-opacity="0.82"/>
          <stop offset="45%" stop-color="#06001e" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#06001e" stop-opacity="0"/>
        </radialGradient>

        <radialGradient id="specular" cx="30%" cy="24%" r="35%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.28"/>
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

        <clipPath id="ringFrontClip">
          <rect x="-120" y="0" width="240" height="120"/>
        </clipPath>
        <clipPath id="ringBackClip">
          <rect x="-120" y="-120" width="240" height="120"/>
        </clipPath>

        <filter id="bandBlur" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="1.5 0.7"/>
        </filter>
        <filter id="softBlur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.8"/>
        </filter>
      </defs>

      <g clip-path="url(#ringBackClip)" opacity="0.82">
        <ellipse cx="0" cy="0" rx="78" ry="15.5" fill="none" stroke="#bb88ff" stroke-width="3" opacity="0.22"/>
        <ellipse cx="0" cy="0" rx="96" ry="19.5" fill="none" stroke="#9944cc" stroke-width="2.5" opacity="0.18"/>
      </g>

      <circle cx="0" cy="0" r={planetSize} fill="url(#planetBase)"/>

      <g clip-path="url(#planetClip)" filter="url(#bandBlur)">
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="90s" repeatCount="indefinite"/>
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
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="65s" repeatCount="indefinite"/>
        <ellipse cx="2" cy="-4" rx="22" ry="2.2" fill="#d8b0ff" opacity="0.35" transform="rotate(-5)"/>
        <ellipse cx="-4" cy="10" rx="18" ry="1.8" fill="#cc99ff" opacity="0.30" transform="rotate(7)"/>
        <ellipse cx="8" cy="-18" rx="14" ry="1.5" fill="#e0c0ff" opacity="0.28" transform="rotate(3)"/>
        <ellipse cx="-6" cy="24" rx="12" ry="1.5" fill="#c8a0f8" opacity="0.25" transform="rotate(-3)"/>
        <ellipse cx="14" cy="4" rx="10" ry="1.2" fill="#f0d8ff" opacity="0.22" transform="rotate(14)"/>
      </g>

      <g clip-path="url(#planetClip)">
        <ellipse cx="0" cy="-2" rx={planetSize} ry="9" fill="url(#ringShadowGrad)" opacity="0.55"/>
      </g>

      <circle cx="0" cy="0" r={planetSize} fill="url(#nightSide)"/>

      <circle cx="0" cy="0" r={planetSize} fill="url(#specular)"/>

      <g clip-path="url(#ringFrontClip)" opacity="0.88">
        <ellipse cx="0" cy="0" rx="78" ry="15.5" fill="none" stroke="#cc99ff" stroke-width="2" opacity="0.28"/>
        <ellipse cx="0" cy="0" rx="96" ry="19.5" fill="none" stroke="#aa66ee" stroke-width="2" opacity="0.20"/>
      </g>

      <g>
        <animateMotion dur="18s" repeatCount="indefinite" begin="-6s">
          <mpath href="#tinyOrbit"/>
        </animateMotion>
        <circle r="2.8" fill="url(#tinyMoonBase)"/>
        <circle r="2.8" fill="#06001e" opacity="0.6">
          <animate attributeName="opacity" values="0.0;0.0;0.55;0.65;0.55;0.0;0.0" keyTimes="0;0.35;0.5;0.55;0.65;0.8;1"
                   dur="18s" repeatCount="indefinite"/>
        </circle>
      </g>

      <g>
        <animateMotion dur="26s" repeatCount="indefinite" begin="-10s">
          <mpath href="#mainOrbit"/>
        </animateMotion>
        <circle r="5.5" fill="url(#moonBase)"/>
        <circle r="5.5" fill="#06001e" opacity="0.0">
          <animate attributeName="opacity" values="0.0;0.0;0.60;0.70;0.60;0.0;0.0" keyTimes="0;0.35;0.5;0.55;0.65;0.8;1"
                   dur="26s" repeatCount="indefinite"/>
        </circle>
        <circle r="5.5" fill="url(#moonShadow)" opacity="0.65"/>
      </g>

      <path id="mainOrbit" d="M 0 0 m -72 0 a 72 28 0 1 1 144 0 a 72 28 0 1 1 -144 0" fill="none"/>
      <path id="tinyOrbit" d="M 0 0 m -62 -8 a 62 24 8 1 1 124 0 a 62 24 8 1 1 -124 0" fill="none"/>
    </svg>
  );
}