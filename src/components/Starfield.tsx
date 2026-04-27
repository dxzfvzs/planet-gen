import { useEffect, useMemo, useRef } from "react";

function createRNG(seed: number) {
  return function () {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

type Star = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
};

function generateStars(count: number, seed: number): Star[] {
  const rand = createRNG(seed);
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    size: rand() * 2.5 + 0.5,
    opacity: rand() * 0.3 + 0.55,
    duration: (rand() * 3 + 2) * 1000,
    delay: rand() * 5 * 1000,
  }));
}

export default function Starfield({ count = 120, seed = 2502 }: {
  count?: number;
  seed?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useMemo(() => generateStars(count, seed), [count, seed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (time: number) => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        const t = (time - s.delay) / s.duration;
        const twinkle = 0.5 + 0.5 * Math.sin(t * Math.PI * 2);
        const alpha = s.opacity * (0.2 + 0.8 * twinkle);

        ctx.beginPath();
        ctx.arc(
          (s.x / 100) * width,
          (s.y / 100) * height,
          s.size / 2,
          0, Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 248, 230, ${alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [stars]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
    />
  );
}