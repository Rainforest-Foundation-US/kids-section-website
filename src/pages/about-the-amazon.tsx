import { LearningPath } from "@/components/learning-path-map";
import { NavBar } from "@/components/layout/nav";
import { HomeSectionsContainer } from "@/components/sections";
import Head from "next/head";

import fillInTheBlank1 from "@/assets/activities/fill-in-the-blank/climate/1-biome.jpg";
import fillInTheBlank2 from "@/assets/activities/fill-in-the-blank/climate/2-weather.jpg";
import antarctica from "@/assets/activities/intro/1-antarctica.jpg";

import mainBackground from "@/assets/activities/1-background.png";
import secondBackground from "@/assets/activities/2-background.png";
import mapBackground from "@/assets/activities/3-map-background.png";
import humanActivityBackground from "@/assets/activities/4-human-background.png";

import pictureOfTheAmazon1 from "@/assets/activities/picture-of-the-amazon.jpg";
import amazonLargestRiver from "@/assets/activities/amazon-largest-river.jpg";

import biodiversity1 from "@/assets/activities/biodiversity/1-forest.png";
import biodiversity2 from "@/assets/activities/biodiversity/2-species.png";
import biodiversity3 from "@/assets/activities/biodiversity/3-burning.png";
import biodiversity4 from "@/assets/activities/biodiversity/4-natives.png";
import { Footer } from "@/components/layout/footer";
import {
  ContentSectionList,
  SectionWithContent,
} from "@/components/content/content";

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
      image: fillInTheBlank1,
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
      image: antarctica,
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
      images: [
        {
          image: antarctica,
          caption: "Biodiversity",
        },
        {
          image: antarctica,
          caption: "Biodiversity",
        },
        {
          image: antarctica,
          caption: "Biodiversity",
        },
      ],
    },
  },
  {
    type: "regular",
    background: humanActivityBackground,
    content: {
      type: "plain",
      data: {
        text: "But some humans are permanently damaging rainforests, <b>specially the Amazon!</b>",
      },
    },
  },
  {
    type: "wavy",
    content: {
      type: "plain",
      data: {
        size: "md",
        text: "Rainforest Foundation US (RFUS) partners with indigenous peoples in the Amazon.\n<strong>What does <u>indigenous</u> mean to you?</strong>",
      },
    },
  },
  {
    type: "regular",
    background: amazonLargestRiver,
    backgroundOpacity: 0.64,
    backgroundColor: "#FAF5EE",
    content: {
      type: "plain",
      data: {
        text: "The Amazon is the biggest tropical rainforest in the world! At its heart: <b>the Amazon River, the largest river on Earth, by far</b>",
      },
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
  },
  {
    type: "regular",
    background: null,
    content: {
      type: "locate-in-map",
      data: {
        question: "The three most important rainforests are:",
        center: [-88, -20],
        scale: 280,
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
    content: {
      type: "plain",
      data: {
        text: "Now we know how big my home is, <b>but what does life in the Amazon actually look like?</b>",
      },
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
            isCorrect: false,
          },
          {
            text: "exists on every continent",
            isCorrect: false,
          },
        ],
      },
    },
  },
  {
    type: "regular",
    content: {
      type: "plain",
      data: {
        text: "So, we understand a bit about rainforests!\n<b>But, there's a lot more to learn...</b>",
      },
    },
  },
  {
    type: "regular",
    content: {
      type: "plain",
      data: {
        text: "There are more types of plants and animals in the Amazon <b>than han anywhere on Earth...</b>",
      },
    },
  },
  {
    type: "regular",
    content: {
      type: "plain",
      data: {
        text: "...and the <b>400 indigenous communities that live here protect</b> this biodiversity!",
      },
    },
  },
  {
    type: "vignette",
    content: {
      title: "Biodiversity",
      subtitle: "(or “biological diversity) is...",
      imageAlignment: "start",
      image: biodiversity1,
    },
  },
  {
    type: "vignette",
    content: {
      title: "Biodiversity",
      subtitle: "(or “biological diversity) is...",
      body: "...a word that refers to the variety of life on Earth. The many different types of plants, animals, fungi, bacteria, and people too!",
      imageAlignment: "start",
      image: biodiversity2,
    },
  },
  {
    type: "vignette",
    content: {
      title: "Biodiversity",
      subtitle: "(or “biological diversity) is...",
      body: "...threatened by deforestation and climate change.",
      imageAlignment: "start",
      image: biodiversity3,
    },
  },
  {
    type: "vignette",
    content: {
      title: "Biodiversity",
      subtitle: "(or “biological diversity) is...",
      body: "...protected by indigenous peoples around the world!",
      imageAlignment: "start",
      image: biodiversity4,
    },
  },
  {
    type: "regular",
    content: {
      type: "plain",
      data: {
        text: "So, just how biodiverse is the Amazon, and how much biodiversity do indigenous peoples really protect?",
        caption: "These numbers give us a better picture...",
      },
    },
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
