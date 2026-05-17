export function randHex() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
}

export function randSeed(len = 8) {
  return Math.random().toString(36).slice(2, 2 + len);
}

export function uid() {
  return Math.random().toString(36).slice(2, 9);
}