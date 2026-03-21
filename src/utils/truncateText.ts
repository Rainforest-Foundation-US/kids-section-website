import type { CaptionSegment } from "./portable-text-to-caption";

/**
 * Flattens segments into word-level atoms for wrapping (preserves bold per word).
 */
function flattenSegments(segments: CaptionSegment[]): CaptionSegment[] {
  const segmenter = new Intl.Segmenter("en", { granularity: "word" });
  const result: CaptionSegment[] = [];
  for (const seg of segments) {
    for (const s of segmenter.segment(seg.text)) {
      result.push({ text: s.segment, bold: seg.bold });
    }
  }
  return result;
}

/**
 * Wraps segments into lines. Bold info is preserved; wrapping happens at word boundaries.
 */
export function wrapSegments(
  segments: CaptionSegment[],
  maxLineLength: number,
): CaptionSegment[][] {
  if (segments.length === 0) return [];
  const flat = flattenSegments(segments);
  const lines: CaptionSegment[][] = [];
  let currentLine: CaptionSegment[] = [];
  let currentLength = 0;

  for (const atom of flat) {
    if (
      currentLength + atom.text.length > maxLineLength &&
      currentLine.length > 0
    ) {
      lines.push(mergeConsecutiveSegments(currentLine));
      currentLine = [];
      currentLength = 0;
    }
    currentLine.push(atom);
    currentLength += atom.text.length;
  }
  if (currentLine.length > 0) {
    lines.push(mergeConsecutiveSegments(currentLine));
  }
  return lines;
}

/** Merges consecutive segments with the same bold value. */
function mergeConsecutiveSegments(
  segments: CaptionSegment[],
): CaptionSegment[] {
  if (segments.length <= 1) return segments;
  const result: CaptionSegment[] = [{ ...segments[0] }];
  for (let i = 1; i < segments.length; i++) {
    const last = result[result.length - 1];
    if (segments[i].bold === last.bold) {
      last.text += segments[i].text;
    } else {
      result.push({ ...segments[i] });
    }
  }
  return result;
}

/**
 * Truncates segments to max length, preserving whole words. Returns [truncated segments, wasTruncated].
 */
export function truncateSegments(
  segments: CaptionSegment[],
  maxLength: number,
): [CaptionSegment[], boolean] {
  const flat = flattenSegments(segments);
  let length = 0;
  const result: CaptionSegment[] = [];
  for (const atom of flat) {
    if (length + atom.text.length > maxLength && result.length > 0) {
      return [mergeConsecutiveSegments(result), true];
    }
    result.push(atom);
    length += atom.text.length;
  }
  return [mergeConsecutiveSegments(result), false];
}

/**
 * Wraps text to a maximum length while preserving whole words and returns text spans.
 */
export function wrapText(text: string, maxLineLength: number): string[] {
  if (text.length <= maxLineLength) {
    return [text];
  }

  const result: string[] = [];
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
