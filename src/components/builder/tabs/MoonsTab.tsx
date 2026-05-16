import { useState } from "react";
import { type MoonConfig } from "../types.ts";
import { ColorInput, SliderRow } from "../ui-collection.tsx";
import { ConfigCard } from "../ConfigCard.tsx";
import { AddCard } from "../AddCard.tsx";
import { uid } from "../lib.ts";
import { DEFAULT_MOONS } from "../presets.ts";

interface MoonsTabProps {
  initialMoons?: MoonConfig[];
  onChange: (moons: MoonConfig[]) => void;
}

export function MoonsTab({ initialMoons = DEFAULT_MOONS, onChange }: MoonsTabProps) {
  const [moons, setMoons] = useState<MoonConfig[]>(initialMoons);

  function update(next: MoonConfig[]) {
    setMoons(next);
    onChange(next);
  }

  function add() {
    update([...moons, { uid: uid(), orbitRx: 45, orbitRy: 12, orbitTilt: 0, radius: 3, durationS: 8, begin: -4, color: "#b57aee" }]);
  }

  function remove(id: string) {
    update(moons.filter((m) => m.uid !== id));
  }

  function updateMoon<K extends keyof MoonConfig>(id: string, key: K, val: MoonConfig[K]) {
    update(moons.map((m) => m.uid === id ? { ...m, [key]: val } : m));
  }

  return (
    <div className="flex gap-4 flex-wrap">
      {moons.map((m, i) => (
        <ConfigCard key={m.uid} title={`Moon ${i + 1}`} onRemove={() => remove(m.uid)}>
          <SliderRow label="Radius" value={m.radius} min={0.5} max={10} step={0.5} onChange={(v) => updateMoon(m.uid, "radius", v)} />
          <SliderRow label="Orbit X" value={m.orbitRx} min={20} max={90} onChange={(v) => updateMoon(m.uid, "orbitRx", v)} />
          <SliderRow label="Orbit Y" value={m.orbitRy} min={4} max={35} onChange={(v) => updateMoon(m.uid, "orbitRy", v)} />
          <SliderRow label="Tilt" value={m.orbitTilt} min={-45} max={45} unit="°" onChange={(v) => updateMoon(m.uid, "orbitTilt", v)} />
          <SliderRow label="Speed" value={m.durationS} min={2} max={60} unit="s" onChange={(v) => updateMoon(m.uid, "durationS", v)} />
          <SliderRow label="Phase offset" value={m.begin} min={-30} max={0} onChange={(v) => updateMoon(m.uid, "begin", v)} />
          <ColorInput label="Color" value={m.color} onChange={(v) => updateMoon(m.uid, "color", v)} />
        </ConfigCard>
      ))}

      <AddCard label="Add moon" onClick={add} />
    </div>
  );
}
