import clsx from "clsx";

interface ResultBannerProps {
  correct: number;
  total: number;
  pass: boolean;
}

export function ResultBanner({ correct, total, pass }: ResultBannerProps) {
  const ratio = total ? correct / total : 1;

  return (
    <div
      className={clsx(
        "rounded-xl p-4",
        pass && "bg-green-100 text-success",
        !pass && "bg-red-100 text-fail",
      )}
    >
      <div className="text-xl font-semibold">
        {correct}/{total} ({Math.round(ratio * 100)}%)
      </div>
      <div className="text-sm">
        {pass ? "🎉 Výborně!" : "😅 Zkus to znovu!"}
      </div>
    </div>
  );
}
