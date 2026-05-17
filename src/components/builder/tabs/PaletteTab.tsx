import { useState } from "react";
import { ColorInput, RandomiseButton, SectionHead, StepBack } from "../ui-collection.tsx";
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

interface PaletteState {
  highlight: string;
  mid: string;
  shadow: string;
}

const HISTORY_LIMIT = 5;

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

export function PaletteTab(
  {
    highlight,
    mid,
    shadow,
    onApplyPreset,
    onHighlightChange,
    onMidChange,
    onShadowChange,
    onRandomise,
  }: PaletteTabProps) {
  const [history, setHistory] = useState<PaletteState[]>([]);

  function pushHistory() {
    setHistory((prev) =>
      [{ highlight, mid, shadow }, ...prev]
        .slice(0, HISTORY_LIMIT)
    );
  }

  function handleUndo() {
    const previous = history[0];
    if (!previous) return;

    onHighlightChange(previous.highlight);
    onMidChange(previous.mid);
    onShadowChange(previous.shadow);

    setHistory((prev) => prev.slice(1));
  }

  function handleHighlightChange(v: string) {
    pushHistory();
    onHighlightChange(v);
  }

  function handleMidChange(v: string) {
    pushHistory();
    onMidChange(v);
  }

  function handleShadowChange(v: string) {
    pushHistory();
    onShadowChange(v);
  }

  function handlePreset(key: string) {
    pushHistory();
    onApplyPreset(key);
  }

  function handleRandomise() {
    pushHistory();

    onRandomise(randHex(), randHex(), randHex());
  }

  return (
    <div className="space-y-4">
      <SectionHead>Presets</SectionHead>

      <div className="flex flex-row flex-wrap gap-2">
        {Object.entries(PRESETS).map(([key, p]) => (
          <PresetButton key={key} onClick={() => handlePreset(key)} p={p}/>
        ))}
      </div>

      <SectionHead>Custom</SectionHead>

      <div className="space-y-2">
        <ColorInput label="Highlight" value={highlight} onChange={handleHighlightChange}/>
        <ColorInput label="Mid" value={mid} onChange={handleMidChange}/>
        <ColorInput label="Shadow" value={shadow} onChange={handleShadowChange}/>
      </div>

      <div className="flex flex-wrap gap-2">
        <RandomiseButton onClick={handleRandomise}/>
        <StepBack onClick={handleUndo} disabled={history.length === 0}/>
      </div>
    </div>
  );
}