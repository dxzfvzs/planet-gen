import { ToggleButton, SectionHead, SliderRow } from "../ui-collection.tsx";

interface AnimationTabProps {
  animMode: "jiggle" | "rotate";
  jiggleDuration: number;
  jiggleAngle: number;
  rotateDuration: number;
  invertRotation: boolean;
  onAnimModeChange: (mode: "jiggle" | "rotate") => void;
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
      </div>

      {animMode === "jiggle" && (
        <>
          <SectionHead>Jiggle settings</SectionHead>
          <SliderRow label="Outer duration" value={jiggleDuration} min={5} max={60} unit="s" onChange={onJiggleDurationChange} />
          <SliderRow label="Jiggle angle" value={jiggleAngle} min={1} max={35} unit="°" onChange={onJiggleAngleChange} />
        </>
      )}

      {animMode === "rotate" && (
        <>
          <SectionHead>Rotation settings</SectionHead>
          <SliderRow label="Spin duration" value={rotateDuration} min={5} max={240} unit="s" onChange={onRotateDurationChange} />
          <div className="mt-1 flex gap-2">
            <ToggleButton active={!invertRotation} onClick={() => onInvertRotationChange(false)}>→ Prograde</ToggleButton>
            <ToggleButton active={invertRotation} onClick={() => onInvertRotationChange(true)}>← Retrograde</ToggleButton>
          </div>
        </>
      )}
    </div>
  );
}
