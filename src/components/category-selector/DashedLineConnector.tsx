function splinePath() {
  const points = [
    { x: 0, y: 90 },
    { x: 100, y: 90 },
    { x: 250, y: 80 },
    { x: 420, y: 85 },
    { x: 600, y: 80 },
    { x: 780, y: 90 },
    { x: 920, y: 80 },
    { x: 1000, y: 90 },
  ];
  const amp = 32;

  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;

    const side = i % 2 === 0 ? 1 : -1;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6 + side * amp;

    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6 + side * amp;

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return d;
}

export function DashedLineConnector() {
  return (
    <svg className="absolute inset-y-12 w-full h-40" viewBox="0 0 1000 160" preserveAspectRatio="none">
      <path
        d={splinePath()}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="3"
        strokeDasharray="6 10"
        fill="none"
      />
    </svg>
  );
}