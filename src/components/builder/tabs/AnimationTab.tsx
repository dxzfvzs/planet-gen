import { ToggleButton, SectionHead, SliderRow } from "../ui-collection.tsx";

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
  jiggleDuration, jiggleAngle,
  rotateDuration, invertRotation,
  onAnimModeChange,
  onJiggleDurationChange, onJiggleAngleChange,
  onRotateDurationChange, onInvertRotationChange,
}: AnimationTabProps) {
  return (
    <div className="space-y-4">
      <SectionHead>Mode</SectionHead>

      <div className="flex gap-2">
        <ToggleButton active={animMode === "jiggle"} onClick={() => onAnimModeChange("jiggle")}>Jiggle</ToggleButton>
        <ToggleButton active={animMode === "rotate"} onClick={() => onAnimModeChange("rotate")}>Rotate</ToggleButton>
        <ToggleButton active={animMode === "static"} onClick={() => onAnimModeChange("static")}>Static</ToggleButton>
      </div>

      {animMode === "jiggle" && (
        <>
          <SectionHead>Jiggle settings</SectionHead>
          <SliderRow label="Duration" value={jiggleDuration} min={1} max={240} unit="s" onChange={onJiggleDurationChange} />
          <SliderRow label="Angle" value={jiggleAngle} min={0} max={360} unit="°" onChange={onJiggleAngleChange} />
        </>
      )}

      {animMode === "rotate" && (
        <>
          <SectionHead>Rotation settings</SectionHead>
          <SliderRow label="Duration" value={rotateDuration} min={1} max={240} unit="s" onChange={onRotateDurationChange} />
          <div className="mt-1 flex gap-2">
            <ToggleButton active={!invertRotation} onClick={() => onInvertRotationChange(false)}>→ Prograde</ToggleButton>
            <ToggleButton active={invertRotation} onClick={() => onInvertRotationChange(true)}>← Retrograde</ToggleButton>
          </div>
        </>
      )}

      {animMode === "static" && (
        <>
          <SectionHead>Static settings</SectionHead>
          <SliderRow label="Angle" value={jiggleAngle} min={0} max={360} unit="°" onChange={onJiggleAngleChange} />
        </>
      )}
    </div>
  );
}
