import React from "react";
import { PortableText } from "@portabletext/react";
import { WordHighlightWithTooltip } from "./word-highlight-with-tooltip";
import { WordHighlightWithImage } from "./word-highlight-with-image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PortableTextRenderer = ({ content }: { content: any }) => {
  const components = {
    block: {
      normal: ({ children }: { children?: React.ReactNode }) => (
        <p>{children}</p>
      ),
    },
    marks: {
      strong: ({ children }: { children?: React.ReactNode }) => (
        <strong>{children}</strong>
      ),
      highlightWithTooltip: WordHighlightWithTooltip,
      highlightWithImage: WordHighlightWithImage,
    },
  };

  return <PortableText value={content} components={components} />;
};

export default PortableTextRenderer;
