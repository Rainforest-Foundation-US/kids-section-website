import { FillInTheBlankActivity } from "@/components/activities/fill-in-the-blank";
import { LearningPath } from "@/components/activities/learning-path-map";
import { LocateInMapActivity } from "@/components/activities/locate-in-map";
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

import biodiversity1 from "@/assets/activities/biodiversity/1-forest.png";
import biodiversity2 from "@/assets/activities/biodiversity/2-species.png";
import biodiversity3 from "@/assets/activities/biodiversity/3-burning.png";
import biodiversity4 from "@/assets/activities/biodiversity/4-natives.png";
import { Footer } from "@/components/layout/footer";
import { PickTheOptionActivity } from "@/components/activities/pick-the-option";
import { WavySection } from "@/components/sections/wavy-section";
import {
  SittingSlothIllustration,
  WavySeparator,
} from "@/components/activities-illustrations";
import { Polaroid } from "@/components/polaroid";

export default function Home() {
  const isScrollSnappingEnabled = false;

  return (
    <>
      <Head>
        <title>
          {"About the Amazon - Kids' Corner - Rainforest Foundation US"}
        </title>
      </Head>

      <main
        className={clsx(
          isScrollSnappingEnabled && "snap-y snap-mandatory",
          "h-screen overflow-hidden overflow-y-auto bg-neutral-600"
        )}
      >
        <HomeSectionsContainer>
          <ActivitySection number={0} className="py-0">
            <NavBar />

            <Image
              placeholder="blur"
              className="absolute inset-0 block h-full w-full object-cover"
              src={mainBackground}
              height={1280}
              width={720}
              aria-hidden
              alt=""
            />

            <div className="relative z-10 flex flex-1 flex-row p-6">
              <div className="flex flex-1 flex-col items-center justify-center">
                <header className="max-w-[30rem] space-y-6">
                  <h1 className="leading-snug text-neutral-dark-700 text-4xl">
                    You might be wondering: <b>What is a rainforest?</b>
                  </h1>

                  <HomeGoToSectionButton />
                </header>
              </div>

              <aside className="w-[289px]">
                <LearningPath />
              </aside>
            </div>
          </ActivitySection>

          <ActivitySection number={1}>
            <Image
              placeholder="blur"
              className="absolute inset-0 block h-full w-full object-cover"
              src={secondBackground}
              height={1280}
              width={720}
              aria-hidden
              alt=""
            />

            <ActivitySectionDivider />

            <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-10">
              <header className="text-center">
                <p className="font-medium leading-snug text-primary-600 text-xl">
                  Click on the box with the right answer
                </p>
                <p className="leading-snug text-neutral-dark-700 text-4xl">
                  Rainforest are exactly what you’d think!
                </p>
              </header>

              <FillInTheBlankActivity
                question="Very <blank /> forest biomes!"
                numberToOptions={{
                  0: {
                    options: ["Arid", "Dry", "Rainy", "Sparse", "Scary", "Big"],
                    correctOptionPosition: 3,
                  },
                }}
              />

              <div className="relative mt-16 flex w-full max-w-[calc(814px_+_18rem)] justify-center">
                <Image
                  placeholder="blur"
                  className="flex w-full max-w-[814px] -rotate-[4deg] flex-col bg-secondary-100 object-contain p-2 shadow-app-lg shadow-shadow-gray lg:p-4"
                  src={fillInTheBlank1}
                  aria-hidden
                  alt=""
                />

                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Polaroid
                    shrinkOnResponsive
                    className={
                      "w-[clamp(10rem,_25vw,_18rem)] min-w-0 rotate-6 hover:z-10 hover:rotate-0 hover:scale-105"
                    }
                    src={fillInTheBlank1}
                    caption="Fujifilm Instax Wide Format"
                    verticalAlign="center"
                  />
                </div>
              </div>

              <HomeGoToSectionButton className="-translate-y-40" />
            </div>
          </ActivitySection>

          <ActivitySection number={2}>
            <Image
              placeholder="blur"
              className="absolute inset-0 block h-full w-full object-cover"
              src={secondBackground}
              height={1280}
              width={720}
              aria-hidden
              alt=""
            />

            <ActivitySectionDivider />

            <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-10">
              <header className="text-center">
                <p className="font-medium leading-snug text-primary-600 text-xl">
                  Click on the box with the right answer
                </p>
                <p className="leading-snug text-neutral-dark-700 text-4xl">
                  Thanks to the rain
                </p>
              </header>

              <FillInTheBlankActivity
                question="rainforests have <blank /> climates. They stay <blank /> all year round."
                numberToOptions={{
                  0: {
                    options: ["Warm", "Cold", "Wet", "Dry"],
                    correctOptionPosition: 1,
                  },
                  1: {
                    options: ["Green", "Happy"],
                    correctOptionPosition: 1,
                  },
                }}
              />

              <Image
                placeholder="blur"
                className="mt-16 flex w-full max-w-[701px] -rotate-[4deg] flex-col bg-secondary-100 object-contain p-2 shadow-app-lg shadow-shadow-gray"
                src={fillInTheBlank2}
                aria-hidden
                alt=""
              />

              <HomeGoToSectionButton className="-translate-y-40" />
            </div>
          </ActivitySection>

          <ActivitySection number={3} className="bg-complementary-100">
            <ActivitySectionDivider />

            <div className="z-10 flex flex-1 flex-col items-center justify-center py-10">
              <div className="relative w-full max-w-6xl">
                <LocateInMapActivity />

                <header className="absolute inset-x-0 -top-8 text-center">
                  <p className="mx-auto max-w-xl leading-snug text-neutral-dark-700 text-4xl">
                    The three most important rainforests are:
                  </p>
                </header>
              </div>

              <HomeGoToSectionButton className="-translate-y-24" />
            </div>
          </ActivitySection>

          <WavySection number={4}>
            <header className="text-center">
              <p className="max-w-[30rem] leading-snug text-primary-100 text-4xl">
                Why do you think there are <b>no rainforests in Antarctica?</b>
              </p>
            </header>

            <Image
              placeholder="blur"
              className="mt-16 flex w-full max-w-[814px] -rotate-[4deg] flex-col bg-secondary-100 object-contain p-2 shadow-app-lg shadow-shadow-gray"
              src={intro1}
              aria-hidden
              alt=""
            />

            <HomeGoToSectionButton className="absolute bottom-20" />
          </WavySection>

          <VignetteSection
            number={5}
            title="Biodiversity"
            subtitle="(or “biological diversity) is..."
            image={biodiversity1}
          />

          <VignetteSection
            number={6}
            title="Biodiversity"
            subtitle="(or “biological diversity) is..."
            body="...a word that refers to the variety of life on Earth. The many different types of plants, animals, fungi, bacteria, and people too!"
            image={biodiversity2}
          />

          <VignetteSection
            number={7}
            title="Biodiversity"
            subtitle="(or “biological diversity) is..."
            body="...threatened by deforestation and climate change."
            image={biodiversity3}
          />

          <VignetteSection
            number={8}
            title="Biodiversity"
            subtitle="(or “biological diversity) is..."
            body="...protected by indigenous peoples around the world!"
            imageAlignment="start"
            image={biodiversity4}
          />

          <div className="relative">
            <WavySeparator
              className="absolute z-10"
              direction="down"
              color="#1E1F1B"
            />
          </div>

          <ActivitySection number={9} className="py-6">
            <Image
              placeholder="blur"
              className="absolute inset-0 block h-full w-full object-cover"
              src={mainBackground}
              height={1280}
              width={720}
              aria-hidden
              alt=""
            />

            <div className="relative z-10 mx-auto flex max-w-[40rem] flex-1 flex-col items-center space-y-6 py-40">
              <h2 className="text-center leading-snug text-4xl">
                So, just how biodiverse is the Amazon, and how much biodiversity
                do indigenous peoples really protect?
              </h2>

              <SittingSlothIllustration />

              <p className="text-center font-bold leading-snug text-4xl">
                These numbers give us a better picture...
              </p>

              <HomeGoToSectionButton />
            </div>
          </ActivitySection>

          <WavySection number={10}>
            <PickTheOptionActivity
              question="Rainforests are forests that:"
              options={[
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
              ]}
            />

            <HomeGoToSectionButton />
          </WavySection>
        </HomeSectionsContainer>

        <Footer />
      </main>
    </>
  );
}
