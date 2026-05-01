export function YellowPlanet() {
  return (
    <svg width="220" height="220" viewBox="-35 -35 70 70" overflow="visible">
      <defs>
        <radialGradient id="yg" cx="38%" cy="32%" r="60%">
          <stop offset="0%" stopColor="#ffe87a"/>
          <stop offset="55%" stopColor="#e0a000"/>
          <stop offset="100%" stopColor="#8a5c00"/>
        </radialGradient>

        <clipPath id="yc">
          <circle cx="0" cy="0" r="22"/>
        </clipPath>
      </defs>

      {/* ring back */}
      <ellipse
        cx="0"
        cy="10"
        rx="34"
        ry="8"
        stroke="#f0c030"
        strokeWidth="3"
        fill="none"
        strokeOpacity="0.55"
        strokeDasharray="107 107"
        strokeDashoffset="-107"
      />

      {/* planet */}
      <circle cx="0" cy="0" r="22" fill="url(#yg)" />

      {/* bands */}
      <rect
        x="-22"
        y="6"
        width="44"
        height="5"
        fill="rgba(140,80,0,0.28)"
        clipPath="url(#yc)"
        rx="2"
      />

      <rect
        x="-22"
        y="13"
        width="44"
        height="3"
        fill="rgba(140,80,0,0.2)"
        clipPath="url(#yc)"
        rx="2"
      />

      {/* highlight */}
      <ellipse
        cx="-8"
        cy="-7"
        rx="8"
        ry="5"
        fill="rgba(255,255,220,0.22)"
      />

      {/* ring front */}
      <ellipse
        cx="0"
        cy="10"
        rx="34"
        ry="8"
        stroke="#f0c030"
        strokeWidth="3"
        fill="none"
        strokeOpacity="0.7"
        strokeDasharray="107 107"
        strokeDashoffset="0"
        style={{ filter: "blur(0.3px)" }}
      />
    </svg>
  );
}