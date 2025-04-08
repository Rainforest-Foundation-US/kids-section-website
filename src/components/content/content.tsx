import clsx from "@/utils/clsx";
import { AnimatePresence, motion } from "framer-motion";
import { StaticImageData } from "next/image";
import React, { useEffect, useMemo, useState } from "react";

import {
  RoundSlothIllustration,
  WavySeparator,
} from "../illustrations/activities-illustrations";
import { GoToButton } from "../buttons";
import {
  ControlledActivityHint,
  useResetHint,
  useSetHint,
} from "../controlled-activity-hint";
import { Polaroid, PolaroidCaptionStyle } from "../polaroid";
import { ActivitySectionDivider } from "../sections";
import { RegularSection } from "../sections/regular-section";
import {
  VignetteSection,
  VignetteSectionOptions,
} from "../sections/vignette-section";
import { WavySection } from "../sections/wavy-section";
import {
  MemoryGame,
  MemoryGameActivityOptions,
} from "./activities/memory-game";
import { FindTheAnimalsGame } from "./activities/find-the-animals-game";
import {
  SelectCountriesWithRainforestActivity,
  SelectCountriesWithRainforestActivityOptions,
} from "./activities/select-countries-with-rainforest";
import {
  FillInTheBlankActivity,
  FillInTheBlankActivityOptions,
} from "./activities/fill-in-the-blank";
import {
  LocateInMapActivity,
  LocateInMapActivityOptions,
} from "./activities/locate-in-map";
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
import {
  PolymorphicIllustration,
  PolymorphicIllustrationOptions,
} from "./polymorphic-illustration";
import { toArrayMaybe } from "@/utils/toArray";
import { isDefined } from "@/utils/isDefined";
import { StatisticsScreen } from "./activities/statistics-screen";
import { StatisticsCard } from "@/sanity/schemaTypes/statisticsCard";
import { Postcard } from "../postcard";
import { SectionName } from "@/hooks/useGetDiscoverTheAmazonContent";
import { PostcardData } from "@/sanity/schemaTypes/postcard";
import { HintContent } from "../hint-content";
import { useAtomValue } from "jotai";
import { congratulationsAtom } from "../congratulations";
import { FlipIconReminder } from "../flip-icon-reminder";
import {
  ClickTheAnimals,
  ClickTheAnimalsActivityOptions,
} from "./activities/click-the-animals";

type PreContent = { type: "sloth" };

type PlainContentData = {
  type: "plain";
  data: PropsOf<typeof PlainTextContent>;
};

type FillInTheBlankActivityData = {
  type: "fill-in-the-blank";
  data: FillInTheBlankActivityOptions;
};

type LocateInMapActivityData = {
  type: "locate-in-map";
  data: LocateInMapActivityOptions;
};

type SelectCountriesWithRainforestActivityData = {
  type: "select-countries-with-rainforest";
  data: SelectCountriesWithRainforestActivityOptions;
};

type PickTheOptionActivityData = {
  type: "pick-the-option";
  data: PickTheOptionActivityOptions;
};

type PickTheImageActivityData = {
  type: "pick-the-image";
  data: PickTheImageActivityOptions;
};

type MemoryGameActivityData = {
  type: "memory-game";
  data: MemoryGameActivityOptions;
};

type FindAnimalsGameActivityData = {
  type: "find-the-animals";
};

type ClickTheAnimalsActivityData = {
  type: "click-the-animals";
  data: ClickTheAnimalsActivityOptions;
};

type StatisticsActivityData = {
  type: "statistics";
  data: { cards: StatisticsCard[] };
};

type SingleContent =
  | PlainContentData
  | FillInTheBlankActivityData
  | LocateInMapActivityData
  | PickTheOptionActivityData
  | PickTheImageActivityData
  | MemoryGameActivityData
  | FindAnimalsGameActivityData
  | SelectCountriesWithRainforestActivityData
  | StatisticsActivityData
  | ClickTheAnimalsActivityData;

type PagerData = { type: "pager"; data: SingleContent[]; noSloth?: boolean };

type PolaroidData = {
  image: string | StaticImageData;
  caption?: string;
  captionStyle?: PolaroidCaptionStyle;
};

type SubContent =
  | {
      type: "postcard";
      postcard?: PostcardData;
      polaroid?: PolaroidData;
      shouldShowFlipIconReminder?: boolean;
    }
  | {
      type: "polaroids";
      polaroids?: PolaroidData[];
      shouldShowFlipIconReminder?: boolean;
    }
  | { type: "illustration"; kind: PolymorphicIllustrationOptions["kind"] }
  | PlainContentData;

type Content = SingleContent | PagerData;

export type PagerContent = Content & { subContent?: SubContent | SubContent[] };

type DividerStyle = "dark" | "light";

type Illustrations = {
  topLeft?: React.ReactNode;
  topRight?: React.ReactNode;
  bottomLeft?: React.ReactNode;
  bottomRight?: React.ReactNode;
  right?: React.ReactNode;
  left?: React.ReactNode;
};

export type SectionWithContent =
  | {
      type: "regular" | "wavy";
      name: SectionName;
      align?: "left" | "center" | "right";
      layout?: "space-between" | "packed";
      textColorStyle?: "dark" | "light" | "light-shadows";
      className?: string;
      background?: string | StaticImageData | null;
      backgroundOpacity?: number;
      backgroundColor?: string;
      decorations?: {
        imageSrc: string | StaticImageData;
        width: number;
        height: number;
        className: string;
      }[];
      preContent?: PreContent;
      content: Content;
      subContent?: SubContent | SubContent[];
      defaultHintContent?: { hint: string };
      illustrations?: Illustrations;
    }
  | {
      type: "vignette";
      name: SectionName;
      content: VignetteSectionOptions;
      defaultHintContent?: { hint: string };
    }
  | { type: "divider"; name?: SectionName; style: DividerStyle };

export type SectionNames = SectionName | string;

function PolymorphicPreContent({ preContent }: { preContent: PreContent }) {
  if (preContent.type === "sloth") {
    return (
      <div className="mb-2">
        <RoundSlothIllustration />
      </div>
    );
  }

  return null;
}

function PolymorphicContent({
  name,
  content,
  isLastAnswer,
}: {
  name: SectionNames;
  content: Content;
  isLastAnswer?: boolean;
}) {
  const setHint = useSetHint();

  if (content.type === "plain") {
    return <PlainTextContent {...content.data} />;
  }

  if (content.type === "fill-in-the-blank") {
    return (
      <FillInTheBlankActivity
        name={name}
        onHint={(hintData) => setHint(name, hintData)}
        isLastAnswer={isLastAnswer}
        {...content.data}
      />
    );
  }

  if (content.type === "locate-in-map") {
    return (
      <LocateInMapActivity
        name={name}
        onHint={(hintData) => setHint(name, hintData)}
        {...content.data}
      />
    );
  }

  if (content.type === "select-countries-with-rainforest") {
    return (
      <SelectCountriesWithRainforestActivity
        name={name}
        onHint={(hintData) => setHint(name, hintData)}
        {...content.data}
      />
    );
  }

  if (content.type === "pick-the-option") {
    return (
      <PickTheOptionActivity
        name={name}
        onHint={(hintData) => setHint(name, hintData)}
        isLastAnswer={isLastAnswer}
        {...content.data}
      />
    );
  }

  if (content.type === "pick-the-image") {
    return (
      <PickTheImageActivity
        name={name}
        onHint={(hintData) => {
          setHint(name, hintData);
        }}
        {...content.data}
      />
    );
  }

  if (content.type === "memory-game") {
    return (
      <MemoryGame
        name={name}
        onHint={(hintData) => setHint(name, hintData)}
        {...content.data}
      />
    );
  }

  if (content.type === "find-the-animals") {
    return <FindTheAnimalsGame />;
  }

  if (content.type === "click-the-animals") {
    return <ClickTheAnimals {...content.data} />;
  }

  if (content.type === "pager") {
    return (
      <ContentPager
        name={name}
        contentList={content.data}
        noSloth={content.noSloth}
      />
    );
  }

  if (content.type === "statistics") {
    return <StatisticsScreen cards={content.data.cards} />;
  }

  return null;
}

function PolymorphicSubContent({
  subContent,
  className,
}: {
  subContent: SubContent;
  className?: string;
}) {
  const [isFlipped, setIsFlipped] = useState(-1);
  const [isMouseOver, setIsMouseOver] = useState(false);

  if (subContent.type === "postcard") {
    if (!subContent.postcard) {
      return null;
    }

    return (
      <div className={clsx("relative mt-12", className)}>
        <div
          onMouseEnter={() => setIsMouseOver(true)}
          onMouseLeave={() => setIsMouseOver(false)}
        >
          <Postcard {...subContent.postcard} />
        </div>

        {subContent.shouldShowFlipIconReminder && <FlipIconReminder />}

        {subContent.polaroid && (
          <Polaroid
            className={clsx(
              "absolute bottom-0 right-0 top-0 my-auto w-[14rem] rotate-[6.5deg] transition-all duration-150 hover:rotate-0 hover:scale-105 lg:w-[18rem] lg:translate-x-[50%]",
              isMouseOver && "right-[-50%] lg:right-[-40%] xl:right-[-25%]",
            )}
            src={subContent.polaroid.image}
            caption={subContent.polaroid.caption}
            captionStyle={subContent.polaroid.captionStyle}
          />
        )}
      </div>
    );
  }

  if (subContent.type === "polaroids") {
    if (!subContent.polaroids) {
      return null;
    }

    return (
      <ul className="mt-12 flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-8">
        {subContent.polaroids.map((polaroid, i) => (
          <li
            key={i}
            className={clsx(
              i % 2 === 0 ? "-rotate-[6.5deg]" : "rotate-[6.5deg]",
              "flex w-64 cursor-pointer transition-all duration-150 hover:z-10 hover:rotate-0 hover:scale-105 lg:w-72 xl:w-96",
            )}
            style={{ perspective: "1000px" }}
            onClick={() =>
              setIsFlipped((prev) => {
                if (i === prev) {
                  return -1;
                }

                return i;
              })
            }
          >
            <Polaroid
              src={polaroid.image}
              caption={polaroid.caption}
              captionStyle={polaroid.captionStyle}
              isFlipped={isFlipped === i}
            />
          </li>
        ))}
      </ul>
    );
  }

  if (subContent.type === "illustration") {
    return (
      <div className="mt-2">
        <PolymorphicIllustration kind={subContent.kind} />
      </div>
    );
  }

  if (subContent.type === "plain") {
    return (
      <div className="mt-6">
        <PlainTextContent {...subContent.data} />
      </div>
    );
  }

  return null;
}

function ContentSection(props: {
  section: SectionWithContent;
  previousSectionType: SectionWithContent["type"] | undefined;
  nextSectionType: SectionWithContent["type"] | undefined;
  previousDividerStyle?: DividerStyle;
  nextDividerStyle?: DividerStyle;
  index: number;
  name?: SectionName;
}) {
  const sectionAlign =
    ((props.section.type === "regular" || props.section.type === "wavy") &&
      props.section.align) ??
    "center";

  if (props.section.type === "regular" || props.section.type === "wavy") {
    const children = (
      <>
        {props.section.type === "regular" && props.index !== 0 && (
          <ActivitySectionDivider
            variant={
              props.previousSectionType === "wavy"
                ? "light"
                : (props.previousDividerStyle ?? "default")
            }
          />
        )}

        {props.nextSectionType === "vignette" && (
          <ActivitySectionDivider variant="dark" position="bottom" />
        )}

        {props.nextSectionType === "wavy" && (
          <ActivitySectionDivider variant="complementary" position="bottom" />
        )}

        {props.nextDividerStyle === "dark" && (
          <ActivitySectionDivider variant="dark" position="bottom" />
        )}

        <SectionContent className={props.section.className}>
          {props.section.defaultHintContent?.hint ? (
            <HintContent
              name={props.name}
              hintContent={{ text: props.section.defaultHintContent.hint }}
            />
          ) : null}

          {props.section.illustrations?.topLeft ?? null}
          {props.section.illustrations?.topRight ?? null}
          {props.section.illustrations?.left ?? null}
          {props.section.illustrations?.right ?? null}
          {props.section.illustrations?.bottomLeft ?? null}
          {props.section.illustrations?.bottomRight ?? null}

          <div
            className={clsx(
              "flex flex-col",
              [
                "locate-in-map",
                "select-countries-with-rainforest",
                "find-the-animals",
              ].includes(props.section.content.type) && "w-full",
              props.section.layout === "space-between"
                ? "flex-1 justify-between py-8"
                : "",
              sectionAlign === "center" && "items-center",
              sectionAlign === "right" && "items-end",
              sectionAlign === "left" && "items-start",
            )}
          >
            {props.section.preContent && (
              <PolymorphicPreContent preContent={props.section.preContent} />
            )}

            <PolymorphicContent
              name={props.section.name}
              content={props.section.content}
            />

            {props.section.subContent &&
              toArrayMaybe(props.section.subContent)?.map((subContent, i) => (
                <PolymorphicSubContent key={i} subContent={subContent} />
              ))}
          </div>
        </SectionContent>
      </>
    );

    if (props.section.type === "regular") {
      return (
        <>
          {props.previousDividerStyle === "dark" && (
            <div className="z-10 h-[120px] bg-neutral-dark-700" />
          )}

          <RegularSection
            name={props.name}
            textColorStyle={props.section.textColorStyle}
            backgroundImage={props.section.background}
            backgroundOpacity={props.section.backgroundOpacity}
            backgroundColor={props.section.backgroundColor}
            className={props.section.className}
          >
            {children}
          </RegularSection>
        </>
      );
    } else {
      return (
        <div className="bg-complementary-100">
          <WavySection name={props.name}>{children}</WavySection>
        </div>
      );
    }
  }

  if (props.section.type === "vignette") {
    return (
      <div className="relative z-10">
        <VignetteSection
          name={props.name}
          defaultHintContent={props.section.defaultHintContent}
          {...props.section.content}
        />

        {props.nextSectionType !== "vignette" && (
          <WavySeparator color="#1E1F1B" direction="down" />
        )}
      </div>
    );
  }

  return null;
}

export function ContentSectionList(props: {
  sections: (SectionWithContent | undefined)[];
}) {
  return (
    <>
      {props.sections
        .filter(isDefined)
        .map((section: SectionWithContent, i) => {
          const previousSection = props.sections[i - 1];
          const nextSection = props.sections[i + 1];

          return (
            <ContentSection
              key={i}
              index={i}
              name={section.name}
              section={section}
              previousSectionType={previousSection?.type}
              nextSectionType={nextSection?.type}
              previousDividerStyle={
                previousSection?.type === "divider"
                  ? previousSection.style
                  : undefined
              }
              nextDividerStyle={
                nextSection?.type === "divider" ? nextSection.style : undefined
              }
            />
          );
        })}
    </>
  );
}

export function ContentPager(props: {
  name: SectionNames;
  contentList: PagerContent[];
  initialIndex?: number;
  noSloth?: boolean;
  mainContentClassName?: string;
  leftArrowClassName?: string;
  rightArrowClassName?: string;
  isStories?: boolean;
}) {
  const congratulations = useAtomValue(congratulationsAtom);
  const [index, setIndex] = useState(props.initialIndex ?? 0);
  const resetHint = useResetHint();

  const content = props.contentList[index];
  const listCount = props.contentList.length;

  const goNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % listCount);
    resetHint(props.name);
  };

  const goBack = () => {
    setIndex((prevIndex) => (prevIndex - 1 + listCount) % listCount);
    resetHint(props.name);
  };

  const isLastAnswer = useMemo(
    () => index === listCount - 1,
    [index, listCount],
  );

  useEffect(() => {
    if (isLastAnswer && congratulations[props.name]) {
      setIndex(0);
      resetHint(props.name);
    }
  }, [isLastAnswer, congratulations, props.name, setIndex, resetHint]);

  return (
    <>
      <div className="relative inset-y-0 z-10 mb-4 flex items-center">
        {props.isStories && (
          <>
            {index > 0 && (
              <GoToButton
                className={clsx(
                  "absolute right-[calc(50%+10rem)] top-[40%]",
                  props.leftArrowClassName,
                )}
                key="left"
                direction="left"
                disabled={false}
                onClick={goBack}
              />
            )}

            {!isLastAnswer && (
              <GoToButton
                className={clsx(
                  "absolute left-[calc(50%+10rem)] top-[40%]",
                  props.rightArrowClassName,
                )}
                key="right"
                direction="right"
                disabled={false}
                onClick={goNext}
              />
            )}
          </>
        )}

        <ControlledActivityHint name={props.name} noSloth={props.noSloth} />
      </div>

      <div
        className={clsx(
          "flex flex-col",
          content.type !== "plain" && "items-center",
        )}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className={clsx("mb-4 h-[30vh]", props.mainContentClassName)}
          >
            <PolymorphicContent
              name={props.name}
              content={content}
              isLastAnswer={isLastAnswer}
            />

            {content.subContent &&
              toArrayMaybe(content.subContent)?.map((subContent, i) => (
                <PolymorphicSubContent
                  key={i}
                  subContent={subContent}
                  className="ml-10 w-11/12"
                />
              ))}
          </motion.div>
        </AnimatePresence>

        {!props.isStories && (
          <>
            {index > 0 && (
              <GoToButton
                className={clsx(
                  "absolute right-[calc(50%+26rem)] top-[40%]",
                  props.leftArrowClassName,
                )}
                key="left"
                direction="left"
                disabled={false}
                onClick={goBack}
              />
            )}

            {!isLastAnswer && (
              <GoToButton
                className={clsx(
                  "absolute left-[calc(50%+26rem)] top-[40%]",
                  props.rightArrowClassName,
                )}
                key="right"
                direction="right"
                disabled={false}
                onClick={goNext}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
