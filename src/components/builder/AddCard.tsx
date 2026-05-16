import { Plus } from "lucide-react";

interface AddCardProps {
  label: string;
  onClick: () => void;
}

export function AddCard({ label, onClick }: AddCardProps) {
  return (
    <button
      onClick={onClick}
      className="
        w-[13em] rounded-xl border border-dashed border-white/30
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
        <Plus size={14} />
      </div>
      <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
        {label}
      </span>
    </button>
  );
}
