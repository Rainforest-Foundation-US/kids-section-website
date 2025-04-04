import * as React from "react";

import {
  getPickImageGames,
  getVignettes,
  getStatisticsCards,
  getMemoryGame,
  getPickOptionMultiPageGames,
  getFillInTheBlankGames,
  getFillInTheBlankMultiPageGames,
} from "@/sanity/lib/queries";

import { SectionWithContent } from "@/components/content/content";

import secondBackground from "@/assets/activities/2-background.png";

import tropicalRainRiver1 from "@/assets/activities/01-tropical-rain-river.jpeg";
import backgroundAmazon from "@/assets/activities/background-amazon.png";

import fillInTheBlank2 from "@/assets/activities/fill-in-the-blank/climate/2-weather.jpg";
import frogInRain2 from "@/assets/activities/02-frog-in-rain.jpg";

import antarctica3 from "@/assets/activities/03-antarctica.jpeg";

import biodiversityButterfly4 from "@/assets/activities/04-biodiversity-butterfly.jpeg";
import biodiversityRoraima4 from "@/assets/activities/04-biodiversity-roraima.png";
import biodiversitySloth4 from "@/assets/activities/04-biodiversity-sloth.jpeg";

import backgroundDeforestation6 from "@/assets/activities/06-background-deforestation.jpg";
import birds6 from "@/assets/activities/06-birds.jpeg";
import deforestation6 from "@/assets/activities/06-deforestation.png";
import keepGoing6 from "@/assets/activities/06-keep-going.png";

import elders7 from "@/assets/activities/07-elders.jpg";
import family7 from "@/assets/activities/07-family.png";
import monitors7 from "@/assets/activities/07-monitors.png";

import backgroundRiver8 from "@/assets/activities/08-background-river.png";
import amazonRiver8 from "@/assets/activities/08-amazon-river.png";
import amazonRiverWide8 from "@/assets/activities/08-amazon-river-wide.png";

import nileRiver09 from "@/assets/activities/09-nile-river.jpg";
import yangtzeRiver09 from "@/assets/activities/09-yangtze-river.jpg";
import mississippiRiver09 from "@/assets/activities/09-mississippi-river.jpg";

import backgroundHouse13 from "@/assets/activities/13-background-house.png";

import biodiversityCollage21 from "@/assets/activities/21-biodiversity-collage.jpg";
import familyOnBoat22 from "@/assets/activities/22-family-on-boat.jpg";
import manOnBoat from "@/assets/activities/man-on-boat.png";

import backgroundForest33 from "@/assets/activities/33-background-forest.jpg";

import deforestation34 from "@/assets/activities/34-deforestation.jpg";
import floodsClimateChange34 from "@/assets/activities/34-floods-climate-change.jpg";

import trash35 from "@/assets/activities/35-trash.jpg";
import industryPollution35 from "@/assets/activities/35-industry-pollution.jpg";
import transport35 from "@/assets/activities/35-transport.jpg";

import flood36 from "@/assets/activities/36-floods.jpg";
import desert36 from "@/assets/activities/36-desert.jpg";
import snowstorms36 from "@/assets/activities/36-snowstorms.jpg";

import rainforest37 from "@/assets/activities/37-rainforest.jpg";
import earth37 from "@/assets/activities/37-earth.jpg";

import climateChangeWildfires34 from "@/assets/activities/34-climate-change-wildfires.png";

import rfusTeam from "@/assets/activities/rfus-team.png";
import littleGirls from "@/assets/activities/little-girls.png";

import spatialPlanetEarth36 from "@/assets/activities/36-spatial-planet-earth.jpg";
import { PolaroidCaptionStyle } from "@/components/polaroid";
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
  FlamingoAndChameleonIllustration,
  RightParrotAndLemurIllustration,
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

      setVignettes(vignettesFromServer);
      setMemoryGame(memoryGameFromServer);
      setStatisticsCards(statisticsCardsFromServer);
      setPickImageGames(pickImageGamesFromServer);
      setPickOptionMultiPageGames(pickOptionMultiPageGamesFromServer);
      setFillInTheBlankGames(fillInTheBlankGamesFromServer);
      setFillInTheBlankMultiPageGames(fillInTheBlankMultiPageGamesFromServer);
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

  const discoverTheAmazonSections: (SectionWithContent | undefined)[] = [
    {
      type: "regular",
      name: "what-is-the-amazon",
      align: "left",
      content: {
        type: "plain",
        data: {
          wideness: "md",
          textAlign: "left",
          text: "You might be wondering: <b>What is a rainforest?</b>",
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
        postcard: {
          image: tropicalRainRiver1,
          alt: "Tropical rainforest",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        polaroid: { image: frogInRain2 },
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
    {
      type: "regular",
      name: "three-most-important-rainforests",
      background: null,
      defaultHintContent: {
        hint: "Rainforest Foundation US works in the Amazon",
      },
      content: {
        type: "locate-in-map",
        data: {
          question: "The three most important rainforests are:",
          center: [0, 20],
          scale: 125,
          highlightedCountries: [
            "VEN",
            "COL",
            "BRA",
            "PER",
            "ECU",
            "GUY",
            "SUR",
            "CMR",
            "GAB",
            "COG",
            "COD",
            "CAF",
            "IDN",
          ],
          secondaryCountries: ["USA"],
          shouldApplyLGVignette: false,
          markers: [
            {
              position: [-110, 46],
              text: "United States",
              orientation: "top-right",
            },
            {
              position: [-81, -1],
              text: "The Amazon Basin, in South America",
              orientation: "left",
            },
            {
              position: [10, 7],
              text: "The Congo Basin, in Subsaharan Africa",
              orientation: "top-left",
            },
            {
              position: [105, -6],
              text: "The Indonesian Archipelago",
              orientation: "bottom-left",
            },
          ],
        },
      },
    },
    {
      type: "wavy",
      name: "why-no-rainforests-in-antarctica",
      content: {
        type: "plain",
        data: {
          wideness: "md",
          textAlign: "center",
          text: "Why do you think there are <b>no rainforests in Antarctica?</b>",
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
        postcard: { image: antarctica3, alt: "Antarctica" },
      },
    },
    {
      type: "regular",
      name: "why-rfus-works-in-the-amazon",
      content: {
        type: "plain",
        data: {
          text: "To understand why Rainforest Foundation US (RFUS) works in the Amazon, what we do, and who we partner with, <b>we have to learn more about the Amazon!</b>",
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
    {
      type: "regular",
      name: "rainforests-are-among-the-oldest",
      background: secondBackground,
      content: {
        type: "plain",
        data: {
          wideness: "xl",
          text: "Rainforests are among <b>the oldest, most complex and interconnected communities of life</b> on Earth.",
        },
      },
      subContent: {
        type: "polaroids",
        polaroids: [
          { image: biodiversityButterfly4, caption: "Biodiversity" },
          { image: biodiversityRoraima4, caption: "Indigenous people" },
          { image: biodiversitySloth4, caption: "Unique ecosystems" },
        ],
      },
    },
    { type: "divider", style: "dark" },
    {
      type: "regular",
      name: "deforestation-in-the-amazon",
      backgroundOpacity: 0.5,
      backgroundColor: "#1E1F1B",
      background: backgroundDeforestation6,
      textColorStyle: "light",
      content: {
        type: "plain",
        data: {
          wideness: "xl",
          text: "But some humans are permanently damaging rainforests, <b>especially the Amazon!</b>",
        },
      },
      subContent: {
        type: "polaroids",
        polaroids: [
          { image: birds6, caption: "Jump to biodiversity section" },
          { image: keepGoing6, caption: "Keep going" },
          { image: deforestation6, caption: "Jump to threats to the Amazon" },
        ],
      },
    },
    {
      type: "regular",
      name: "the-amazon-is-the-biggest-tropical-rainforest",
      background: backgroundRiver8,
      backgroundOpacity: 0.64,
      backgroundColor: "#FAF5EE",
      content: {
        type: "plain",
        data: {
          text: "The Amazon is the biggest tropical rainforest in the world! At its heart: <b>the Amazon River, the largest river on Earth, by far</b>",
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
        polaroids: [
          {
            image: amazonRiver8,
            caption:
              "The Amazon River is huge, In fact, it has the most water of any river on Earth.",
            captionStyle: PolaroidCaptionStyle.wrap,
          },

          {
            image: amazonRiverWide8,
            caption:
              "At its widest, the Amazon river could hold all of Paris, France!",
            captionStyle: PolaroidCaptionStyle.wrap,
          },
        ],
      },
    },
    {
      type: "wavy",
      name: "other-rivers-on-earth",
      content: {
        type: "plain",
        data: {
          text: "<b>The other 9 largest rivers on Earth combined</b>, would have less water than the Amazon!",
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
        polaroids: [
          { image: nileRiver09, caption: "Nile River" },
          { image: yangtzeRiver09, caption: "Yangtze river" },
          { image: mississippiRiver09, caption: "Mississippi River" },
        ],
      },
    },
    {
      type: "regular",
      name: "half-of-the-worlds-rainforests-are-in-the-amazon",
      background: null,
      backgroundColor: "#F0F4EF",
      content: {
        type: "locate-in-map",
        data: {
          question:
            "Half of the world's remaining rainforest <b>is in the Amazon</b>.",
          questionPosition: "left",
          questionIllustration: "sitting-sloth",
          center: [-88, -20],
          scale: 280,
          highlightedCountries: [
            "VEN",
            "COL",
            "BRA",
            "PER",
            "ECU",
            "GUY",
            "SUR",
            "CMR",
            "GAB",
            "COG",
            "COD",
            "CAF",
            "IDN",
            "FRA",
          ],
        },
      },
    },
    {
      type: "regular",
      name: "the-whole-united-states-in-the-amazon",
      background: null,
      backgroundColor: "#F0F4EF",
      content: {
        type: "locate-in-map",
        data: {
          question:
            "Wow, <b>the whole United States</b> can fit inside the Amazon!",
          questionPosition: "left",
          questionIllustration: "sitting-sloth",
          center: [-88, -20],
          scale: 280,
          highlightedCountries: [
            "VEN",
            "COL",
            "BRA",
            "PER",
            "ECU",
            "GUY",
            "SUR",
            "CMR",
            "GAB",
            "COG",
            "COD",
            "CAF",
            "IDN",
            "FRA",
          ],
        },
      },
    },
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
    {
      type: "regular",
      name: "life-in-the-amazon",
      background: backgroundHouse13,
      content: {
        type: "plain",
        data: {
          text: "Now we know how big my home is, <b>but what does life in the Amazon actually look like?</b>",
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
          options: whichImagesShowTheAmazonPickImageGame.options,
        },
      },
    },
    {
      type: "regular",
      name: "indigenous-peoples-in-the-amazon",
      content: {
        type: "plain",
        data: {
          wideness: "md",
          text: "Rainforest Foundation US (RFUS) partners with Indigenous peoples in the Amazon.\n<strong>What does <u>Indigenous</u> mean to you?</strong>",
          subText: "See the pictures from various Indigenous communities!",
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
        polaroids: [
          { image: elders7 },
          { image: family7 },
          { image: monitors7 },
        ],
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
    {
      type: "regular",
      name: "so-much-more-to-learn",
      background: backgroundHouse13,
      content: {
        type: "plain",
        data: {
          text: "So, we understand a bit about rainforests!\n<b>But, there's a lot more to learn...</b>",
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
    {
      type: "regular",
      name: "more-plants-and-animals-than-anywhere-else",
      background: backgroundAmazon,
      content: {
        type: "plain",
        data: {
          wideness: "lg",
          textAlign: "center",
          text: "There are more types of plants and animals in the Amazon <b>than anywhere else on Earth...</b>",
        },
      },
      subContent: {
        type: "postcard",
        postcard: { image: biodiversityCollage21, alt: "Biodiversity collage" },
      },
    },
    {
      type: "regular",
      name: "indigenous-peoples-in-the-amazon",
      background: backgroundAmazon,
      content: {
        type: "plain",
        data: {
          wideness: "lg",
          textAlign: "center",
          text: "...and the <b>400 Indigenous communities</b> that live here <b>protect</b> this biodiversity!",
        },
      },
      subContent: {
        type: "postcard",
        postcard: { image: familyOnBoat22, alt: "Family on boat" },
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
            })),
        ],
      },
    },
    {
      type: "regular",
      name: "find-the-animals",
      background: secondBackground,
      content: { type: "find-the-animals" },
    },
    {
      type: "regular",
      name: "statistics-about-biodiversity",
      content: {
        type: "plain",
        data: {
          text: "So, just how biodiverse is the Amazon, and how much biodiversity do Indigenous peoples really protect?",
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
          data: { text: "<b>These numbers give us a better picture...</b>" },
        },
      ],
    },
    {
      type: "regular",
      name: "statistics-about-biodiversity-cards",
      content: { type: "statistics", data: { cards: statisticsCards ?? [] } },
    },
    {
      type: "regular",
      name: "memory-game-pre",
      content: {
        type: "plain",
        data: {
          text: "Amazon biodiversity is so important, <b> but it is under threat! </b> ",
          subText:
            "Learn about the plants and animals whose home is disappearing with a Memory game.",
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
    {
      type: "wavy",
      name: "what-happens-to-animals-when-rainforest-disappears",
      content: {
        type: "plain",
        data: {
          wideness: "md",
          text: "What do you think happens to animals \n <b> when rainforest disappears?</b>",
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
        bottomLeft: (
          <FlamingoAndChameleonIllustration
            className={bottomLeftIllustrationStyles}
          />
        ),
        right: (
          <RightParrotAndLemurIllustration
            className={rightIllustrationStyles}
          />
        ),
      },
      subContent: [
        { type: "illustration", kind: "happy-sloth" },
        {
          type: "plain",
          data: {
            text: "Indigenous communities have spent thousands of years learning about all the creatures in the rainforest, and have carefully passed down values, knowledge, and practices for keeping the forest where they live in balance.",
          },
        },
      ],
    },
    {
      type: "regular",
      name: "rainforests-keep-our-planet-healthy",
      className: "min-h-80",
      content: {
        type: "plain",
        data: {
          text: "I see! <b>People around the world need a healthy rainforest</b>, just as much as my friends and I do!",
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
    {
      type: "regular",
      name: "climate-change-and-deforestation",
      backgroundColor: "#1E1F1B",
      background: climateChangeWildfires34,
      textColorStyle: "light",
      preContent: { type: "sloth" },
      content: {
        type: "plain",
        data: {
          wideness: "2xl",
          text: "I'm not sure what <q>climate change</q> and <q>deforestation</q> are. <b>Let's take a deeper look!</b>",
        },
      },
      subContent: {
        type: "polaroids",
        polaroids: [
          { image: floodsClimateChange34, caption: "Climate change" },
          { image: deforestation34, caption: "Deforestation" },
        ],
      },
    },
    { type: "divider", style: "dark" },
    {
      type: "regular",
      name: "what-is-climate-change",
      backgroundColor: "#1E1F1B",
      background: null,
      textColorStyle: "light",
      content: {
        type: "plain",
        data: {
          wideness: "lg",
          text: "What is climate change?",
          subText:
            "When we burn fossil fuels (like oil) we send greenhouse gasses (like carbon dioxide) into the air. These gasses heat out planet.",
        },
      },
      subContent: {
        type: "polaroids",
        polaroids: [
          { image: trash35, caption: "Trash" },
          { image: industryPollution35, caption: "Industry" },
          { image: transport35, caption: "Transport" },
        ],
      },
    },
    { type: "divider", style: "dark" },
    {
      type: "regular",
      name: "climate-change-effects",
      background: spatialPlanetEarth36,
      textColorStyle: "light-shadows",
      content: {
        type: "plain",
        data: {
          wideness: "xl",
          text: "Climate change has all kinds of negative effects, including causing more dangerous storms, and making it harder to grow food!",
        },
      },
      subContent: {
        type: "polaroids",
        polaroids: [
          { image: flood36, caption: "Floods" },
          {
            image: desert36,
            caption: "The hotter the planet is harder to live on!",
            captionStyle: PolaroidCaptionStyle.wrapPreserveAspectRatio,
          },
          { image: snowstorms36, caption: "Snowstorms" },
        ],
      },
    },
    {
      type: "regular",
      name: "rainforest-is-a-carbon-sink",
      backgroundColor: "#F0F4EF", // complementary-100
      background: null,
      textColorStyle: "dark",
      preContent: { type: "sloth" },
      content: {
        type: "plain",
        data: {
          wideness: "xl",
          text: "The rainforest is a <b>carbon sink</b>. It absorbs greenhouse gasses we send into the air, and Earth heats up less)",
        },
      },
      subContent: [
        {
          type: "polaroids",
          polaroids: [
            { image: industryPollution35 },
            { image: rainforest37 },
            { image: earth37 },
          ],
        },
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
    {
      type: "wavy",
      name: "deforestation-effects",
      content: {
        type: "plain",
        data: {
          wideness: "md",
          text: "Scientists have learned that cutting down trees in the Amazon makes it less rainy in California, 4,000 miles away! Drought makes it harder to grow the food that feeds the U.S.",
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
          options: rainforestUnderThreatPickImageGame.options,
        },
      },
    },
    {
      type: "wavy",
      name: "is-this-actor-deforesting-the-amazon",
      content: {
        type: "plain",
        data: {
          text: "Is this actor deforesting the<br/>Amazon?",
        },
      },
      subContent: {
        type: "postcard",
        postcard: {
          image: manOnBoat,
          alt: "Man on boat",
        },
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
    {
      type: "regular",
      name: "is-this-actor-deforesting-the-amazon-2",
      content: {
        type: "plain",
        data: {
          text: "Is this actor deforesting the<br/>Amazon 2?",
        },
      },
      subContent: {
        type: "postcard",
        postcard: {
          image: manOnBoat,
          alt: "Man on boat",
        },
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
    {
      type: "regular",
      name: "why-do-indigenous-people-work-with-rfus",
      content: {
        type: "plain",
        data: {
          text: "Indigenous peoples sure do a lot to protect the rainforest! If they already have solutions, <b>why do they work with Rainforest Foundation US?</b>",
          subText:
            "Before we can answer this question, we have to understand what everyday life in the Amazon rainforest is like!",
          subTextColor: "text-neutral-dark-500",
          subTextSize: "xl",
          textAlign: "left",
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
        polaroids: [
          {
            image: littleGirls,
            caption: "Learn about life in the Amazon",
            captionStyle: PolaroidCaptionStyle.wrap,
          },

          {
            image: rfusTeam,
            caption: "Learn how RFUS supports indigenous peoples!",
            captionStyle: PolaroidCaptionStyle.wrap,
          },
        ],
      },
    },
  ];

  return discoverTheAmazonSections;
}
