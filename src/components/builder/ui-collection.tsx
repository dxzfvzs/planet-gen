import type { ReactNode } from "react";
import { type LucideIcon, Shuffle, StepBackIcon } from "lucide-react";
import { randHex } from "./lib.ts";

export function Label({ children }: { children: ReactNode }) {
  return (
    <span className="text-[11px] tracking-[0.18em] uppercase text-blue-100/80">
      {children}
    </span>
  );
}

export function SectionHead({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-[12px] uppercase tracking-[0.2em] text-violet-200/80">
        {children}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent"/>
    </div>
  );
}

export function SliderRow({ label, value, min, max, step = 1, unit = "", onChange }: {
  label: string; value: number; min: number; max: number;
  step?: number; unit?: string; onChange: (v: number) => void;
}) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between mb-1">
        <Label>{label}</Label>
        <span className="text-[11px] font-mono text-violet-200/70">
          {value}{unit}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="
          w-full h-[4px] rounded-full appearance-none cursor-pointer
          bg-white/10
          accent-violet-400
        "
      />
    </div>
  );
}

export function ToggleButton({ active, onClick, children }: {
  active?: boolean;
  onClick: () => void;
  children: ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1 rounded-lg text-[10px] font-mono tracking-widest uppercase
        transition-all border backdrop-blur-md cursor-pointer
        ${
        active
          ? "bg-violet-500/25 border-violet-300/40 text-violet-100"
          : "bg-white/5 border-white/10 text-violet-200/60 hover:bg-white/10 hover:text-violet-100"
      }
      `}
    >
      {children}
    </button>
  );
}

export function TextInput({ value, onChange, placeholder }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text" value={value} placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`
        w-full bg-white/5 border border-white/10
        rounded-lg px-3 py-1.5 text-[12px] font-mono
        text-violet-100 placeholder:text-violet-300/30
        focus:outline-none focus:border-violet-300/40
        backdrop-blur-md transition-colors
      `}
    />
  );
}

export function TextInputWithShuffle({ value, onChange, placeholder, onShuffleClick }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  onShuffleClick: () => void;
}) {
  return (
    <div className="my-1 flex gap-1 w-full flex-row justify-center">
      <TextInput value={value} onChange={onChange} placeholder={placeholder}/>
      <ClickableButton onClick={() => onShuffleClick()} label={""} icon={Shuffle}/>
    </div>
  );
}

export function ColorInput({ value, onChange, label }: {
  value: string;
  onChange: (v: string) => void;
  label?: string
}) {
  return (
    <div className="flex items-center gap-2">
      {label && <Label>{label}</Label>}
      <div className="flex-1 flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            size-7 shrink-0 cursor-pointer overflow-hidden rounded-2xl
            border border-white/50 bg-transparent
            [&::-webkit-color-swatch]:border-0
            [&::-webkit-color-swatch]:rounded-2xl
            [&::-webkit-color-swatch-wrapper]:p-0
          "
        />
        <TextInputWithShuffle value={value} onChange={onChange} onShuffleClick={() => onChange(randHex())}/>
      </div>
    </div>
  );
}

export function ClickableButton({ onClick, label, icon: Icon, disabled }: {
  onClick: () => void;
  label: string;
  icon: LucideIcon;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        p-2 flex items-center gap-2 transition
        text-[10px] font-mono uppercase tracking-widest
        rounded-xl border border-white/10 bg-white/5 hover:bg-white/10
        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/5
      `}
    >
      <Icon size={12}/>
      {label}
    </button>
  );
}

export function RandomiseButton({ onClick, disabled }: { onClick: () => void, disabled?: boolean }) {
  return <ClickableButton onClick={onClick} icon={Shuffle} label={"Randomise colors"} disabled={disabled}/>
}

export function StepBack({ onClick, disabled }: { onClick: () => void, disabled?: boolean }) {
  return <ClickableButton onClick={onClick} icon={StepBackIcon} label={"Undo"} disabled={disabled}/>
}
