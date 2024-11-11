import * as React from "react";

import {
  getPickImageGame,
  getVignettes,
  getStatisticsCards,
  getMemoryGame,
} from "@/sanity/lib/queries";

import { SectionWithContent } from "@/components/content/content";

import secondBackground from "@/assets/activities/2-background.png";
import mapBackground from "@/assets/activities/3-map-background.png";

import tropicalRainRiver1 from "@/assets/activities/01-tropical-rain-river.jpeg";
import pictureOfTheAmazon1 from "@/assets/activities/picture-of-the-amazon.jpg";
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
import monkeys31 from "@/assets/activities/31-monkeys.jpg";

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

import spatialPlanetEarth36 from "@/assets/activities/36-spatial-planet-earth.jpg";
import { PolaroidCaptionStyle } from "@/components/polaroid";
import { VignetteSection } from "@/sanity/schemaTypes/vignette";
import { MemoryGameData } from "@/sanity/schemaTypes/memoryGame";
import { StatisticsCard } from "@/sanity/schemaTypes/statisticsCard";
import { PickImageGameData } from "@/sanity/schemaTypes/pickImageGame";

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
  { title: "biodiversity-1", value: "biodiversity-1" as const },
  { title: "biodiversity-2", value: "biodiversity-2" as const },
  { title: "biodiversity-3", value: "biodiversity-3" as const },
  { title: "biodiversity-4", value: "biodiversity-4" as const },
  {
    title: "statistics-about-biodiversity",
    value: "statistics-about-biodiversity" as const,
  },
  {
    title: "statistics-about-biodiversity-cards",
    value: "statistics-about-biodiversity-cards" as const,
  },
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
    title: "why-rfus-works-in-the-amazon",
    value: "why-rfus-works-in-the-amazon" as const,
  },
  { title: "narratives", value: "narratives" as const },
  { title: "faq", value: "faq" as const },
];

export type SectionName = (typeof sectionNames)[number]["value"];

export function useGetAboutTheAmazonContent() {
  const [vignettes, setVignettes] = React.useState<VignetteSection[]>([]);
  const [memoryGame, setMemoryGame] = React.useState<MemoryGameData>();
  const [statisticsCards, setStatisticsCards] =
    React.useState<StatisticsCard[]>();
  const [pickImageGame, setPickImageGame] = React.useState<PickImageGameData>();

  React.useEffect(() => {
    async function getData() {
      const vignettesFromServer = await getVignettes();
      const memoryGameFromServer = await getMemoryGame();
      const statisticsCardsFromServer = await getStatisticsCards();

      setVignettes(vignettesFromServer);
      setMemoryGame(memoryGameFromServer?.[0]);
      setStatisticsCards(statisticsCardsFromServer);
      const pickImageGameFromServer = await getPickImageGame();

      setVignettes(vignettesFromServer);
      setMemoryGame(memoryGameFromServer);
      setPickImageGame(pickImageGameFromServer);
    }

    getData();
  }, []);

  const aboutTheAmazonSections: (SectionWithContent | undefined)[] = [
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
    },
    {
      type: "regular",
      name: "rainforests-are-exactly-what-you-d-think",
      background: secondBackground,
      content: {
        type: "fill-in-the-blank",
        data: {
          preText: "Rainforest are exactly what you’d think!",
          question: "Very <blank /> forest biomes!",
          numberToOptions: {
            0: {
              options: ["Arid", "Dry", "Rainy", "Sparse", "Scary", "Big"],
              correctOptionPosition: 3,
            },
          },
        },
      },
      subContent: {
        type: "postcard",
        postcard: {
          image: tropicalRainRiver1,
          alt: "Tropical rainforest",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        polaroid: {
          image: frogInRain2,
        },
      },
    },
    {
      type: "regular",
      background: secondBackground,
      name: "rainforests-have-a-lot-of-rain",
      content: {
        type: "fill-in-the-blank",
        data: {
          preText: "Thanks to the rain,",
          question:
            "rainforests have <blank /> climates. They stay <blank /> all year round.",
          numberToOptions: {
            0: {
              options: ["Warm", "Cold", "Wet", "Dry"],
              correctOptionPosition: 1,
            },
            1: {
              options: ["Green", "Happy"],
              correctOptionPosition: 1,
            },
          },
        },
      },
      subContent: {
        type: "postcard",
        postcard: {
          image: fillInTheBlank2,
          alt: "Rainforest",
        },
      },
    },
    {
      type: "regular",
      name: "three-most-important-rainforests",
      background: null,
      content: {
        type: "locate-in-map",
        data: {
          question: "The three most important rainforests are:",
          center: [0, 20],
          scale: 145,
          highlightedCountries: [
            "USA",
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
      preContent: {
        type: "emoji",
        emoji: "thinking-face",
      },
      content: {
        type: "plain",
        data: {
          wideness: "md",
          textAlign: "center",
          text: "Why do you think there are <b>no rainforests in Antarctica?</b>",
        },
      },
      subContent: {
        type: "postcard",
        postcard: {
          image: antarctica3,
          alt: "Antarctica",
        },
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
      subContent: {
        type: "illustration",
        kind: "happy-sloth",
      },
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
          {
            image: biodiversityButterfly4,
            caption: "Biodiversity",
          },
          {
            image: biodiversityRoraima4,
            caption: "Indigenous people",
          },
          {
            image: biodiversitySloth4,
            caption: "Unique ecosystems",
          },
        ],
      },
    },
    {
      type: "divider",
      style: "dark",
    },
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
          text: "But some humans are permanently damaging rainforests, <b>specially the Amazon!</b>",
        },
      },
      subContent: {
        type: "polaroids",
        polaroids: [
          {
            image: birds6,
            caption: "Jump to biodiversity section",
            navButton: {
              target: "biodiversity-1", // TODOK: Change to the parent name of the carousel
              alignment: "bottom-middle",
              direction: "left",
            },
          },
          {
            image: keepGoing6,
            caption: "Keep going",
            navButton: {
              target: "indigenous-peoples-in-the-amazon",
              alignment: "bottom-middle",
              direction: "bottom",
            },
          },
          {
            image: deforestation6,
            caption: "Jump to threats to the Amazon",
            navButton: {
              target: "rainforests-under-threat",
              alignment: "bottom-middle",
              direction: "right",
            },
          },
        ],
      },
    },
    {
      type: "wavy",
      name: "indigenous-peoples-in-the-amazon",
      content: {
        type: "plain",
        data: {
          wideness: "md",
          text: "Rainforest Foundation US (RFUS) partners with Indigenous peoples in the Amazon.\n<strong>What does <u>Indigenous</u> mean to you?</strong>",
          subText: "See the pictures from various Indigenous communities!",
        },
      },
      subContent: {
        type: "polaroids",
        polaroids: [
          {
            image: elders7,
          },
          {
            image: family7,
          },
          {
            image: monitors7,
          },
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
      subContent: {
        type: "polaroids",
        polaroids: [
          {
            image: nileRiver09,
            caption: "Nile River",
          },
          {
            image: yangtzeRiver09,
            caption: "Yangtze river",
          },
          {
            image: mississippiRiver09,
            caption: "Mississippi River",
          },
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
            "Half of the world’s remaining rainforest <b>is in the Amazon</b>.",
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
          ],
        },
      },
    },
    {
      type: "regular",
      name: "the-amazon-spreads-across-multiple-countries",
      background: mapBackground,
      layout: "space-between",
      content: {
        type: "fill-in-the-blank",
        data: {
          preText: "The Amazon spreads",
          subText: "(and one territory)",
          question: "across <blank /> countries",
          numberToOptions: {
            0: {
              options: ["3", "5", "8"],
              correctOptionPosition: 3,
            },
          },
        },
      },
    },
    {
      type: "regular",
      name: "select-countries-with-rainforest",
      background: null,
      backgroundColor: "#F0F4EF",
      content: {
        type: "select-countries-with-rainforest",
        data: {
          question:
            "Select the countries with <b>Amazon Rainforest</b> in them",
          questionPosition: "left",
          questionIllustration: "happy-sloth",
          center: [-88, -20],
          scale: 280,
        },
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
      subContent: {
        type: "illustration",
        kind: "happy-sloth",
      },
    },
    {
      type: "regular",
      name: "which-images-show-the-amazon",
      content: {
        type: "pick-the-image",
        data: {
          wrap: true,
          question: "Which images show the Amazon?",
          options: [
            // TODO: Use correct options + images
            {
              imageSrc: pictureOfTheAmazon1,
              isCorrect: true,
              alt: "",
              reason: "",
            },
            {
              imageSrc: pictureOfTheAmazon1,
              isCorrect: true,
              alt: "",
              reason: "",
            },
            {
              imageSrc: pictureOfTheAmazon1,
              isCorrect: true,
              alt: "",
              reason: "",
            },
            {
              imageSrc: pictureOfTheAmazon1,
              isCorrect: true,
              alt: "",
              reason: "",
            },
            {
              imageSrc: pictureOfTheAmazon1,
              isCorrect: true,
              alt: "",
              reason: "",
            },
            {
              imageSrc: pictureOfTheAmazon1,
              isCorrect: true,
              alt: "",
              reason: "",
            },
            {
              imageSrc: pictureOfTheAmazon1,
              isCorrect: true,
              alt: "",
              reason: "",
            },
            {
              imageSrc: pictureOfTheAmazon1,
              isCorrect: true,
              alt: "",
              reason: "",
            },
            {
              imageSrc: pictureOfTheAmazon1,
              isCorrect: true,
              alt: "",
              reason: "",
            },
          ],
        },
      },
    },
    {
      type: "wavy",
      name: "what-are-rainforests-quiz",
      content: {
        type: "pager",
        data: [
          {
            type: "pick-the-option",
            data: {
              question: "Rainforests are forests that:",
              options: [
                {
                  text: "Stay green all year round, and get lots of rain!",
                  isCorrect: true,
                },
                {
                  text: "Do not have a large variety of plants and animals.",
                  wrongAlertText:
                    "Rainforest have a large variety of plants and animals.",
                  isCorrect: false,
                },
                {
                  text: "Exists on every continent.",
                  isCorrect: false,
                },
              ],
            },
          },
          {
            type: "pick-the-option",
            data: {
              question: "What is the largest rainforest in the world?",
              options: [
                {
                  text: "The Amazon Rainforest",
                  isCorrect: true,
                },
                {
                  text: "The Congo Basin",
                  isCorrect: false,
                },
                {
                  text: "The Indonesian Archipelago",
                  isCorrect: false,
                },
              ],
            },
          },
          {
            type: "pick-the-option",
            data: {
              question:
                "Along with ecosystems, cities, towns, and natural ecosystems, the Amazon is home 100s of indigenous communities, each with a unique culture and way of life.",
              options: [
                {
                  text: "True",
                  isCorrect: true,
                },
                {
                  text: "False",
                  isCorrect: false,
                },
              ],
            },
          },
          {
            type: "pick-the-option",
            data: {
              question:
                "The Amazon is the largest rainforest in the world. It is home to plants and animals, cities and towns, and almost 400 unique indigenous communities!",
              options: [
                {
                  text: "True",
                  isCorrect: true,
                },
                {
                  text: "False",
                  isCorrect: false,
                },
              ],
            },
          },
        ],
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
      subContent: {
        type: "illustration",
        kind: "waving-sloth",
      },
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
        postcard: {
          image: biodiversityCollage21,
          alt: "Biodiversity collage",
        },
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
        postcard: {
          image: familyOnBoat22,
          alt: "Family on boat",
        },
      },
    },
    ...vignettes.map((vignette) => ({
      type: "vignette" as "vignette",
      name: vignette.name,
      content: {
        title: vignette.title ?? "",
        subtitle: vignette.subtitle ?? "",
        body: vignette.body ?? "",
        imageAlignment: vignette.imageAlignment ?? "start",
        image: {
          data: vignette.image.data ?? "",
          alt: vignette.image.alt ?? "",
        },
      },
    })),
    {
      type: "regular",
      name: "statistics-about-biodiversity",
      content: {
        type: "plain",
        data: {
          text: "So, just how biodiverse is the Amazon, and how much biodiversity do Indigenous peoples really protect?",
        },
      },
      subContent: [
        {
          type: "illustration",
          kind: "sitting-sloth",
        },
        {
          type: "plain",
          data: { text: "<b>These numbers give us a better picture...</b>" },
        },
      ],
    },
    {
      type: "regular",
      name: "statistics-about-biodiversity-cards",
      content: {
        type: "statistics",
        data: {
          cards: statisticsCards ?? [],
        },
      },
    },
    {
      type: "wavy",
      name: "rainforests-are-important-quiz",
      content: {
        type: "pager",
        data: [
          {
            type: "pick-the-option",
            data: {
              wrap: true,
              question:
                "Plants and animals are interconnected. They have unique roles in ecosystems, and they need each other to survive",
              options: [
                {
                  text: "True",
                  isCorrect: true,
                },
                {
                  text: "False",
                  isCorrect: false,
                },
              ],
            },
          },
          {
            type: "pick-the-option",
            data: {
              wrap: true,
              question:
                "With more biodiversity, ecosystems are more resilient. They’re stronger in the face of changes like <b>deforestation</b>.",
              options: [
                {
                  text: "True",
                  isCorrect: false,
                },
                {
                  text: "False",
                  isCorrect: true,
                },
              ],
            },
          },
          {
            type: "pick-the-option",
            data: {
              wrap: true,
              question:
                "Plants and animals give people <b>necessary resources</b> like food, clean air, and clean water..",
              options: [
                {
                  text: "True",
                  isCorrect: true,
                },
                {
                  text: "False",
                  isCorrect: false,
                },
              ],
            },
          },
          {
            type: "pick-the-option",
            data: {
              wrap: true,
              question:
                "The rainforest is being cut down. This deforestation is making biodiversity disappear..",
              options: [
                {
                  text: "True",
                  isCorrect: true,
                },
                {
                  text: "False",
                  isCorrect: false,
                },
              ],
            },
          },
        ],
      },
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
    },
    memoryGame && {
      type: "regular",
      name: "memory-game",
      background: memoryGame.backgroundImage,
      content: {
        type: "memory-game",
        data: {
          cards:
            memoryGame.cards.map(({ src, height, width, description }) => ({
              image: {
                src,
                height,
                width,
              },
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
      preContent: {
        type: "emoji",
        emoji: "thinking-face",
      },
      content: {
        type: "plain",
        data: {
          wideness: "md",
          text: "What do you think happens to animals \n <b> when rainforest disappears?</b>",
        },
      },
    },
    {
      type: "regular",
      name: "rainforests-matter",
      content: {
        type: "plain",
        data: {
          text: "So, a healthy Rainforest depends on plants and animals, like me and my friends!",
        },
      },
      subContent: [
        {
          type: "illustration",
          kind: "happy-sloth",
        },
        {
          type: "plain",
          data: {
            text: "But <b>why does the rainforest matter</b>, and what does it have to do with you?",
          },
        },
      ],
    },
    {
      type: "regular",
      name: "rainforests-keep-our-planet-healthy",
      background: backgroundAmazon,
      content: {
        type: "plain",
        data: {
          wideness: "lg",
          textAlign: "center",
          text: "Just as biodiversity keeps the Amazon healthy, the rainforest keeps our planet healthy!",
        },
      },
      subContent: {
        type: "postcard",
        postcard: {
          image: monkeys31,
          alt: "Monkeys",
        },
      },
    },
    {
      type: "regular",
      name: "rainforests-keep-our-planet-healthy",
      background: mapBackground,
      layout: "space-between",
      content: {
        type: "plain",
        data: {
          text: "I see! <b>People around the world need a healthy rainforest</b>, just as much as my friends and I do!",
        },
      },
      subContent: {
        type: "illustration",
        kind: "sad-sloth",
      },
    },
    {
      type: "regular",
      name: "rainforests-in-danger",
      background: backgroundForest33,
      content: {
        type: "fill-in-the-blank",
        data: {
          preText:
            "Right now, the Amazon is in danger, from two major threats.",
          question: "<blank /> and <blank />",
          numberToOptions: {
            0: {
              options: ["Biodiversity", "Technology", "Deforestation"],
              correctOptionPosition: 3,
            },
            1: {
              options: ["Climate change", "Indigenous peoples"],
              correctOptionPosition: 1,
            },
          },
        },
      },
    },
    {
      type: "divider",
      style: "dark",
    },
    {
      type: "regular",
      name: "climate-change-and-deforestation",
      backgroundColor: "#1E1F1B",
      background: climateChangeWildfires34,
      textColorStyle: "light",
      preContent: {
        type: "sloth",
      },
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
          {
            image: floodsClimateChange34,
            caption: "Climate change",
          },
          {
            image: deforestation34,
            caption: "Deforestation",
          },
        ],
      },
    },
    {
      type: "divider",
      style: "dark",
    },
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
          {
            image: trash35,
            caption: "Trash",
          },
          {
            image: industryPollution35,
            caption: "Industry",
          },
          {
            image: transport35,
            caption: "Transport",
          },
        ],
      },
    },
    {
      type: "divider",
      style: "dark",
    },
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
          {
            image: flood36,
            caption: "Floods",
          },
          {
            image: desert36,
            caption: "The hotter the planet is harder to live on!",
            captionStyle: PolaroidCaptionStyle.wrapPreserveAspectRatio,
          },
          {
            image: snowstorms36,
            caption: "Snowstorms",
          },
        ],
      },
    },
    {
      type: "regular",
      name: "rainforest-is-a-carbon-sink",
      backgroundColor: "#F0F4EF", // complementary-100
      background: null,
      textColorStyle: "dark",
      preContent: {
        type: "sloth",
      },
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
            {
              image: industryPollution35,
            },
            {
              image: rainforest37,
            },
            {
              image: earth37,
            },
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
      preContent: {
        type: "emoji",
        emoji: "thinking-face",
      },
      content: {
        type: "plain",
        data: {
          wideness: "md",
          text: "Scientists have learned that cutting down trees in the Amazon makes it less rainy in California, 4,000 miles away! Drought makes it harder to grow the food that feeds the U.S.",
        },
      },
    },
    pickImageGame && {
      type: "regular",
      name: "rainforests-under-threat",
      content: {
        type: "pick-the-image",
        data: {
          leftSideContent: {
            type: "sloth",
            text:
              pickImageGame.leftSideContent?.hint ||
              "Hint, there is more than one right answer!",
          },
          wrap: true,
          wideness: "xl",
          question:
            pickImageGame.question ||
            "Select the images that contain threats to the Amazon Rainforest.",
          options: pickImageGame.options.map((option) => ({
            imageSrc: option.src,
            isCorrect: option.isCorrect,
            alt: option.alt,
            reason: option.reason,
          })),
        },
      },
    },
    {
      type: "wavy",
      name: "is-this-actor-deforesting-the-amazon",
      preContent: {
        type: "emoji",
        emoji: "thinking-face",
      },
      content: {
        type: "pager",
        noSloth: true,
        data: [
          {
            type: "pick-the-option",
            data: {
              wrap: true,
              question: "Is this actor deforesting the<br/>Amazon?",
              postCardContent: {
                image: manOnBoat,
                alt: "Man on boat",
              },
              options: [
                {
                  text: "True",
                  isCorrect: false,
                },
                {
                  text: "False",
                  isCorrect: true,
                },
              ],
            },
          },
        ],
      },
    },
    {
      type: "wavy",
      name: "climate-change-quiz",
      content: {
        type: "pager",
        data: [
          {
            type: "fill-in-the-blank",
            data: {
              textColorStyle: "primary",
              fontWeightStyle: "regular",
              isNeutral: true,
              preText: "Climate change and deforestation",
              question: "<blank /> major, human-caused",
              subText: "threats to the Amazon.",
              numberToOptions: {
                0: {
                  options: ["Are", "Are not"],
                  correctOptionPosition: 1,
                },
              },
            },
          },
          {
            type: "fill-in-the-blank",
            data: {
              textColorStyle: "primary",
              fontWeightStyle: "regular",
              isNeutral: true,
              preText:
                "When we burn fuels that send greenhouse gasses into the atmosphere",
              question: "we <blank /> our planet.",
              numberToOptions: {
                0: {
                  options: ["Heat up", "Cool down"],
                  correctOptionPosition: 1,
                },
              },
            },
          },
          {
            type: "fill-in-the-blank",
            data: {
              textColorStyle: "primary",
              fontWeightStyle: "regular",
              isNeutral: true,
              preText: "",
              question: "Rainforest <blank /> carbon dioxide,",
              subText: "and act as a solution to climate change.",
              numberToOptions: {
                0: {
                  options: ["Absorb", "Release"],
                  correctOptionPosition: 1,
                },
              },
            },
          },
          {
            type: "fill-in-the-blank",
            data: {
              textColorStyle: "primary",
              fontWeightStyle: "regular",
              isNeutral: true,
              preText: "Deforestation is when we",
              question: "<blank /> trees in the forest, on purpose.",
              numberToOptions: {
                0: {
                  options: ["Plant", "Cut down"],
                  correctOptionPosition: 2,
                },
              },
            },
          },
          {
            type: "fill-in-the-blank",
            data: {
              textColorStyle: "primary",
              fontWeightStyle: "regular",
              isNeutral: true,
              preText: "Deforestation makes it",
              question: "<blank /> for forest to be",
              subText: "a climate solution",
              numberToOptions: {
                0: {
                  options: ["Possible", "Impossible"],
                  correctOptionPosition: 2,
                },
              },
            },
          },
          {
            type: "fill-in-the-blank",
            data: {
              textColorStyle: "primary",
              fontWeightStyle: "regular",
              isNeutral: true,
              preText: "The rainforest makes our planet",
              question: "a <blank /> place to live",
              numberToOptions: {
                0: {
                  options: ["safer", "dangerous"],
                  correctOptionPosition: 1,
                },
              },
            },
          },
          {
            type: "fill-in-the-blank",
            data: {
              textColorStyle: "primary",
              fontWeightStyle: "regular",
              isNeutral: true,
              preText: "",
              question: "People <blank /> depend",
              subText: "on the rainforest for clean water.",
              numberToOptions: {
                0: {
                  options: ["in the rainforest", "all around the world"],
                  correctOptionPosition: 2,
                },
              },
            },
          },
          {
            type: "fill-in-the-blank",
            data: {
              textColorStyle: "primary",
              fontWeightStyle: "regular",
              isNeutral: true,
              preText: "Indigenous people are",
              question: "the <blank /> protectors",
              subText: "of biodiversity and rainforests.",
              numberToOptions: {
                0: {
                  options: ["Are", "Are not"],
                  correctOptionPosition: 1,
                },
              },
            },
          },
        ],
      },
    },
  ];

  return aboutTheAmazonSections;
}
