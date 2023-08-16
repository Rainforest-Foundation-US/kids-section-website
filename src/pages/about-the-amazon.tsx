import { LearningPath } from "@/components/learning-path-map";
import { NavBar } from "@/components/layout/nav";
import { HomeSectionsContainer } from "@/components/sections";
import Head from "next/head";

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

import biodiversity23_1 from "@/assets/activities/23-1-biodiversity-forest.png";
import biodiversity23_2 from "@/assets/activities/23-2-biodiversity-species.png";
import biodiversity23_3 from "@/assets/activities/23-3-biodiversity-burning.png";
import biodiversity23_4 from "@/assets/activities/23-4-biodiversity-natives.png";

import climateChangeWildfires34 from "@/assets/activities/34-climate-change-wildfires.png";

import spatialPlanetEarth36 from "@/assets/activities/36-spatial-planet-earth.jpg";

import { Footer } from "@/components/layout/footer";
import {
  ContentSectionList,
  SectionWithContent,
} from "@/components/content/content";
import { PolaroidCaptionStyle } from "@/components/polaroid";

const aboutTheAmazonSections: SectionWithContent[] = [
  {
    type: "regular",
    align: "left",
    content: {
      type: "plain",
      data: {
        size: "md",
        textAlign: "left",
        text: "You might be wondering: <b>What is a rainforest?</b>",
      },
    },
  },
  {
    type: "regular",
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
      image: tropicalRainRiver1,
      polaroid: {
        image: frogInRain2,
      },
    },
  },
  {
    type: "regular",
    background: secondBackground,
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
      image: fillInTheBlank2,
    },
  },
  {
    type: "regular",
    background: null,
    content: {
      type: "locate-in-map",
      data: {
        question: "The three most important rainforests are:",
        center: [0, 20],
        scale: 145,
        countries: [
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
    preContent: {
      type: "emoji",
      emoji: "thinking-face",
    },
    content: {
      type: "plain",
      data: {
        size: "md",
        textAlign: "center",
        text: "Why do you think there are <b>no rainforests in Antarctica?</b>",
      },
    },
    subContent: {
      type: "postcard",
      image: antarctica3,
    },
  },
  {
    type: "regular",
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
    background: secondBackground,
    content: {
      type: "plain",
      data: {
        size: "xl",
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
    backgroundOpacity: 0.5,
    backgroundColor: "#1E1F1B",
    background: backgroundDeforestation6,
    textColorStyle: "light",
    noNextButton: true,
    content: {
      type: "plain",
      data: {
        size: "xl",
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
            target: "biodiversity",
            alignment: "bottom-middle",
            direction: "left",
          },
        },
        {
          image: keepGoing6,
          caption: "Keep going",
          navButton: {
            target: "next",
            alignment: "bottom-middle",
            direction: "bottom",
          },
        },
        {
          image: deforestation6,
          caption: "Jump to threats to the Amazon",
          navButton: {
            target: "threats",
            alignment: "bottom-middle",
            direction: "right",
          },
        },
      ],
    },
  },
  {
    type: "wavy",
    content: {
      type: "plain",
      data: {
        size: "md",
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
        countries: [
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
        markers: [],
      },
    },
  },
  {
    type: "regular",
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
        countries: [
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
        markers: [],
      },
    },
  },
  {
    type: "regular",
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
  // Pending: Add the map activity here
  {
    type: "regular",
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
          },
          {
            imageSrc: pictureOfTheAmazon1,
            isCorrect: true,
            alt: "",
          },
          {
            imageSrc: pictureOfTheAmazon1,
            isCorrect: true,
            alt: "",
          },
          {
            imageSrc: pictureOfTheAmazon1,
            isCorrect: true,
            alt: "",
          },
          {
            imageSrc: pictureOfTheAmazon1,
            isCorrect: true,
            alt: "",
          },
          {
            imageSrc: pictureOfTheAmazon1,
            isCorrect: true,
            alt: "",
          },
          {
            imageSrc: pictureOfTheAmazon1,
            isCorrect: true,
            alt: "",
          },
          {
            imageSrc: pictureOfTheAmazon1,
            isCorrect: true,
            alt: "",
          },
          {
            imageSrc: pictureOfTheAmazon1,
            isCorrect: true,
            alt: "",
          },
        ],
      },
    },
  },
  // TODO: Add: "All of them are in the Amazon!" which is mostly a dup of the previous section but the "options" or locations have a shown label
  {
    type: "wavy",
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
    background: backgroundAmazon,
    content: {
      type: "plain",
      data: {
        size: "lg",
        textAlign: "center",
        text: "There are more types of plants and animals in the Amazon <b>than anywhere else on Earth...</b>",
      },
    },
    subContent: {
      type: "postcard",
      image: biodiversityCollage21,
    },
  },
  {
    type: "regular",
    background: backgroundAmazon,
    content: {
      type: "plain",
      data: {
        size: "lg",
        textAlign: "center",
        text: "...and the <b>400 Indigenous communities</b> that live here <b>protect</b> this biodiversity!",
      },
    },
    subContent: {
      type: "postcard",
      image: familyOnBoat22,
    },
  },
  {
    type: "vignette",
    name: "biodiversity",
    content: {
      title: "Biodiversity",
      subtitle: "(or “biological diversity) is...",
      imageAlignment: "start",
      image: biodiversity23_1,
    },
  },
  {
    type: "vignette",
    content: {
      title: "Biodiversity",
      subtitle: "(or “biological diversity) is...",
      body: "...a word that refers to the variety of life on Earth. The many different types of plants, animals, fungi, bacteria, and people too!",
      imageAlignment: "start",
      image: biodiversity23_2,
    },
  },
  {
    type: "vignette",
    content: {
      title: "Biodiversity",
      subtitle: "(or “biological diversity) is...",
      body: "...threatened by deforestation and climate change.",
      imageAlignment: "start",
      image: biodiversity23_3,
    },
  },
  {
    type: "vignette",
    content: {
      title: "Biodiversity",
      subtitle: "(or “biological diversity) is...",
      body: "...protected by Indigenous peoples around the world!",
      imageAlignment: "start",
      image: biodiversity23_4,
    },
  },
  {
    type: "regular",
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
  // TODO: Add a section with statistics about biodiversity in the Amazon
  {
    type: "wavy",
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
    content: {
      type: "plain",
      data: {
        text: "So, just how biodiverse is the Amazon, and how much biodiversity do Indigenous peoples really protect?",
      },
    },
  },
  {
    type: "divider",
    style: "dark",
  },
  {
    type: "regular",
    backgroundColor: "#1E1F1B",
    background: climateChangeWildfires34,
    textColorStyle: "light",
    preContent: {
      type: "sloth",
    },
    content: {
      type: "plain",
      data: {
        size: "2xl",
        text: "I'm not sure what <q>climate change</q> and <q>deforestation</q> are. <b>Let's take a deeper look!</b>",
      },
    },
    subContent: {
      type: "polaroids",
      polaroids: [
        {
          image: birds6,
          caption: "Jump to biodiversity section",
        },
        {
          image: deforestation6,
          caption: "Jump to threats to the Amazon",
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
    backgroundColor: "#1E1F1B",
    background: null,
    textColorStyle: "light",
    content: {
      type: "plain",
      data: {
        size: "lg",
        text: "What is climate change?",
        subText:
          "When we burn fossil fuels (like oil) we send greenhouse gasses (like carbon dioxide) into the air. These gasses heat out planet.",
      },
    },
    subContent: {
      type: "polaroids",
      polaroids: [
        {
          image: birds6,
          caption: "Jump to biodiversity section",
        },
        {
          image: deforestation6,
          caption: "Jump to threats to the Amazon",
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
    background: spatialPlanetEarth36,
    textColorStyle: "light-shadows",
    content: {
      type: "plain",
      data: {
        size: "xl",
        text: "Climate change has all kinds of negative effects, including causing more dangerous storms, and making it harder to grow food!",
      },
    },
    subContent: {
      type: "polaroids",
      polaroids: [
        {
          image: birds6,
          caption: "Jump to biodiversity section",
        },
        {
          image: deforestation6,
          caption: "Jump to threats to the Amazon",
        },
      ],
    },
  },
  {
    type: "regular",
    backgroundColor: "#F0F4EF", // complementary-100
    background: null,
    textColorStyle: "dark",
    noNextButton: true,
    preContent: {
      type: "sloth",
    },
    content: {
      type: "plain",
      data: {
        size: "xl",
        text: "<b>The rainforest is a carbon sink</b>. It absorbs greenhouse gasses (GHGs) we send into the air, and Earth heats up less)",
      },
    },
    subContent: {
      type: "polaroids",
      polaroids: [
        {
          image: deforestation6,
        },
        {
          image: birds6,
        },
        {
          image: deforestation6,
        },
      ],
    },
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>
          {"About the Amazon - Kids' Corner - Rainforest Foundation US"}
        </title>
      </Head>

      <main className="overflow-hidden bg-neutral-600">
        <HomeSectionsContainer>
          <div className="absolute inset-x-0 top-0">
            <NavBar />
          </div>

          <aside className="absolute right-10 top-[8rem] z-20 w-[289px]">
            <LearningPath />
          </aside>

          <ContentSectionList sections={aboutTheAmazonSections} />
        </HomeSectionsContainer>

        <Footer />
      </main>
    </>
  );
}
