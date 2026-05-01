import type { Ring } from "./ring.ts";
import { Jiggle, RotateToFollowSun } from "./Rotation.tsx";
import { generateSmudges } from "./smudge.ts";
import { Backlight } from "./Backlight.tsx";

const RINGS: Ring[] = [
  { cx: 0, cy: 2.5, rx: 37, ry: 4, stroke: "#b38006", strokeWidth: 1, fill: "none", strokeOpacity: 0.85 },
  { cx: 0, cy: 2.5, rx: 44, ry: 6, stroke: "#ef8714", strokeWidth: 1.5, fill: "none", strokeOpacity: 0.55 },
  { cx: 0, cy: 2.5, rx: 58, ry: 8, stroke: "#edcc7a", strokeWidth: 1, fill: "none", strokeOpacity: 0.75 },
  { cx: 0, cy: 2.5, rx: 65, ry: 10, stroke: "#b38006", strokeWidth: 0.9, fill: "none", strokeOpacity: 0.75 },
];

export function YellowPlanet({ planetSize = 25 }: { planetSize?: number }) {

  const smudgesBand = generateSmudges({
    seedStr: "yellowBand",
    planetSize,
    baseColor: "#b55f08",
  });

  const smudgesSoft = generateSmudges({
    seedStr: "yellowSoft",
    planetSize,
    baseColor: "#e0c200",
    count: 5,
  });

  return (
    <svg width="220" height="220" viewBox="-50 -50 100 100" overflow="visible">
      <defs>
        <radialGradient id="yellowPlanetBase" cx="35%" cy="28%" r="62%">
          <stop offset="0%" stopColor="#edcc7a"/>
          <stop offset="55%" stopColor="#e0a000"/>
          <stop offset="100%" stopColor="#a55900"/>
        </radialGradient>

        <clipPath id="yellowPlanetClip">
          <circle cx="0" cy="0" r={planetSize}/>
        </clipPath>

        <mask id="yellowPlanetOcclusionMask">
          <rect x="-200" y="-200" width="400" height="400" fill="white"/>
          <circle cx="0" cy="0" r={planetSize} fill="url(#planetOcclusionMaskShade)"/>
        </mask>
      </defs>

      <RotateToFollowSun>
        <Backlight planetSize={planetSize} key={"yellow"}/>
        <circle cx="0" cy="0" r={planetSize} fill="url(#yellowPlanetBase)"/>
      </RotateToFollowSun>

      <Jiggle duration={17} angle={5}>

        <Jiggle duration={20} angle={1}>
          <g clipPath="url(#yellowPlanetClip)" filter="url(#bandBlur)">
            {smudgesBand.map((s, i) => (
              <ellipse
                key={i}
                cx={s.cx} cy={s.cy}
                rx={s.rx} ry={s.ry}
                fill={s.fill} opacity={s.opacity}
                transform={`rotate(${s.rotate})`}
              />
            ))}
          </g>
        </Jiggle>

        <Jiggle duration={20} angle={2}>
          <g clipPath="url(#yellowPlanetClip)" filter="url(#softBlur)" opacity="0.55">
            {smudgesSoft.map((s, i) => (
              <ellipse
                key={i}
                cx={s.cx} cy={s.cy}
                rx={s.rx} ry={s.ry}
                fill={s.fill} opacity={s.opacity}
                transform={`rotate(${s.rotate})`}
              />
            ))}
          </g>
        </Jiggle>

        {RINGS.map((r, i) => (
          <ellipse key={`${i}`}{...r} fill="none" mask="url(#yellowPlanetOcclusionMask)"/>
        ))}
      </Jiggle>

    </svg>
  );
}