import { ColorInput, RandomiseButton, SectionCard } from "../ui-collection.tsx";
import { PRESETS } from "../presets.ts";
import { usePlanet } from "../usePlanet.ts";

export function PaletteTab() {
  const { highlight, mid, shadow, setHighlight, setMid, setShadow, applyPreset, randomiseColors } =
    usePlanet();

  return (
    <div className="space-y-3">
      <SectionCard title="Color Presets">
        <div className="flex flex-row flex-wrap gap-2">
          {Object.entries(PRESETS).map(([key, p]) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
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
      </SectionCard>

      <SectionCard title="Custom Colors">
        <ColorInput label="Highlight" value={highlight} onChange={setHighlight} />
        <ColorInput label="Mid" value={mid} onChange={setMid} />
        <ColorInput label="Shadow" value={shadow} onChange={setShadow} />
        <RandomiseButton onClick={randomiseColors} label="Randomise Colors" />
      </SectionCard>
    </div>
  );
}
