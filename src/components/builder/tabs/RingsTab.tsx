import { useState } from "react";
import { type RingConfig } from "../types.ts";
import { ColorInput, SliderRow } from "../ui-collection.tsx";
import { ConfigCard } from "../ConfigCard.tsx";
import { AddCard } from "../AddCard.tsx";
import { uid } from "../lib.ts";
import { DEFAULT_RINGS } from "../presets.ts";

interface RingsTabProps {
  initialRings?: RingConfig[];
  onChange: (rings: RingConfig[]) => void;
}

export function RingsTab({ initialRings = DEFAULT_RINGS, onChange }: RingsTabProps) {
  const [rings, setRings] = useState<RingConfig[]>(initialRings);

  function update(next: RingConfig[]) {
    setRings(next);
    onChange(next);
  }

  function add() {
    update([...rings, { uid: uid(), rx: 45, ry: 6, stroke: "#b57aee", strokeWidth: 1.5, strokeOpacity: 0.5 }]);
  }

  function remove(id: string) {
    update(rings.filter((r) => r.uid !== id));
  }

  function updateRing<K extends keyof RingConfig>(id: string, key: K, val: RingConfig[K]) {
    update(rings.map((r) => r.uid === id ? { ...r, [key]: val } : r));
  }

  return (
    <div className="flex gap-4 flex-wrap">
      {rings.map((r, i) => (
        <ConfigCard key={r.uid} title={`Ring ${i + 1}`} onRemove={() => remove(r.uid)}>
          <SliderRow label="Orbit X" value={r.rx} min={20} max={90} onChange={(v) => updateRing(r.uid, "rx", v)} />
          <SliderRow label="Orbit Y" value={r.ry} min={2} max={25} onChange={(v) => updateRing(r.uid, "ry", v)} />
          <SliderRow label="Width" value={r.strokeWidth} min={0.5} max={5} step={0.5} onChange={(v) => updateRing(r.uid, "strokeWidth", v)} />
          <SliderRow
            label="Opacity"
            value={Math.round(r.strokeOpacity * 100)}
            min={5} max={100} unit="%"
            onChange={(v) => updateRing(r.uid, "strokeOpacity", v / 100)}
          />
          <ColorInput label="Color" value={r.stroke} onChange={(v) => updateRing(r.uid, "stroke", v)} />
        </ConfigCard>
      ))}

      <AddCard label="Add ring" onClick={add} />
    </div>
  );
}
