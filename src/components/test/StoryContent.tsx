import { type Blank, type Part } from "../../lib/parser.ts";
import { SelectInput } from "../inputs/SelectInput.tsx";

function TextPart({ value }: { value: string }) {
  return (
    <>
      {value.split("\n").map((line, j) => (
        <span key={j}>
          {j > 0 && <br/>}
          {line}
        </span>
      ))}
    </>
  );
}

interface BlankSelectProps {
  idx: number;
  blank: Blank;
  options: string[];
  submitted: boolean;
  update: (idx: number, value: string) => void;
}

function BlankSelect({ idx, blank, options, submitted, update }: BlankSelectProps) {
  const isCorrect = blank.value === blank.correct;
  const isEmpty = blank.value === "";

  let state: "default" | "correct" | "wrong" | "empty" = "default";

  if (submitted) {
    if (isCorrect) state = "correct";
    else if (isEmpty) state = "empty";
    else state = "wrong";
  }

  return (
    <SelectInput
      value={blank.value}
      options={options}
      disabled={submitted}
      state={state}
      onChange={(value) => update(idx, value)}
    />
  );
}

interface StoryContentProps {
  parts: Part[];
  blanks: Blank[];
  options: string[];
  submitted: boolean;
  update: (idx: number, value: string) => void;
}

export function StoryContent({ parts, blanks, options, submitted, update }: StoryContentProps) {
  return (
    <div className="bg-white rounded-xl border p-4 text-base leading-loose">
      {parts.map((p, i) => {
        if (p.type === "text") {
          return <TextPart key={i} value={p.value}/>;
        }

        return (
          <BlankSelect
            key={i}
            idx={p.idx}
            blank={blanks[p.idx]}
            options={options}
            submitted={submitted}
            update={update}
          />
        );
      })}
    </div>
  );
}