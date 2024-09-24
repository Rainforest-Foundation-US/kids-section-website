/**
 * Truncates lines of text to a maximum length per line while preserving whole words.
 * Useful for word-wrapping text on SVG elements.
 * @returns text spans.
 */
export function wrapTextToLength(
  text: string,
  maxLength: number,
  granularity: "word" | "sentence" = "word",
  lang = "en",
): string[] {
  if (text.length <= maxLength) {
    return [text];
  }

  const spans: string[] = [];
  const segmenter = new Intl.Segmenter(lang, { granularity });

  for (const s of segmenter.segment(text)) {
    const currentLine = spans[spans.length - 1] ?? "";
    const next = currentLine + s.segment;

    if (next.length > maxLength) {
      spans.push(s.segment);
    } else if (currentLine.length === 0) {
      spans.push(s.segment);
    } else spans[spans.length - 1] = next.trimStart();
  }

  return spans;
}
