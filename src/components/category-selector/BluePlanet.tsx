import type { Ring } from "./ring.ts";
import { Jiggle, RotateToFollowSun, RotatingGroup } from "./Rotation.tsx";
import { generateSmudges } from "./smudge.ts";
import { Backlight } from "./Backlight.tsx";

const RINGS: Ring[] = [
  { cx: 0, cy: 2.5, rx: 37, ry: 7, stroke: "#61bdef", strokeWidth: 1, fill: "none", strokeOpacity: 0.85 },
  { cx: 0, cy: 2.5, rx: 44, ry: 11, stroke: "#61bdef", strokeWidth: 2.5, fill: "none", strokeOpacity: 0.25 },
];

export function BluePlanet({ planetSize = 25 }: { planetSize?: number }) {

  const smudgesBand = generateSmudges({
    seedStr: "blueBand",
    planetSize,
    baseColor: "#095fd8",
    count: 35,
  });

  const smudgesSoft = generateSmudges({
    seedStr: "blueSoft",
    planetSize,
    baseColor: "#2066c3",
  });

  return (
    <svg width="220" height="220" viewBox="-50 -50 100 100" overflow="visible">
      <defs>
        <radialGradient id="bluePlanetBase" cx="35%" cy="28%" r="62%">
          <stop offset="0%" stopColor="#a0e4ff"/>
          <stop offset="52%" stopColor="#1868d8"/>
          <stop offset="100%" stopColor="#061e60"/>
        </radialGradient>

        <clipPath id="bluePlanetClip">
          <circle cx="0" cy="0" r={planetSize}/>
        </clipPath>

        <mask id="bluePlanetOcclusionMask">
          <rect x="-200" y="-200" width="400" height="400" fill="white"/>
          <circle cx="0" cy="0" r={planetSize} fill="url(#planetOcclusionMaskShade)"/>
        </mask>
      </defs>

      <RotateToFollowSun>
        <Backlight planetSize={planetSize} key={"blue"}/>
        <circle cx="0" cy="0" r={planetSize} fill="url(#bluePlanetBase)"/>
      </RotateToFollowSun>

      <RotatingGroup duration={125} invertRotation>
        <Jiggle duration={20} angle={1}>
          <g clipPath="url(#bluePlanetClip)" filter="url(#bandBlur)">
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
          <g clipPath="url(#bluePlanetClip)" filter="url(#softBlur)" opacity="0.55">
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
          <ellipse key={`${i}`}{...r} fill="none" mask="url(#bluePlanetOcclusionMask)"/>
        ))}
      </RotatingGroup>
    </svg>
  );
}