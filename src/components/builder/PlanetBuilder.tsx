import { type Dispatch, useMemo, useState } from "react";
import { type AnimationMode, Planet } from "../planet/Planet.tsx";
import { type MoonConfig, type RingConfig, type TabId, TABS } from "./types.ts";
import { BAND_SEED, DEFAULT_MOONS, DEFAULT_RINGS, PRESETS, SOFT_BAND_SEED } from "./presets.ts";
import { SliderRow } from "./ui-collection.tsx";
import { PaletteTab } from "./tabs/PaletteTab.tsx";
import { type LayerConfig, type LayerConfigHandlers, SurfaceTab } from "./tabs/SurfaceTab.tsx";
import { RingsTab } from "./tabs/RingsTab.tsx";
import { MoonsTab } from "./tabs/MoonsTab.tsx";
import { AnimationTab } from "./tabs/AnimationTab.tsx";

export default function PlanetBuilder() {
  const [tab, setTab] = useState<TabId>("palette");
  const [planetSize, setPlanetSize] = useState(28);

  // — palette —
  const [customMode, setCustomMode] = useState(false);
  const [paletteKey, setPaletteKey] = useState("nebula");
  const [highlight, setHighlight] = useState(PRESETS[paletteKey].colors[0]);
  const [mid, setMid] = useState(PRESETS[paletteKey].colors[1]);
  const [shadow, setShadow] = useState(PRESETS[paletteKey].colors[2]);

  // — surface —
  const [band, setBand] = useState<LayerConfig>({
    seed: BAND_SEED, count: 12, opacity: 100, angle: 5,
  });
  const [soft, setSoft] = useState<LayerConfig>({
    seed: SOFT_BAND_SEED, count: 4, opacity: 55, angle: 15,
  });

  function layerHandlers(setter: Dispatch<React.SetStateAction<LayerConfig>>): LayerConfigHandlers {
    return {
      onSeedChange: (v) => setter(p => ({ ...p, seed: v })),
      onCountChange: (v) => setter(p => ({ ...p, count: v })),
      onOpacityChange: (v) => setter(p => ({ ...p, opacity: v })),
      onAngleChange: (v) => setter(p => ({ ...p, angle: v })),
    };
  }

  // — rings & moons (final arrays only) —
  const [rings, setRings] = useState<RingConfig[]>(DEFAULT_RINGS);
  const [moons, setMoons] = useState<MoonConfig[]>(DEFAULT_MOONS);

  // — animation —
  const [animMode, setAnimMode] = useState<"jiggle" | "rotate">("jiggle");
  const [jiggleDuration, setJiggleDuration] = useState(25);
  const [jiggleAngle, setJiggleAngle] = useState(15);
  const [rotateDuration, setRotateDuration] = useState(40);
  const [invertRotation, setInvertRotation] = useState(false);

  // — derived —
  const colors = useMemo<[string, string, string]>(
    () => (customMode ? [highlight, mid, shadow] : PRESETS[paletteKey].colors),
    [customMode, paletteKey, highlight, mid, shadow],
  );

  const gradient = useMemo(
    () => [
      { offset: "0%", stopColor: colors[0] },
      { offset: "52%", stopColor: colors[1] },
      { offset: "100%", stopColor: colors[2] },
    ],
    [colors],
  );

  const planetRings = useMemo(
    () => rings.map((r) => ({
      cx: 0,
      cy: 2.5,
      rx: r.rx,
      ry: r.ry,
      fill: "none",
      stroke: r.stroke,
      strokeWidth: r.strokeWidth,
      strokeOpacity: r.strokeOpacity
    })),
    [rings],
  );

  const planetMoons = useMemo(
    () => moons.map((m) => ({
      id: m.uid,
      orbitRx: m.orbitRx,
      orbitRy: m.orbitRy,
      orbitTilt: m.orbitTilt,
      radius: m.radius,
      duration: `${m.durationS}s`,
      begin: m.begin,
      baseId: "moonBase",
      color: m.color
    })),
    [moons],
  );

  const animation: AnimationMode = useMemo(() => {
    if (animMode === "rotate") return {
      type: "rotate" as const,
      duration: rotateDuration,
      invertRotation,
    };
    return {
      type: "jiggle" as const,
      duration: jiggleDuration,
      angle: jiggleAngle,
    };
  }, [animMode, rotateDuration, invertRotation, jiggleDuration, jiggleAngle]);

  // — palette handlers —
  function applyPreset(key: string) {
    setPaletteKey(key);
    setCustomMode(false);
    const p = PRESETS[key].colors;
    setHighlight(p[0]);
    setMid(p[1]);
    setShadow(p[2]);
  }

  function handleCustomColor(setter: (v: string) => void) {
    return (v: string) => {
      setter(v);
      setCustomMode(true);
    };
  }

  return (
    <div className="flex w-full gap-4 px-4 pb-6">
      {/* left: planet preview */}
      <div className="flex flex-col gap-4">
        <div
          className="flex aspect-square items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
          <Planet
            id={`forge-planet`}
            planetSize={planetSize}
            canvasSize={200}
            gradient={gradient}
            band={{ seedStr: band.seed, baseColor: colors[2], count: band.count, opacity: band.opacity / 100 }}
            soft={{ seedStr: soft.seed, baseColor: colors[0], count: soft.count, opacity: soft.opacity / 100 }}
            rings={planetRings}
            moons={planetMoons}
            animation={animation}
          />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <SliderRow label="Planet size" value={planetSize} min={10} max={42} onChange={setPlanetSize}/>
        </div>
      </div>

      {/* right: tab panel */}
      <div className="flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="flex border-b border-white/10">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={[
                "flex-1 py-2 text-[12px] font-mono uppercase tracking-widest transition",
                tab === t.id ? "bg-white/5 text-violet-100" : "text-white/50 hover:bg-white/5 hover:text-white",
              ].join(" ")}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="space-y-5 overflow-y-auto p-4">
          <div className={tab !== "palette" ? "hidden" : ""}>

            <PaletteTab
              highlight={highlight} mid={mid} shadow={shadow}
              onApplyPreset={applyPreset}
              onHighlightChange={handleCustomColor(setHighlight)}
              onMidChange={handleCustomColor(setMid)}
              onShadowChange={handleCustomColor(setShadow)}
              onRandomise={(h, m, s) => {
                setHighlight(h);
                setMid(m);
                setShadow(s);
                setCustomMode(true);
              }}
            />
          </div>

          <div className={tab !== "surface" ? "hidden" : ""}>
            <SurfaceTab
              band={band} bandHandlers={layerHandlers(setBand)}
              soft={soft} softHandlers={layerHandlers(setSoft)}
            />
          </div>

          <div className={tab !== "rings" ? "hidden" : ""}>
            <RingsTab onChange={setRings}/>
          </div>

          <div className={tab !== "moons" ? "hidden" : ""}>
            <MoonsTab onChange={setMoons}/>
          </div>

          <div className={tab !== "animation" ? "hidden" : ""}>
            <AnimationTab
              animMode={animMode} onAnimModeChange={setAnimMode}
              jiggleDuration={jiggleDuration} onJiggleDurationChange={setJiggleDuration}
              jiggleAngle={jiggleAngle} onJiggleAngleChange={setJiggleAngle}
              rotateDuration={rotateDuration} onRotateDurationChange={setRotateDuration}
              invertRotation={invertRotation} onInvertRotationChange={setInvertRotation}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
