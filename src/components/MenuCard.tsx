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
        bg-success
        rounded-xl
        p-3
        flex flex-col gap-3
      "
    >
      <div className="flex-1 bg-success rounded-lg flex items-center justify-center">
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
