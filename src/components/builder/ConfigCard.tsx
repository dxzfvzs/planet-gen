import { type ReactNode } from "react";
import { Plus, X } from "lucide-react";

interface AddCardProps {
  label: string;
  onClick: () => void;
}

interface ConfigCardProps {
  title: string;
  onRemove: () => void;
  children: ReactNode;
}

export function AddCard({ label, onClick }: AddCardProps) {
  return (
    <button
      onClick={onClick}
      className="
        relative w-full rounded-xl border border-dashed border-white/30
        bg-white/3 p-3 cursor-pointer
        flex flex-col items-center justify-center gap-2
        min-h-[6em]
        transition-all hover:border-white/60 hover:bg-white/5
        group
      "
    >
      <div className="
        flex h-7 w-7 items-center justify-center rounded-full
        border border-dashed border-white/40
        text-white/50 transition-colors
        group-hover:border-white/70 group-hover:text-white
      ">
        <Plus size={14}/>
      </div>
      <span
        className="text-[10px] font-mono uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
        {label}
      </span>
    </button>
  );
}

function TrashButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={() => onClick()}
            className="cursor-pointer text-white transition-colors bg-red-500 hover:bg-red-600 p-1 rounded-2xl">
      <X size={15} strokeWidth={3}/>
    </button>
  );
}

export function ConfigCard({ title, onRemove, children }: ConfigCardProps) {
  return (
    <div className="relative w-full rounded-xl border border-white/8 bg-white/3 pt-1 p-3">
      <div className="absolute -right-2 -top-2">
        <TrashButton onClick={onRemove}/>
      </div>

      <div className="mb-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
          {title}
        </span>
      </div>

      <div className="space-y-2.5">
        {children}
      </div>
    </div>
  );
}