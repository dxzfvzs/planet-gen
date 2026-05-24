import { type RingConfig } from "../types.ts";
import { ColorInput, SliderRow } from "../ui-collection.tsx";
import { AddCard, ConfigCard } from "../ConfigCard.tsx";
import { randHex, uid } from "../lib.ts";
import { usePlanet } from "../usePlanet.ts";

export function RingsTab() {
  const { rings, handleRingsChange, minOrbit } = usePlanet();

  function randStep(min: number, max: number, step: number = 1) {
    const steps = Math.floor((max - min) / step);
    return min + Math.round(Math.random() * steps) * step;
  }

  function add() {
    const sw = randStep(0.5, 2, 0.5);
    const rxMin = Math.max(45, minOrbit + sw / 2);
    handleRingsChange([...rings, {
      uid: uid(),
      rx: randStep(rxMin, 90),
      ry: randStep(6, 25),
      strokeWidth: sw,
      strokeOpacity: randStep(50, 100) / 100,
      angle: randStep(0, 180),
      stroke: randHex(),
    }]);
  }

  function remove(id: string) {
    handleRingsChange(rings.filter(r => r.uid !== id));
  }

  function updateRing<K extends keyof RingConfig>(id: string, key: K, val: RingConfig[K]) {
    handleRingsChange(rings.map(r => r.uid === id ? { ...r, [key]: val } : r));
  }

  return (
    <div className="grid gap-3 justify-start [grid-template-columns:repeat(auto-fill,13.9em)]">
      {rings.map((r, i) => (
        <ConfigCard key={r.uid} title={`Ring ${i + 1}`} onRemove={() => remove(r.uid)}>
          <SliderRow label="Orbit X" value={r.rx} min={minOrbit + r.strokeWidth * 2} max={90}
                     onChange={(v) => updateRing(r.uid, "rx", v)}/>
          <SliderRow label="Orbit Y" value={r.ry} min={6} max={25} onChange={(v) => updateRing(r.uid, "ry", v)}/>
          <SliderRow label="Width" value={r.strokeWidth} min={0.5} max={5} step={0.5}
                     onChange={(v) => updateRing(r.uid, "strokeWidth", v)}/>
          <SliderRow label="Angle" value={r.angle} min={0} max={180} step={1}
                     onChange={(v) => updateRing(r.uid, "angle", v)}/>
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
