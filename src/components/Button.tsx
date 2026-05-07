import clsx from "clsx";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  variant?: "main" | "navigation";
}

const variants = {
  main: "w-full py-3 rounded-xl border font-medium bg-white",
  navigation: "text-sm px-3 py-1.5 rounded-lg border bg-white",
};

export function Button({ text, onClick, className, variant = "main" }: ButtonProps) {
  return (
    <button className={clsx(variants[variant], className)} onClick={onClick}>
      {text}
    </button>
  );
}