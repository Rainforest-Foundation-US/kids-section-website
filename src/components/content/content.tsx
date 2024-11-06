import clsx from "@/utils/clsx";
import { AnimatePresence, motion } from "framer-motion";
import { StaticImageData } from "next/image";
import { useState } from "react";
import {
  RoundSlothIllustration,
  ThinkingFaceEmoji,
  WavySeparator,
} from "../activities-illustrations";
import { Badge } from "../badge";
import {
  GoToButton,
  GoToTargetSection,
  HomeGoToSectionButton,
} from "../buttons";
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

type PreContent =
  | {
      type: "sloth";
    }
  | {
      type: "emoji";
      emoji: "thinking-face";
    };

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
  | SelectCountriesWithRainforestActivityData
  | StatisticsActivityData;

type PagerData = {
  type: "pager";
  data: SingleContent[];
};

type ContentNavigationButton = {
  alignment: "bottom-middle";
  direction: "left" | "right" | "bottom";
  target: "next" | string;
  caption?: string;
};

type PolaroidData = {
  image: string | StaticImageData;
  caption?: string;
  captionStyle?: PolaroidCaptionStyle;
};

type PostcardData = {
  image: string | StaticImageData;
  alt: string;
  description?: string;
};

type SubContent =
  | {
      type: "postcard";
      postcard: PostcardData;
      polaroid?: PolaroidData;
    }
  | {
      type: "polaroids";
      polaroids: (PolaroidData & {
        navButton?: ContentNavigationButton;
      })[];
    }
  | {
      type: "illustration";
      kind: PolymorphicIllustrationOptions["kind"];
    }
  | PlainContentData;

export type Content = SingleContent | PagerData;

export type PagerContent = Content & {
  subContent?: SubContent | SubContent[];
};

export type DividerStyle = "dark";

export type SectionWithContent =
  | {
      type: "regular" | "wavy";
      name?: string;
      align?: "left" | "center" | "right";
      layout?: "space-between" | "packed";
      textColorStyle?: "dark" | "light" | "light-shadows";
      background?: string | StaticImageData | null;
      backgroundOpacity?: number;
      backgroundColor?: string;
      decorations?: {
        imageSrc: string | StaticImageData;
        width: number;
        height: number;
        className: string;
      }[];
      noNextButton?: boolean;
      preContent?: PreContent;
      content: Content;
      subContent?: SubContent | SubContent[];
    }
  | {
      type: "vignette";
      name: string;
      content: VignetteSectionOptions;
    }
  | {
      type: "divider";
      name?: string;
      style: DividerStyle;
    };

function PolymorphicPreContent({ preContent }: { preContent: PreContent }) {
  if (preContent.type === "sloth") {
    return (
      <div className="mb-2">
        <RoundSlothIllustration />
      </div>
    );
  }

  if (preContent.type === "emoji" && preContent.emoji === "thinking-face") {
    return (
      <Badge>
        <ThinkingFaceEmoji />
      </Badge>
    );
  }

  return null;
}

function PolymorphicContent({ content }: { content: Content }) {
  const setHint = useSetHint();

  if (content.type === "plain") {
    return <PlainTextContent {...content.data} />;
  }

  if (content.type === "fill-in-the-blank") {
    return <FillInTheBlankActivity onHint={setHint} {...content.data} />;
  }

  if (content.type === "locate-in-map") {
    return <LocateInMapActivity onHint={setHint} {...content.data} />;
  }

  if (content.type === "select-countries-with-rainforest") {
    return (
      <SelectCountriesWithRainforestActivity
        onHint={setHint}
        {...content.data}
      />
    );
  }

  if (content.type === "pick-the-option") {
    return <PickTheOptionActivity onHint={setHint} {...content.data} />;
  }

  if (content.type === "pick-the-image") {
    return <PickTheImageActivity onHint={setHint} {...content.data} />;
  }

  if (content.type === "memory-game") {
    return <MemoryGame onHint={setHint} {...content.data} />;
  }

  if (content.type === "pager") {
    return <ContentPager contentList={content.data} enableGoToNextSection />;
  }

  if (content.type === "statistics") {
    return <StatisticsScreen cards={content.data.cards} />;
  }

  return null;
}

function PolymorphicSubContent({ subContent }: { subContent: SubContent }) {
  const [isFlipped, setIsFlipped] = useState(-1);
  const [isMouseOver, setIsMouseOver] = useState(false);

  if (subContent.type === "postcard") {
    return (
      <div className="relative mt-12">
        <div
          onMouseEnter={() => setIsMouseOver(true)}
          onMouseLeave={() => setIsMouseOver(false)}
        >
          <Postcard {...subContent.postcard} />
        </div>

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

            {polaroid.navButton && (
              <div className="absolute inset-x-0 bottom-0 flex translate-y-[75%] justify-center">
                <GoToTargetSection
                  direction={polaroid.navButton.direction}
                  target={polaroid.navButton.target}
                  disabled={false}
                />
              </div>
            )}
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
  number: number;
  name?: string;
}) {
  const sectionAlign =
    ((props.section.type === "regular" || props.section.type === "wavy") &&
      props.section.align) ??
    "center";

  if (props.section.type === "regular" || props.section.type === "wavy") {
    const children = (
      <>
        {props.section.type === "regular" && props.number !== 0 && (
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

        <SectionContent>
          <div
            className={clsx(
              "flex flex-col",
              ["locate-in-map", "select-countries-with-rainforest"].includes(
                props.section.content.type,
              ) && "w-full",
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

            <PolymorphicContent content={props.section.content} />

            {props.section.subContent &&
              toArrayMaybe(props.section.subContent)?.map((subContent, i) => (
                <PolymorphicSubContent key={i} subContent={subContent} />
              ))}

            {!props.section.noNextButton &&
              props.section.content.type !== "pager" && (
                <HomeGoToSectionButton className={clsx("relative z-10 mt-4")} />
              )}
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
            number={props.number}
            name={props.name}
            textColorStyle={props.section.textColorStyle}
            backgroundImage={props.section.background}
            backgroundOpacity={props.section.backgroundOpacity}
            backgroundColor={props.section.backgroundColor}
          >
            {children}
          </RegularSection>
        </>
      );
    } else {
      return (
        <div className="bg-complementary-100">
          <WavySection number={props.number} name={props.name}>
            {children}
          </WavySection>
        </div>
      );
    }
  }

  if (props.section.type === "vignette") {
    return (
      <div className="relative z-10">
        <VignetteSection
          number={props.number}
          name={props.name}
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
              number={i}
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
  contentList: PagerContent[];
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

  const goBack = () => {
    setIndex((index - 1) % listCount);
    resetHint();
  };

  const shouldGoToNextSection =
    props.enableGoToNextSection && index === listCount - 1;

  return (
    <>
      <div className="inset-y-0 z-10 mb-4 flex items-center">
        <ControlledActivityHint />
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
            className="mb-4"
          >
            <PolymorphicContent content={content} />

            {content.subContent &&
              toArrayMaybe(content.subContent)?.map((subContent, i) => (
                <PolymorphicSubContent key={i} subContent={subContent} />
              ))}
          </motion.div>
        </AnimatePresence>

        <div
          className={clsx(
            "flex flex-row space-x-2",
            content.subContent && "items-center justify-center",
          )}
        >
          {index > 0 && (
            <GoToButton
              className="bg-neutral-100"
              key="left"
              direction="left"
              disabled={false}
              onClick={goBack}
            />
          )}

          {shouldGoToNextSection ? (
            <HomeGoToSectionButton />
          ) : (
            <GoToButton
              key="right"
              direction="right"
              disabled={false}
              onClick={goNext}
            />
          )}
        </div>
      </div>
    </>
  );
}
