import { uid } from "./lib.ts";
import type { LayerConfig } from "./tabs/SurfaceTab.tsx";
import type { MoonConfig, RingConfig } from "./types.ts";

export interface PlanetPreset {
  label: string;
  colors: [string, string, string];
  size: number;
  backlightGlow: number;
}

export const PRESETS: Record<string, PlanetPreset> = {
  nebula: {
    label: "Nebula",
    colors: ["#b57aee", "#6a28b8", "#241255"],
    size: 28,
    backlightGlow: 15,
  },
  bruise: {
    label: "Bruise",
    colors: ["#441c73", "#9c3b76", "#9ac4f9"],
    size: 28,
    backlightGlow: 15,
  },
  bop: {
    label: "Paradise",
    colors: ["#6b01ef", "#630644", "#efd611"],
    size: 28,
    backlightGlow: 15,
  },
  onyx: {
    label: "Onyx",
    colors: ["#7c3ddc", "#0f85a5", "#391c3a"],
    size: 28,
    backlightGlow: 15,
  },
  dream: {
    label: "Dream",
    colors: ["#c183dc", "#154e98", "#7274ff"],
    size: 28,
    backlightGlow: 15,
  },
  feverDream: {
    label: "Fever Dream",
    colors: ["#5e0df8", "#10b79b", "#aa7e28"],
    size: 28,
    backlightGlow: 15,
  },
  jupiter: {
    label: "Jupiter",
    colors: ["#bd9271", "#fef377", "#6a0c07"],
    size: 28,
    backlightGlow: 15,
  },
  glacio: {
    label: "Glacio",
    colors: ["#5f59b8", "#0e89ae", "#93e6c8"],
    size: 28,
    backlightGlow: 15,
  },
  munchkin: {
    label: "Munchkin",
    colors: ["#b7f8a4", "#c50b09", "#bb99f4"],
    size: 28,
    backlightGlow: 15,
  },
  berries: {
    label: "Berries",
    colors: ["#88380f", "#5804c1", "#a43526"],
    size: 28,
    backlightGlow: 15,
  },
  mars: {
    label: "Mars",
    colors: ["#c9cd5a", "#c04a2e", "#312624"],
    size: 28,
    backlightGlow: 15,
  },
  noxious: {
    label: "Noxious",
    colors: ["#313f35", "#d6d7fb", "#c0de08"],
    size: 28,
    backlightGlow: 15,
  },
  pinkMonster: {
    label: "Pink Monster",
    colors: ["#0b577b", "#af1473", "#081512"],
    size: 28,
    backlightGlow: 15,
  },
};

export const BAND_SEED = "c183dc";
export const SOFT_BAND_SEED = "c183dc";

export const DEFAULT_RINGS = [
  { uid: uid(), rx: 50, ry: 7, stroke: "#e8b9f8", strokeWidth: 1, strokeOpacity: 0.65, angle: 0 },
  { uid: uid(), rx: 62, ry: 11, stroke: "#cc61ef", strokeWidth: 2.5, strokeOpacity: 0.35, angle: 0 },
];

export const DEFAULT_MOONS = [
  { id: uid(), orbitRx: 55, orbitRy: 15, orbitTilt: -3, radius: 2.8, durationS: 7, begin: -6, color: "#ffb8e8" },
];

// --------------------------------------------------------

export interface FullPreset {
  label: string;
  planetSize: number;
  backlightGlow: number;
  colors: [string, string, string];
  band: LayerConfig;
  soft: LayerConfig;
  rings: RingConfig[];
  moons: MoonConfig[];
}

export const FULL_PRESETS: Record<string, FullPreset> = {
  nebula: {
    label: "Nebula",
    planetSize: 28,
    backlightGlow: 15,
    colors: ["#b57aee", "#6a28b8", "#241255"],
    band: { seed: "c183dc", count: 12, opacity: 100, angle: 5 },
    soft: { seed: "c183dc", count: 4, opacity: 55, angle: 15 },
    rings: [
      { uid: "r1", rx: 50, ry: 7, stroke: "#e8b9f8", strokeWidth: 1, strokeOpacity: 0.65, angle: 0 },
      { uid: "r2", rx: 62, ry: 11, stroke: "#cc61ef", strokeWidth: 2.5, strokeOpacity: 0.35, angle: 0 },
    ],
    moons: [
      { id: "m1", orbitRx: 55, orbitRy: 15, orbitTilt: -3, radius: 2.8, durationS: 7, begin: -6, color: "#ffb8e8" },
    ],
  },
  bruise: {
    label: "Bruise",
    colors: ["#441c73", "#9c3b76", "#9ac4f9"],
    planetSize: 39,
    backlightGlow: 8,
    band: { seed: "tl0wwap1", count: 12, opacity: 100, angle: 5 },
    soft: { seed: "be", count: 4, opacity: 55, angle: 15 },
    rings: [
      { uid: "r1", rx: 54, ry: 25, stroke: "#432343", strokeWidth: 1.5, strokeOpacity: 0.55, angle: 34 },
    ],
    moons: [],
  },
  jupiter: {
    label: "Jupiter",
    planetSize: 34,
    backlightGlow: 12,
    colors: ["#bd9271", "#fef377", "#6a0c07"],
    band: { seed: "a9410f", count: 20, opacity: 100, angle: 2 },
    soft: { seed: "fed880", count: 6, opacity: 45, angle: 3 },
    rings: [
      { uid: uid(), rx: 52, ry: 5, stroke: "#c8a06a", strokeWidth: 1.5, strokeOpacity: 0.4, angle: 5 },
    ],
    moons: [
      { id: uid(), orbitRx: 60, orbitRy: 12, orbitTilt: 4, radius: 1.8, durationS: 5, begin: -2, color: "#e8d5a0" },
      { id: uid(), orbitRx: 78, orbitRy: 18, orbitTilt: -6, radius: 2.4, durationS: 12, begin: -8, color: "#c4a882" },
    ],
  },
  mars: {
    label: "Mars",
    planetSize: 26,
    backlightGlow: 18,
    colors: ["#c9cd5a", "#c04a2e", "#312624"],
    band: { seed: "c04a2e", count: 8, opacity: 80, angle: 8 },
    soft: { seed: "c9cd5a", count: 3, opacity: 40, angle: 20 },
    rings: [],
    moons: [
      { id: uid(), orbitRx: 45, orbitRy: 10, orbitTilt: 2, radius: 1.2, durationS: 3, begin: 0, color: "#d4a88a" },
    ],
  },
  glacio: {
    label: "Glacio",
    planetSize: 30,
    backlightGlow: 20,
    colors: ["#5f59b8", "#0e89ae", "#93e6c8"],
    band: { seed: "0e89ae", count: 10, opacity: 70, angle: -5 },
    soft: { seed: "93e6c8", count: 5, opacity: 65, angle: -10 },
    rings: [
      { uid: uid(), rx: 48, ry: 6, stroke: "#93e6c8", strokeWidth: 2, strokeOpacity: 0.5, angle: -8 },
      { uid: uid(), rx: 58, ry: 9, stroke: "#5f59b8", strokeWidth: 1, strokeOpacity: 0.3, angle: -8 },
      { uid: uid(), rx: 70, ry: 13, stroke: "#aff5e4", strokeWidth: 0.5, strokeOpacity: 0.2, angle: -8 },
    ],
    moons: [],
  },
  noxious: {
    label: "Noxious",
    planetSize: 28,
    backlightGlow: 10,
    colors: ["#313f35", "#d6d7fb", "#c0de08"],
    band: { seed: "c0de08", count: 15, opacity: 90, angle: 12 },
    soft: { seed: "313f35", count: 4, opacity: 50, angle: 25 },
    rings: [
      { uid: uid(), rx: 46, ry: 8, stroke: "#c0de08", strokeWidth: 1.5, strokeOpacity: 0.45, angle: 15 },
      { uid: uid(), rx: 60, ry: 12, stroke: "#8a9e00", strokeWidth: 3, strokeOpacity: 0.2, angle: 15 },
    ],
    moons: [
      { id: uid(), orbitRx: 52, orbitRy: 14, orbitTilt: 8, radius: 3.5, durationS: 18, begin: -10, color: "#c0de08" },
      { id: uid(), orbitRx: 72, orbitRy: 20, orbitTilt: -5, radius: 1.8, durationS: 30, begin: -15, color: "#d6d7fb" },
    ],
  },
  pinkMonster: {
    label: "Pink Monster",
    planetSize: 32,
    backlightGlow: 22,
    colors: ["#0b577b", "#af1473", "#081512"],
    band: { seed: "af1473", count: 14, opacity: 95, angle: -3 },
    soft: { seed: "0b577b", count: 5, opacity: 60, angle: -8 },
    rings: [
      { uid: uid(), rx: 50, ry: 9, stroke: "#ff4eb8", strokeWidth: 2, strokeOpacity: 0.55, angle: -5 },
      { uid: uid(), rx: 65, ry: 14, stroke: "#af1473", strokeWidth: 1, strokeOpacity: 0.3, angle: -5 },
    ],
    moons: [
      { id: uid(), orbitRx: 58, orbitRy: 16, orbitTilt: -4, radius: 2.2, durationS: 9, begin: -4, color: "#ff4eb8" },
    ],
  },
};
