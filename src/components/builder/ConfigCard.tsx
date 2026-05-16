import { type ReactNode } from "react";
import { X } from "lucide-react";

interface ConfigCardProps {
  title: string;
  onRemove: () => void;
  children: ReactNode;
}

function TrashButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={() => onClick()} className="cursor-pointer text-white transition-colors bg-red-500 hover:bg-red-600 p-1 rounded-2xl">
      <X size={13}/>
    </button>
  );
}

export function ConfigCard({ title, onRemove, children }: ConfigCardProps) {
  return (
    <div className="relative w-[13em] rounded-xl border border-white/8 bg-white/3 pt-1 p-3">
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