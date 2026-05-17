import { Jiggle, RotateToFollowSun, RotatingGroup } from "./Rotation.tsx";
import { Backlight } from "./Backlight.tsx";
import { Moon } from "./Moon.tsx";
import { type ReactNode, useMemo } from "react";
import { generateSmudges } from "./smudge-helper.ts";

export interface PlanetRing {
  cx?: number;
  cy?: number;
  rx: number;
  ry: number;
  stroke: string;
  strokeWidth: number;
  fill?: string;
  strokeOpacity: number;
}

export interface PlanetMoon {
  id: string;
  orbitRx: number;
  orbitRy: number;
  orbitTilt: number;
  radius: number;
  duration: string;
  begin?: number;
  color?: string;
  baseId?: string;
}

export interface SmudgeLayer {
  seedStr: string;
  baseColor: string;
  count?: number;
}

export interface GradientStop {
  offset: string;
  stopColor: string;
}

/**
 * Two animation modes:
 *
 * "jiggle" — no RotatingGroup; purple-style nested Jiggles:
 *   Jiggle(outerDuration, outerAngle)
 *     Jiggle(bandDuration, bandAngle)   ← band layer
 *     Jiggle(softDuration, softAngle)   ← soft layer
 *     <g>rings</g>
 *
 * "rotate" — pink/green/blue-style RotatingGroup with inner Jiggles:
 *   RotatingGroup(duration)
 *     Jiggle(20, bandAngle)   ← band layer
 *     Jiggle(20, softAngle)   ← soft layer
 *     rings (direct children)
 */
export type AnimationMode =
  | {
  type: "jiggle";
  outerDuration?: number; // default 25
  outerAngle?: number;    // default 15
  bandDuration?: number;  // default 20
  bandAngle?: number;     // default 5
  softDuration?: number;  // default 20
  softAngle?: number;     // default 15
}
  | {
  type: "rotate";
  duration: number;
  invertRotation?: boolean;
  bandAngle?: number;     // default 1
  softAngle?: number;     // default 2
};

export interface PlanetProps {
  /**
   * Unique id prefix — namespaces all SVG defs so multiple planets can
   * coexist in one document without gradient/mask id collisions.
   */
  id: string;
  planetSize?: number;
  /** Gradient stops */
  gradient: GradientStop[];
  /** Band smudge layer */
  band: SmudgeLayer & {
    /** Opacity on the <g> wrapping the band layer, default 1 */
    opacity?: number;
  };
  /** Soft smudge layer */
  soft: SmudgeLayer & {
    /** Opacity on the <g> wrapping the soft layer, default 0.55 */
    opacity?: number;
  };
  rings?: PlanetRing[];
  moons?: PlanetMoon[];
  /** Default: jiggle mode with purple-style values */
  animation?: AnimationMode;
  /** SVG canvas size in px, default 220 */
  canvasSize?: number;
  /** Whether to make the core of the planet rotate to follow sun, affects moons as well */
  followSun?: boolean;
}

export function Planet({
                         id,
                         planetSize = 25,
                         gradient,
                         band,
                         soft,
                         rings = [],
                         moons = [],
                         animation = { type: "jiggle" },
                         canvasSize = 220,
                         followSun = false,
                       }: PlanetProps) {
  const pid = `planet_${id}`;

  const bandSmudges = useMemo(
    () => generateSmudges(band.seedStr, planetSize, band.baseColor, band.count ?? 12),
    [band.seedStr, planetSize, band.baseColor, band.count],
  );

  const softSmudges = useMemo(
    () => generateSmudges(soft.seedStr, planetSize, soft.baseColor, soft.count ?? 4),
    [soft.seedStr, planetSize, soft.baseColor, soft.count],
  );

  const softOpacity = soft.opacity ?? 0.55;
  const bandOpacity = band.opacity ?? 1.00;

  const bandLayer = (
    <g clipPath={`url(#${pid}_clip)`} filter="url(#bandBlur)" opacity={bandOpacity}>
      {bandSmudges.map((s, i) => (
        <ellipse key={i} cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry}
                 fill={s.fill} opacity={s.opacity} transform={`rotate(${s.rotate})`}/>
      ))}
    </g>
  );

  const softLayer = (
    <g clipPath={`url(#${pid}_clip)`} filter="url(#softBlur)" opacity={softOpacity}>
      {softSmudges.map((s, i) => (
        <ellipse key={i} cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry}
                 fill={s.fill} opacity={s.opacity} transform={`rotate(${s.rotate})`}/>
      ))}
    </g>
  );

  const ringLayer = rings.map((r, i) => (
    <ellipse
      key={i}
      cx={r.cx ?? 0} cy={r.cy ?? 2.5}
      rx={r.rx} ry={r.ry}
      fill={r.fill ?? "none"}
      stroke={r.stroke}
      strokeWidth={r.strokeWidth}
      strokeOpacity={r.strokeOpacity}
      mask={`url(#${pid}_occMask)`}
    />
  ));

  let smudgesAndRings: ReactNode;

  if (animation.type === "jiggle") {
    const {
      outerDuration = 25, outerAngle = 15,
      bandDuration = 20, bandAngle = 5,
      softDuration = 20, softAngle = 15,
    } = animation;

    smudgesAndRings = (
      <Jiggle duration={outerDuration} angle={outerAngle}>
        <Jiggle duration={bandDuration} angle={bandAngle}>
          {bandLayer}
        </Jiggle>
        <Jiggle duration={softDuration} angle={softAngle}>
          {softLayer}
        </Jiggle>
        <g>{ringLayer}</g>
      </Jiggle>
    );
  } else {
    const { duration, invertRotation = false, bandAngle = 1, softAngle = 2 } = animation;

    smudgesAndRings = (
      <RotatingGroup duration={duration} invertRotation={invertRotation}>
        <Jiggle duration={20} angle={bandAngle}>
          {bandLayer}
        </Jiggle>
        <Jiggle duration={20} angle={softAngle}>
          {softLayer}
        </Jiggle>
        {ringLayer}
      </RotatingGroup>
    );
  }

  return (
    <svg width={canvasSize} height={canvasSize} viewBox="-50 -50 100 100" overflow="visible">
      <defs>
        <radialGradient id={`${pid}_base`} cx="35%" cy="28%" r="62%">
          {gradient.map((s, i) => (
            <stop key={i} offset={s.offset} stopColor={s.stopColor}/>
          ))}
        </radialGradient>

        <clipPath id={`${pid}_clip`}>
          <circle cx={0} cy={0} r={planetSize}/>
        </clipPath>

        <mask id={`${pid}_occMask`}>
          <rect x="-200" y="-200" width="400" height="400" fill="white"/>
          <circle cx={0} cy={0} r={planetSize} fill="url(#planetOcclusionMaskShade)"/>
        </mask>
      </defs>

      <RotateToFollowSun enabled={followSun}>
        <Backlight planetSize={planetSize} key={id}/>
        <circle cx={0} cy={0} r={planetSize} fill={`url(#${pid}_base)`}/>
      </RotateToFollowSun>

      {smudgesAndRings}

      {moons.length > 0 && (
        <g>
          <Jiggle duration={20} angle={15}>
            <g mask={`url(#${pid}_occMask)`}>
              {moons.map((m) => (
                <Moon
                  key={m.id}
                  id={m.id}
                  orbitRx={m.orbitRx}
                  orbitRy={m.orbitRy}
                  orbitTilt={m.orbitTilt}
                  radius={m.radius}
                  duration={m.duration}
                  begin={m.begin ?? 0}
                  baseId={m.baseId ?? "moonBase"}
                  color={m.color}
                  followSun={followSun}
                />
              ))}
            </g>
          </Jiggle>
        </g>
      )}
    </svg>
  );
}
