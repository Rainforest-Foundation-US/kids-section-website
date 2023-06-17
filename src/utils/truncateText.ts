/**
 * Truncates text to a maximum length while preserving whole words.
 * Useful for truncating texts on SVG elements.
 */
export function truncateText(
  text: string,
  maxLength: number
): [string, boolean] {
  if (text.length <= maxLength) {
    return [text, false];
  }

  let result = "";
  let truncated = false;

  const segmenter = new Intl.Segmenter("en", { granularity: "word" });

  for (const s of segmenter.segment(text)) {
    const next = result + s.segment;

    if (next.length > maxLength) {
      result = result.trimEnd();
      truncated = true;
      break;
    }

    result = next;
  }

  return [result, truncated];
}
