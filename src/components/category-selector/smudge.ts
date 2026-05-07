function hashString(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h *= 16777619;
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function () {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Smudge = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  fill: string;
  opacity: number;
  rotate: number;
};

function adjustColor(hex: string, amount: number) {
  const num = parseInt(hex.slice(1), 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0xff) + amount;
  let b = (num & 0xff) + amount;

  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  return `rgb(${r},${g},${b})`;
}

export function generateSmudges({ seedStr, planetSize, baseColor, count = 12 }: {
  seedStr: string;
  planetSize: number;
  baseColor: string;
  count?: number;
}): Smudge[] {
  const seed = hashString(seedStr);
  const rand = mulberry32(seed);

  const smudges: Smudge[] = [];

  for (let i = 0; i < count; i++) {
    const cx = (rand() - 0.5) * planetSize * 2;
    const cy = (rand() - 0.5) * planetSize * 1.1;

    const rx = planetSize * (0.6 + rand() * 0.9);
    const ry = rx * (0.15 + rand() * 0.25);

    const opacity = 0.15 + rand() * 0.20;
    const rotate = rand() * 40 - 20;

    smudges.push({
      cx,
      cy,
      rx,
      ry,
      fill: adjustColor(baseColor, rand() * 80 - 40),
      opacity,
      rotate,
    });
  }

  return smudges;
}