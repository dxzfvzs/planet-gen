import { Moon } from "./Moon.tsx";
import { Jiggle, RotateToFollowSun } from "./Rotation.tsx";
import type { Ring } from "./ring.ts";
import { generateSmudges } from "./smudge.ts";
import { Backlight } from "./Backlight.tsx";

const RINGS: Ring[] = [
  { cx: 0, cy: 2.5, rx: 50, ry: 7, stroke: "#e8b9f8", strokeWidth: 1, fill: "none", strokeOpacity: 0.65 },
  { cx: 0, cy: 2.5, rx: 60, ry: 11, stroke: "#cc61ef", strokeWidth: 2.5, fill: "none", strokeOpacity: 0.35 },
];

export function PurplePlanet({ planetSize = 30 }: { planetSize?: number }) {

  const smudgesBand = generateSmudges({
    seedStr: "purpleBand",
    planetSize,
    baseColor: "#4b1987",
  });

  const smudgesSoft = generateSmudges({
    seedStr: "purpleSoft",
    planetSize,
    baseColor: "#8b42d5",
    count: 3,
  });

  return (
    <svg width="220" height="220" viewBox="-50 -50 100 100" overflow="visible">
      <defs>
        <radialGradient id="purplePlanetBase" cx="35%" cy="28%" r="62%">
          <stop offset="5%" stopColor="#b57aee"/>
          <stop offset="52%" stopColor="#6a28b8"/>
          <stop offset="100%" stopColor="#241255"/>
        </radialGradient>

        <clipPath id="purplePlanetClip">
          <circle cx="0" cy="0" r={planetSize}/>
        </clipPath>

        <mask id="purplePlanetOcclusionMask">
          <rect x="-200" y="-200" width="400" height="400" fill="white"/>
          <circle cx="0" cy="0" r={planetSize} fill="url(#planetOcclusionMaskShade)"/>
        </mask>
      </defs>

      <RotateToFollowSun>
        <Backlight planetSize={planetSize} key={"purple"}/>
        <circle cx="0" cy="0" r={planetSize} fill="url(#purplePlanetBase)"/>
      </RotateToFollowSun>

      <Jiggle duration={25} angle={15}>
        <Jiggle duration={20} angle={5}>
          <g clipPath="url(#purplePlanetClip)" filter="url(#bandBlur)">
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

        <Jiggle duration={20} angle={15}>
          <g clipPath="url(#purplePlanetClip)" filter="url(#softBlur)" opacity="0.55">
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

        <g>
          {RINGS.map((r, i) => (
            <ellipse key={`${i}`}{...r} fill="none" mask="url(#purplePlanetOcclusionMask)"/>
          ))}
        </g>
      </Jiggle>

      <g>
        <Jiggle duration={20} angle={15}>
          <g mask="url(#purplePlanetOcclusionMask)">
            <Moon
              id={"purple-1"}
              orbitRx={55} orbitRy={15} orbitTilt={-3}
              radius={2.8}
              duration="7s" begin={-6.2}
              baseId="moonBase"
              color={"#ffb8e8"}
            />

            <Moon
              id={"purple-2"}
              orbitRx={45} orbitRy={10} orbitTilt={16}
              radius={5.5}
              duration="6s" begin={-6}
              baseId="moonBase"
              color={"#e1a3ec"}
            />
          </g>
        </Jiggle>
      </g>
    </svg>
  );
}