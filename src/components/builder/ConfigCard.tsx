import { type ReactNode } from "react";
import { Locate, LocateFixed, Plus, X } from "lucide-react";

interface AddCardProps {
  label: string;
  onClick: () => void;
}

interface ConfigCardProps {
  title: string;
  onRemove: () => void;
  children: ReactNode;
  onHighlight?: () => void;
  onHighlightEnd?: () => void;
  highlighted?: boolean;
}

export function AddCard({ label, onClick }: AddCardProps) {
  return (
    <button
      onClick={onClick}
      className="
        relative w-full rounded-xl border border-dashed border-white/30
        p-3 cursor-pointer
        flex flex-col items-center justify-center gap-2
        min-h-[6em]
        transition-all
        hover:bg-bg hover:opacity-60
        group
      "
    >
      <div
        className="
        flex h-7 w-7 items-center justify-center rounded-full
        border border-dashed border-white
        text-white/60 transition-colors
        group-hover:border-white   group-hover:text-white
      "
      >
        <Plus size={14} />
      </div>
      <span className="text-[10px] font-mono uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
        {label}
      </span>
    </button>
  );
}

function TrashButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={() => onClick()}
      className="cursor-pointer text-white transition-colors bg-red-500 hover:bg-red-600 p-1 rounded-2xl"
    >
      <X size={15} strokeWidth={3} />
    </button>
  );
}

export function ConfigCard({
  title,
  onRemove,
  children,
  onHighlight,
  onHighlightEnd,
  highlighted = false,
}: ConfigCardProps) {
  const handleLocateClick = () => {
    if (!highlighted) {
      onHighlight?.();
    } else {
      onHighlightEnd?.();
    }
  };

  return (
    <div
      className={`relative w-full rounded-xl border border-white/0
    ${highlighted ? "bg-bg border-white/80" : "bg-bg"}`}
    >
      <div className="absolute -right-2 -top-2 flex gap-1">
        <TrashButton onClick={onRemove} />
      </div>

      <button
        type="button"
        onClick={handleLocateClick}
        aria-pressed={highlighted}
        className={`
          mb-2 w-full cursor-pointer px-3 py-2 rounded-t-xl text-left
          font-mono uppercase tracking-widest text-[11px] flex gap-2
          transition-colors duration-150 select-none bg-bg-darker
          ${highlighted ? "text-white " : "text-white/85 hover:text-white/90"}
        `}
      >
        {highlighted ? (
          <LocateFixed size={15} className="my-auto shrink-0" />
        ) : (
          <Locate size={15} className="my-auto shrink-0" />
        )}
        <span className={highlighted ? "opacity-100" : "opacity-70"}>{title}</span>
      </button>

      <div className="space-y-2.5 pt-1 p-3">{children}</div>
    </div>
  );
}
