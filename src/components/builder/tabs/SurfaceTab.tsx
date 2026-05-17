import { Label, SectionHead, SliderRow, TextInputWithShuffle } from "../ui-collection.tsx";
import { randSeed } from "../lib.ts";

interface SurfaceTabProps {
  bandSeed: string;
  softSeed: string;
  bandCount: number;
  bandAngle: number;
  softCount: number;
  softOpacity: number;
  softAngle: number;
  onBandSeedChange: (v: string) => void;
  onSoftSeedChange: (v: string) => void;
  onBandCountChange: (v: number) => void;
  onBandAngleChange: (v: number) => void;
  onSoftCountChange: (v: number) => void;
  onSoftOpacityChange: (v: number) => void;
  onSoftAngleChange: (v: number) => void;
}

export function SurfaceTab({
  bandSeed, softSeed,
  bandCount, bandAngle,
  softCount, softOpacity, softAngle,
  onBandSeedChange, onSoftSeedChange,
  onBandCountChange, onBandAngleChange,
  onSoftCountChange, onSoftOpacityChange, onSoftAngleChange,
}: SurfaceTabProps) {
  return (
    <div className="flex gap-5 flex-wrap">
      <div className="flex-1">
        <SectionHead>Band layer</SectionHead>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex-1">
            <Label>Seed</Label>
            <TextInputWithShuffle value={bandSeed} onChange={onSoftSeedChange}
                                  onShuffleClick={() => onBandSeedChange(randSeed())}/>
          </div>
        </div>

        <SliderRow label="Band density" value={bandCount} min={2} max={30} onChange={onBandCountChange}/>
        <SliderRow label="Band opacity" value={softOpacity} min={5} max={100} unit="%" onChange={onSoftOpacityChange}/>
        <SliderRow label="Band jiggle" value={bandAngle} min={0} max={20} onChange={onBandAngleChange}/>
      </div>

      <div className="flex-1">
        <SectionHead>Soft layer</SectionHead>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex-1">
            <Label>Seed</Label>
            <TextInputWithShuffle value={softSeed} onChange={onSoftSeedChange}
                                  onShuffleClick={() => onSoftSeedChange(randSeed())}/>
          </div>
        </div>

        <SliderRow label="Soft count" value={softCount} min={1} max={10} onChange={onSoftCountChange}/>
        <SliderRow label="Soft opacity" value={softOpacity} min={5} max={100} unit="%" onChange={onSoftOpacityChange}/>
        <SliderRow label="Soft jiggle" value={softAngle} min={0} max={30} onChange={onSoftAngleChange}/>
      </div>
    </div>
  );
}
