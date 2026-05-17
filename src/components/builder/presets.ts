import { uid } from "./lib.ts";

export interface PlanetPreset {
  label: string;
  colors: [string, string, string];
}

export const PRESETS: Record<string, PlanetPreset> = {
  nebula: {
    label: "Nebula",
    colors: ["#b57aee", "#6a28b8", "#241255"],
  },
  bruise: {
    label: "Bruise",
    colors: ["#441c73", "#9c3b76", "#9ac4f9"],
  },
  bop: {
    label: "Paradise",
    colors: ["#6b01ef", "#630644", "#efd611"],
  },
  onyx: {
    label: "Onyx",
    colors: ["#7c3ddc", "#0f85a5", "#391c3a"],
  },
  dream: {
    label: "Dream",
    colors: ["#c183dc", "#154e98", "#7274ff"],
  },
  feverDream: {
    label: "Fever Dream",
    colors: ["#5e0df8", "#10b79b", "#aa7e28"],
  },
  jupiter: {
    label: "Jupiter",
    colors: ["#bd9271", "#fef377", "#6a0c07"],
  },
  glacio: {
    label: "Glacio",
    colors: ["#5f59b8", "#0e89ae", "#93e6c8"],
  },
  munchkin: {
    label: "Munchkin",
    colors: ["#b7f8a4", "#c50b09", "#bb99f4"],
  },
  berries: {
    label: "Berries",
    colors: ["#88380f", "#5804c1", "#a43526"],
  },
};

export const BAND_SEED = "c183dc";
export const SOFT_BAND_SEED = "c183dc";

export const DEFAULT_RINGS = [
  { uid: uid(), rx: 50, ry: 7, stroke: "#e8b9f8", strokeWidth: 1, strokeOpacity: 0.65, angle: 0 },
  { uid: uid(), rx: 62, ry: 11, stroke: "#cc61ef", strokeWidth: 2.5, strokeOpacity: 0.35, angle: 0 },
];

export const DEFAULT_MOONS = [
  { uid: uid(), orbitRx: 55, orbitRy: 15, orbitTilt: -3, radius: 2.8, durationS: 7, begin: -6, color: "#ffb8e8" },
];