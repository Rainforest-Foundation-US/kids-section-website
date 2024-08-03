/**
 * Truncates text to a maximum length while preserving whole words.
 */
export function truncateText(
  text: string,
  maxLineLength: number,
): [string, boolean] {
  if (text.length <= maxLineLength) {
    return [text, false];
  }

  let result = "";
  let truncated = false;

  const segmenter = new Intl.Segmenter("en", { granularity: "word" });

  for (const s of segmenter.segment(text)) {
    const next = result + s.segment;

    if (next.length > maxLineLength) {
      result = result.trimEnd();
      truncated = true;
      break;
    }

    result = next;
  }

  return [result, truncated];
}

/**
 * Wraps text to a maximum length while preserving whole words and returns text spans.
 */
export function wrapText(text: string, maxLineLength: number): string[] {
  if (text.length <= maxLineLength) {
    return [text];
  }

  let result: string[] = [];
  let curLine = "";

  const segmenter = new Intl.Segmenter("en", { granularity: "word" });

  for (const s of segmenter.segment(text)) {
    const next = curLine + s.segment;

    if (next.length > maxLineLength) {
      result.push(curLine.trimEnd());
      curLine = s.segment;
      continue;
    }

    curLine = next;
  }

  if (curLine) result.push(curLine);

  return result;
}
