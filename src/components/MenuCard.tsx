import { Link } from "react-router-dom";
import { type LucideIcon } from "lucide-react";

interface MenuCardProps {
  label: string;
  link: string;
  icon: LucideIcon;
}

export default function MenuCard({ label, link, icon: Icon }: MenuCardProps) {
  return (
    <Link
      to={link}
      className="
        w-40 h-44
        bg-dark-yellow
        rounded-xl
        p-3
        flex flex-col gap-3
        shadow-sm
        border border-black/10
        transition
        hover:shadow-md hover:scale-[1.02]
        active:scale-[0.98]
      "
    >
      <div className="flex-1 bg-yellow rounded-lg flex items-center justify-center">
        <Icon className="w-12 h-12 text" fill={"white"} strokeWidth={1.5}/>
      </div>

      <div className="text-center">
        <div className="font-semibold text-base">
          {label}
        </div>
      </div>
    </Link>
  );
}
