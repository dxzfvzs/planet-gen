import { RandomiseButton, SectionHead } from "../ui-collection.tsx";
import { usePlanet } from "../usePlanet.ts";
import { FULL_PRESETS } from "../presets.ts";

export function PresetTab() {
  const {
    applyFullPreset, randomiseRings, randomiseMoons, randomiseAll,
  } = usePlanet();

  return (
    <div className="space-y-4">
      <SectionHead>Full Presets</SectionHead>
      <div className="flex flex-row flex-wrap gap-2">
        {Object.entries(FULL_PRESETS).map(([key, p]) => (
          <button
            key={key}
            onClick={() => applyFullPreset(key)}
            className="w-[6em] rounded-xl border border-white/10 bg-white/5 p-2 transition hover:bg-white/10"
          >
            <div
              className="mx-auto h-8 w-8 rounded-full"
              style={{
                background: `radial-gradient(circle at 15% 20%, ${p.colors[0]}, ${p.colors[1]} 45%, ${p.colors[2]})`,
              }}
            />
            <div className="mt-1 text-[10px] font-mono text-violet-200/60">{p.label}</div>
          </button>
        ))}
      </div>

      <SectionHead>Randomness</SectionHead>
      <div className="flex flex-wrap gap-2">
        <RandomiseButton onClick={randomiseAll} label="Randomise Everything"/>
        <RandomiseButton onClick={randomiseRings} label="Randomise Rings"/>
        <RandomiseButton onClick={randomiseMoons} label="Randomise Moons"/>
      </div>
    </div>
  );
}