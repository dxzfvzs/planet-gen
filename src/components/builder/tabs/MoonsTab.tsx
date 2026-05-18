import { type MoonConfig } from "../types.ts";
import { ColorInput, SliderRow } from "../ui-collection.tsx";
import { AddCard, ConfigCard } from "../ConfigCard.tsx";
import { randHex, uid } from "../lib.ts";

interface MoonsTabProps {
  moons: MoonConfig[];
  onChange: (moons: MoonConfig[]) => void;
  minOrbit: number;
}

export function MoonsTab({ moons, onChange, minOrbit }: MoonsTabProps) {
  function randStep(min: number, max: number, step: number = 1) {
    const steps = Math.floor((max - min) / step);
    return min + Math.round(Math.random() * steps) * step;
  }

  function add() {
    const radius = randStep(0.5, 10, 0.5);
    const orbitRxMin = minOrbit + radius;
    const orbitRx = randStep(orbitRxMin, 90);

    onChange([...moons, {
      id: uid(),
      orbitRx,
      orbitRy: randStep(10, 35),
      orbitTilt: randStep(-15, 15),
      radius,
      durationS: randStep(2, 60),
      begin: randStep(-30, 0),
      color: randHex(),
    }]);
  }

  function remove(id: string) {
    onChange(moons.filter((m) => m.id !== id));
  }

  function updateMoon<K extends keyof MoonConfig>(id: string, key: K, val: MoonConfig[K]) {
    onChange(moons.map((m) => m.id === id ? { ...m, [key]: val } : m));
  }

  return (
    <div className="grid gap-3 justify-start [grid-template-columns:repeat(auto-fill,13.9em)]">
      {moons.map((m, i) => (
        <ConfigCard key={m.id} title={`Moon ${i + 1}`} onRemove={() => remove(m.id)}>
          <SliderRow label="Radius" value={m.radius} min={0.5} max={10} step={0.5}
                     onChange={(v) => updateMoon(m.id, "radius", v)}/>
          <SliderRow label="Orbit X" value={m.orbitRx} min={minOrbit + m.radius} max={90}
                     onChange={(v) => updateMoon(m.id, "orbitRx", v)}/>
          <SliderRow label="Orbit Y" value={m.orbitRy} min={4 + m.radius} max={35}
                     onChange={(v) => updateMoon(m.id, "orbitRy", v)}/>
          <SliderRow label="Tilt" value={m.orbitTilt} min={-45} max={45} unit="°"
                     onChange={(v) => updateMoon(m.id, "orbitTilt", v)}/>
          <SliderRow label="Speed" value={m.durationS} min={2} max={60} unit="s"
                     onChange={(v) => updateMoon(m.id, "durationS", v)}/>
          <SliderRow label="Phase offset" value={m.begin} min={-30} max={0}
                     onChange={(v) => updateMoon(m.id, "begin", v)}/>
          <ColorInput label="Color" value={m.color} onChange={(v) => updateMoon(m.id, "color", v)}/>
        </ConfigCard>
      ))}

      <AddCard label="Add moon" onClick={add}/>
    </div>
  );
}
