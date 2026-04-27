import { Link } from "react-router-dom";
import { type LucideIcon } from "lucide-react";
import clsx from "clsx";

type Variant = "lesson" | "exercise" | "review";

interface MenuCardProps {
  label: string;
  link: string;
  icon: LucideIcon;
  variant: Variant;
}

const variants = {
  lesson: {
    bg: "bg-[image:var(--grad-primary)]",
  },
  exercise: {
    bg: "bg-[image:var(--grad-secondary)]",
  },
  review: {
    bg: "bg-[image:var(--grad-tertiary)]",
  },
};

export default function MenuCard({ label, link, icon: Icon, variant }: MenuCardProps) {
  const v = variants[variant];

  return (
    <Link
      to={link}
      className={clsx(
        "relative w-44 h-48 rounded-3xl p-4 flex flex-col items-center justify-between",
        "text-white font-bold",
        "transition-all duration-300",
        "hover:scale-105 hover:-rotate-1",
        "shadow-lg",
        v.bg,
      )}
    >

      <div className="w-20 h-20 rounded-full flex items-center justify-center mt-2 bg-white/30">
        <Icon className="w-10 h-10 text-white drop-shadow" strokeWidth={2.2}/>
      </div>

      <div className="text-lg tracking-wide drop-shadow-sm">
        {label}
      </div>
    </Link>
  );
}