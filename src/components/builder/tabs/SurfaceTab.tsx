import { Label, SectionHead, SliderRow, TextInputWithShuffle } from "../ui-collection.tsx";
import { randSeed } from "../lib.ts";

export interface LayerConfig {
  seed: string;
  count: number;
  opacity: number;
  angle: number;
}

export interface LayerConfigHandlers {
  onSeedChange: (v: string) => void;
  onCountChange: (v: number) => void;
  onOpacityChange: (v: number) => void;
  onAngleChange: (v: number) => void;
}

interface SurfaceTabProps {
  band: LayerConfig;
  soft: LayerConfig;
  bandHandlers: LayerConfigHandlers;
  softHandlers: LayerConfigHandlers;
}

interface LayerSectionProps {
  title: string;
  countMax: number;
  angleMax: number;
  config: LayerConfig;
  handlers: LayerConfigHandlers;
}

function LayerSection({ title, countMax, angleMax, config, handlers }: LayerSectionProps) {
  return (
    <div>
      <SectionHead>{title}</SectionHead>
      <div className="mb-2 flex items-center gap-2">
        <div className="flex-1">
          <Label>Seed</Label>
          <TextInputWithShuffle
            value={config.seed}
            onChange={handlers.onSeedChange}
            onShuffleClick={() => handlers.onSeedChange(randSeed())}
          />
        </div>
      </div>
      <SliderRow label="Density" value={config.count} min={1} max={countMax} onChange={handlers.onCountChange}/>
      <SliderRow label="Opacity" value={config.opacity} min={0} max={100} unit="%" onChange={handlers.onOpacityChange}/>
      <SliderRow label="Angle" value={config.angle} min={0} max={angleMax} onChange={handlers.onAngleChange}/>
    </div>
  );
}

export function SurfaceTab({ band, soft, bandHandlers, softHandlers }: SurfaceTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <LayerSection title={`Primary ("Shadow") Smudge`} countMax={30} angleMax={20} config={band} handlers={bandHandlers}/>
      <LayerSection title={`Secondary ("Highlight") Smudge`} countMax={10} angleMax={30} config={soft} handlers={softHandlers}/>
    </div>
  );
}
