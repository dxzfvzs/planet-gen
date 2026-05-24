import { RandomiseButton, SectionHead, StepBack } from "../ui-collection.tsx";
import { type PlanetSnapshot, usePlanet } from "../PlanetContext.tsx";
import { useState } from "react";
import { FULL_PRESETS } from "../presets.ts";

const HISTORY_LIMIT = 20;

export function PresetTab() {
  const {
    applyFullPreset,
    randomiseColors, randomiseRings, randomiseMoons, randomiseAll,
    takeSnapshot, restoreSnapshot,
  } = usePlanet();

  const [history, setHistory] = useState<PlanetSnapshot[]>([]);

  function push() {
    setHistory(prev => [takeSnapshot(), ...prev].slice(0, HISTORY_LIMIT));
  }

  function handleUndo() {
    const [top, ...rest] = history;
    if (!top) return;
    restoreSnapshot(top);
    setHistory(rest);
  }

  function handlePreset(key: string) {
    push();
    applyFullPreset(key);
  }

  function handleRandomiseAll() {
    push();
    randomiseAll();
  }

  function handleRandomiseColors() {
    push();
    randomiseColors();
  }

  function handleRandomiseRings() {
    push();
    randomiseRings();
  }

  function handleRandomiseMoons() {
    push();
    randomiseMoons();
  }

  return (
    <div className="space-y-4">
      <SectionHead>Full Presets</SectionHead>
      <div className="flex flex-row flex-wrap gap-2">
        {Object.entries(FULL_PRESETS).map(([key, p]) => (
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

      <SectionHead>Randomness</SectionHead>
      <div className="flex flex-wrap gap-2">
        <RandomiseButton onClick={handleRandomiseAll} label="Randomise Everything"/>
        <RandomiseButton onClick={handleRandomiseRings} label="Randomise Rings"/>
        <RandomiseButton onClick={handleRandomiseMoons} label="Randomise Moons"/>
        <RandomiseButton onClick={handleRandomiseColors} label="Randomise Colors"/>
      </div>

      <StepBack onClick={handleUndo} disabled={history.length === 0}/>
    </div>
  );
}