export function Backlight({ planetSize, id, glow = 0.15 }: { planetSize: number, id: string, glow?: number }) {
  return (
    <>
      <ellipse key={`shade-${id}-1`}
               filter="url(#atmosphereGlow)"
               cx="0" cy="0"
               rx={planetSize + 4} ry={planetSize + 4}
               fill={"#ffffff"} stroke={"#ffffff"}
               opacity={glow}
               strokeWidth={0}
      />
      <ellipse key={`shade-${id}-2`}
               filter="url(#atmosphereGlow)"
               cx="0" cy="0"
               rx={planetSize + 8} ry={planetSize + 8}
               fill={"#ffffff"} stroke={"#ffffff"}
               opacity={glow * 0.75}
               strokeWidth={0}
      />
      <ellipse key={`shade-${id}-3`}
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