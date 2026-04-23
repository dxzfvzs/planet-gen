import { Link } from "react-router-dom";

export default function Lessons() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">České pády trainer</h1>

      <Link className="block p-4 bg-blue-500 text-white rounded" to="/lessons">
        🎮 Lessons
      </Link>

      <Link className="block p-4 bg-green-500 text-white rounded" to="/cards">
        📚 Study Cards
      </Link>
    </div>
  );
}
