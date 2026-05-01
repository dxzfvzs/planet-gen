export function GlobalSvgDefs() {
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
          <stop offset="55%" stopColor="#c8c0ff"/>
          <stop offset="100%" stopColor="#6050a0"/>
        </radialGradient>

        {/* Alternative moon base color.*/}
        <radialGradient id="tinyMoonBase" cx="32%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#e0d8ff"/>
          <stop offset="60%" stopColor="#9070c0"/>
          <stop offset="100%" stopColor="#2a1860"/>
        </radialGradient>
      </defs>
    </svg>
  );
}