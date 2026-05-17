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
  sundew: {
    label: "Sundew",
    colors: ["#bee9de", "#fab64e", "#cd3a02"],
  },
  silver: {
    label: "Silver",
    colors: ["#ecd1e9", "#8498b5", "#8a6897"],
  },
};

export const BAND_SEED = "band";
export const SOFT_BAND_SEED = "softBand";

export const DEFAULT_RINGS = [
  { uid: uid(), rx: 50, ry: 7, stroke: "#e8b9f8", strokeWidth: 1, strokeOpacity: 0.65 },
  { uid: uid(), rx: 62, ry: 11, stroke: "#cc61ef", strokeWidth: 2.5, strokeOpacity: 0.35 },
];

export const DEFAULT_MOONS = [
  { uid: uid(), orbitRx: 55, orbitRy: 15, orbitTilt: -3, radius: 2.8, durationS: 7, begin: -6, color: "#ffb8e8" },
];