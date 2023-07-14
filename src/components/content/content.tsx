import clsx from "@/utils/clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Provider } from "jotai";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import {
  RoundSlothIllustration,
  ThinkingFaceEmoji,
  WavySeparator,
} from "../activities-illustrations";
import { Badge } from "../badge";
import { GoToButton, HomeGoToSectionButton } from "../buttons";
import {
  ControlledActivityHint,
  useResetHint,
  useSetHint,
} from "../controlled-activity-hint";
import { Polaroid } from "../polaroid";
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
  | LocateInMapActivityData
  | PickTheOptionActivityData
  | PickTheImageActivityData;

type PagerData = {
  type: "pager";
  data: SingleContent[];
};

type SubContent =
  | {
      type: "postcard";
      image: string | StaticImageData;
    }
  | {
      type: "polaroids";
      images: {
        image: string | StaticImageData;
        caption: string;
      }[];
    };

export type Content = SingleContent | PagerData;

export type SectionWithContent =
  | {
      type: "regular" | "wavy";
      align?: "left" | "center" | "right";
      layout?: "space-between" | "packed";
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
      subContent?: SubContent;
    }
  | {
      type: "vignette";
      content: VignetteSectionOptions;
    };

function PolymorphicPreContent({ preContent }: { preContent: PreContent }) {
  if (preContent.type === "sloth") {
    return <RoundSlothIllustration />;
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

function PolymorphicSubContent({ subContent }: { subContent: SubContent }) {
  if (subContent.type === "postcard") {
    return (
      <Image
        placeholder="blur"
        className="bg-secondary-100 shadow-app-lg shadow-shadow-gray mt-12 flex w-full max-w-[814px] -rotate-[4deg] flex-col object-contain p-2 lg:p-4"
        src={subContent.image}
        aria-hidden
        alt=""
      />
    );
  }

  if (subContent.type === "polaroids") {
    return (
      <ul className="mt-12 flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-16">
        {subContent.images.map((image, i) => (
          <li key={i}>
            <Polaroid
              className={clsx(
                i % 2 === 0 ? "-rotate-[6.5deg]" : "rotate-[6.5deg]",
                "relative w-[16rem] hover:z-10 hover:rotate-0 hover:scale-105 lg:w-[18rem]"
              )}
              src={image.image}
              caption={image.caption}
            />
          </li>
        ))}
      </ul>
    );
  }

  return null;
}

function ContentSection(props: {
  section: SectionWithContent;
  previousSectionType: SectionWithContent["type"] | undefined;
  nextSectionType: SectionWithContent["type"] | undefined;
  number: number;
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
            variant={props.previousSectionType === "wavy" ? "light" : "default"}
          />
        )}

        {props.nextSectionType === "vignette" && (
          <ActivitySectionDivider variant="dark" position="bottom" />
        )}

        {props.nextSectionType === "wavy" && (
          <ActivitySectionDivider variant="complementary" position="bottom" />
        )}

        <SectionContent>
          <div
            className={clsx(
              "flex flex-col",
              props.section.content.type === "locate-in-map" && "w-full",
              props.section.layout === "space-between"
                ? "flex-1 justify-between py-8"
                : "",
              sectionAlign === "center" && "items-center",
              sectionAlign === "right" && "items-end",
              sectionAlign === "left" && "items-start"
            )}
          >
            {props.section.preContent && (
              <PolymorphicPreContent preContent={props.section.preContent} />
            )}

            <PolymorphicContent content={props.section.content} />

            {props.section.subContent && (
              <PolymorphicSubContent subContent={props.section.subContent} />
            )}

            {props.section.content.type !== "pager" && (
              <HomeGoToSectionButton
                className={clsx(
                  "relative z-10 mt-4",
                  props.section.subContent?.type === "postcard" &&
                    "-translate-y-40"
                )}
              />
            )}
          </div>
        </SectionContent>
      </>
    );

    if (props.section.type === "regular") {
      return (
        <RegularSection
          number={props.number}
          backgroundImage={props.section.background}
          backgroundOpacity={props.section.backgroundOpacity}
          backgroundColor={props.section.backgroundColor}
        >
          {children}
        </RegularSection>
      );
    } else {
      return (
        <div className="bg-complementary-100">
          <WavySection number={props.number}>{children}</WavySection>
        </div>
      );
    }
  }

  if (props.section.type === "vignette") {
    return (
      <div className="relative z-10">
        <VignetteSection number={props.number} {...props.section.content} />

        {props.nextSectionType !== "vignette" && (
          <WavySeparator color="#1E1F1B" direction="down" />
        )}
      </div>
    );
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
        <ControlledActivityHint />
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
