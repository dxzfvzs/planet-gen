import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";

function NavItem({ to, children }: { to: string; children: ReactNode }) {
  const baseLink =
    "relative px-4 py-2 text-surface transition-colors duration-200 text-[18px]";

  const underlineBase =
    "after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:h-[4px] after:w-0 after:transition-all after:duration-300";

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${baseLink} ${underlineBase}
        hover:after:w-full hover:after:bg-mid
        ${isActive ? "after:w-full after:bg-success" : ""}`
      }
    >
      {children}
    </NavLink>
  );
}

export default function Header() {
  return (
    <header
      className="w-full sticky top-0 z-[1000] bg-bg-darker px-[10%] py-1.5 text-[18px] font-bold flex gap-5 items-center bg-[image:var(--grad-header)]">
      <NavItem to="/">Domů</NavItem>
      <NavItem to="/test">Cvičení</NavItem>
      <NavItem to="/lessons">Lekce</NavItem>
      <NavItem to="/cards">Opakování</NavItem>
    </header>
  );
}