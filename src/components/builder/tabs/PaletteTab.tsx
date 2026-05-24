import { useState } from "react";
import { ColorInput, RandomiseButton, SectionHead, StepBack } from "../ui-collection.tsx";
import { PRESETS } from "../presets.ts";
import { usePlanet } from "../PlanetContext.tsx";

interface PaletteState {
  highlight: string;
  mid: string;
  shadow: string;
}

const HISTORY_LIMIT = 5;

export function PaletteTab() {
  const {
    highlight, mid, shadow,
    setHighlight, setMid, setShadow,
    applyPreset, randomiseColors,
  } = usePlanet();

  const [history, setHistory] = useState<PaletteState[]>([]);

  function pushHistory() {
    setHistory(prev => [{ highlight, mid, shadow }, ...prev].slice(0, HISTORY_LIMIT));
  }

  function handleUndo() {
    const previous = history[0];
    if (!previous) return;
    setHighlight(previous.highlight);
    setMid(previous.mid);
    setShadow(previous.shadow);
    setHistory(prev => prev.slice(1));
  }

  function handleHighlightChange(v: string) {
    pushHistory();
    setHighlight(v);
  }

  function handleMidChange(v: string) {
    pushHistory();
    setMid(v);
  }

  function handleShadowChange(v: string) {
    pushHistory();
    setShadow(v);
  }

  function handlePreset(key: string) {
    pushHistory();
    applyPreset(key);
  }

  function handleRandomise() {
    pushHistory();
    randomiseColors();
  }

  return (
    <div className="space-y-4">
      <SectionHead>Color Presets</SectionHead>
      <div className="flex flex-row flex-wrap gap-2">
        {Object.entries(PRESETS).map(([key, p]) => (
          <button
            key={key}
            onClick={() => handlePreset(key)}
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

      <SectionHead>Custom Colors</SectionHead>
      <div className="space-y-2">
        <ColorInput label="Highlight" value={highlight} onChange={handleHighlightChange}/>
        <ColorInput label="Mid" value={mid} onChange={handleMidChange}/>
        <ColorInput label="Shadow" value={shadow} onChange={handleShadowChange}/>
      </div>

      <div className="flex flex-wrap gap-2">
        <RandomiseButton onClick={handleRandomise} label="Randomise Colors"/>
        <StepBack onClick={handleUndo} disabled={history.length === 0}/>
      </div>
    </div>
  );
}