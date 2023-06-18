import clsx from "@/utils/clsx";
import { useState } from "react";
import { GoToButton } from "../buttons";
import { FillInTheBlankActivity } from "./activities/fill-in-the-blank";
import { PickTheImageActivity } from "./activities/pick-the-image";
import { PickTheOptionActivity } from "./activities/pick-the-option";
import { PlainTextContent } from "./plain-text";

type PlainContentData = {
  type: "plain";
  data: PropsOf<typeof PlainTextContent>;
};

type FillInTheBlankActivityData = {
  type: "fill-in-the-blank";
  data: PropsOf<typeof FillInTheBlankActivity>;
};

type PickTheOptionActivityData = {
  type: "pick-the-option";
  data: PropsOf<typeof PickTheOptionActivity>;
};

type PickTheImageActivityData = {
  type: "pick-the-image";
  data: PropsOf<typeof PickTheImageActivity>;
};

export type Content =
  | PlainContentData
  | FillInTheBlankActivityData
  | PickTheOptionActivityData
  | PickTheImageActivityData;

export function PolymorphicContent({ content }: { content: Content }) {
  if (content.type === "plain") {
    return <PlainTextContent {...content.data} />;
  }

  if (content.type === "fill-in-the-blank") {
    return <FillInTheBlankActivity {...content.data} />;
  }

  if (content.type === "pick-the-option") {
    return <PickTheOptionActivity {...content.data} />;
  }

  if (content.type === "pick-the-image") {
    return <PickTheImageActivity {...content.data} />;
  }

  return null;
}

export function ContentList(props: { contentList: Content[] }) {
  return props.contentList.map((content, i) => (
    <PolymorphicContent key={i} content={content} />
  ));
}

export function ContentPager(props: {
  contentList: Content[];
  initialIndex?: number;
}) {
  const [index, setIndex] = useState(props.initialIndex ?? 0);

  const content = props.contentList[index];

  return (
    <div
      className={clsx(
        "flex flex-col space-y-4",
        content.type !== "plain" && "items-center"
      )}
    >
      <PolymorphicContent key={index} content={content} />

      <GoToButton
        direction="right"
        disabled={false}
        onClick={() => setIndex((index + 1) % props.contentList.length)}
      />
    </div>
  );
}
