export function Backlight({ planetSize, key, glow = 0.15 }: { planetSize: number, key: string, glow?: number }) {
  return (
    <>
      <ellipse key={`shade-${key}-1`}
               filter="url(#atmosphereGlow)"
               cx="0" cy="0"
               rx={planetSize + 4} ry={planetSize + 4}
               fill={"#ffffff"} stroke={"#ffffff"}
               opacity={glow}
               strokeWidth={0}
      />
      <ellipse key={`shade-${key}-2`}
               filter="url(#atmosphereGlow)"
               cx="0" cy="0"
               rx={planetSize + 8} ry={planetSize + 8}
               fill={"#ffffff"} stroke={"#ffffff"}
               opacity={glow * 0.75}
               strokeWidth={0}
      />
      <ellipse key={`shade-${key}-3`}
               filter="url(#atmosphereGlow)"
               cx="0" cy="0"
               rx={planetSize + 12} ry={planetSize + 12}
               fill={"#ffffff"} stroke={"#ffffff"}
               opacity={glow * 0.5}
               strokeWidth={0}
      />
    </>
  );
}