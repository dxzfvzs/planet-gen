export function GreenPlanet() {
  return (
    <svg width="220" height="220" viewBox="0 0 70 70" overflow="visible">
      <defs>
        <radialGradient id="gg" cx="36%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#b0f070"/>
          <stop offset="55%" stopColor="#2a9e35"/>
          <stop offset="100%" stopColor="#155020"/>
        </radialGradient>
      </defs>

      <g transform="translate(35 35)">
        <circle r="20" fill="url(#gg)" />

        <ellipse
          cx="-6" cy="-4"
          rx="6" ry="8"
          fill="rgba(0,60,10,0.35)"
          transform="rotate(-20 -6 -4)"
        />

        <ellipse
          cx="8" cy="4"
          rx="8" ry="5"
          fill="rgba(10,80,20,0.3)"
        />

        <ellipse
          cx="-7" cy="-7"
          rx="5" ry="4"
          fill="rgba(255,255,255,0.18)"
        />
      </g>
    </svg>
  );
}