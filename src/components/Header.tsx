import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <Link className="bg-yellow px-5 py-6 rounded" to={"/"}>
        CzechIt
      </Link>
    </header>
  )
}
