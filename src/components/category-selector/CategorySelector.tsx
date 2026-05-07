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
              <div
                className={clsx(
                  "group flex flex-col items-center gap-3 px-4 py-8 rounded-2xl",
                  "text-white font-bold",
                  "transition-all duration-300",
                  "shadow-lg",
                  "w-[16em] h-[21.5em] box-border",
                  "bg-[image:var(--grad-tertiary)]",
                  "z-10",
                  isActive && "scale-110",
                  !isActive && "hover:scale-105 hover:-rotate-1",
                  )}
              >
                <div
                  className={clsx(
                    "transition-transform duration-300",
                    isActive && "scale-[1.15]",
                    !isActive && "group-hover:scale-110 group-hover:-rotate-1",
                  )}
                >
                  <Planet/>
                </div>

                <div
                  className={clsx(
                    "text-[16px] text-center max-w-[180px] leading-tight transition-colors",
                    isActive
                      ? "text-lg tracking-wide drop-shadow-sm"
                      : "text-white/75"
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