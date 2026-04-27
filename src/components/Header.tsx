import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-[1000] h-fit bg-bg-darker text-[var(--color-bg)] px-[10%] py-[0.6em] text-[22px] font-bold">
      <Link className="text-surface px-5 py-6 rounded" to={"/"}>Domů</Link>
      <Link className="text-surface px-5 py-6 rounded" to={"/lessons"}>Lekce</Link>
      <Link className="text-surface px-5 py-6 rounded" to={"/cards"}>Opakování</Link>
    </header>
  )
}
