import { useState } from "react";
import { RandomiseButton, SectionHead, StepBack } from "../ui-collection.tsx";
import { type PlanetPreset, PRESETS } from "../presets.ts";
import { randHex } from "../lib.ts";

interface PaletteTabProps {
  onApplyPreset: (key: string) => void;
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

export function PresetTab(
  { onApplyPreset, onRandomise }: PaletteTabProps) {
  const [history, setHistory] = useState<string[]>([]);

  function pushHistory() {
    setHistory((prev) =>
      ["", ...prev]
    );
  }

  function handleUndo() {
    const previous = history[0];
    if (!previous) return;

    setHistory((prev) => prev.slice(1));
  }

  function handlePreset(key: string) {
    pushHistory();
    onApplyPreset(key);
  }

  function handleRandomiseAll() {
    pushHistory();
    onRandomise(randHex(), randHex(), randHex());
  }

  return (
    <div className="space-y-4">
      <SectionHead>Full Presets</SectionHead>
      <div className="flex flex-row flex-wrap gap-2">
        {Object.entries(PRESETS).map(([key, p]) => (
          <PresetButton key={key} onClick={() => handlePreset(key)} p={p}/>
        ))}
      </div>

      <SectionHead>Randomness</SectionHead>
      <div className="flex flex-wrap gap-2">
        <RandomiseButton onClick={handleRandomiseAll} label={"Randomise Everything"}/>
        <RandomiseButton onClick={handleRandomiseAll} label={"Randomise Rings"}/>
        <RandomiseButton onClick={handleRandomiseAll} label={"Randomise Moons"}/>
        <RandomiseButton onClick={handleRandomiseAll} label={"Randomise Colors"}/>
      </div>
      <StepBack onClick={handleUndo} disabled={history.length === 0}/>

    </div>
  );
}