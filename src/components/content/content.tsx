import clsx from "@/utils/clsx";
import { AnimatePresence, motion } from "framer-motion";
import { StaticImageData } from "next/image";
import { useState } from "react";
import { GoToButton, HomeGoToSectionButton } from "../buttons";
import {
  GlobalActivityHint,
  useResetHint,
  useSetHint,
} from "../global-activity-hint";
import { ActivitySectionDivider } from "../sections";
import { RegularSection } from "../sections/regular-section";
import {
  VignetteSection,
  VignetteSectionOptions,
} from "../sections/vignette-section";
import { WavySection } from "../sections/wavy-section";
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
import { SectionContent } from "./section-content";

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

type SingleContent =
  | PlainContentData
  | FillInTheBlankActivityData
  | PickTheOptionActivityData
  | PickTheImageActivityData;

type PagerData = {
  type: "pager";
  data: SingleContent[];
};

export type Content = SingleContent | PagerData;

export type SectionWithContent =
  | {
      type: "regular" | "wavy";
      background?: string | StaticImageData;
      backgroundOpacity?: number;
      backgroundColor?: string;
      decorations?: {
        imageSrc: string | StaticImageData;
        width: number;
        height: number;
        className: string;
      }[];
      content: Content;
    }
  | {
      type: "vignette";
      content: VignetteSectionOptions;
    };

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

  if (content.type === "pager") {
    return <ContentPager contentList={content.data} enableGoToNextSection />;
  }

  return null;
}

function ContentSection(props: {
  section: SectionWithContent;
  previousSectionType: SectionWithContent["type"] | undefined;
  nextSectionType: SectionWithContent["type"] | undefined;
  number: number;
}) {
  if (props.section.type === "regular") {
    return (
      <RegularSection
        number={props.number}
        backgroundImage={props.section.background}
        backgroundOpacity={props.section.backgroundOpacity}
        backgroundColor={props.section.backgroundColor}
      >
        {props.number !== 0 && props.previousSectionType !== "wavy" && (
          <ActivitySectionDivider />
        )}

        {props.nextSectionType === "vignette" && (
          <ActivitySectionDivider variant="dark" position="bottom" />
        )}

        <SectionContent
          className={props.nextSectionType === "wavy" ? "pb-36" : undefined}
        >
          <PolymorphicContent content={props.section.content} />

          <HomeGoToSectionButton />
        </SectionContent>
      </RegularSection>
    );
  }

  if (props.section.type === "wavy") {
    return (
      <WavySection number={props.number}>
        <SectionContent>
          <PolymorphicContent content={props.section.content} />

          {props.section.content.type !== "pager" && <HomeGoToSectionButton />}
        </SectionContent>
      </WavySection>
    );
  }

  if (props.section.type === "vignette") {
    return <VignetteSection number={props.number} {...props.section.content} />;
  }

  return null;
}

export function ContentSectionList(props: { sections: SectionWithContent[] }) {
  return (
    <>
      {props.sections.map((section, i) => (
        <ContentSection
          key={i}
          number={i}
          section={section}
          previousSectionType={props.sections[i - 1]?.type}
          nextSectionType={props.sections[i + 1]?.type}
        />
      ))}
    </>
  );
}

export function ContentPager(props: {
  contentList: Content[];
  initialIndex?: number;
  enableGoToNextSection?: boolean;
}) {
  const [index, setIndex] = useState(props.initialIndex ?? 0);
  const resetHint = useResetHint();

  const content = props.contentList[index];
  const listCount = props.contentList.length;

  const goNext = () => {
    setIndex((index + 1) % listCount);
    resetHint();
  };

  const shouldGoToNextSection =
    props.enableGoToNextSection && index === listCount - 1;

  return (
    <>
      <div className="inset-y-0 z-10 mb-4 flex items-center">
        <GlobalActivityHint />
      </div>

      <div
        className={clsx(
          "flex flex-col",
          content.type !== "plain" && "items-center"
        )}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="mb-4"
          >
            <PolymorphicContent content={content} />
          </motion.div>

          {shouldGoToNextSection ? (
            <HomeGoToSectionButton />
          ) : (
            <GoToButton direction="right" disabled={false} onClick={goNext} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
