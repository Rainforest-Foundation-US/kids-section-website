import * as React from "react";

import {
  getPickImageGames,
  getVignettes,
  getStatisticsCards,
  getMemoryGame,
  getPickOptionMultiPageGames,
  getFillInTheBlankGames,
  getFillInTheBlankMultiPageGames,
  getPlainData,
  getLocateInMaps,
} from "@/sanity/lib/queries";

import { SectionWithContent } from "@/components/content/content";

import secondBackground from "@/assets/activities/2-background.png";

import backgroundAmazon from "@/assets/activities/background-amazon.png";

import fillInTheBlank2 from "@/assets/activities/fill-in-the-blank/climate/2-weather.jpg";

import backgroundDeforestation6 from "@/assets/activities/06-background-deforestation.jpg";

import backgroundRiver8 from "@/assets/activities/08-background-river.png";

import backgroundHouse13 from "@/assets/activities/13-background-house.png";

import backgroundForest33 from "@/assets/activities/33-background-forest.jpg";

import climateChangeWildfires34 from "@/assets/activities/34-climate-change-wildfires.png";

import spatialPlanetEarth36 from "@/assets/activities/36-spatial-planet-earth.jpg";
import { MemoryGameData } from "@/sanity/schemaTypes/memoryGame";
import { StatisticsCard } from "@/sanity/schemaTypes/statisticsCard";
import { PickImageGameData } from "@/sanity/schemaTypes/pickImageGame";
import {
  HangingSlothIllustration,
  BottomLeftBushIllustration,
  MonkeyInABushIllustration,
  RightBushIllustration,
  RightLeavesWithParrotIllustration,
  WavingSlothIllustration,
  RightLeavesIllustration,
  TopLeftBushIllustration,
  SlothInABushIllustration,
  LemurInABushIllustration,
  RightParrotIllustration,
  ChameleonInABushIllustration,
  ToucanWithDeadLeavesIllustration,
  LeftDeadLeavesIllustration,
  HelpSlothIllustration,
  FlamingoChameleonAndButterflyIIllustration,
  RightParrotAndLemurIllustration,
  RightParrotLemurAndFrogIllustration,
} from "@/components/illustrations/activities-illustrations";
import {
  bottomLeftIllustrationStyles,
  bottomRightIllustrationStyles,
  leftIllustrationStyles,
  rightIllustrationStyles,
  topLeftIllustrationStyles,
} from "@/styles/illustration-styles";
import clsx from "@/utils/clsx";
import { VignetteSlide } from "@/components/sections/vignette-section";
import { PickOptionMultiPageGameData } from "@/sanity/schemaTypes/pickOptionMultiPageGame";
import { FillInTheBlankGameData } from "@/sanity/schemaTypes/fillInTheBlankGame";
import { FillInTheBlankMultiPageGameData } from "@/sanity/schemaTypes/fillInTheBlankMultiPageGame";
import { PlainData } from "@/sanity/schemaTypes/plain";
import { urlFor } from "@/sanity/lib/image";
import { PolaroidData } from "@/sanity/schemaTypes/polaroid";
import { PostcardData } from "@/sanity/schemaTypes/postcard";
import { LocateInMapData } from "@/sanity/schemaTypes/locateInMap";

// TODOK: use this type as a name of each schema type
export const sectionNames = [
  { title: "what-is-the-amazon", value: "what-is-the-amazon" as const },
  {
    title: "rainforests-are-exactly-what-you-d-think",
    value: "rainforests-are-exactly-what-you-d-think" as const,
  },
  {
    title: "rainforests-have-a-lot-of-rain",
    value: "rainforests-have-a-lot-of-rain" as const,
  },
  {
    title: "three-most-important-rainforests",
    value: "three-most-important-rainforests" as const,
  },
  {
    title: "why-no-rainforests-in-antarctica",
    value: "why-no-rainforests-in-antarctica" as const,
  },
  {
    title: "rainforests-are-among-the-oldest",
    value: "rainforests-are-among-the-oldest" as const,
  },
  {
    title: "deforestation-in-the-amazon",
    value: "deforestation-in-the-amazon" as const,
  },
  {
    title: "indigenous-peoples-in-the-amazon",
    value: "indigenous-peoples-in-the-amazon" as const,
  },
  {
    title: "the-amazon-is-the-biggest-tropical-rainforest",
    value: "the-amazon-is-the-biggest-tropical-rainforest" as const,
  },
  { title: "other-rivers-on-earth", value: "other-rivers-on-earth" as const },
  {
    title: "half-of-the-worlds-rainforests-are-in-the-amazon",
    value: "half-of-the-worlds-rainforests-are-in-the-amazon" as const,
  },
  {
    title: "the-whole-united-states-in-the-amazon",
    value: "the-whole-united-states-in-the-amazon" as const,
  },
  {
    title: "the-amazon-spreads-across-multiple-countries",
    value: "the-amazon-spreads-across-multiple-countries" as const,
  },
  {
    title: "what-are-rainforests-quiz",
    value: "what-are-rainforests-quiz" as const,
  },
  {
    title: "select-countries-with-rainforest",
    value: "select-countries-with-rainforest" as const,
  },
  { title: "life-in-the-amazon", value: "life-in-the-amazon" as const },
  {
    title: "which-images-show-the-amazon",
    value: "which-images-show-the-amazon" as const,
  },
  { title: "so-much-more-to-learn", value: "so-much-more-to-learn" as const },
  {
    title: "more-plants-and-animals-than-anywhere-else",
    value: "more-plants-and-animals-than-anywhere-else" as const,
  },
  {
    title: "indigenous-communities-in-the-amazon",
    value: "indigenous-communities-in-the-amazon" as const,
  },
  { title: "biodiversity", value: "biodiversity" as const },
  {
    title: "statistics-about-biodiversity",
    value: "statistics-about-biodiversity" as const,
  },
  {
    title: "statistics-about-biodiversity-cards",
    value: "statistics-about-biodiversity-cards" as const,
  },
  { title: "find-the-animals", value: "find-the-animals" as const },
  {
    title: "rainforests-are-important-quiz",
    value: "rainforests-are-important-quiz" as const,
  },
  {
    title: "rainforests-under-threat",
    value: "rainforests-under-threat" as const,
  },
  { title: "climate-change-quiz", value: "climate-change-quiz" as const },
  {
    title: "is-this-actor-deforesting-the-amazon",
    value: "is-this-actor-deforesting-the-amazon" as const,
  },
  {
    title: "is-this-actor-deforesting-the-amazon-2",
    value: "is-this-actor-deforesting-the-amazon-2" as const,
  },
  { title: "memory-game-pre", value: "memory-game-pre" as const },
  { title: "memory-game", value: "memory-game" as const },
  {
    title: "what-happens-to-animals-when-rainforest-disappears",
    value: "what-happens-to-animals-when-rainforest-disappears" as const,
  },
  { title: "rainforests-matter", value: "rainforests-matter" as const },
  {
    title: "indigenous-communities-have-spent",
    value: "indigenous-communities-have-spent" as const,
  },
  {
    title: "rainforests-keep-our-planet-healthy",
    value: "rainforests-keep-our-planet-healthy" as const,
  },
  { title: "rainforests-in-danger", value: "rainforests-in-danger" as const },
  {
    title: "climate-change-and-deforestation",
    value: "climate-change-and-deforestation" as const,
  },
  { title: "what-is-climate-change", value: "what-is-climate-change" as const },
  { title: "climate-change-effects", value: "climate-change-effects" as const },
  {
    title: "rainforest-is-a-carbon-sink",
    value: "rainforest-is-a-carbon-sink" as const,
  },
  { title: "deforestation-effects", value: "deforestation-effects" as const },
  {
    title: "why-do-indigenous-people-work-with-rfus",
    value: "why-do-indigenous-people-work-with-rfus" as const,
  },
  {
    title: "why-rfus-works-in-the-amazon",
    value: "why-rfus-works-in-the-amazon" as const,
  },
  { title: "stories", value: "stories" as const },
  { title: "faq", value: "faq" as const },
  { title: "credits", value: "credits" as const },
];

export type SectionName = (typeof sectionNames)[number]["value"];

export function useGetDiscoverTheAmazonContent() {
  const [vignettes, setVignettes] = React.useState<VignetteSlide[]>([]);
  const [memoryGame, setMemoryGame] = React.useState<MemoryGameData>();
  const [statisticsCards, setStatisticsCards] =
    React.useState<StatisticsCard[]>();
  const [pickImageGames, setPickImageGames] =
    React.useState<PickImageGameData[]>();
  const [pickOptionMultiPageGames, setPickOptionMultiPageGames] =
    React.useState<PickOptionMultiPageGameData[]>();
  const [fillInTheBlankGames, setFillInTheBlankGames] =
    React.useState<FillInTheBlankGameData[]>();
  const [fillInTheBlankMultiPageGames, setFillInTheBlankMultiPageGames] =
    React.useState<FillInTheBlankMultiPageGameData[]>();
  const [plainSections, setPlainSections] = React.useState<PlainData[]>([]);
  const [locateInMapSections, setLocateInMapSections] = React.useState<
    LocateInMapData[]
  >([]);

  React.useEffect(() => {
    async function getData() {
      const vignettesFromServer = await getVignettes();
      const memoryGameFromServer = await getMemoryGame();
      const statisticsCardsFromServer = await getStatisticsCards();
      const pickImageGamesFromServer = await getPickImageGames();
      const pickOptionMultiPageGamesFromServer =
        await getPickOptionMultiPageGames();
      const fillInTheBlankGamesFromServer = await getFillInTheBlankGames();
      const fillInTheBlankMultiPageGamesFromServer =
        await getFillInTheBlankMultiPageGames();
      const plainSectionsFromServer = await getPlainData();
      const locateInMapSectionsFromServer = await getLocateInMaps();

      setVignettes(vignettesFromServer);
      setMemoryGame(memoryGameFromServer);
      setStatisticsCards(statisticsCardsFromServer);
      setPickImageGames(pickImageGamesFromServer);
      setPickOptionMultiPageGames(pickOptionMultiPageGamesFromServer);
      setFillInTheBlankGames(fillInTheBlankGamesFromServer);
      setFillInTheBlankMultiPageGames(fillInTheBlankMultiPageGamesFromServer);
      setPlainSections(plainSectionsFromServer);
      setLocateInMapSections(locateInMapSectionsFromServer);
    }

    getData();
  }, []);

  const whichImagesShowTheAmazonPickImageGame = pickImageGames?.find(
    (pickImageGame) => pickImageGame.name === "which-images-show-the-amazon",
  );
  const rainforestUnderThreatPickImageGame = pickImageGames?.find(
    (pickImageGame) => pickImageGame.name === "rainforests-under-threat",
  );
  const whatAreRainforestsQuizPickOptionMultiPageGame =
    pickOptionMultiPageGames?.find(
      (pickOptionMultiPageGame) =>
        pickOptionMultiPageGame.name === "what-are-rainforests-quiz",
    );
  const rainforestsAreImportantQuizPickOptionMultiPageGame =
    pickOptionMultiPageGames?.find(
      (pickOptionMultiPageGame) =>
        pickOptionMultiPageGame.name === "rainforests-are-important-quiz",
    );

  const rainforestAreExactlyWhatYoudThinkFillInTheBlankGame =
    fillInTheBlankGames?.find(
      (fillInTheBlankGame) =>
        fillInTheBlankGame.name === "rainforests-are-exactly-what-you-d-think",
    );

  const rainforestsHaveALotOfRainFillInTheBlankGame = fillInTheBlankGames?.find(
    (fillInTheBlankGame) =>
      fillInTheBlankGame.name === "rainforests-have-a-lot-of-rain",
  );

  const theAmazonSpreadsAcrossMultipleCountriesFillInTheBlankGame =
    fillInTheBlankGames?.find(
      (fillInTheBlankGame) =>
        fillInTheBlankGame.name ===
        "the-amazon-spreads-across-multiple-countries",
    );

  const rainforestsInDangerFillInTheBlankGame = fillInTheBlankGames?.find(
    (fillInTheBlankGame) => fillInTheBlankGame.name === "rainforests-in-danger",
  );

  const climateChangeFillInTheBlankMultiPageGame =
    fillInTheBlankMultiPageGames?.find(
      (fillInTheBlankMultiPageGame) =>
        fillInTheBlankMultiPageGame.name === "climate-change-quiz",
    );

  const plainSectionsDictionary = plainSections
    .filter((section) => section.contentType === "aboutTheAmazon")
    .filter((section) => section.name)
    .reduce(
      (acc, section) => {
        // It's safe to use section.name! because we filtered out the sections that don't have a name
        acc[section.name!] = section;
        return acc;
      },
      {} as Record<string, PlainData>,
    );

  const locateInMapSectionsDictionary = locateInMapSections
    .filter((section) => section.name)
    .reduce(
      (acc, section) => {
        acc[section.name!] = section;
        return acc;
      },
      {} as Record<string, LocateInMapData>,
    );

  const discoverTheAmazonSections: (SectionWithContent | undefined)[] = [
    plainSectionsDictionary["what-is-the-amazon"] && {
      type: "regular",
      name: "what-is-the-amazon",
      align: "left",
      content: {
        type: "plain",
        data: {
          wideness: "md",
          ...mapPlainData(plainSectionsDictionary["what-is-the-amazon"]),
        },
      },
      illustrations: {
        bottomLeft: (
          <BottomLeftBushIllustration
            className={clsx(bottomLeftIllustrationStyles, "-bottom-24")}
          />
        ),
        left: <WavingSlothIllustration className={leftIllustrationStyles} />,
      },
    },
    rainforestAreExactlyWhatYoudThinkFillInTheBlankGame && {
      type: "regular",
      name: "rainforests-are-exactly-what-you-d-think",
      background: secondBackground,
      content: {
        type: "fill-in-the-blank",
        data: {
          preText: rainforestAreExactlyWhatYoudThinkFillInTheBlankGame.preText,
          question:
            rainforestAreExactlyWhatYoudThinkFillInTheBlankGame.question,
          textColor:
            rainforestAreExactlyWhatYoudThinkFillInTheBlankGame.textColor,
          numberToOptions:
            rainforestAreExactlyWhatYoudThinkFillInTheBlankGame.blanks.map(
              (blank) => ({
                options: blank.options,
                correctOptionPosition: blank.correctOptionPosition,
              }),
            ),
        },
      },
      defaultHintContent: {
        hint: rainforestAreExactlyWhatYoudThinkFillInTheBlankGame.hint,
      },
      illustrations: {
        bottomRight: (
          <RightBushIllustration
            className={clsx(
              bottomRightIllustrationStyles,
              "-bottom-24 -right-32 lg:-right-48",
            )}
          />
        ),
      },
      subContent: {
        type: "postcard",
        shouldShowFlipIconReminder: true,
        postcard: mapPostcard(
          rainforestAreExactlyWhatYoudThinkFillInTheBlankGame.subContent
            .postcard,
        ),
        polaroid: mapPolaroid(
          rainforestAreExactlyWhatYoudThinkFillInTheBlankGame.subContent
            .polaroid,
        ),
      },
    },
    rainforestsHaveALotOfRainFillInTheBlankGame && {
      type: "regular",
      background: secondBackground,
      name: "rainforests-have-a-lot-of-rain",
      content: {
        type: "fill-in-the-blank",
        data: {
          preText: rainforestsHaveALotOfRainFillInTheBlankGame.preText,
          question: rainforestsHaveALotOfRainFillInTheBlankGame.question,
          textColor: rainforestsHaveALotOfRainFillInTheBlankGame.textColor,
          numberToOptions:
            rainforestsHaveALotOfRainFillInTheBlankGame.blanks.map((blank) => ({
              options: blank.options,
              correctOptionPosition: blank.correctOptionPosition,
            })),
        },
      },
      illustrations: {
        bottomRight: (
          <RightBushIllustration
            className={clsx(
              bottomRightIllustrationStyles,
              "-bottom-24 -right-32 lg:-right-48",
            )}
          />
        ),
      },
      defaultHintContent: {
        hint: rainforestsHaveALotOfRainFillInTheBlankGame.hint,
      },
      subContent: {
        type: "postcard",
        postcard: { image: fillInTheBlank2, alt: "Rainforest" },
      },
    },
    locateInMapSectionsDictionary["three-most-important-rainforests"] &&
      mapLocateInMap(
        locateInMapSectionsDictionary["three-most-important-rainforests"],
      ),
    plainSectionsDictionary["why-no-rainforests-in-antarctica"] && {
      type: "wavy",
      name: "why-no-rainforests-in-antarctica",
      content: {
        type: "plain",
        data: {
          wideness: "md",
          ...mapPlainData(
            plainSectionsDictionary["why-no-rainforests-in-antarctica"],
          ),
        },
      },
      illustrations: {
        topLeft: (
          <HangingSlothIllustration
            className={clsx(topLeftIllustrationStyles, "-left-10 -top-24")}
          />
        ),
        bottomRight: (
          <RightBushIllustration
            className={clsx(
              bottomRightIllustrationStyles,
              "-bottom-24 -right-32 lg:-right-48",
            )}
          />
        ),
      },
      subContent: {
        type: "postcard",
        postcard: mapPostcard(
          plainSectionsDictionary["why-no-rainforests-in-antarctica"]
            ?.subContent.postcard,
        ),
      },
    },
    plainSectionsDictionary["why-rfus-works-in-the-amazon"] && {
      type: "regular",
      name: "why-rfus-works-in-the-amazon",
      content: {
        type: "plain",
        data: {
          ...mapPlainData(
            plainSectionsDictionary["why-rfus-works-in-the-amazon"],
          ),
        },
      },
      illustrations: {
        bottomLeft: (
          <MonkeyInABushIllustration className={bottomLeftIllustrationStyles} />
        ),
        right: (
          <RightLeavesWithParrotIllustration
            className={rightIllustrationStyles}
          />
        ),
      },
      subContent: { type: "illustration", kind: "happy-sloth" },
    },
    plainSectionsDictionary["rainforests-are-among-the-oldest"] && {
      type: "regular",
      name: "rainforests-are-among-the-oldest",
      background: secondBackground,
      content: {
        type: "plain",
        data: {
          wideness: "xl",
          ...mapPlainData(
            plainSectionsDictionary["rainforests-are-among-the-oldest"],
          ),
        },
      },
      subContent: {
        type: "polaroids",
        polaroids: mapPolaroids(
          plainSectionsDictionary["rainforests-are-among-the-oldest"]
            ?.subContent.polaroids,
        ),
      },
    },
    { type: "divider", style: "dark" },
    plainSectionsDictionary["deforestation-in-the-amazon"] && {
      type: "regular",
      name: "deforestation-in-the-amazon",
      backgroundOpacity: 0.5,
      backgroundColor: "#1e1f1b",
      background: backgroundDeforestation6,
      textColor: "#e6fae6",
      content: {
        type: "plain",
        data: {
          wideness: "xl",
          ...mapPlainData(
            plainSectionsDictionary["deforestation-in-the-amazon"],
          ),
        },
      },
      subContent: {
        type: "polaroids",
        polaroids: mapPolaroids(
          plainSectionsDictionary["deforestation-in-the-amazon"]?.subContent
            .polaroids,
        ),
      },
    },
    plainSectionsDictionary[
      "the-amazon-is-the-biggest-tropical-rainforest"
    ] && {
      type: "regular",
      name: "the-amazon-is-the-biggest-tropical-rainforest",
      background: backgroundRiver8,
      backgroundOpacity: 0.64,
      backgroundColor: "#FAF5EE",
      content: {
        type: "plain",
        data: {
          ...mapPlainData(
            plainSectionsDictionary[
              "the-amazon-is-the-biggest-tropical-rainforest"
            ],
          ),
        },
      },
      illustrations: {
        bottomLeft: (
          <BottomLeftBushIllustration
            className={bottomLeftIllustrationStyles}
          />
        ),
      },
      subContent: {
        type: "polaroids",
        polaroids: mapPolaroids(
          plainSectionsDictionary[
            "the-amazon-is-the-biggest-tropical-rainforest"
          ]?.subContent.polaroids,
        ),
      },
    },
    plainSectionsDictionary["other-rivers-on-earth"] && {
      type: "wavy",
      name: "other-rivers-on-earth",
      content: {
        type: "plain",
        data: {
          ...mapPlainData(plainSectionsDictionary["other-rivers-on-earth"]),
        },
      },
      illustrations: {
        topLeft: (
          <HangingSlothIllustration
            className={clsx(topLeftIllustrationStyles, "-left-10 -top-24")}
          />
        ),
        bottomRight: (
          <RightBushIllustration
            className={clsx(
              bottomRightIllustrationStyles,
              "-bottom-24 -right-32 lg:-right-48",
            )}
          />
        ),
      },
      subContent: {
        type: "polaroids",
        polaroids: mapPolaroids(
          plainSectionsDictionary["other-rivers-on-earth"]?.subContent
            .polaroids,
        ),
      },
    },
    locateInMapSectionsDictionary[
      "half-of-the-worlds-rainforests-are-in-the-amazon"
    ] &&
      mapLocateInMap(
        locateInMapSectionsDictionary[
          "half-of-the-worlds-rainforests-are-in-the-amazon"
        ],
      ),
    locateInMapSectionsDictionary["the-whole-united-states-in-the-amazon"] &&
      mapLocateInMap(
        locateInMapSectionsDictionary["the-whole-united-states-in-the-amazon"],
      ),
    theAmazonSpreadsAcrossMultipleCountriesFillInTheBlankGame && {
      type: "regular",
      name: "the-amazon-spreads-across-multiple-countries",
      layout: "space-between",
      defaultHintContent: {
        hint: theAmazonSpreadsAcrossMultipleCountriesFillInTheBlankGame.hint,
      },
      content: {
        type: "fill-in-the-blank",
        data: {
          preText:
            theAmazonSpreadsAcrossMultipleCountriesFillInTheBlankGame.preText,
          subText:
            theAmazonSpreadsAcrossMultipleCountriesFillInTheBlankGame.subText,
          question:
            theAmazonSpreadsAcrossMultipleCountriesFillInTheBlankGame.question,
          textColor:
            theAmazonSpreadsAcrossMultipleCountriesFillInTheBlankGame.textColor,
          numberToOptions:
            theAmazonSpreadsAcrossMultipleCountriesFillInTheBlankGame.blanks.map(
              (blank) => ({
                options: blank.options,
                correctOptionPosition: blank.correctOptionPosition,
              }),
            ),
        },
      },
    },
    {
      type: "regular",
      name: "select-countries-with-rainforest",
      background: null,
      backgroundColor: "#F0F4EF",
      defaultHintContent: {
        hint: "Select the countries with Amazon Rainforest in them",
      },
      content: {
        type: "select-countries-with-rainforest",
        data: { question: "", center: [-65, -22], scale: 280 },
      },
    },
    plainSectionsDictionary["life-in-the-amazon"] && {
      type: "regular",
      name: "life-in-the-amazon",
      background: backgroundHouse13,
      content: {
        type: "plain",
        data: {
          ...mapPlainData(plainSectionsDictionary["life-in-the-amazon"]),
        },
      },
      illustrations: {
        bottomLeft: (
          <BottomLeftBushIllustration
            className={clsx(bottomLeftIllustrationStyles, "-bottom-24")}
          />
        ),
        right: <RightLeavesIllustration className={rightIllustrationStyles} />,
      },
      subContent: { type: "illustration", kind: "happy-sloth" },
    },
    whichImagesShowTheAmazonPickImageGame && {
      type: "regular",
      name: "which-images-show-the-amazon",
      defaultHintContent: {
        hint: whichImagesShowTheAmazonPickImageGame.hintContent.hint,
      },
      content: {
        type: "pick-the-image",
        data: {
          wrap: true,
          wideness: "xl",
          question: whichImagesShowTheAmazonPickImageGame.question,
          questionColor: whichImagesShowTheAmazonPickImageGame.questionColor,
          options: whichImagesShowTheAmazonPickImageGame.options,
        },
      },
    },
    plainSectionsDictionary["indigenous-peoples-in-the-amazon"] && {
      type: "regular",
      name: "indigenous-peoples-in-the-amazon",
      content: {
        type: "plain",
        data: {
          wideness: "md",
          ...mapPlainData(
            plainSectionsDictionary["indigenous-peoples-in-the-amazon"],
          ),
        },
      },
      illustrations: {
        topLeft: (
          <HangingSlothIllustration
            className={clsx(topLeftIllustrationStyles, "-left-10 -top-24")}
          />
        ),
        bottomRight: (
          <RightBushIllustration
            className={clsx(
              bottomRightIllustrationStyles,
              "-bottom-24 -right-32 lg:-right-48",
            )}
          />
        ),
      },
      subContent: {
        type: "polaroids",
        polaroids: mapPolaroids(
          plainSectionsDictionary["indigenous-peoples-in-the-amazon"]
            ?.subContent.polaroids,
        ),
      },
    },
    whatAreRainforestsQuizPickOptionMultiPageGame && {
      type: "wavy",
      name: "what-are-rainforests-quiz",
      content: {
        type: "pager",
        data: whatAreRainforestsQuizPickOptionMultiPageGame.gamePages.map(
          (gamePage) => ({
            type: "pick-the-option",
            data: {
              question: gamePage.question,
              questionColor: gamePage.questionColor,
              options: gamePage.options,
            },
          }),
        ),
      },
      illustrations: {
        topLeft: (
          <TopLeftBushIllustration
            className={clsx(topLeftIllustrationStyles, "-left-10 -top-24")}
          />
        ),
        bottomRight: (
          <SlothInABushIllustration
            className={clsx(
              bottomRightIllustrationStyles,
              "-bottom-24 -right-10",
            )}
          />
        ),
      },
    },
    plainSectionsDictionary["so-much-more-to-learn"] && {
      type: "regular",
      name: "so-much-more-to-learn",
      background: backgroundHouse13,
      content: {
        type: "plain",
        data: {
          ...mapPlainData(plainSectionsDictionary["so-much-more-to-learn"]),
        },
      },
      illustrations: {
        bottomLeft: (
          <BottomLeftBushIllustration
            className={clsx(
              bottomLeftIllustrationStyles,
              "-bottom-24 -left-10",
            )}
          />
        ),
        right: <RightLeavesIllustration className={rightIllustrationStyles} />,
      },
      subContent: { type: "illustration", kind: "waving-sloth" },
    },
    plainSectionsDictionary["more-plants-and-animals-than-anywhere-else"] && {
      type: "regular",
      name: "more-plants-and-animals-than-anywhere-else",
      background: backgroundAmazon,
      content: {
        type: "plain",
        data: {
          wideness: "lg",
          ...mapPlainData(
            plainSectionsDictionary[
              "more-plants-and-animals-than-anywhere-else"
            ],
          ),
        },
      },
      subContent: {
        type: "postcard",
        postcard: mapPostcard(
          plainSectionsDictionary["more-plants-and-animals-than-anywhere-else"]
            ?.subContent.postcard,
        ),
      },
    },
    plainSectionsDictionary["indigenous-communities-in-the-amazon"] && {
      type: "regular",
      name: "indigenous-communities-in-the-amazon",
      background: backgroundAmazon,
      content: {
        type: "plain",
        data: {
          wideness: "lg",
          ...mapPlainData(
            plainSectionsDictionary["indigenous-communities-in-the-amazon"],
          ),
        },
      },
      subContent: {
        type: "postcard",
        postcard: mapPostcard(
          plainSectionsDictionary["indigenous-communities-in-the-amazon"]
            ?.subContent.postcard,
        ),
      },
    },
    {
      type: "vignette" as const,
      name: "biodiversity",
      defaultHintContent: {
        hint: "We'll discuss deforestation and climate change shortly. For now, know that the biodiversity in the Amazon is disappearing.",
      },
      content: {
        slides: [
          ...vignettes
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((vignette) => ({
              _id: vignette._id,
              name: vignette.name,
              title: vignette.title ?? "",
              subtitle: vignette.subtitle ?? "",
              body: vignette.body ?? "",
              imageAlignment: vignette.imageAlignment ?? "middle",
              image: vignette.image,
              hintContent: vignette.hintContent,
            })),
        ],
      },
    },
    { type: "divider", style: "dark" },
    {
      type: "regular",
      name: "find-the-animals",
      background: secondBackground,
      content: { type: "find-the-animals" },
    },
    plainSectionsDictionary["statistics-about-biodiversity"] && {
      type: "regular",
      name: "statistics-about-biodiversity",
      content: {
        type: "plain",
        data: {
          ...mapPlainData(
            plainSectionsDictionary["statistics-about-biodiversity"],
          ),
        },
      },
      illustrations: {
        bottomLeft: (
          <LemurInABushIllustration
            className={clsx(bottomLeftIllustrationStyles, "-bottom-32")}
          />
        ),
        right: <RightParrotIllustration className={rightIllustrationStyles} />,
      },
      subContent: [
        { type: "illustration", kind: "sitting-sloth" },
        {
          type: "plain",
          data: {
            ...mapPlainData(
              plainSectionsDictionary["statistics-about-biodiversity"]
                .subContent.data,
            ),
          },
        },
      ],
    },
    {
      type: "regular",
      name: "statistics-about-biodiversity-cards",
      content: { type: "statistics", data: { cards: statisticsCards ?? [] } },
    },
    plainSectionsDictionary["memory-game-pre"] && {
      type: "regular",
      name: "memory-game-pre",
      content: {
        type: "plain",
        data: {
          ...mapPlainData(plainSectionsDictionary["memory-game-pre"]),
        },
      },
      illustrations: {
        bottomLeft: (
          <LeftDeadLeavesIllustration
            className={bottomLeftIllustrationStyles}
          />
        ),
        bottomRight: (
          <ToucanWithDeadLeavesIllustration
            className={bottomRightIllustrationStyles}
          />
        ),
        left: (
          <HelpSlothIllustration
            className={clsx(leftIllustrationStyles, "left-24")}
          />
        ),
      },
    },
    memoryGame && {
      type: "regular",
      name: "memory-game",
      background: memoryGame.backgroundImage,
      className: "min-h-min py-0 pt-0 pb-8",
      content: {
        type: "memory-game",
        data: {
          cards:
            memoryGame.cards.map(({ src, height, width, description }) => ({
              image: { src, height, width },
              text: description,
            })) ?? [],
          backCardImage: memoryGame.backCardImage,
          backCardImageAlt: memoryGame.backCardImageAlt,
        },
      },
    },
    plainSectionsDictionary[
      "what-happens-to-animals-when-rainforest-disappears"
    ] && {
      type: "wavy",
      name: "what-happens-to-animals-when-rainforest-disappears",
      content: {
        type: "plain",
        data: {
          wideness: "md",
          ...mapPlainData(
            plainSectionsDictionary[
              "what-happens-to-animals-when-rainforest-disappears"
            ],
          ),
        },
      },
      illustrations: {
        bottomRight: (
          <RightBushIllustration
            className={clsx(
              bottomRightIllustrationStyles,
              "-bottom-24 -right-32 lg:-right-48",
            )}
          />
        ),
      },
    },
    {
      type: "regular",
      name: "rainforests-matter",
      content: {
        type: "click-the-animals",
        data: {
          defaultText: "Click on different animals to see what they say",
        },
      },
      illustrations: {
        left: (
          <FlamingoChameleonAndButterflyIIllustration
            className={clsx(
              leftIllustrationStyles,
              "top-[15%] z-20 lg:top-[20%]",
            )}
          />
        ),
        right: (
          <RightParrotLemurAndFrogIllustration
            className={clsx(
              rightIllustrationStyles,
              "top-[15%] z-20 lg:top-[20%]",
            )}
          />
        ),
      },
      subContent: [
        {
          type: "illustration",
          kind: "happy-sloth",
          className: "scale-75 md:scale-100 xl:scale-125",
        },
      ],
    },
    {
      type: "regular",
      name: "indigenous-communities-have-spent",
      content: {
        type: "plain",
        data: {
          text: "Indigenous communities have spent thousands of years learning about all the creatures in the rainforest, and have carefully passed down values, knowledge, and practices for keeping the forest where they live in balance.",
        },
      },
    },
    plainSectionsDictionary["rainforests-keep-our-planet-healthy"] && {
      type: "regular",
      name: "rainforests-keep-our-planet-healthy",
      className: "min-h-80",
      content: {
        type: "plain",
        data: {
          ...mapPlainData(
            plainSectionsDictionary["rainforests-keep-our-planet-healthy"],
          ),
        },
      },
      subContent: { type: "illustration", kind: "sad-sloth" },
    },
    rainforestsAreImportantQuizPickOptionMultiPageGame && {
      type: "wavy",
      name: "rainforests-are-important-quiz",
      content: {
        type: "pager",
        data: rainforestsAreImportantQuizPickOptionMultiPageGame?.gamePages.map(
          (gamePage) => ({
            type: "pick-the-option",
            data: {
              wrap: true,
              question: gamePage.question,
              questionColor: gamePage.questionColor,
              options: gamePage.options,
            },
          }),
        ),
      },
      illustrations: {
        topLeft: (
          <TopLeftBushIllustration
            className={clsx(topLeftIllustrationStyles, "-left-10 -top-24")}
          />
        ),
        bottomRight: (
          <ChameleonInABushIllustration
            className={clsx(
              bottomRightIllustrationStyles,
              "-bottom-32 -right-10",
            )}
          />
        ),
      },
    },
    rainforestsInDangerFillInTheBlankGame && {
      type: "regular",
      name: "rainforests-in-danger",
      background: backgroundForest33,
      defaultHintContent: {
        hint: rainforestsInDangerFillInTheBlankGame.hint,
      },
      content: {
        type: "fill-in-the-blank",
        data: {
          preText: rainforestsInDangerFillInTheBlankGame.preText,
          question: rainforestsInDangerFillInTheBlankGame.question,
          textColor: rainforestsInDangerFillInTheBlankGame.textColor,
          numberToOptions: rainforestsInDangerFillInTheBlankGame.blanks.map(
            (blank) => ({
              options: blank.options,
              correctOptionPosition: blank.correctOptionPosition,
            }),
          ),
        },
      },
    },
    { type: "divider", style: "dark" },
    plainSectionsDictionary["climate-change-and-deforestation"] && {
      type: "regular",
      name: "climate-change-and-deforestation",
      backgroundColor: "#1e1f1b",
      background: climateChangeWildfires34,
      textColor: "#e6fae6",
      preContent: { type: "sloth" },
      content: {
        type: "plain",
        data: {
          wideness: "2xl",
          ...mapPlainData(
            plainSectionsDictionary["climate-change-and-deforestation"],
          ),
        },
      },
      subContent: {
        type: "polaroids",
        polaroids: mapPolaroids(
          plainSectionsDictionary["climate-change-and-deforestation"]
            ?.subContent.polaroids,
        ),
      },
    },
    { type: "divider", style: "dark" },
    plainSectionsDictionary["what-is-climate-change"] && {
      type: "regular",
      name: "what-is-climate-change",
      backgroundColor: "#1e1f1b",
      background: null,
      textColor: "#e6fae6",
      content: {
        type: "plain",
        data: {
          wideness: "lg",
          ...mapPlainData(plainSectionsDictionary["what-is-climate-change"]),
        },
      },
      subContent: {
        type: "polaroids",
        polaroids: mapPolaroids(
          plainSectionsDictionary["what-is-climate-change"]?.subContent
            .polaroids,
        ),
      },
    },
    { type: "divider", style: "dark" },
    plainSectionsDictionary["climate-change-effects"] && {
      type: "regular",
      name: "climate-change-effects",
      background: spatialPlanetEarth36,
      textColor: "#faf5ee",
      content: {
        type: "plain",
        data: {
          wideness: "xl",
          ...mapPlainData(plainSectionsDictionary["climate-change-effects"]),
        },
      },
      subContent: {
        type: "polaroids",
        polaroids: mapPolaroids(
          plainSectionsDictionary["climate-change-effects"]?.subContent
            .polaroids,
        ),
      },
    },
    plainSectionsDictionary["rainforest-is-a-carbon-sink"] && {
      type: "regular",
      name: "rainforest-is-a-carbon-sink",
      backgroundColor: "#f0f4ef", // complementary-100
      background: null,
      textColor: "#1e1f1b",
      preContent: { type: "sloth" },
      content: {
        type: "plain",
        data: {
          wideness: "xl",
          ...mapPlainData(
            plainSectionsDictionary["rainforest-is-a-carbon-sink"],
          ),
        },
      },
      subContent: [
        {
          type: "polaroids",
          polaroids: mapPolaroids(
            plainSectionsDictionary["rainforest-is-a-carbon-sink"]?.subContent
              .polaroids,
          ),
        },
        // TODOK
        {
          type: "plain",
          data: {
            wideness: "lg",
            text: "<b>Rainforest</b> reduces climate change (<b>Biodiversity</b> and <b>Indigenous</b> people keep the rainforest healthy!)",
            textSize: "md",
          },
        },
      ],
    },
    plainSectionsDictionary["deforestation-effects"] && {
      type: "wavy",
      name: "deforestation-effects",
      content: {
        type: "plain",
        data: {
          wideness: "md",
          ...mapPlainData(plainSectionsDictionary["deforestation-effects"]),
        },
      },
      illustrations: {
        topLeft: (
          <HangingSlothIllustration
            className={clsx(topLeftIllustrationStyles, "-left-10 -top-24")}
          />
        ),
        bottomRight: (
          <RightBushIllustration
            className={clsx(
              bottomRightIllustrationStyles,
              "-bottom-24 -right-32 lg:-right-48",
            )}
          />
        ),
      },
    },
    rainforestUnderThreatPickImageGame && {
      type: "regular",
      name: "rainforests-under-threat",
      defaultHintContent: {
        hint: rainforestUnderThreatPickImageGame.hintContent.hint,
      },
      content: {
        type: "pick-the-image",
        data: {
          wrap: true,
          wideness: "xl",
          showAltText: true,
          question: rainforestUnderThreatPickImageGame.question,
          questionColor: rainforestUnderThreatPickImageGame.questionColor,
          options: rainforestUnderThreatPickImageGame.options,
        },
      },
    },
    plainSectionsDictionary["is-this-actor-deforesting-the-amazon"] && {
      type: "wavy",
      name: "is-this-actor-deforesting-the-amazon",
      content: {
        type: "plain",
        data: {
          ...mapPlainData(
            plainSectionsDictionary["is-this-actor-deforesting-the-amazon"],
          ),
        },
      },
      subContent: {
        type: "postcard",
        postcard: mapPostcard(
          plainSectionsDictionary["is-this-actor-deforesting-the-amazon"]
            ?.subContent.postcard,
        ),
      },
      illustrations: {
        topLeft: (
          <HangingSlothIllustration
            className={clsx(topLeftIllustrationStyles, "-left-10 -top-24")}
          />
        ),
        bottomRight: (
          <RightLeavesWithParrotIllustration
            className={clsx(bottomRightIllustrationStyles, "-right-10")}
          />
        ),
      },
    },
    plainSectionsDictionary["is-this-actor-deforesting-the-amazon-2"] && {
      type: "regular",
      name: "is-this-actor-deforesting-the-amazon-2",
      background: backgroundDeforestation6,
      content: {
        type: "plain",
        data: {
          ...mapPlainData(
            plainSectionsDictionary["is-this-actor-deforesting-the-amazon-2"],
          ),
        },
      },
      subContent: {
        type: "postcard",
        postcard: mapPostcard(
          plainSectionsDictionary["is-this-actor-deforesting-the-amazon-2"]
            ?.subContent.postcard,
        ),
      },
      illustrations: {
        bottomLeft: (
          <MonkeyInABushIllustration
            className={clsx(bottomLeftIllustrationStyles)}
          />
        ),
        bottomRight: (
          <RightParrotAndLemurIllustration
            className={clsx(bottomRightIllustrationStyles, "-right-10")}
          />
        ),
      },
    },
    climateChangeFillInTheBlankMultiPageGame && {
      type: "wavy",
      name: "climate-change-quiz",
      content: {
        type: "pager",
        data: climateChangeFillInTheBlankMultiPageGame.gamePages.map(
          (gamePage) => ({
            type: "fill-in-the-blank",
            data: {
              ...gamePage,
              numberToOptions: gamePage.blanks.map((blank) => ({
                options: blank.options,
                correctOptionPosition: blank.correctOptionPosition,
              })),
            },
          }),
        ),
      },
      illustrations: {
        topLeft: (
          <TopLeftBushIllustration
            className={clsx(topLeftIllustrationStyles, "-left-10 -top-24")}
          />
        ),
        bottomRight: (
          <ChameleonInABushIllustration
            className={clsx(
              bottomRightIllustrationStyles,
              "-bottom-24 -right-10",
            )}
          />
        ),
      },
    },
    plainSectionsDictionary["why-do-indigenous-people-work-with-rfus"] && {
      type: "regular",
      name: "why-do-indigenous-people-work-with-rfus",
      content: {
        type: "plain",
        data: {
          ...mapPlainData(
            plainSectionsDictionary["why-do-indigenous-people-work-with-rfus"],
          ),
          subTextSize: "xl",
          wideness: "custom",
          customWidth: "40.75rem",
          tracking: "-0.02em",
          paddingTop: "5rem",
        },
      },
      illustrations: {
        left: <WavingSlothIllustration className={leftIllustrationStyles} />,
        right: <RightLeavesIllustration className={rightIllustrationStyles} />,
        bottomLeft: (
          <BottomLeftBushIllustration
            className={clsx(bottomLeftIllustrationStyles, "-bottom-20")}
          />
        ),
      },
      subContent: {
        type: "polaroids",
        polaroids: mapPolaroids(
          plainSectionsDictionary["why-do-indigenous-people-work-with-rfus"]
            ?.subContent.polaroids,
        ),
      },
    },
  ];

  return discoverTheAmazonSections;
}

function mapPlainData(plainData: PlainData | undefined) {
  return {
    caption: plainData?.caption ?? "",
    captionAlign: plainData?.captionAlign as "left" | "center" | "right",
    captionColor: plainData?.captionColor,
    title: plainData?.title ?? "",
    titleAlign: plainData?.titleAlign as "left" | "center" | "right",
    titleColor: plainData?.titleColor,
    text: plainData?.text ?? "",
    textAlign:
      plainData?.textAlign ?? ("center" as "left" | "center" | "right"),
    textColor: plainData?.textColor,
    subText: plainData?.subText ?? "",
    subTextColor: plainData?.subTextColor,
  };
}

function mapPostcard(postcard: PostcardData | undefined) {
  return {
    image: postcard?.image ?? "",
    alt: postcard?.alt ?? "",
    description: postcard?.description ?? "",
  };
}

function mapPolaroid(polaroid: PolaroidData | undefined) {
  if (!polaroid?.image) return null;

  return {
    image: urlFor(polaroid.image)?.url(),
    caption: polaroid?.caption,
    captionStyle: polaroid?.captionStyle,
    description: polaroid?.description,
    imageAlignment: polaroid?.imageAlignment,
  };
}

function mapPolaroids(polaroids: PolaroidData[] | undefined) {
  return polaroids?.map(mapPolaroid) ?? [];
}

function mapLocateInMap(locateInMap: LocateInMapData) {
  return {
    type: "regular" as const,
    name: locateInMap?.name,
    background: locateInMap?.background
      ? urlFor(locateInMap.background)?.url()
      : null,
    backgroundColor: locateInMap?.backgroundColor,
    defaultHintContent: locateInMap?.defaultHintContent,
    content: {
      type: "locate-in-map" as const,
      data: mapLocateInMapData(locateInMap),
    },
  };
}

function mapLocateInMapData(locateInMapData: LocateInMapData) {
  return {
    question: locateInMapData?.question ?? "",
    questionPosition: locateInMapData?.questionPosition ?? "top",
    questionIllustration:
      locateInMapData?.questionIllustration ?? "sitting-sloth",
    center: locateInMapData?.center ?? [0, 0],
    scale: locateInMapData?.scale ?? 100,
    highlightedCountries: locateInMapData?.highlightedCountries ?? [],
    secondaryCountries: locateInMapData?.secondaryCountries ?? [],
  };
}
