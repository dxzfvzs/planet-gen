import clsx from "clsx";
import { type CategoryKey, categoryMap } from "../../structure/types/categories.ts";
import { YellowPlanet } from "./YellowPlanet.tsx";
import { GreenPlanet } from "./GreenPlanet.tsx";
import { PurplePlanet } from "./PurplePlanet.tsx";
import { BluePlanet } from "./BluePlanet.tsx";
import { PinkPlanet } from "./PinkPlanet.tsx";
import { DashedLineConnector } from "./DashedLineConnector.tsx";

const keys = Object.keys(categoryMap) as CategoryKey[];

const planetComponents: Record<CategoryKey, React.FC> = {
  vyjmenovana_slova: YellowPlanet,
  pady: GreenPlanet,
  shoda: PurplePlanet,
  i_y: BluePlanet,
  mne_me: PinkPlanet,
};

export function SpaceCategorySelector({ value, onChange }: {
  value: CategoryKey | null;
  onChange: (c: CategoryKey) => void;
}) {
  return (
    <div className="relative w-full">
      <div
        className="w-auto inset-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 items-center justify-items-center px-3">
        <DashedLineConnector/>

        {keys.map((key) => {
          const Planet = planetComponents[key];
          const isActive = value === key;

          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className="flex flex-col items-center gap-3 bg-transparent border-0 p-0 cursor-pointer"
            >
              {/* CARD FIELD (transparent space bubble) */}
              <div
                className={clsx(
                  "flex flex-col items-center gap-3 px-4 py-6 rounded-2xl",
                  "transition-all duration-300",

                  // NO background at all
                  "bg-transparent",

                  // hover = slight presence

                  isActive &&
                  "border-white/[0.08] shadow-[0_0_70px_rgba(120,180,255,0.25)] backdrop-blur-[2px]"
                )}
              >

                <div
                  className={clsx(
                    "transition-transform duration-300",
                    isActive ? "scale-[1.3] -translate-y-[7px]" : "-translate-y-[5px]",
                    !isActive && "hover:scale-[1.15]"
                  )}
                >
                  <Planet/>
                </div>

                {/* Label */}
                <div
                  className={clsx(
                    "text-[15px] text-center max-w-[180px] leading-tight transition-colors",
                    isActive ? "text-white" : "text-white/40"
                  )}
                >
                  {categoryMap[key]}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}