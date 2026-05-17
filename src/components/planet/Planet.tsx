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
  count: number;
  opacity: number;
  angle: number;
}

export interface GradientStop {
  offset: string;
  stopColor: string;
}

type JiggleAnimation = {
  type: "jiggle";
  duration: number;
  angle: number;
}

type RotateAnimation = {
  type: "rotate";
  duration: number;
  invertRotation?: boolean;
}

export type AnimationMode = JiggleAnimation | RotateAnimation;

export interface PlanetProps {
  /**
   * Unique id prefix — namespaces all SVG defs so multiple planets can
   * coexist in one document without gradient/mask id collisions.
   */
  id: string;
  planetSize: number;
  /** Gradient stops */
  gradient: GradientStop[];
  band: SmudgeLayer;
  soft: SmudgeLayer;
  rings: PlanetRing[];
  moons: PlanetMoon[];
  backlightGlow: number;
  animation: AnimationMode;
  /** SVG canvas size in px, default 220 */
  canvasSize?: number;
  /** Whether to make the core of the planet rotate to follow sun, affects moons as well */
  followSun?: boolean;
}

const AnimationWrapper = ({ animation, children }: { animation: AnimationMode; children: ReactNode }) =>
  animation.type === "rotate" ? (
    <RotatingGroup duration={animation.duration} invertRotation={animation.invertRotation ?? false}>
      {children}
    </RotatingGroup>
  ) : (
    <Jiggle duration={animation.duration ?? 25} angle={animation.angle ?? 15}>
      {children}
    </Jiggle>
  );

export function Planet(
  {
    id,
    planetSize,
    gradient,
    band,
    soft,
    rings,
    moons,
    animation,
    backlightGlow,
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

  const bandLayer = (
    <g clipPath={`url(#${pid}_clip)`} filter="url(#bandBlur)" opacity={band.opacity ?? 1.00} transform={`rotate(${band.angle})`}>
      {bandSmudges.map((s, i) => (
        <ellipse key={i} cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry}
                 fill={s.fill} opacity={s.opacity} transform={`rotate(${s.rotate})`}/>
      ))}
    </g>
  );

  const softLayer = (
    <g clipPath={`url(#${pid}_clip)`} filter="url(#softBlur)" opacity={soft.opacity ?? 0.55} transform={`rotate(${soft.angle})`}>
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

      <AnimationWrapper animation={animation}>
        <RotateToFollowSun enabled={followSun}>
          <Backlight planetSize={planetSize} key={id} glow={backlightGlow / 100}/>
          <circle cx={0} cy={0} r={planetSize} fill={`url(#${pid}_base)`}/>
        </RotateToFollowSun>
        {bandLayer}
        {softLayer}
        {ringLayer}

        {moons.length > 0 && (
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
        )}
      </AnimationWrapper>
    </svg>
  );
}
