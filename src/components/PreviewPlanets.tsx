import { Planet } from "./planet/Planet.tsx";

export function PurplePlanet({ planetSize = 30 }: { planetSize?: number }) {
  return (
    <Planet
      id="purple"
      planetSize={planetSize}
      gradient={[
        { offset: "5%", stopColor: "#b57aee" },
        { offset: "52%", stopColor: "#6a28b8" },
        { offset: "100%", stopColor: "#241255" },
      ]}
      band={{ seedStr: "purpleBand", baseColor: "#4b1987" }}
      soft={{ seedStr: "purpleSoft", baseColor: "#8b42d5", count: 3 }}
      rings={[
        { cx: 0, cy: 2.5, rx: 50, ry: 7, stroke: "#e8b9f8", strokeWidth: 1, fill: "none", strokeOpacity: 0.65 },
        { cx: 0, cy: 2.5, rx: 60, ry: 11, stroke: "#cc61ef", strokeWidth: 2.5, fill: "none", strokeOpacity: 0.35 },
      ]}
      moons={[
        {
          id: "purple-1",
          orbitRx: 55,
          orbitRy: 15,
          orbitTilt: -3,
          radius: 2.8,
          duration: "7s",
          begin: -6.2,
          baseId: "moonBase",
          color: "#ffb8e8"
        },
        {
          id: "purple-2",
          orbitRx: 45,
          orbitRy: 10,
          orbitTilt: 16,
          radius: 5.5,
          duration: "6s",
          begin: -6,
          baseId: "moonBase",
          color: "#e1a3ec"
        },
      ]}
      animation={{ type: "jiggle" }}
    />
  );
}

export function PinkPlanet({ planetSize = 20 }: { planetSize?: number }) {
  return (
    <Planet
      id="pink"
      planetSize={planetSize}
      gradient={[
        { offset: "0%", stopColor: "#ffb8e8" },
        { offset: "50%", stopColor: "#d83888" },
        { offset: "100%", stopColor: "#6a003a" },
      ]}
      band={{ seedStr: "pinkBand", baseColor: "#8a0b4c" }}
      soft={{ seedStr: "pinkSoft", baseColor: "#f60a35", count: 3, opacity: 0.55 }}
      rings={[
        { cx: 0, cy: 2.5, rx: 40, ry: 4, stroke: "#ff67c3", strokeWidth: 1.3, fill: "none", strokeOpacity: 0.55 },
      ]}
      moons={[
        {
          id: "pink-1",
          orbitRx: 30,
          orbitRy: 8,
          orbitTilt: 9,
          radius: 2.8,
          duration: "7s",
          begin: -6.5,
          baseId: "moonBase",
          color: "#ffb8cd"
        },
      ]}
      animation={{ type: "rotate", duration: 17, bandAngle: 1, softAngle: 2 }}
    />
  );
}

export function GreenPlanet({ planetSize = 20 }: { planetSize?: number }) {
  return (
    <Planet
      id="green"
      planetSize={planetSize}
      gradient={[
        { offset: "0%", stopColor: "#b0f070" },
        { offset: "55%", stopColor: "#6fc630" },
        { offset: "100%", stopColor: "#155020" },
      ]}
      band={{ seedStr: "greenBand", baseColor: "#4c9816", count: 18 }}
      soft={{ seedStr: "greenSoft", baseColor: "#6fc630", count: 2, opacity: 0.5 }}
      rings={[]}
      moons={[
        {
          id: "green-1",
          orbitRx: 30,
          orbitRy: 11,
          orbitTilt: 30,
          radius: 3.5,
          duration: "30s",
          begin: -2,
          baseId: "moonBase"
        },
      ]}
      animation={{ type: "rotate", duration: 65, bandAngle: 1, softAngle: 2 }}
    />
  );
}

export function YellowPlanet({ planetSize = 25 }: { planetSize?: number }) {
  return (
    <Planet
      id="yellow"
      planetSize={planetSize}
      gradient={[
        { offset: "0%", stopColor: "#edcc7a" },
        { offset: "55%", stopColor: "#FFB703" },
        { offset: "100%", stopColor: "#7c4803" },
      ]}
      band={{ seedStr: "yellowBand", baseColor: "#FB8500" }}
      soft={{ seedStr: "yellowSoft", baseColor: "#FFB703", count: 5 }}
      rings={[
        { cx: 0, cy: 2.5, rx: 37, ry: 4, stroke: "#653d06", strokeWidth: 1, fill: "none", strokeOpacity: 0.85 },
        { cx: 0, cy: 2.5, rx: 44, ry: 6, stroke: "#da8f05", strokeWidth: 1.5, fill: "none", strokeOpacity: 0.55 },
        { cx: 0, cy: 2.5, rx: 58, ry: 8, stroke: "#edcc7a", strokeWidth: 1, fill: "none", strokeOpacity: 0.75 },
        { cx: 0, cy: 2.5, rx: 65, ry: 10, stroke: "#b38006", strokeWidth: 0.9, fill: "none", strokeOpacity: 0.75 },
      ]}
      animation={{ type: "jiggle", outerDuration: 17, outerAngle: 5, bandAngle: 1, softAngle: 2 }}
    />
  );
}

export function BluePlanet({ planetSize = 25 }: { planetSize?: number }) {
  return (
    <Planet
      id="blue"
      planetSize={planetSize}
      gradient={[
        { offset: "0%", stopColor: "#5abcec" },
        { offset: "52%", stopColor: "#3297c6" },
        { offset: "100%", stopColor: "#003b88" },
      ]}
      band={{ seedStr: "blueBand-d", baseColor: "#003b88", count: 12 }}
      soft={{ seedStr: "blueSoft", baseColor: "#69b8f6", count: 4 }}
      rings={[
        { cx: 0, cy: 2.5, rx: 37, ry: 7, stroke: "#61bdef", strokeWidth: 1, fill: "none", strokeOpacity: 0.85 },
        { cx: 0, cy: 2.5, rx: 44, ry: 11, stroke: "#61bdef", strokeWidth: 2.5, fill: "none", strokeOpacity: 0.25 },
      ]}
      animation={{ type: "rotate", duration: 125, invertRotation: true, bandAngle: 1, softAngle: 2 }}
    />
  );
}
