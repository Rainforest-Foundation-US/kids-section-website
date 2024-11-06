import React from "react";
import { PortableText } from "@portabletext/react";

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
    },
  };

  return <PortableText value={content} components={components} />;
};

export default PortableTextRenderer;
