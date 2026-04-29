// SpaceCategorySelector.tsx
import { useState } from "react";
import clsx from "clsx";
import { type CategoryKey, categoryMap } from "../structure/types/categories.ts";

const keys = Object.keys(categoryMap) as CategoryKey[];

function YellowPlanet() {
  return (
    <svg width="72" height="52" viewBox="0 0 72 52" overflow="visible">
      <defs>
        <radialGradient id="yg" cx="38%" cy="32%" r="60%">
          <stop offset="0%" stopColor="#ffe87a"/>
          <stop offset="55%" stopColor="#e0a000"/>
          <stop offset="100%" stopColor="#8a5c00"/>
        </radialGradient>
        <clipPath id="yc">
          <circle cx="36" cy="24" r="22"/>
        </clipPath>
      </defs>
      {/* ring back */}
      <ellipse cx="36" cy="34" rx="34" ry="8" stroke="#f0c030" strokeWidth="3" fill="none" strokeOpacity="0.55"
               strokeDasharray="107 107" strokeDashoffset="-107"/>
      <circle cx="36" cy="24" r="22" fill="url(#yg)"/>
      <rect x="14" y="30" width="44" height="5" fill="rgba(140,80,0,0.28)" clipPath="url(#yc)" rx="2"/>
      <rect x="14" y="37" width="44" height="3" fill="rgba(140,80,0,0.2)" clipPath="url(#yc)" rx="2"/>
      <ellipse cx="28" cy="17" rx="8" ry="5" fill="rgba(255,255,220,0.22)"/>
      {/* ring front */}
      <ellipse cx="36" cy="34" rx="34" ry="8" stroke="#f0c030" strokeWidth="3" fill="none" strokeOpacity="0.7"
               strokeDasharray="107 107" strokeDashoffset="0"/>
    </svg>
  );
}

function GreenPlanet() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" overflow="visible">
      <defs>
        <radialGradient id="gg" cx="36%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#b0f070"/>
          <stop offset="55%" stopColor="#2a9e35"/>
          <stop offset="100%" stopColor="#155020"/>
        </radialGradient>
        <clipPath id="gc">
          <circle cx="26" cy="26" r="20"/>
        </clipPath>
      </defs>
      <circle cx="26" cy="26" r="20" fill="url(#gg)"/>
      <ellipse cx="20" cy="22" rx="6" ry="8" fill="rgba(0,60,10,0.35)" clipPath="url(#gc)"
               transform="rotate(-20,20,22)"/>
      <ellipse cx="34" cy="30" rx="8" ry="5" fill="rgba(10,80,20,0.3)" clipPath="url(#gc)"/>
      <ellipse cx="19" cy="19" rx="5" ry="4" fill="rgba(255,255,255,0.18)"/>
    </svg>
  );
}

function PurplePlanet() {
  return (
    <svg width="200" height="200" viewBox="0 0 70 70" overflow="visible">
      <defs>
        <radialGradient id="pg" cx="36%" cy="30%" r="62%">
          <stop offset="0%" stopColor="#d0a8ff" />
          <stop offset="50%" stopColor="#7238cc" />
          <stop offset="100%" stopColor="#280c5c" />
        </radialGradient>

        {/* moon shading */}
        <radialGradient id="moonGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#d9d9ff" />
          <stop offset="100%" stopColor="#8c8cff" />
        </radialGradient>

        {/* tiny moon shading */}
        <radialGradient id="tinyMoonGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#c8c8e8" />   {/* dimmer highlight, no pure white */}
          <stop offset="60%" stopColor="#ca7aaa" />   {/* muted mid */}
          <stop offset="100%" stopColor="#3a3060" />  {/* dark, purple-tinted shadow */}
        </radialGradient>

        <filter id="softGlow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <clipPath id="pc">
          <circle cx="35" cy="35" r="26" />
        </clipPath>
      </defs>

      {/* subtle orbital rings */}
      <circle
        cx="35"
        cy="35"
        r="30"
        fill="none"
        stroke="rgba(200,160,255,0.2)"
        strokeWidth="2"
      />
      <circle
        cx="35"
        cy="35"
        r="34"
        fill="none"
        stroke="rgba(150,100,255,0.12)"
        strokeWidth="2"
      />

      {/* whole planet slowly rotates */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 35 35"
          to="360 35 35"
          dur="180s"
          repeatCount="indefinite"
        />

        <circle cx="35" cy="35" r="26" fill="url(#pg)" />

        <rect x="9" y="40" width="52" height="7" fill="rgba(60,0,120,0.38)" clipPath="url(#pc)" rx="3" />
        <rect x="9" y="50" width="52" height="10" fill="rgba(40,0,100,0.3)" clipPath="url(#pc)" rx="3" />
        <rect x="9" y="30" width="52" height="5" fill="rgba(80,20,160,0.25)" clipPath="url(#pc)" rx="3" />

        <ellipse cx="26" cy="27" rx="8" ry="5" fill="rgba(255,255,255,0.15)" />
      </g>

      {/* tiny trailing moon - different speed, offset start, complete path */}
      <circle r="2.2" fill="url(#tinyMoonGrad)">
        <animateMotion
          dur="21s"
          repeatCount="indefinite"
          begin="-7s"
          path="M 35 35 m -42 0 a 42 42 0 1 1 84 0 a 42 42 0 1 1 -84 0"
        />
      </circle>

      {/* main moon - 14s orbit */}
      <circle r="3.8" fill="url(#moonGrad)">
        <animateMotion
          dur="14s"
          repeatCount="indefinite"
          path="M 35 35 m -42 0 a 42 42 0 1 1 84 0 a 42 42 0 1 1 -84 0"
        />
      </circle>


    </svg>
  );
}

function BluePlanet() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" overflow="visible">
      <defs>
        <radialGradient id="bg" cx="35%" cy="28%" r="62%">
          <stop offset="0%" stopColor="#a0e4ff"/>
          <stop offset="52%" stopColor="#1868d8"/>
          <stop offset="100%" stopColor="#061e60"/>
        </radialGradient>
        <clipPath id="bc">
          <circle cx="30" cy="30" r="19"/>
        </clipPath>
      </defs>
      {/* ring back, tilted */}
      <ellipse cx="30" cy="38" rx="30" ry="7" stroke="#60c0ff" strokeWidth="2.5" fill="none"
               strokeOpacity="0.45" transform="rotate(-30,30,38)"
               strokeDasharray="94 94" strokeDashoffset="-94"/>
      <circle cx="30" cy="30" r="19" fill="url(#bg)"/>
      <rect x="11" y="35" width="38" height="5" fill="rgba(0,20,90,0.3)" clipPath="url(#bc)" rx="2"/>
      <ellipse cx="22" cy="23" rx="6" ry="4" fill="rgba(255,255,255,0.2)"/>
      {/* ring front */}
      <ellipse cx="30" cy="38" rx="30" ry="7" stroke="#60c0ff" strokeWidth="2.5" fill="none"
               strokeOpacity="0.65" transform="rotate(-30,30,38)"
               strokeDasharray="94 94" strokeDashoffset="0"/>
    </svg>
  );
}

function PinkPlanet() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" overflow="visible">
      <defs>
        <radialGradient id="mng" cx="37%" cy="30%" r="62%">
          <stop offset="0%" stopColor="#ffb8e8"/>
          <stop offset="50%" stopColor="#d83888"/>
          <stop offset="100%" stopColor="#6a003a"/>
        </radialGradient>
        <clipPath id="mnc">
          <circle cx="23" cy="23" r="17"/>
        </clipPath>
      </defs>
      <circle cx="23" cy="23" r="17" fill="url(#mng)"/>
      <circle cx="18" cy="27" r="4" fill="rgba(255,80,40,0.45)" clipPath="url(#mnc)"/>
      <circle cx="28" cy="31" r="3" fill="rgba(255,100,60,0.38)" clipPath="url(#mnc)"/>
      <ellipse cx="17" cy="16" rx="5" ry="3.5" fill="rgba(255,255,255,0.2)"/>
    </svg>
  );
}

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
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 160" preserveAspectRatio="none">
        <ellipse cx="500" cy="130" rx="460" ry="55"
                 stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"
                 strokeDasharray="5 9" fill="none"/>
      </svg>

      <div className="absolute inset-0 flex items-center justify-around px-3">
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
              <div
                className="transition-transform duration-300"
                style={{
                  transform: isActive
                    ? "scale(1.3) translateY(-7px)"
                    : isHovered
                      ? "scale(1.15) translateY(-5px)"
                      : "scale(1)",
                }}
              >
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