import PlanetBuilder from "../components/builder/PlanetBuilder.tsx";

export default function CreatePage() {
  return (
    <div className="flex flex-col items-center justify-center mx-auto text-white">
      <div className="pt-6 pb-4 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-2">Planet Forge</h1>
        <p className="text-[11px] tracking-[0.25em] uppercase text-blue-100/50 font-mono">
          – Shape your world –
        </p>
      </div>
      <PlanetBuilder/>
    </div>
  );
}