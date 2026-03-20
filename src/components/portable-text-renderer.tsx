import React from "react";
import { PortableText } from "@portabletext/react";
import { WordHighlightWithTooltip } from "./word-highlight-with-tooltip";
import { WordHighlightWithImage } from "./word-highlight-with-image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PortableTextRenderer = ({ content }: { content: any }) => {
  const components = {
    block: {
      normal: ({ children }: { children?: React.ReactNode }) => (
        <p className="leading-snug">{children}</p>
      ),
    },
    marks: {
      strong: ({ children }: { children?: React.ReactNode }) => (
        <strong>{children}</strong>
      ),
      link: ({
        children,
        value,
      }: {
        children?: React.ReactNode;
        value?: { href?: string; blank?: boolean };
      }) => {
        const href = value?.href || "#";
        const isBlank = Boolean(value?.blank);

        return (
          <a
            href={href}
            target={isBlank ? "_blank" : undefined}
            rel={isBlank ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        );
      },
      highlightWithTooltip: WordHighlightWithTooltip,
      highlightWithImage: WordHighlightWithImage,
    },
  };

  return <PortableText value={content} components={components} />;
};

export default PortableTextRenderer;
