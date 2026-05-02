import { useState } from "react";
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
  const [hovered, setHovered] = useState<CategoryKey | null>(null);

  return (
    <div className="relative w-full h-40">

      <div className="absolute inset-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 items-center justify-items-center px-3">
        <DashedLineConnector/>
        {keys.map((key) => {
          const Planet = planetComponents[key];
          const isActive = value === key;
          const isHovered = hovered === key;

          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
              className="flex flex-col items-center gap-2.5 bg-transparent border-0 cursor-pointer p-0"
            >
              <div className={clsx(
                "transition-transform duration-300",
                isActive && "scale-[1.3] -translate-y-[7px]",
                !isActive && isHovered && "scale-[1.15] -translate-y-[5px]",
                !isActive && !isHovered && "scale-100"
              )}>
                <Planet/>
              </div>

              <div className={clsx(
                "text-[11px] text-center max-w-[80px] leading-tight transition-colors duration-200",
                isActive || isHovered ? "text-white" : "text-white/55"
              )}>
                {categoryMap[key]}
              </div>

            </button>
          );
        })}
      </div>
    </div>
  );
}