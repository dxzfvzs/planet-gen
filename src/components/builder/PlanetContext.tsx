import { type Dispatch, type ReactNode, type SetStateAction, useMemo, useState, } from "react";
import { type AnimationType } from "./tabs/AnimationTab.tsx";
import { type LayerConfig, type LayerConfigHandlers } from "./tabs/SurfaceTab.tsx";
import { type MoonConfig, type RingConfig } from "./types.ts";
import { DEFAULT_MOONS, DEFAULT_RINGS, FULL_PRESETS, PRESETS } from "./presets.ts";
import { randHex, randNum, randSeed, snapshotsEqual, uid } from "./lib.ts";
import { PlanetContext } from "./usePlanet.ts";

export interface PlanetSnapshot {
  label: string;
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
  animMode: AnimationType;
  jiggleDuration: number;
  jiggleAngle: number;
  rotateDuration: number;
  invertRotation: boolean;
}

export interface PlanetState {
  tab: string;
  setTab: (t: string) => void;

  canUndo: boolean;
  canRedo: boolean;
  canSave: boolean;
  historyLength: number;
  undoLabel: string | null;
  redoLabel: string | null;
  saveSnapshot: () => void;
  undo: () => void;
  redo: () => void;

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
  setAnimMode: (v: AnimationType) => void;
  jiggleDuration: number;
  setJiggleDuration: (v: number) => void;
  jiggleAngle: number;
  setJiggleAngle: (v: number) => void;
  rotateDuration: number;
  setRotateDuration: (v: number) => void;
  invertRotation: boolean;
  setInvertRotation: (v: boolean) => void;

  // derived
  colors: [string, string, string];
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function PlanetProvider({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState("preset");
  const [planetSize, setPlanetSizeRaw] = useState(FULL_PRESETS["nebula"].planetSize);
  const [backlightGlow, setBacklightGlow] = useState(FULL_PRESETS["nebula"].backlightGlow);

  // palette
  const [customMode, setCustomMode] = useState(false);
  const [paletteKey, setPaletteKey] = useState("nebula");
  const [highlight, setHighlightRaw] = useState(FULL_PRESETS["nebula"].colors[0]);
  const [mid, setMidRaw] = useState(FULL_PRESETS["nebula"].colors[1]);
  const [shadow, setShadowRaw] = useState(FULL_PRESETS["nebula"].colors[2]);

  // surface
  const [band, setBand] = useState<LayerConfig>({ ...FULL_PRESETS["nebula"].band });
  const [soft, setSoft] = useState<LayerConfig>({ ...FULL_PRESETS["nebula"].soft });

  // rings & moons
  const [rings, setRings] = useState<RingConfig[]>(DEFAULT_RINGS);
  const [moons, setMoons] = useState<MoonConfig[]>(DEFAULT_MOONS);

  // animation
  const [animMode, setAnimModeRaw] = useState<AnimationType>("jiggle");
  const [jiggleDuration, setJiggleDurationRaw] = useState(25);
  const [jiggleAngle, setJiggleAngleRaw] = useState(15);
  const [rotateDuration, setRotateDurationRaw] = useState(40);
  const [invertRotation, setInvertRotationRaw] = useState(false);

  // ─── History: cursor-based model ────────────────────────────────────────────
  // history[cursor] is always the last *saved* (anchored) snapshot.
  // Unsaved edits live only in the live state variables above; they are not
  // in the history array until the user hits Checkpoint (or an action that
  // auto-saves, like applying a preset).
  const [history, setHistory] = useState<PlanetSnapshot[]>(() => {
    return [{
      label: "Nebula preset",
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
      animMode,
      jiggleDuration,
      jiggleAngle,
      rotateDuration,
      invertRotation,
    }];
  });

  const [cursor, setCursor] = useState(0);
  const [isAnchored, setIsAnchored] = useState(true);
  const [checkpointCounter, setCheckpointCounter] = useState(0);

  const minOrbit = planetSize + 4;

  // ─── Snapshot helpers ────────────────────────────────────────────────────────

  function takeSnapshot(label = ""): PlanetSnapshot {
    return {
      label,
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
      animMode,
      jiggleDuration,
      jiggleAngle,
      rotateDuration,
      invertRotation,
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
    setAnimModeRaw(s.animMode);
    setJiggleDurationRaw(s.jiggleDuration);
    setJiggleAngleRaw(s.jiggleAngle);
    setRotateDurationRaw(s.rotateDuration);
    setInvertRotationRaw(s.invertRotation);
  }

  // History is newest-first: history[0] is the most recent checkpoint,
  // history[history.length-1] is the oldest.
  // cursor points to the "current" position; entries before cursor (lower index)
  // are redo candidates, entries after (higher index) are undo candidates.

  // Push the new snapshot, restore it, anchor. Any unsaved WIP in live state
  // is discarded — only Checkpoint and explicit actions (preset/randomise)
  // ever write to history.
  function commit(label: string, mutate: (curr: PlanetSnapshot) => PlanetSnapshot) {
    const dirtySnap = !isAnchored ? takeSnapshot("Unsaved edits") : null;
    const newSnap = mutate(takeSnapshot(label));
    const currentCursor = cursor;
    setHistory(prev => {
      const trunk = prev.slice(currentCursor);
      const base = (dirtySnap && !snapshotsEqual(dirtySnap, trunk[0])) ? [dirtySnap, ...trunk] : trunk;
      if (snapshotsEqual(newSnap, base[0])) return prev;
      return [newSnap, ...base];
    });
    setCursor(0);
    setIsAnchored(true);
    restoreSnapshot(newSnap);
  }

  function saveSnapshot() {
    const n = checkpointCounter + 1;
    setCheckpointCounter(n);
    const snap = takeSnapshot(`Checkpoint ${n}`);
    const currentCursor = cursor;
    setHistory(prev => {
      const trunk = prev.slice(currentCursor);
      if (snapshotsEqual(snap, trunk[0])) return prev;
      return [snap, ...trunk];
    });
    setCursor(0);
    setIsAnchored(true);
  }

  function undo() {
    if (!isAnchored) {
      const snap = takeSnapshot("Unsaved edits");
      const anchor = history[cursor];
      if (!snapshotsEqual(snap, anchor)) {
        setHistory(prev => [snap, ...prev]);
        setCursor(1);
        restoreSnapshot(anchor);
        setIsAnchored(true);
        return;
      }
      restoreSnapshot(anchor);
      setIsAnchored(true);
      return;
    }

    const nextCursor = cursor + 1;
    if (nextCursor >= history.length) return;
    restoreSnapshot(history[nextCursor]);
    setCursor(nextCursor);
    setIsAnchored(true);
  }

  function redo() {
    if (cursor === 0) return;
    const nextCursor = cursor - 1;
    restoreSnapshot(history[nextCursor]);
    setCursor(nextCursor);
    setIsAnchored(true);
  }

  // First dirty edit while sitting in the past truncates the redo branch
  // (Photoshop-style): the "future" stops being reachable, since live state
  // has diverged from it. Idempotent across multiple calls in one event.
  function markDirty() {
    if (cursor > 0) {
      const anchor = history[cursor];
      setHistory(prev => prev[0] === anchor ? prev : prev.slice(cursor));
      setCursor(0);
    }
    setIsAnchored(false);
  }

  // ─── Setters that enforce constraints ───────────────────────────────────────

  function setPlanetSize(size: number) {
    const newMin = size + 4;
    setPlanetSizeRaw(size);
    setRings(prev => prev.map(r => ({ ...r, rx: Math.max(r.rx, newMin + r.strokeWidth * 2) })));
    setMoons(prev => prev.map(m => ({ ...m, orbitRx: Math.max(m.orbitRx, newMin + m.radius) })));
    markDirty();
  }

  function setHighlight(v: string) {
    setCustomMode(true);
    setHighlightRaw(v);
    markDirty();
  }

  function setMid(v: string) {
    setCustomMode(true);
    setMidRaw(v);
    markDirty();
  }

  function setShadow(v: string) {
    setCustomMode(true);
    setShadowRaw(v);
    markDirty();
  }

  function setBacklightGlowDirty(v: number) {
    setBacklightGlow(v);
    markDirty();
  }

  function handleRingsChange(next: RingConfig[]) {
    setRings(next.map(r => ({ ...r, rx: Math.max(r.rx, minOrbit + r.strokeWidth * 2) })));
    markDirty();
  }

  function handleMoonsChange(next: MoonConfig[]) {
    setMoons(next.map(m => ({ ...m, orbitRx: Math.max(m.orbitRx, minOrbit + m.radius) })));
    markDirty();
  }

  function setAnimMode(v: AnimationType) {
    setAnimModeRaw(v);
    markDirty();
  }

  function setJiggleDuration(v: number) {
    setJiggleDurationRaw(v);
    markDirty();
  }

  function setJiggleAngle(v: number) {
    setJiggleAngleRaw(v);
    markDirty();
  }

  function setRotateDuration(v: number) {
    setRotateDurationRaw(v);
    markDirty();
  }

  function setInvertRotation(v: boolean) {
    setInvertRotationRaw(v);
    markDirty();
  }

  // ─── Preset application ──────────────────────────────────────────────────────

  function applyPreset(key: string) {
    const p = PRESETS[key];
    commit(`${p.label} palette`, curr => ({
      ...curr,
      paletteKey: key,
      customMode: false,
      highlight: p.colors[0],
      mid: p.colors[1],
      shadow: p.colors[2],
    }));
  }

  function applyFullPreset(key: string) {
    const p = FULL_PRESETS[key];
    if (!p) return;
    commit(`${p.label} preset`, curr => ({
      ...curr,
      planetSize: p.planetSize,
      backlightGlow: p.backlightGlow,
      paletteKey: key,
      customMode: false,
      highlight: p.colors[0],
      mid: p.colors[1],
      shadow: p.colors[2],
      band: { ...p.band },
      soft: { ...p.soft },
      rings: p.rings.map(r => ({ ...r, uid: uid() })),
      moons: p.moons.map(m => ({ ...m, id: uid() })),
    }));
  }

  // ─── Randomise helpers ───────────────────────────────────────────────────────

  function makeRandomColors() {
    return { highlight: randHex(), mid: randHex(), shadow: randHex() };
  }

  // ignorePrevState is called as true from randomiseAll, so that previous 0 rings can result in 0 rings as well
  function makeRandomRings(minRx: number, ignorePrevState = false): RingConfig[] {
    const minRings = !ignorePrevState && rings.length === 0 ? 1 : 0;
    const count = randNum(minRings, 5);
    return Array.from({ length: count }, () => {
      const sw = randNum(0.5, 2, 0.5);
      const rxMin = Math.max(45, minRx + sw * 2);
      return {
        uid: uid(),
        rx: randNum(rxMin, 90),
        ry: randNum(6, 25),
        stroke: randHex(),
        strokeWidth: sw,
        strokeOpacity: randNum(0.2, 1, 0.01),
        angle: randNum(0, 180),
      };
    });
  }

  function makeRandomMoons(minRx: number, ignorePrevState = false): MoonConfig[] {
    const minMoons = !ignorePrevState && moons.length === 0 ? 1 : 0;
    const count = randNum(minMoons, 3);
    return Array.from({ length: count }, () => {
      const radius = randNum(0.5, 10, 0.5);
      const orbitRxMin = minRx + radius;
      return {
        id: uid(),
        orbitRx: randNum(orbitRxMin, 90, 0.5),
        orbitRy: randNum(10, 35, 0.5),
        orbitTilt: randNum(-5, 5),
        radius,
        durationS: randNum(2, 60),
        begin: randNum(-30, 0),
        color: randHex(),
      };
    });
  }

  function randomiseColors() {
    const { highlight: h, mid: m, shadow: s } = makeRandomColors();
    setHighlightRaw(h);
    setMidRaw(m);
    setShadowRaw(s);
    setCustomMode(true);
    markDirty();
  }

  function randomiseRings() {
    commit("Randomise Rings", curr => ({ ...curr, rings: makeRandomRings(curr.planetSize + 4) }));
  }

  function randomiseMoons() {
    commit("Randomise Moons", curr => ({ ...curr, moons: makeRandomMoons(curr.planetSize + 4) }));
  }

  function randomiseAll() {
    commit("Randomise All", curr => {
      const planetSize = randNum(16, 40);
      const newMinOrbit = planetSize + 4;

      return {
        ...curr,
        ...makeRandomColors(),
        customMode: true,
        planetSize: planetSize,
        rings: makeRandomRings(newMinOrbit, true),
        moons: makeRandomMoons(newMinOrbit, true),
        band: {
          seed: randSeed(),
          count: randNum(10, 30),
          opacity: randNum(40, 100),
          angle: randNum(-180, 180),
        },
        soft: {
          seed: randSeed(),
          count: randNum(1, 10),
          opacity: randNum(30, 90),
          angle: randNum(-180, 180),
        },
        backlightGlow: randNum(0, 25),
      };
    });
  }

  // ─── Layer handlers ──────────────────────────────────────────────────────────

  function makeLayerHandlers(setter: Dispatch<SetStateAction<LayerConfig>>): LayerConfigHandlers {
    return {
      onSeedChange: (v) => {
        setter(p => ({ ...p, seed: v }));
        markDirty();
      },
      onCountChange: (v) => {
        setter(p => ({ ...p, count: v }));
        markDirty();
      },
      onOpacityChange: (v) => {
        setter(p => ({ ...p, opacity: v }));
        markDirty();
      },
      onAngleChange: (v) => {
        setter(p => ({ ...p, angle: v }));
        markDirty();
      },
    };
  }

  // ─── Derived ─────────────────────────────────────────────────────────────────

  const colors = useMemo<[string, string, string]>(
    () => (customMode ? [highlight, mid, shadow] : PRESETS[paletteKey]?.colors ?? [highlight, mid, shadow]),
    [customMode, paletteKey, highlight, mid, shadow],
  );

  const value: PlanetState = {
    tab, setTab,
    planetSize, setPlanetSize,
    backlightGlow, setBacklightGlow: setBacklightGlowDirty,
    customMode, paletteKey,
    highlight, mid, shadow,
    setHighlight, setMid, setShadow,
    applyPreset, applyFullPreset,
    randomiseColors, randomiseRings, randomiseMoons, randomiseAll,
    canUndo: cursor < history.length - 1 || !isAnchored,
    canRedo: cursor > 0,
    canSave: !isAnchored,
    historyLength: history.length,
    undoLabel: !isAnchored ? history[cursor]?.label ?? null : (history[cursor + 1]?.label ?? null),
    redoLabel: cursor > 0 ? history[cursor - 1]?.label ?? null : null,
    saveSnapshot, undo, redo,
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