import clsx from "@/utils/clsx";
import { useState } from "react";
import { GoToButton } from "../buttons";
import {
  GlobalActivityHint,
  useResetHint,
  useSetHint,
} from "../global-activity-hint";
import {
  FillInTheBlankActivity,
  FillInTheBlankActivityOptions,
} from "./activities/fill-in-the-blank";
import {
  PickTheImageActivity,
  PickTheImageActivityOptions,
} from "./activities/pick-the-image";
import {
  PickTheOptionActivity,
  PickTheOptionActivityOptions,
} from "./activities/pick-the-option";
import { PlainTextContent } from "./plain-text";

type PlainContentData = {
  type: "plain";
  data: PropsOf<typeof PlainTextContent>;
};

type FillInTheBlankActivityData = {
  type: "fill-in-the-blank";
  data: FillInTheBlankActivityOptions;
};

type PickTheOptionActivityData = {
  type: "pick-the-option";
  data: PickTheOptionActivityOptions;
};

type PickTheImageActivityData = {
  type: "pick-the-image";
  data: PickTheImageActivityOptions;
};

export type Content =
  | PlainContentData
  | FillInTheBlankActivityData
  | PickTheOptionActivityData
  | PickTheImageActivityData;

function PolymorphicContent({ content }: { content: Content }) {
  const setHint = useSetHint();

  if (content.type === "plain") {
    return <PlainTextContent {...content.data} />;
  }

  if (content.type === "fill-in-the-blank") {
    return <FillInTheBlankActivity onHint={setHint} {...content.data} />;
  }

  if (content.type === "pick-the-option") {
    return <PickTheOptionActivity onHint={setHint} {...content.data} />;
  }

  if (content.type === "pick-the-image") {
    return <PickTheImageActivity onHint={setHint} {...content.data} />;
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
  const resetHint = useResetHint();

  const content = props.contentList[index];

  const goNext = () => {
    setIndex((index + 1) % props.contentList.length);
    resetHint();
  };

  return (
    <>
      <div className="inset-y-0 left-0 z-10 mb-4 flex items-center lg:absolute">
        <GlobalActivityHint />
      </div>

      <div
        className={clsx(
          "flex flex-col space-y-4",
          content.type !== "plain" && "items-center"
        )}
      >
        <PolymorphicContent key={index} content={content} />

        <GoToButton direction="right" disabled={false} onClick={goNext} />
      </div>
    </>
  );
}
