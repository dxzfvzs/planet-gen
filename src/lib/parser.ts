export type Blank = { correct: string; value: string };

export type Part =
  | { type: "text"; value: string }
  | { type: "blank"; correct: string; idx: number };

export function parseContent(content: string): Part[] {
  const parts: Part[] = [];
  const re = /_([^_]+)_/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let idx = 0;

  while ((match = re.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: content.slice(lastIndex, match.index) });
    }

    parts.push({
      type: "blank",
      correct: match[1],
      idx: idx++,
    });

    lastIndex = re.lastIndex;
  }

  if (lastIndex < content.length) {
    parts.push({ type: "text", value: content.slice(lastIndex) });
  }

  return parts;
}