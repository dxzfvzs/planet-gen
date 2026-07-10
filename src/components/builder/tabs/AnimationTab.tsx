import { SectionCard, SliderRow, ToggleButton } from "../ui-collection.tsx";

export type AnimationType = "jiggle" | "rotate" | "static";

interface AnimationTabProps {
  animMode: AnimationType;
  jiggleDuration: number;
  jiggleAngle: number;
  rotateDuration: number;
  invertRotation: boolean;
  onAnimModeChange: (mode: AnimationType) => void;
  onJiggleDurationChange: (v: number) => void;
  onJiggleAngleChange: (v: number) => void;
  onRotateDurationChange: (v: number) => void;
  onInvertRotationChange: (v: boolean) => void;
}

export function AnimationTab({
  animMode,
  jiggleDuration,
  jiggleAngle,
  rotateDuration,
  invertRotation,
  onAnimModeChange,
  onJiggleDurationChange,
  onJiggleAngleChange,
  onRotateDurationChange,
  onInvertRotationChange,
}: AnimationTabProps) {
  return (
    <div className="space-y-3">
      <SectionCard title="Mode">
        <div className="flex gap-2">
          <ToggleButton active={animMode === "jiggle"} onClick={() => onAnimModeChange("jiggle")}>
            Jiggle
          </ToggleButton>
          <ToggleButton active={animMode === "rotate"} onClick={() => onAnimModeChange("rotate")}>
            Rotate
          </ToggleButton>
          <ToggleButton active={animMode === "static"} onClick={() => onAnimModeChange("static")}>
            Static
          </ToggleButton>
        </div>
      </SectionCard>

      {animMode === "jiggle" && (
        <SectionCard title="Jiggle settings">
          <SliderRow
            label="Duration"
            value={jiggleDuration}
            min={1}
            max={240}
            unit="s"
            onChange={onJiggleDurationChange}
          />
          <SliderRow
            label="Angle"
            value={jiggleAngle}
            min={0}
            max={360}
            unit="°"
            onChange={onJiggleAngleChange}
          />
        </SectionCard>
      )}

      {animMode === "rotate" && (
        <SectionCard title="Rotation settings">
          <SliderRow
            label="Duration"
            value={rotateDuration}
            min={1}
            max={240}
            unit="s"
            onChange={onRotateDurationChange}
          />
          <div className="mt-1 flex gap-2">
            <ToggleButton active={!invertRotation} onClick={() => onInvertRotationChange(false)}>
              → Prograde
            </ToggleButton>
            <ToggleButton active={invertRotation} onClick={() => onInvertRotationChange(true)}>
              ← Retrograde
            </ToggleButton>
          </div>
        </SectionCard>
      )}

      {animMode === "static" && (
        <SectionCard title="Static settings">
          <SliderRow
            label="Angle"
            value={jiggleAngle}
            min={0}
            max={360}
            unit="°"
            onChange={onJiggleAngleChange}
          />
        </SectionCard>
      )}
    </div>
  );
}
