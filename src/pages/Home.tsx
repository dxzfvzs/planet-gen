import MenuCard from "../components/MenuCard";
import { Book, Notebook, PenTool } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center m-auto">
      <h1 className="text-4xl font-extrabold text-white mb-10 text-center mt-[5%]">
        What do you want to do?
      </h1>

      <div className="flex gap-6 flex-wrap justify-center">
        <MenuCard icon={Book} label="Random" link="/random" variant="primary"/>
        <MenuCard icon={PenTool} label="Create" link="/create" variant="secondary"/>
        <MenuCard icon={Notebook} label="Browse" link="/browse" variant="tertiary"/>
      </div>
    </div>
  );
}