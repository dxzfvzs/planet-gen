import { useMemo } from "react";
import { type AnimationMode, Planet } from "../planet/Planet.tsx";
import { TABS } from "./types.ts";
import { PlanetProvider } from "./PlanetContext.tsx";
import { usePlanet } from "./usePlanet.ts";
import { ClickableButton, DownloadButton, SliderRow } from "./ui-collection.tsx";
import { PaletteTab } from "./tabs/PaletteTab.tsx";
import { SurfaceTab } from "./tabs/SurfaceTab.tsx";
import { RingsTab } from "./tabs/RingsTab.tsx";
import { MoonsTab } from "./tabs/MoonsTab.tsx";
import { AnimationTab } from "./tabs/AnimationTab.tsx";
import { PresetTab } from "./tabs/PresetTab.tsx";
import { Redo, SaveIcon, Undo } from "lucide-react";

function PlanetBuilderInner() {
  const {
    tab,
    setTab,
    planetSize,
    setPlanetSize,
    backlightGlow,
    setBacklightGlow,
    colors,
    band,
    soft,
    rings,
    moons,
    animMode,
    setAnimMode,
    jiggleDuration,
    setJiggleDuration,
    jiggleAngle,
    setJiggleAngle,
    rotateDuration,
    setRotateDuration,
    invertRotation,
    setInvertRotation,
    canUndo,
    canRedo,
    canSave,
    undoLabel,
    redoLabel,
    saveSnapshot,
    undo,
    redo,
    highlightedId,
    setHighlightedId,
  } = usePlanet();

  function handleSelectId(id: string | null) {
    setHighlightedId(id);
    if (id) {
      if (moons.some((m) => m.id === id)) setTab("moons");
      else if (rings.some((r) => r.uid === id)) setTab("rings");
    }
  }

  const gradient = useMemo(
    () => [
      { offset: "0%", stopColor: colors[0] },
      { offset: "52%", stopColor: colors[1] },
      { offset: "100%", stopColor: colors[2] },
    ],
    [colors]
  );

  const planetMoons = useMemo(
    () => moons.map((m) => ({ ...m, duration: `${m.durationS}s` })),
    [moons]
  );

  const animation: AnimationMode = useMemo(() => {
    if (animMode === "rotate") return { type: "rotate", duration: rotateDuration, invertRotation };
    if (animMode === "jiggle")
      return { type: "jiggle", duration: jiggleDuration, angle: jiggleAngle };
    return { type: "static", duration: 0, angle: jiggleAngle };
  }, [animMode, rotateDuration, invertRotation, jiggleDuration, jiggleAngle]);

  function downloadPlanetSVG() {
    const svgEl = document.querySelector<SVGSVGElement>("#forge-planet-svg");
    if (!svgEl) return;
    const clone = svgEl.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const maxRingRx = rings.length ? Math.max(...rings.map((r) => r.rx + r.strokeWidth)) : 0;
    const maxMoonRx = moons.length ? Math.max(...moons.map((m) => m.orbitRx + m.radius)) : 0;
    const extent = Math.max(planetSize, maxRingRx, maxMoonRx) + backlightGlow + 8;
    clone.setAttribute("viewBox", `${-extent} ${-extent} ${extent * 2} ${extent * 2}`);
    clone.removeAttribute("overflow");
    const blob = new Blob([new XMLSerializer().serializeToString(clone)], {
      type: "image/svg+xml",
    });
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(blob),
      download: "planet.svg",
    });
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div className="flex flex-col lg:flex-row w-full gap-4 px-2 sm:px-4 pb-6">
      {/* left: planet preview */}
      <div className="flex flex-col gap-4">
        <div className="flex aspect-square items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
          <Planet
            id="forge-planet"
            planetSize={planetSize}
            canvasSize={200}
            gradient={gradient}
            band={{
              seedStr: band.seed,
              baseColor: colors[2],
              count: band.count,
              opacity: band.opacity / 100,
              angle: band.angle,
            }}
            soft={{
              seedStr: soft.seed,
              baseColor: colors[0],
              count: soft.count,
              opacity: soft.opacity / 100,
              angle: soft.angle,
            }}
            rings={rings}
            moons={planetMoons}
            animation={animation}
            backlightGlow={backlightGlow}
            highlightedId={highlightedId}
            onSelectId={handleSelectId}
          />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <SliderRow
            label="Planet size"
            value={planetSize}
            min={10}
            max={42}
            onChange={setPlanetSize}
          />
          <SliderRow
            label="Backlight Glow"
            value={backlightGlow}
            unit="%"
            min={0}
            max={25}
            onChange={setBacklightGlow}
          />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4  flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <ClickableButton
              onClick={saveSnapshot}
              label={"Checkpoint"}
              icon={SaveIcon}
              disabled={!canSave}
              className={"flex-1"}
              tooltip={"Save current state to history"}
            />
            <ClickableButton
              onClick={undo}
              label={"Undo"}
              icon={Undo}
              disabled={!canUndo}
              className={"flex-1"}
              tooltip={undoLabel ? `Undo → ${undoLabel}` : "Nothing to undo"}
            />
            <ClickableButton
              onClick={redo}
              label={"Redo"}
              icon={Redo}
              disabled={!canRedo}
              className={"flex-1"}
              tooltip={redoLabel ? `Redo → ${redoLabel}` : "Nothing to redo"}
            />
          </div>
          <DownloadButton onClick={downloadPlanetSVG} />
        </div>
      </div>

      {/* right: tab panel */}
      <div className="flex-1 min-w-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl max-h-[40em] min-h-[30em] overflow-hidden flex flex-col">
        <div className="flex shrink-0 flex-wrap bg-bg">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={[
                "flex-1 py-2 px-4 text-[12px] font-mono uppercase tracking-widest transition rounded-t-xl",
                tab === t.id
                  ? "bg-white/5 text-white"
                  : "text-white/50 hover:bg-white/[3%] hover:text-white",
              ].join(" ")}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          className="tab-content overflow-y-auto flex-1 p-4
          [--fade:12px]
          [-webkit-mask-image:linear-gradient(to_bottom,transparent_0,black_var(--fade),black_calc(100%-var(--fade)),transparent_100%)]
          [mask-image:linear-gradient(to_bottom,transparent_0,black_var(--fade),black_calc(100%-var(--fade)),transparent_100%)]
        "
        >
          <div className={tab !== "preset" ? "hidden" : ""}>
            <PresetTab />
          </div>
          <div className={tab !== "palette" ? "hidden" : ""}>
            <PaletteTab />
          </div>
          <div className={tab !== "surface" ? "hidden" : ""}>
            <SurfaceTab />
          </div>
          <div className={tab !== "rings" ? "hidden" : ""}>
            <RingsTab />
          </div>
          <div className={tab !== "moons" ? "hidden" : ""}>
            <MoonsTab />
          </div>
          <div className={tab !== "animation" ? "hidden" : ""}>
            <AnimationTab
              animMode={animMode}
              onAnimModeChange={setAnimMode}
              jiggleDuration={jiggleDuration}
              onJiggleDurationChange={setJiggleDuration}
              jiggleAngle={jiggleAngle}
              onJiggleAngleChange={setJiggleAngle}
              rotateDuration={rotateDuration}
              onRotateDurationChange={setRotateDuration}
              invertRotation={invertRotation}
              onInvertRotationChange={setInvertRotation}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlanetBuilder() {
  return (
    <PlanetProvider>
      <PlanetBuilderInner />
    </PlanetProvider>
  );
}
