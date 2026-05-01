export function BluePlanet() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" overflow="visible">
      <defs>
        <radialGradient id="bg" cx="35%" cy="28%" r="62%">
          <stop offset="0%" stopColor="#a0e4ff"/>
          <stop offset="52%" stopColor="#1868d8"/>
          <stop offset="100%" stopColor="#061e60"/>
        </radialGradient>
        <clipPath id="bc">
          <circle cx="30" cy="30" r="19"/>
        </clipPath>
      </defs>
      {/* ring back, tilted */}
      <ellipse cx="30" cy="38" rx="30" ry="7" stroke="#60c0ff" strokeWidth="2.5" fill="none"
               strokeOpacity="0.45" transform="rotate(-30,30,38)"
               strokeDasharray="94 94" strokeDashoffset="-94"/>
      <circle cx="30" cy="30" r="19" fill="url(#bg)"/>
      <rect x="11" y="35" width="38" height="5" fill="rgba(0,20,90,0.3)" clipPath="url(#bc)" rx="2"/>
      <ellipse cx="22" cy="23" rx="6" ry="4" fill="rgba(255,255,255,0.2)"/>
      {/* ring front */}
      <ellipse cx="30" cy="38" rx="30" ry="7" stroke="#60c0ff" strokeWidth="2.5" fill="none"
               strokeOpacity="0.65" transform="rotate(-30,30,38)"
               strokeDasharray="94 94" strokeDashoffset="0"/>
    </svg>
  );
}
