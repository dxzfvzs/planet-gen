import { ColorInput, RandomiseButton, SectionHead } from "../ui-collection.tsx";
import { type PlanetPreset, PRESETS } from "../presets.ts";
import { randHex } from "../lib.ts";

interface PaletteTabProps {
  highlight: string;
  mid: string;
  shadow: string;
  onApplyPreset: (key: string) => void;
  onHighlightChange: (v: string) => void;
  onMidChange: (v: string) => void;
  onShadowChange: (v: string) => void;
  onRandomise: (h: string, m: string, s: string) => void;
}

function PresetButton({ onClick, key, p }: {
  onClick: () => void;
  key: string;
  p: PlanetPreset
}) {
  return (
    <button
      key={key}
      onClick={() => onClick()}
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
  );
}


export function PaletteTab({
  highlight,
  mid,
  shadow,
  onApplyPreset,
  onHighlightChange,
  onMidChange,
  onShadowChange,
  onRandomise,
}: PaletteTabProps) {
  return (
    <div className="space-y-4">
      <SectionHead>Presets</SectionHead>

      <div className="flex flex-row flex-wrap gap-2">
        {Object.entries(PRESETS).map(([key, p]) => (
          <PresetButton key={key} onClick={() => onApplyPreset(key)} p={p}/>
        ))}
      </div>

      <SectionHead>Custom</SectionHead>

      <div className="space-y-2">
        <ColorInput label="Highlight" value={highlight} onChange={onHighlightChange}/>
        <ColorInput label="Mid" value={mid} onChange={onMidChange}/>
        <ColorInput label="Shadow" value={shadow} onChange={onShadowChange}/>
      </div>

      <RandomiseButton onClick={() => onRandomise(randHex(), randHex(), randHex())}/>
    </div>
  );
}
