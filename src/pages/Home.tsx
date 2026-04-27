import MenuCard from "../components/MenuCard";
import { Book, Notebook, PenTool } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center m-auto">
      <h1 className="text-4xl font-extrabold text-white mb-10">
        Co to dneska bude?
      </h1>

      <div className="flex gap-6 flex-wrap">
        <MenuCard icon={Book} label="Lekce" link="/lessons" variant="lesson" />
        <MenuCard icon={PenTool} label="Cvičení" link="/test" variant="exercise" />
        <MenuCard icon={Notebook} label="Opakování" link="/cards" variant="review" />
      </div>
    </div>
  );
}