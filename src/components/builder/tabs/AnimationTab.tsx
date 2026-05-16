import { Chip, SectionHead, SliderRow } from "../ui-collection.tsx";

interface AnimationTabProps {
  animMode: "jiggle" | "rotate";
  jiggleOuter: number;
  jiggleAngle: number;
  rotateDuration: number;
  invertRotation: boolean;
  onAnimModeChange: (mode: "jiggle" | "rotate") => void;
  onJiggleOuterChange: (v: number) => void;
  onJiggleAngleChange: (v: number) => void;
  onRotateDurationChange: (v: number) => void;
  onInvertRotationChange: (v: boolean) => void;
}

export function AnimationTab({
  animMode,
  jiggleOuter, jiggleAngle,
  rotateDuration, invertRotation,
  onAnimModeChange,
  onJiggleOuterChange, onJiggleAngleChange,
  onRotateDurationChange, onInvertRotationChange,
}: AnimationTabProps) {
  return (
    <div className="space-y-4">
      <SectionHead>Mode</SectionHead>

      <div className="flex gap-2">
        <Chip active={animMode === "jiggle"} onClick={() => onAnimModeChange("jiggle")}>Jiggle</Chip>
        <Chip active={animMode === "rotate"} onClick={() => onAnimModeChange("rotate")}>Rotate</Chip>
      </div>

      {animMode === "jiggle" && (
        <>
          <SectionHead>Jiggle settings</SectionHead>
          <SliderRow label="Outer duration" value={jiggleOuter} min={5} max={60} unit="s" onChange={onJiggleOuterChange} />
          <SliderRow label="Jiggle angle" value={jiggleAngle} min={1} max={35} unit="°" onChange={onJiggleAngleChange} />
        </>
      )}

      {animMode === "rotate" && (
        <>
          <SectionHead>Rotation settings</SectionHead>
          <SliderRow label="Spin duration" value={rotateDuration} min={5} max={240} unit="s" onChange={onRotateDurationChange} />
          <div className="mt-1 flex gap-2">
            <Chip active={!invertRotation} onClick={() => onInvertRotationChange(false)}>→ Prograde</Chip>
            <Chip active={invertRotation} onClick={() => onInvertRotationChange(true)}>← Retrograde</Chip>
          </div>
        </>
      )}
    </div>
  );
}
