import { Jiggle, RotateToFollowSun, RotatingGroup } from "./Rotation.tsx";
import type { Ring } from "./ring.ts";
import { Moon } from "./Moon.tsx";
import { generateSmudges } from "./smudge.ts";
import { Backlight } from "./Backlight.tsx";

const RINGS: Ring[] = [
  { cx: 0, cy: 2.5, rx: 40, ry: 4, stroke: "#ff67c3", strokeWidth: 1.3, fill: "none", strokeOpacity: 0.55 },
];

export function PinkPlanet({ planetSize = 20 }: { planetSize?: number }) {

  const smudgesBand = generateSmudges({
    seedStr: "pinkBand",
    planetSize,
    baseColor: "#8a0b4c",
  });

  const smudgesSoft = generateSmudges({
    seedStr: "pinkSoft",
    planetSize,
    baseColor: "#f60a35",
    count: 3,
  });

  return (
    <svg width="220" height="220" viewBox="-50 -50 100 100" overflow="visible">
      <defs>
        <radialGradient id="pinkPlanetBase" cx="35%" cy="28%" r="62%">
          <stop offset="0%" stopColor="#ffb8e8"/>
          <stop offset="50%" stopColor="#d83888"/>
          <stop offset="100%" stopColor="#6a003a"/>
        </radialGradient>

        <clipPath id="pinkPlanetClip">
          <circle cx="0" cy="0" r={planetSize}/>
        </clipPath>

        <mask id="pinkPlanetOcclusionMask">
          <rect x="-200" y="-200" width="400" height="400" fill="white"/>
          <circle cx="0" cy="0" r={planetSize} fill="url(#planetOcclusionMaskShade)"/>
        </mask>
      </defs>

      <RotateToFollowSun>
        <Backlight planetSize={planetSize} key={"pink"}/>
        <circle cx="0" cy="0" r={planetSize} fill="url(#pinkPlanetBase)"/>
      </RotateToFollowSun>

      <RotatingGroup duration={17}>

        <Jiggle duration={20} angle={1}>
          <g clipPath="url(#pinkPlanetClip)" filter="url(#bandBlur)">
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
          <g clipPath="url(#pinkPlanetClip)" filter="url(#softBlur)" opacity="0.55">
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
          <ellipse key={`${i}`}{...r} fill="none" mask="url(#pinkPlanetOcclusionMask)"/>
        ))}
      </RotatingGroup>

      <g mask="url(#pinkPlanetOcclusionMask)">
        <Moon
          id={"pink-1"}
          orbitRx={30} orbitRy={8} orbitTilt={9}
          radius={2.8}
          duration="7s" begin={-6.5}
          baseId="moonBase"
          color={"#ffb8cd"}
        />
      </g>


    </svg>
  );
}