import MenuCard from "../components/MenuCard.tsx";
import { Book, Pen } from "lucide-react";

export default function Home() {
  return (
    <div className="rounded justify-items-center">
      <h1 className="text-4xl font-black text-white py-2 px-5 rounded mb-10">Co to dneska bude?</h1>
      <div className="flex gap-5 ">
        <MenuCard icon={Pen} label={"Lekce"} link={"/lessons"}/>
        <MenuCard icon={Book} label={"Opakování"} link={"/cards"}/>
      </div>
    </div>
  );
}
