import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { type AnimationType } from "./tabs/AnimationTab.tsx";
import { type LayerConfig, type LayerConfigHandlers } from "./tabs/SurfaceTab.tsx";
import { type MoonConfig, type RingConfig } from "./types.ts";
import { BAND_SEED, DEFAULT_MOONS, DEFAULT_RINGS, FULL_PRESETS, PRESETS, SOFT_BAND_SEED, } from "./presets.ts";
import { randHex, randSeed, uid } from "./lib.ts";

export interface PlanetSnapshot {
  planetSize: number;
  backlightGlow: number;
  customMode: boolean;
  paletteKey: string;
  highlight: string;
  mid: string;
  shadow: string;
  band: LayerConfig;
  soft: LayerConfig;
  rings: RingConfig[];
  moons: MoonConfig[];
}

export interface PlanetState {
  tab: string;
  setTab: (t: string) => void;

  planetSize: number;
  setPlanetSize: (v: number) => void;
  backlightGlow: number;
  setBacklightGlow: (v: number) => void;

  // palette
  customMode: boolean;
  paletteKey: string;
  highlight: string;
  mid: string;
  shadow: string;
  setHighlight: (v: string) => void;
  setMid: (v: string) => void;
  setShadow: (v: string) => void;
  applyPreset: (key: string) => void;
  applyFullPreset: (key: string) => void;
  randomiseColors: () => void;
  randomiseRings: () => void;
  randomiseMoons: () => void;
  randomiseAll: () => void;

  // history
  takeSnapshot: () => PlanetSnapshot;
  restoreSnapshot: (s: PlanetSnapshot) => void;

  // surface
  band: LayerConfig;
  soft: LayerConfig;
  bandHandlers: LayerConfigHandlers;
  softHandlers: LayerConfigHandlers;

  // rings & moons
  rings: RingConfig[];
  moons: MoonConfig[];
  handleRingsChange: (next: RingConfig[]) => void;
  handleMoonsChange: (next: MoonConfig[]) => void;
  minOrbit: number;

  // animation
  animMode: AnimationType;
  setAnimMode: Dispatch<SetStateAction<AnimationType>>;
  jiggleDuration: number;
  setJiggleDuration: Dispatch<SetStateAction<number>>;
  jiggleAngle: number;
  setJiggleAngle: Dispatch<SetStateAction<number>>;
  rotateDuration: number;
  setRotateDuration: Dispatch<SetStateAction<number>>;
  invertRotation: boolean;
  setInvertRotation: Dispatch<SetStateAction<boolean>>;

  // derived
  colors: [string, string, string];
}

const PlanetContext = createContext<PlanetState | null>(null);

export function usePlanet(): PlanetState {
  const ctx = useContext(PlanetContext);
  if (!ctx) throw new Error("usePlanet must be used inside <PlanetProvider>");
  return ctx;
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function PlanetProvider({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState("preset");
  const [planetSize, setPlanetSizeRaw] = useState(28);
  const [backlightGlow, setBacklightGlow] = useState(15);

  // palette
  const [customMode, setCustomMode] = useState(false);
  const [paletteKey, setPaletteKey] = useState("nebula");
  const [highlight, setHighlightRaw] = useState(PRESETS["nebula"].colors[0]);
  const [mid, setMidRaw] = useState(PRESETS["nebula"].colors[1]);
  const [shadow, setShadowRaw] = useState(PRESETS["nebula"].colors[2]);

  // surface
  const [band, setBand] = useState<LayerConfig>({ seed: BAND_SEED, count: 12, opacity: 100, angle: 5 });
  const [soft, setSoft] = useState<LayerConfig>({ seed: SOFT_BAND_SEED, count: 4, opacity: 55, angle: 15 });

  // rings & moons
  const [rings, setRings] = useState<RingConfig[]>(DEFAULT_RINGS);
  const [moons, setMoons] = useState<MoonConfig[]>(DEFAULT_MOONS);

  // animation
  const [animMode, setAnimMode] = useState<AnimationType>("jiggle");
  const [jiggleDuration, setJiggleDuration] = useState(25);
  const [jiggleAngle, setJiggleAngle] = useState(15);
  const [rotateDuration, setRotateDuration] = useState(40);
  const [invertRotation, setInvertRotation] = useState(false);

  const minOrbit = planetSize + 4;

  // ─── Setters that enforce constraints ───────────────────────────────────────

  function setPlanetSize(size: number) {
    const newMin = size + 4;
    setPlanetSizeRaw(size);
    setRings(prev => prev.map(r => ({ ...r, rx: Math.max(r.rx, newMin + r.strokeWidth * 2) })));
    setMoons(prev => prev.map(m => ({ ...m, orbitRx: Math.max(m.orbitRx, newMin + m.radius) })));
  }

  function setHighlight(v: string) {
    setCustomMode(true);
    setHighlightRaw(v);
  }

  function setMid(v: string) {
    setCustomMode(true);
    setMidRaw(v);
  }

  function setShadow(v: string) {
    setCustomMode(true);
    setShadowRaw(v);
  }

  function handleRingsChange(next: RingConfig[]) {
    setRings(next.map(r => ({ ...r, rx: Math.max(r.rx, minOrbit + r.strokeWidth * 2) })));
  }

  function handleMoonsChange(next: MoonConfig[]) {
    setMoons(next.map(m => ({ ...m, orbitRx: Math.max(m.orbitRx, minOrbit + m.radius) })));
  }

  // ─── Preset application ──────────────────────────────────────────────────────

  function applyPreset(key: string) {
    setPaletteKey(key);
    setCustomMode(false);
    const p = PRESETS[key].colors;
    setHighlightRaw(p[0]);
    setMidRaw(p[1]);
    setShadowRaw(p[2]);
  }

  function applyFullPreset(key: string) {
    const p = FULL_PRESETS[key];
    if (!p) return;
    setPlanetSizeRaw(p.planetSize);
    setBacklightGlow(p.backlightGlow);
    setHighlightRaw(p.colors[0]);
    setMidRaw(p.colors[1]);
    setShadowRaw(p.colors[2]);
    setCustomMode(false);
    setPaletteKey(key);
    setBand({ ...p.band });
    setSoft({ ...p.soft });
    // Re-stamp UIDs so React keys are fresh
    setRings(p.rings.map(r => ({ ...r, uid: uid() })));
    setMoons(p.moons.map(m => ({ ...m, id: uid() })));
  }

  // ─── Randomise helpers ───────────────────────────────────────────────────────

  const randomiseColors = useCallback(() => {
    setHighlightRaw(randHex());
    setMidRaw(randHex());
    setShadowRaw(randHex());
    setCustomMode(true);
  }, []);

  const randomiseRings = useCallback(() => {
    const count = Math.floor(Math.random() * 4); // 0-3 rings
    const newRings: RingConfig[] = Array.from({ length: count }, () => {
      const sw = parseFloat((0.5 + Math.random() * 1.5).toFixed(1));
      const rxMin = Math.max(45, minOrbit + sw * 2);
      return {
        uid: uid(),
        rx: rxMin + Math.random() * (90 - rxMin),
        ry: 6 + Math.random() * 19,
        stroke: randHex(),
        strokeWidth: sw,
        strokeOpacity: 0.2 + Math.random() * 0.8,
        angle: Math.random() * 180,
      };
    });
    setRings(newRings);
  }, [minOrbit]);

  const randomiseMoons = useCallback(() => {
    const count = Math.floor(Math.random() * 4); // 0-3 moons
    const newMoons: MoonConfig[] = Array.from({ length: count }, () => {
      const radius = 0.5 + Math.random() * 9.5;
      const orbitRxMin = minOrbit + radius;
      return {
        id: uid(),
        orbitRx: orbitRxMin + Math.random() * (90 - orbitRxMin),
        orbitRy: 10 + Math.random() * 25,
        orbitTilt: -15 + Math.random() * 30,
        radius,
        durationS: 2 + Math.random() * 58,
        begin: -30 + Math.random() * 30,
        color: randHex(),
      };
    });
    setMoons(newMoons);
  }, [minOrbit]);

  const randomiseAll = useCallback(() => {
    randomiseColors();
    randomiseRings();
    randomiseMoons();
    setBand({
      seed: randSeed(),
      count: Math.ceil(Math.random() * 20),
      opacity: 40 + Math.random() * 60,
      angle: -20 + Math.random() * 40
    });
    setSoft({
      seed: randSeed(),
      count: 1 + Math.ceil(Math.random() * 8),
      opacity: 30 + Math.random() * 60,
      angle: -30 + Math.random() * 60
    });
    setPlanetSizeRaw(16 + Math.floor(Math.random() * 24));
    setBacklightGlow(Math.floor(Math.random() * 25));
  }, [randomiseColors, randomiseRings, randomiseMoons]);

  // ─── Layer handlers ──────────────────────────────────────────────────────────

  function makeLayerHandlers(setter: Dispatch<SetStateAction<LayerConfig>>): LayerConfigHandlers {
    return {
      onSeedChange: (v) => setter(p => ({ ...p, seed: v })),
      onCountChange: (v) => setter(p => ({ ...p, count: v })),
      onOpacityChange: (v) => setter(p => ({ ...p, opacity: v })),
      onAngleChange: (v) => setter(p => ({ ...p, angle: v })),
    };
  }

  // ─── Snapshot ────────────────────────────────────────────────────────────────

  function takeSnapshot(): PlanetSnapshot {
    return {
      planetSize,
      backlightGlow,
      customMode,
      paletteKey,
      highlight,
      mid,
      shadow,
      band: { ...band },
      soft: { ...soft },
      rings: rings.map(r => ({ ...r })),
      moons: moons.map(m => ({ ...m })),
    };
  }

  function restoreSnapshot(s: PlanetSnapshot) {
    setPlanetSizeRaw(s.planetSize);
    setBacklightGlow(s.backlightGlow);
    setCustomMode(s.customMode);
    setPaletteKey(s.paletteKey);
    setHighlightRaw(s.highlight);
    setMidRaw(s.mid);
    setShadowRaw(s.shadow);
    setBand({ ...s.band });
    setSoft({ ...s.soft });
    setRings(s.rings.map(r => ({ ...r })));
    setMoons(s.moons.map(m => ({ ...m })));
  }

  // ─── Derived ─────────────────────────────────────────────────────────────────

  const colors = useMemo<[string, string, string]>(
    () => (customMode ? [highlight, mid, shadow] : PRESETS[paletteKey]?.colors ?? [highlight, mid, shadow]),
    [customMode, paletteKey, highlight, mid, shadow],
  );

  const value: PlanetState = {
    tab, setTab,
    planetSize, setPlanetSize,
    backlightGlow, setBacklightGlow,
    customMode, paletteKey,
    highlight, mid, shadow,
    setHighlight, setMid, setShadow,
    applyPreset, applyFullPreset,
    randomiseColors, randomiseRings, randomiseMoons, randomiseAll,
    takeSnapshot, restoreSnapshot,
    band, soft,
    bandHandlers: makeLayerHandlers(setBand),
    softHandlers: makeLayerHandlers(setSoft),
    rings, moons,
    handleRingsChange, handleMoonsChange,
    minOrbit,
    animMode, setAnimMode,
    jiggleDuration, setJiggleDuration,
    jiggleAngle, setJiggleAngle,
    rotateDuration, setRotateDuration,
    invertRotation, setInvertRotation,
    colors,
  };

  return <PlanetContext.Provider value={value}>{children}</PlanetContext.Provider>;
}