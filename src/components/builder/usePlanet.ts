import { createContext, useContext } from "react";
import type { PlanetState } from "./PlanetContext.tsx";

export const PlanetContext = createContext<PlanetState | null>(null);

export function usePlanet(): PlanetState {
  const ctx = useContext(PlanetContext);
  if (!ctx) throw new Error("usePlanet must be used inside <PlanetProvider>");
  return ctx;
}
