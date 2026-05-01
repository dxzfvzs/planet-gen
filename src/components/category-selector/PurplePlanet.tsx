export function PurplePlanet() {
  return (
    <svg width="220" height="220" viewBox="0 0 70 70" overflow="visible" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="pg" cx="36%" cy="30%" r="62%">
          <stop offset="0%" stopColor="#d0a8ff"/>
          <stop offset="50%" stopColor="#7238cc"/>
          <stop offset="100%" stopColor="#280c5c"/>
        </radialGradient>

        {/* planet shadow: soft dark fade from right, does not rotate */}
        <linearGradient id="shadowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0a003a" stopOpacity="0.0"/>
          <stop offset="45%" stopColor="#0a003a" stopOpacity="0.0"/>
          <stop offset="80%" stopColor="#0a003a" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="#0a003a" stopOpacity="0.7"/>
        </linearGradient>

        <radialGradient id="moonGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="70%" stopColor="#d9d9ff"/>
          <stop offset="100%" stopColor="#8c8cff"/>
        </radialGradient>

        <radialGradient id="tinyMoonGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#c8c8e8"/>
          <stop offset="60%" stopColor="#ca7aaa"/>
          <stop offset="100%" stopColor="#3a3060"/>
        </radialGradient>

        {/* moon shadow: linear so it doesn't fight the radial base */}
        <linearGradient id="moonShadow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#05001a" stopOpacity="0.0"/>
          <stop offset="40%" stopColor="#05001a" stopOpacity="0.0"/>
          <stop offset="100%" stopColor="#05001a" stopOpacity="0.6"/>
        </linearGradient>

        <clipPath id="pc">
          <circle cx="35" cy="35" r="26"/>
        </clipPath>
        <clipPath id="moonClip">
          <circle cx="0" cy="0" r="3.8"/>
        </clipPath>
        <clipPath id="tinyMoonClip">
          <circle cx="0" cy="0" r="2.2"/>
        </clipPath>
      </defs>

      {/* subtle orbital rings */}
      <circle cx="35" cy="35" r="30" fill="none" stroke="rgba(200,160,255,0.2)" strokeWidth="2"/>
      <circle cx="35" cy="35" r="34" fill="none" stroke="rgba(150,100,255,0.12)" strokeWidth="2"/>

      {/* rotating planet body */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 35 35"
          to="360 35 35"
          dur="180s"
          repeatCount="indefinite"
        />
        <circle cx="35" cy="35" r="26" fill="url(#pg)"/>
        {/* atmospheric bands */}
        <rect x="9" y="40" width="52" height="7" fill="rgba(60,0,120,0.38)" clipPath="url(#pc)" rx="3"/>
        <rect x="9" y="50" width="52" height="10" fill="rgba(40,0,100,0.3)" clipPath="url(#pc)" rx="3"/>
        <rect x="9" y="30" width="52" height="5" fill="rgba(80,20,160,0.25)" clipPath="url(#pc)" rx="3"/>
        {/* specular highlight */}
        <ellipse cx="26" cy="27" rx="8" ry="5" fill="rgba(255,255,255,0.15)"/>
      </g>

      {/* fixed shadow overlay — placed after the rotating group so it stays put */}
      <circle cx="35" cy="35" r="26" fill="url(#shadowGrad)" clipPath="url(#pc)"/>

      {/* tiny trailing moon */}
      <g>
        <animateMotion
          dur="21s"
          repeatCount="indefinite"
          begin="-7s"
          path="M 35 35 m -42 0 a 42 42 0 1 1 84 0 a 42 42 0 1 1 -84 0"
        />
        <circle r="2.2" fill="url(#tinyMoonGrad)"/>
        {/* shadow overlay in moon-local space */}
        <circle r="2.2" fill="url(#moonShadow)" clipPath="url(#tinyMoonClip)"/>
      </g>

      {/* main moon */}
      <g>
        <animateMotion
          dur="14s"
          repeatCount="indefinite"
          path="M 35 35 m -42 0 a 42 42 0 1 1 84 0 a 42 42 0 1 1 -84 0"
        />
        <circle r="3.8" fill="url(#moonGrad)"/>
        <circle r="3.8" fill="url(#moonShadow)" clipPath="url(#moonClip)"/>
      </g>
    </svg>
  );
}