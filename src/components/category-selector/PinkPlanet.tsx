export function PinkPlanet() {
  return (
    <svg
      width="220"
      height="220"
      viewBox="-35 -35 70 70"
      overflow="visible"
    >
      <defs>
        <radialGradient id="mng" cx="37%" cy="30%" r="62%">
          <stop offset="0%" stopColor="#ffb8e8"/>
          <stop offset="50%" stopColor="#d83888"/>
          <stop offset="100%" stopColor="#6a003a"/>
        </radialGradient>

        <clipPath id="mnc">
          <circle cx="0" cy="0" r="17"/>
        </clipPath>
      </defs>

      {/* perfectly centered */}
      <circle cx="0" cy="0" r="17" fill="url(#mng)"/>

      {/* details relative to center */}
      <circle
        cx="-5" cy="4"
        r="4"
        fill="rgba(255,80,40,0.45)"
        clipPath="url(#mnc)"
      />

      <circle
        cx="5" cy="8"
        r="3"
        fill="rgba(255,100,60,0.38)"
        clipPath="url(#mnc)"
      />

      <ellipse
        cx="-6" cy="-7"
        rx="5"
        ry="3.5"
        fill="rgba(255,255,255,0.2)"
      />
    </svg>
  );
}