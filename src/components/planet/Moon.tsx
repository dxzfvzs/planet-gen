import { RotateToFollowSun } from "./Rotation.tsx";
import { generateSmudges } from "./smudge-helper.ts";

type MoonProps = {
  orbitRx: number
  orbitRy: number
  orbitTilt?: number
  orbitOffsetX?: number
  orbitOffsetY?: number
  radius: number
  duration: string
  id: string
  begin?: number
  baseId: string,
  color?: string,
  followSun?: boolean
}

const debug = false;

export function Moon(
  {
    orbitRx,
    orbitRy,
    orbitTilt = 0,
    orbitOffsetX = 0,
    orbitOffsetY = 0,
    radius,
    duration,
    id,
    begin = 0,
    baseId = "moonBase",
    color,
    followSun = false,
  }: MoonProps) {
  const orbitId = `orbit-${id}-${baseId}`
  const d = `M 0 0 m ${-orbitRx + orbitOffsetX} ${orbitOffsetY} a ${orbitRx} ${orbitRy} ${orbitTilt} 1 1 ${orbitRx * 2} 0 a ${orbitRx} ${orbitRy} ${orbitTilt} 1 1 ${-orbitRx * 2} 0`

  const smudgesBand = generateSmudges(orbitId, radius, color ?? "#202020");

  return (
    <g>
      <defs>
        <clipPath id={`moonClip-${id}`}>
          <circle r={radius}/>
        </clipPath>
      </defs>

      {debug
        ? <path id={orbitId} d={d} fill="none" strokeWidth={1} stroke={"#ffffff"} strokeOpacity={0.3}/>
        : <path id={orbitId} d={d} fill="none"/>
      }

      <animateMotion dur={duration} repeatCount="indefinite" begin={`${begin}s`}>
        <mpath href={`#${orbitId}`}/>
      </animateMotion>

      <RotateToFollowSun enabled={followSun}>
        <g>
          <circle r={radius} fill={`url(#${baseId})`}/>

          <g clipPath={`url(#moonClip-${id})`} opacity="0.8">
            {smudgesBand.map((s, i) => (
              <ellipse key={i} {...s} transform={`rotate(${s.rotate})`}/>
            ))}
          </g>

          <circle r={radius} fill="#06001e" opacity="0.0">
            <animate
              attributeName="opacity"
              values="0;0;0.7;0.7;0;0"
              keyTimes="0;0.2;0.25;0.45;0.65;1"
              dur={duration}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </RotateToFollowSun>
    </g>
  )
}
