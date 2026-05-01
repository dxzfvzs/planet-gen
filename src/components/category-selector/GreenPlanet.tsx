import type { Ring } from "./ring.ts";
import { Jiggle, RotateToFollowSun, RotatingGroup } from "./Rotation.tsx";
import { Moon } from "./Moon.tsx";
import { generateSmudges } from "./smudge.ts";

const RINGS: Ring[] = [];

export function GreenPlanet({ planetSize = 20 }: { planetSize?: number }) {

  const smudgesBand = generateSmudges({
    seedStr: "greenBand",
    planetSize,
    baseColor: "#125109",
  });

  const smudgesSoft = generateSmudges({
    seedStr: "greenSoft",
    planetSize,
    baseColor: "#25aa12",
  });

  return (
    <svg width="220" height="220" viewBox="-50 -50 100 100" overflow="visible">
      <defs>
        <radialGradient id="greenPlanetBase" cx="35%" cy="28%" r="62%">
          <stop offset="0%" stopColor="#b0f070"/>
          <stop offset="55%" stopColor="#2a9e35"/>
          <stop offset="100%" stopColor="#155020"/>
        </radialGradient>

        <clipPath id="greenPlanetClip">
          <circle cx="0" cy="0" r={planetSize}/>
        </clipPath>

        <mask id="greenPlanetOcclusionMask">
          <rect x="-200" y="-200" width="400" height="400" fill="white"/>
          <circle cx="0" cy="0" r={planetSize} fill="url(#planetOcclusionMaskShade)"/>
        </mask>
      </defs>

      <RotateToFollowSun>
        <circle cx="0" cy="0" r={planetSize} fill="url(#greenPlanetBase)"/>
      </RotateToFollowSun>

      <RotatingGroup duration={65}>

        <Jiggle duration={20} angle={1}>
          <g clipPath="url(#greenPlanetClip)" filter="url(#bandBlur)">
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
          <g clipPath="url(#greenPlanetClip)" filter="url(#softBlur)" opacity="0.5">
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
          <ellipse key={`${i}`}{...r} fill="none" mask="url(#greenPlanetOcclusionMask)"/>
        ))}
      </RotatingGroup>

      <g mask="url(#greenPlanetOcclusionMask)">
        <Moon
          id={"green-1"}
          orbitRx={30} orbitRy={11} orbitTilt={30}
          radius={3.5}
          duration="30s" begin={-2}
          baseId="moonBase"
        />
      </g>

    </svg>
  );
}