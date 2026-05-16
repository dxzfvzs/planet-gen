import { uid } from "./lib.ts";

interface PlanetPreset {
  label: string;
  colors: [string, string, string];
}

export const PRESETS: Record<string, PlanetPreset> = {
  nebula: {
    label: "Nebula",
    colors: ["#b57aee", "#6a28b8", "#241255"],
  },
  magma: {
    label: "Magma",
    colors: ["#ffb8e8", "#d83888", "#6a003a"],
  },
  jungle: {
    label: "Jungle",
    colors: ["#b0f070", "#3a8c10", "#155020"],
  },
  desert: {
    label: "Desert",
    colors: ["#edcc7a", "#FFB703", "#7c4803"],
  },
  ocean: {
    label: "Ocean",
    colors: ["#5abcec", "#1e6ea8", "#003b88"],
  },
  ember: {
    label: "Ember",
    colors: ["#ff9966", "#cc3311", "#440011"],
  },
  arctic: {
    label: "Arctic",
    colors: ["#d0f4ff", "#68c8e8", "#003355"],
  },
  obsidian: {
    label: "Obsidian",
    colors: ["#8888aa", "#333355", "#111122"],
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