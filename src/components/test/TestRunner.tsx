import { useMemo } from "react";
import type { StoryTest } from "../../structure/types/test.ts";
import { parseContent } from "../../lib/parser.ts";
import { Button } from "../Button.tsx";
import { ResultBanner } from "./ResultBanner.tsx";
import { useFillInBlanks } from "../../hooks/useFillInBlanks.ts";
import { StoryContent } from "./StoryContent.tsx";

interface StoryTestRunnerProps {
  test: StoryTest;
  onExit: () => void;
}

export function StoryTestRunner({ test, onExit }: StoryTestRunnerProps) {
  const content = test.content.join(" ");
  const parts = useMemo(() => parseContent(content), [content]);

  const {
    blanks, updateBlank,
    submitted, setSubmitted,
    correctCount, pass, reset,
  } = useFillInBlanks(parts, test.scoring.passThreshold);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button text={"← Zpět"} onClick={onExit} variant="navigation"/>
        <h2 className="text-lg font-semibold">{test.title}</h2>
      </div>

      {submitted && (
        <ResultBanner
          correct={correctCount}
          total={blanks.length}
          pass={pass}
        />
      )}

      <StoryContent
        parts={parts}
        blanks={blanks}
        options={test.options}
        submitted={submitted}
        update={updateBlank}
      />

      {!submitted && <Button text={"Zkontrolovat"} onClick={() => setSubmitted(true)}/>}
      {submitted && (
        <div className="flex gap-2">
          <Button text={"Zpět"} onClick={onExit}/>
          <Button text={"Zkusit znovu"} onClick={reset}/>
        </div>
      )}

    </div>
  );
}