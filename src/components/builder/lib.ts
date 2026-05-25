import type { PlanetSnapshot } from "./PlanetContext.tsx";

export function randHex() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
}

export function randSeed(len = 8) {
  return Math.random().toString(36).slice(2, 2 + len);
}

export function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export function randNum(min: number, max: number, step: number = 1): number {
  const v = min + Math.random() * (max - min);
  return Math.round(v / step) * step;
}

export function snapshotsEqual(a?: PlanetSnapshot, b?: PlanetSnapshot) {
  if (!a || !b) return false;

  const stripRuntimeIds = (snapshot: PlanetSnapshot) => ({
    ...snapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rings: snapshot.rings.map(({ uid: _uid, ...ring }) => ring),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    moons: snapshot.moons.map(({ id: _id, ...moon }) => moon),
  });

  return (
    JSON.stringify(stripRuntimeIds(a)) ===
    JSON.stringify(stripRuntimeIds(b))
  );
}