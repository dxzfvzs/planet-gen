export type TabId = "palette" | "surface" | "rings" | "moons" | "animation";

export const TABS: { id: TabId; label: string }[] = [
  { id: "palette", label: "Color" },
  { id: "surface", label: "Surface" },
  { id: "rings", label: "Rings" },
  { id: "moons", label: "Moons" },
  { id: "animation", label: "Animation" },
];

export interface MoonConfig {
  uid: string;
  orbitRx: number;
  orbitRy: number;
  orbitTilt: number;
  radius: number;
  durationS: number;
  begin: number;
  color: string;
}

export interface RingConfig {
  uid: string;
  rx: number;
  ry: number;
  stroke: string;
  strokeWidth: number;
  strokeOpacity: number;
  angle: number;
}
