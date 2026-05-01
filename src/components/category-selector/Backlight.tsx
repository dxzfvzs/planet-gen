export function Backlight({ planetSize, key }: { planetSize: number, key: string }) {
  return (
    <>
      <ellipse key={`shade-${key}-1`}
               filter="url(#atmosphereGlow)"
               cx="0" cy="0"
               rx={planetSize + 4} ry={planetSize + 4}
               fill={"#ffffff"} stroke={"#ffffff"}
               opacity={0.04}
               strokeWidth={0}
      />
      <ellipse key={`shade-${key}-2`}
               filter="url(#atmosphereGlow)"
               cx="0" cy="0"
               rx={planetSize + 8} ry={planetSize + 8}
               fill={"#ffffff"} stroke={"#ffffff"}
               opacity={0.03}
               strokeWidth={0}
      />
      <ellipse key={`shade-${key}-3`}
               filter="url(#atmosphereGlow)"
               cx="0" cy="0"
               rx={planetSize + 12} ry={planetSize + 12}
               fill={"#ffffff"} stroke={"#ffffff"}
               opacity={0.02}
               strokeWidth={0}
      />
    </>
  );
}