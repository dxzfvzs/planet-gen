interface Smudge {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  fill: string;
  opacity: number;
  rotate: number;
}

function hashString(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h *= 16777619;
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function adjustColor(hex: string, amount: number) {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0xff) + amount));
  return `rgb(${r},${g},${b})`;
}

export function generateSmudges(seedStr: string, planetSize: number, baseColor: string, count = 12): Smudge[] {
  const rand = mulberry32(hashString(seedStr));
  return Array.from({ length: count }, () => {
    const cx = (rand() - 0.5) * planetSize * 2;
    const cy = (rand() - 0.5) * planetSize * 1.1;
    const rx = planetSize * (0.6 + rand() * 0.9);
    const ry = rx * (0.15 + rand() * 0.25);
    const opacity = 0.15 + rand() * 0.20;
    const rotate = rand() * 40 - 20;
    return { cx, cy, rx, ry, rotate, fill: adjustColor(baseColor, rand() * 80 - 40), opacity };
  });
}