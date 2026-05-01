export function PinkPlanet() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" overflow="visible">
      <defs>
        <radialGradient id="mng" cx="37%" cy="30%" r="62%">
          <stop offset="0%" stopColor="#ffb8e8"/>
          <stop offset="50%" stopColor="#d83888"/>
          <stop offset="100%" stopColor="#6a003a"/>
        </radialGradient>
        <clipPath id="mnc">
          <circle cx="23" cy="23" r="17"/>
        </clipPath>
      </defs>
      <circle cx="23" cy="23" r="17" fill="url(#mng)"/>
      <circle cx="18" cy="27" r="4" fill="rgba(255,80,40,0.45)" clipPath="url(#mnc)"/>
      <circle cx="28" cy="31" r="3" fill="rgba(255,100,60,0.38)" clipPath="url(#mnc)"/>
      <ellipse cx="17" cy="16" rx="5" ry="3.5" fill="rgba(255,255,255,0.2)"/>
    </svg>
  );
}