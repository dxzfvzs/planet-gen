type MoonProps = {
  orbitRx: number
  orbitRy: number
  orbitTilt?: number
  orbitOffsetX?: number
  orbitOffsetY?: number
  radius: number
  duration: string
  begin?: string
  shadowId: string
  baseId: string
}

const debug = true;

export function Moon(
  {
    orbitRx,
    orbitRy,
    orbitTilt = 0,
    orbitOffsetX = 0,
    orbitOffsetY = 0,
    radius,
    duration,
    begin = "0s",
    baseId,
  }: MoonProps) {
  const orbitId = `orbit-${baseId}`
  const d = `M 0 0 m ${-orbitRx + orbitOffsetX} ${orbitOffsetY} a ${orbitRx} ${orbitRy} ${orbitTilt} 1 1 ${orbitRx * 2} 0 a ${orbitRx} ${orbitRy} ${orbitTilt} 1 1 ${-orbitRx * 2} 0`

  return (
    <g>
      {debug
        ? <path id={orbitId} d={d} fill="none" strokeWidth={1} stroke={"#ffffff"} strokeOpacity={0.3}/>
        : <path id={orbitId} d={d} fill="none"/>
      }
      <g>
        <animateMotion dur={duration} repeatCount="indefinite" begin={begin}>
          <mpath href={`#${orbitId}`}/>
        </animateMotion>
        <circle r={radius} fill={`url(#${baseId})`}/>
        <circle r={radius} fill="#06001e" opacity="0.0">
          <animate
            attributeName="opacity"
            values="0.70;0.60;0;0;0;0;0.60;0.70"
            keyTimes="0;0.15;0.25;0.35;0.65;0.75;0.85;1"
            dur={duration}
            repeatCount="indefinite"
          />
        </circle>
        <circle r={radius} fill={`url(#moonShadow)`} opacity="0.65"/>
      </g>
    </g>
  )
}
