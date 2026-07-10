import { Jiggle, RotateToFollowSun, RotatingGroup } from "./Rotation.tsx";
import { Backlight } from "./Backlight.tsx";
import { Moon } from "./Moon.tsx";
import { type ReactNode, useEffect, useMemo, useRef } from "react";
import { generateSmudges } from "./smudge-helper.ts";

export interface PlanetRing {
  uid?: string;
  rx: number;
  ry: number;
  stroke: string;
  strokeWidth: number;
  strokeOpacity: number;
  angle: number;
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
};

type RotateAnimation = {
  type: "rotate";
  duration: number;
  invertRotation?: boolean;
};

type StaticAnimation = {
  type: "static";
  angle: number;
};

export type AnimationMode = JiggleAnimation | RotateAnimation | StaticAnimation;

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
  /** ID of the ring or moon currently being highlighted (from card hover) */
  highlightedId?: string | null;
  /** Called when user clicks a moon or ring in the SVG — triggers card highlight */
  onSelectId?: (id: string | null) => void;
}

const AnimationWrapper = ({
  animation,
  children,
}: {
  animation: AnimationMode;
  children: ReactNode;
}) => {
  switch (animation.type) {
    case "jiggle":
      return (
        <Jiggle duration={animation.duration ?? 25} angle={animation.angle ?? 15}>
          {children}
        </Jiggle>
      );
    case "rotate":
      return (
        <RotatingGroup
          duration={animation.duration || 0}
          invertRotation={animation.invertRotation ?? false}
        >
          {children}
        </RotatingGroup>
      );
    case "static":
      return (
        <Jiggle duration={0} angle={animation.angle ?? 0}>
          {children}
        </Jiggle>
      );
  }
};

export function Planet({
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
  highlightedId = null,
  onSelectId,
}: PlanetProps) {
  const pid = `planet_${id}`;
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const isFormField = (target: EventTarget | null) =>
      target instanceof HTMLElement &&
      (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Control" && !isFormField(e.target)) svg.pauseAnimations();
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Control") svg.unpauseAnimations();
    };
    // Guard against the animation getting stuck paused if the ctrl key
    // release happens while the window isn't focused (e.g. alt-tab).
    const handleBlur = () => svg.unpauseAnimations();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  const bandSmudges = useMemo(
    () => generateSmudges(band.seedStr, planetSize, band.baseColor, band.count ?? 12),
    [band.seedStr, planetSize, band.baseColor, band.count]
  );

  const softSmudges = useMemo(
    () => generateSmudges(soft.seedStr, planetSize, soft.baseColor, soft.count ?? 4),
    [soft.seedStr, planetSize, soft.baseColor, soft.count]
  );

  const bandLayer = (
    <g
      clipPath={`url(#${pid}_clip)`}
      filter="url(#bandBlur)"
      opacity={band.opacity ?? 1.0}
      transform={`rotate(${band.angle})`}
    >
      {bandSmudges.map((s, i) => (
        <ellipse
          key={i}
          cx={s.cx}
          cy={s.cy}
          rx={s.rx}
          ry={s.ry}
          fill={s.fill}
          opacity={s.opacity}
          transform={`rotate(${s.rotate})`}
        />
      ))}
    </g>
  );

  const softLayer = (
    <g
      clipPath={`url(#${pid}_clip)`}
      filter="url(#softBlur)"
      opacity={soft.opacity ?? 0.55}
      transform={`rotate(${soft.angle})`}
    >
      {softSmudges.map((s, i) => (
        <ellipse
          key={i}
          cx={s.cx}
          cy={s.cy}
          rx={s.rx}
          ry={s.ry}
          fill={s.fill}
          opacity={s.opacity}
          transform={`rotate(${s.rotate})`}
        />
      ))}
    </g>
  );

  const ringLayer = rings.map((r, i) => (
    <ellipse
      key={i}
      cx={0}
      cy={2.5}
      rx={r.rx}
      ry={r.ry}
      fill={"none"}
      stroke={r.stroke}
      strokeWidth={r.strokeWidth}
      strokeOpacity={r.strokeOpacity}
      mask={`url(#${pid}_occMask)`}
      transform={`rotate(${r.angle ?? 0})`}
      style={{ pointerEvents: "none" }}
    />
  ));

  const ringHitLayer = rings.map((r, i) => {
    const isHighlighted = r.uid != null && r.uid === highlightedId;
    const toggle = () => onSelectId?.(r.uid === highlightedId ? null : (r.uid ?? null));
    return (
      <ellipse
        key={`hit-${i}`}
        cx={0}
        cy={2.5}
        rx={r.rx}
        ry={r.ry}
        fill="none"
        stroke="transparent"
        strokeWidth={r.strokeWidth + 1}
        mask={`url(#${pid}_occMask)`}
        transform={`rotate(${r.angle ?? 0})`}
        role={onSelectId ? "button" : undefined}
        tabIndex={onSelectId ? 0 : undefined}
        aria-pressed={onSelectId ? isHighlighted : undefined}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        style={{ cursor: onSelectId ? "pointer" : undefined, outline: "none" }}
      />
    );
  });

  const ringHighlightLayer = rings.map((r, i) => {
    const isHighlighted = r.uid != null && r.uid === highlightedId;
    return (
      <ellipse
        key={`hl-${i}`}
        cx={0}
        cy={2.5}
        rx={r.rx}
        ry={r.ry}
        fill="none"
        stroke="white"
        strokeWidth={r.strokeWidth}
        strokeOpacity={isHighlighted ? 1 : 0}
        transform={`rotate(${r.angle ?? 0})`}
        mask={`url(#${pid}_occMask)`}
        style={{ transition: "stroke-opacity 0.15s ease", pointerEvents: "none" }}
      >
        {isHighlighted && (
          <animate
            attributeName="stroke-opacity"
            values="1;0.1;1"
            dur="1s"
            repeatCount="indefinite"
          />
        )}
      </ellipse>
    );
  });

  return (
    <svg
      ref={svgRef}
      width={canvasSize}
      height={canvasSize}
      viewBox="-50 -50 100 100"
      overflow="visible"
      id="forge-planet-svg"
    >
      <defs>
        <radialGradient id={`${pid}_base`} cx="35%" cy="28%" r="62%">
          {gradient.map((s, i) => (
            <stop key={i} offset={s.offset} stopColor={s.stopColor} />
          ))}
        </radialGradient>

        <clipPath id={`${pid}_clip`}>
          <circle cx={0} cy={0} r={planetSize} />
        </clipPath>

        <mask id={`${pid}_occMask`}>
          <rect x="-200" y="-200" width="400" height="400" fill="white" />
          <circle cx={0} cy={0} r={planetSize} fill="url(#planetOcclusionMaskShade)" />
        </mask>

        {/* Defined occlusion for half visible-half not planet overlay. For moons, rings, etc. */}
        <linearGradient id="planetOcclusionMaskShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="black" />
          <stop offset="50%" stopColor="black" />
          <stop offset="50%" stopColor="white" />
          <stop offset="100%" stopColor="white" />
        </linearGradient>

        {/* Two possible blurs for surface level planetary bands.*/}
        <filter id="bandBlur" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="1.5 0.7" />
        </filter>
        <filter id="softBlur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.8" />
        </filter>

        {/* Moon base color.*/}
        <radialGradient id="moonBase" cx="32%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#c5c9cc" />
          <stop offset="100%" stopColor="#1d2732" />
        </radialGradient>
      </defs>

      <AnimationWrapper animation={animation}>
        <RotateToFollowSun enabled={followSun}>
          <Backlight planetSize={planetSize} id={id} glow={backlightGlow / 100} />
          <circle cx={0} cy={0} r={planetSize} fill={`url(#${pid}_base)`} />
        </RotateToFollowSun>
        {bandLayer}
        {softLayer}
        {ringLayer}
        {ringHighlightLayer}
        {ringHitLayer}

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
                baseId={"moonBase"}
                color={m.color}
                followSun={followSun}
                highlight={m.id === highlightedId}
                onClick={() => onSelectId?.(m.id === highlightedId ? null : m.id)}
              />
            ))}
          </g>
        )}
      </AnimationWrapper>
    </svg>
  );
}
