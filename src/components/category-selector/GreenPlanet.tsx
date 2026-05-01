export function GreenPlanet() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" overflow="visible">
      <defs>
        <radialGradient id="gg" cx="36%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#b0f070"/>
          <stop offset="55%" stopColor="#2a9e35"/>
          <stop offset="100%" stopColor="#155020"/>
        </radialGradient>
        <clipPath id="gc">
          <circle cx="26" cy="26" r="20"/>
        </clipPath>
      </defs>
      <circle cx="26" cy="26" r="20" fill="url(#gg)"/>
      <ellipse cx="20" cy="22" rx="6" ry="8" fill="rgba(0,60,10,0.35)" clipPath="url(#gc)"
               transform="rotate(-20,20,22)"/>
      <ellipse cx="34" cy="30" rx="8" ry="5" fill="rgba(10,80,20,0.3)" clipPath="url(#gc)"/>
      <ellipse cx="19" cy="19" rx="5" ry="4" fill="rgba(255,255,255,0.18)"/>
    </svg>
  );
}