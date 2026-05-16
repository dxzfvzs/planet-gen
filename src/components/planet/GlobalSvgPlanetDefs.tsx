export function GlobalSvgPlanetDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        {/* Defined occlusion for half visible-half not planet overlay. For moons, rings, etc. */}
        <linearGradient id="planetOcclusionMaskShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="black"/>
          <stop offset="50%" stopColor="black"/>
          <stop offset="50%" stopColor="white"/>
          <stop offset="100%" stopColor="white"/>
        </linearGradient>

        {/* Two possible blurs for surface level planetary bands.*/}
        <filter id="bandBlur" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="1.5 0.7"/>
        </filter>
        <filter id="softBlur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.8"/>
        </filter>

        {/* Moon base color.*/}
        <radialGradient id="moonBase" cx="32%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="55%" stopColor="#c5c9cc"/>
          <stop offset="100%" stopColor="#1d2732"/>
        </radialGradient>

      </defs>
    </svg>
  );
}