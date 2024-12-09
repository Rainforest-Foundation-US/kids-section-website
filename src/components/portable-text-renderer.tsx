import React from "react";
import { PortableText } from "@portabletext/react";
import { WordHighlightWithTooltip } from "./word-highlight-with-tooltip";

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
    },
  };

  return <PortableText value={content} components={components} />;
};

export default PortableTextRenderer;
