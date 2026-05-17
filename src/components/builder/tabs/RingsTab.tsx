import { type RingConfig } from "../types.ts";
import { ColorInput, SliderRow } from "../ui-collection.tsx";
import { AddCard, ConfigCard } from "../ConfigCard.tsx";
import { uid } from "../lib.ts";

interface RingsTabProps {
  rings: RingConfig[];
  onChange: (rings: RingConfig[]) => void;
  minOrbit: number;
}

export function RingsTab({ rings, onChange, minOrbit }: RingsTabProps) {
  function add() {
    onChange([...rings, { uid: uid(), rx: Math.max(45, minOrbit), ry: 6, stroke: "#b57aee", strokeWidth: 1.5, strokeOpacity: 0.5 }]);
  }

  function remove(id: string) {
    onChange(rings.filter((r) => r.uid !== id));
  }

  function updateRing<K extends keyof RingConfig>(id: string, key: K, val: RingConfig[K]) {
    onChange(rings.map((r) => r.uid === id ? { ...r, [key]: val } : r));
  }

  return (
    <div className="grid gap-3 justify-start [grid-template-columns:repeat(auto-fill,13.9em)]">
      {rings.map((r, i) => (
        <ConfigCard key={r.uid} title={`Ring ${i + 1}`} onRemove={() => remove(r.uid)}>
          <SliderRow label="Orbit X" value={r.rx} min={minOrbit} max={90} onChange={(v) => updateRing(r.uid, "rx", v)}/>
          <SliderRow label="Orbit Y" value={r.ry} min={2} max={25} onChange={(v) => updateRing(r.uid, "ry", v)}/>
          <SliderRow label="Width" value={r.strokeWidth} min={0.5} max={5} step={0.5}
                     onChange={(v) => updateRing(r.uid, "strokeWidth", v)}/>
          <SliderRow
            label="Opacity"
            value={Math.round(r.strokeOpacity * 100)}
            min={5} max={100} unit="%"
            onChange={(v) => updateRing(r.uid, "strokeOpacity", v / 100)}
          />
          <ColorInput label="Color" value={r.stroke} onChange={(v) => updateRing(r.uid, "stroke", v)}/>
        </ConfigCard>
      ))}

      <AddCard label="Add ring" onClick={add}/>
    </div>
  );
}
