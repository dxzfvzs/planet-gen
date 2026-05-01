export function YellowPlanet() {
  return (
    <svg width="72" height="52" viewBox="0 0 72 52" overflow="visible">
      <defs>
        <radialGradient id="yg" cx="38%" cy="32%" r="60%">
          <stop offset="0%" stopColor="#ffe87a"/>
          <stop offset="55%" stopColor="#e0a000"/>
          <stop offset="100%" stopColor="#8a5c00"/>
        </radialGradient>
        <clipPath id="yc">
          <circle cx="36" cy="24" r="22"/>
        </clipPath>
      </defs>
      {/* ring back */}
      <ellipse cx="36" cy="34" rx="34" ry="8" stroke="#f0c030" strokeWidth="3" fill="none" strokeOpacity="0.55"
               strokeDasharray="107 107" strokeDashoffset="-107"/>
      <circle cx="36" cy="24" r="22" fill="url(#yg)"/>
      <rect x="14" y="30" width="44" height="5" fill="rgba(140,80,0,0.28)" clipPath="url(#yc)" rx="2"/>
      <rect x="14" y="37" width="44" height="3" fill="rgba(140,80,0,0.2)" clipPath="url(#yc)" rx="2"/>
      <ellipse cx="28" cy="17" rx="8" ry="5" fill="rgba(255,255,220,0.22)"/>
      {/* ring front */}
      <ellipse cx="36" cy="34" rx="34" ry="8" stroke="#f0c030" strokeWidth="3" fill="none" strokeOpacity="0.7"
               strokeDasharray="107 107" strokeDashoffset="0"/>
    </svg>
  );
}
