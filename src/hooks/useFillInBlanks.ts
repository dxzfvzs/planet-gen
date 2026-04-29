import { useMemo, useState } from "react";
import type { Blank, Part } from "../lib/parser";

export function useFillInBlanks(parts: Part[], passThreshold: number) {
  const initialBlanks = useMemo<Blank[]>(
    () =>
      parts
        .filter((p): p is Extract<Part, { type: "blank" }> => p.type === "blank")
        .map((p) => ({ correct: p.correct, value: "" })),
    [parts]
  );

  const [blanks, setBlanks] = useState<Blank[]>(initialBlanks);
  const [submitted, setSubmitted] = useState(false);

  const updateBlank = (idx: number, value: string) => {
    setBlanks((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], value };
      return next;
    });
  };

  const correctCount = useMemo(
    () => blanks.filter((b) => b.value === b.correct).length,
    [blanks]
  );

  const pass = blanks.length === 0 || correctCount / blanks.length >= passThreshold;

  const reset = () => {
    setBlanks(initialBlanks.map((b) => ({ ...b, value: "" })));
    setSubmitted(false);
  };

  return {
    blanks,
    submitted,
    setSubmitted,
    updateBlank,
    correctCount,
    pass,
    reset,
  };
}