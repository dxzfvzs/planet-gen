export function DashedLineConnector() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1000 160"
      preserveAspectRatio="none"
    >
      <path
        d="
          M 0 80
          C 80 80, 120 40, 200 80
          S 320 120, 400 80
          S 520 30, 600 80
          S 720 130, 800 80
          S 920 50, 1000 80
        "
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="4"
        strokeDasharray="5 9"
        fill="none"
      />
    </svg>
  );
}
