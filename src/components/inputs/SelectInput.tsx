import clsx from "clsx";

interface SelectInputProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  disabled?: boolean;
  state?: "default" | "correct" | "wrong" | "empty";
}

export function SelectInput({ value, options, onChange, disabled = false, state = "default" }: SelectInputProps) {
  const normalizedOptions = ["", ...options];

  return (
    <span className="relative inline-flex items-center border-b mx-[0.1em]">
      <select
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          "appearance-none rounded outline-none cursor-pointer",
          "font-[inherit] text-[1em] leading-none h-[1.2em]",
          "px-0.5 min-w-[2ch] text-center",

          state === "default" && !disabled && "text-inherit bg-gray-100",
          state === "correct" && "bg-success text-white",
          state === "wrong" && "bg-fail text-white",
          state === "empty" && "bg-mid"
        )}
      >
        {normalizedOptions.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </span>
  );
}