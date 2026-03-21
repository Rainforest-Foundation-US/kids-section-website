export type CaptionSegment = { text: string; bold: boolean };

/**
 * Converts Portable Text blocks or legacy string to segments { text, bold }[].
 * Segments must be extracted before line wrapping so **bold** markup isn't split across lines.
 */
export function portableTextToSegments(blocks: unknown): CaptionSegment[] {
  if (blocks == null) return [];
  if (typeof blocks === "string") return parseBoldMarkup(blocks);

  if (!Array.isArray(blocks) || blocks.length === 0) return [];

  const segments: CaptionSegment[] = [];
  const blockList = blocks as {
    _type?: string;
    children?: { text?: string; marks?: string[] }[];
  }[];

  for (const block of blockList) {
    if (block._type !== "block" || !block.children?.length) continue;
    for (const child of block.children) {
      const text = child.text ?? "";
      if (text) {
        segments.push({
          text,
          bold: child.marks?.includes("strong") ?? false,
        });
      }
    }
  }
  return segments;
}

/** Parse **bold** markup in legacy string captions. */
function parseBoldMarkup(str: string): CaptionSegment[] {
  const segments: CaptionSegment[] = [];
  let remaining = str;
  let bold = false;

  while (remaining.length > 0) {
    const idx = remaining.indexOf("**");
    if (idx === -1) {
      if (remaining) segments.push({ text: remaining, bold });
      break;
    }
    if (idx > 0) segments.push({ text: remaining.slice(0, idx), bold });
    bold = !bold;
    remaining = remaining.slice(idx + 2);
  }
  return segments;
}
