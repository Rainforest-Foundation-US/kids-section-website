import { FillInTheBlankActivity } from "@/components/content/activities/fill-in-the-blank";
import { LearningPath } from "@/components/learning-path-map";
import { LocateInMapActivity } from "@/components/content/activities/locate-in-map";
import { HomeGoToSectionButton } from "@/components/buttons";
import { NavBar } from "@/components/layout/nav";
import {
  ActivitySection,
  ActivitySectionDivider,
  HomeSectionsContainer,
} from "@/components/sections";
import { VignetteSection } from "@/components/sections/vignette-section";
import clsx from "@/utils/clsx";
import Head from "next/head";
import Image from "next/image";

import fillInTheBlank1 from "@/assets/activities/fill-in-the-blank/climate/1-biome.jpg";
import fillInTheBlank2 from "@/assets/activities/fill-in-the-blank/climate/2-weather.jpg";
import intro1 from "@/assets/activities/intro/1-antarctica.jpg";

import mainBackground from "@/assets/activities/1-background.png";
import secondBackground from "@/assets/activities/2-background.png";
import pictureOfTheAmazon1 from "@/assets/activities/picture-of-the-amazon.jpg";
import amazonLargestRiver from "@/assets/activities/amazon-largest-river.jpg";

import biodiversity1 from "@/assets/activities/biodiversity/1-forest.png";
import biodiversity2 from "@/assets/activities/biodiversity/2-species.png";
import biodiversity3 from "@/assets/activities/biodiversity/3-burning.png";
import biodiversity4 from "@/assets/activities/biodiversity/4-natives.png";
import { Footer } from "@/components/layout/footer";
import { PickTheOptionActivity } from "@/components/content/activities/pick-the-option";
import { WavySection } from "@/components/sections/wavy-section";
import {
  SittingSlothIllustration,
  WavySeparator,
} from "@/components/activities-illustrations";
import { Polaroid } from "@/components/polaroid";
import {
  ContentSectionList,
  SectionWithContent,
} from "@/components/content/content";

const aboutTheAmazonSections: SectionWithContent[] = [
  {
    type: "regular",
    content: {
      type: "plain",
      data: {
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
  },
  {
    type: "wavy",
    content: {
      type: "plain",
      data: {
        text: "Why do you think there are <b>no rainforests in Antarctica?</b>",
      },
    },
  },
  {
    type: "regular",
    content: {
      type: "plain",
      data: {
        text: "To understand why Rainforest Foundation US (RFUS) works in the Amazon, what we do, and who we partner with, we have to learn more about the Amazon!",
      },
    },
  },
  {
    type: "regular",
    background: secondBackground,
    content: {
      type: "plain",
      data: {
        text: "Rainforests are among <b>the oldest, most complex and interconnected communities of life</b> on Earth.",
      },
    },
  },
  {
    type: "regular",
    background: secondBackground,
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
        text: "Rainforest Foundation US (RFUS) partners with indigenous peoples in the Amazon.\nWhat does indigenous mean to you?",
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
  // Pending: Add the map activity here
  {
    type: "regular",
    background: secondBackground,
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

      <main className="bg-neutral-600">
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
