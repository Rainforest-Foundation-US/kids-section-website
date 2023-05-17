import { FillInTheBlankActivity } from "@/components/activities/fill-in-the-blank";
import SelectAmazonImages from "@/components/activities/select-amazon-images";
import { LearningPath } from "@/components/activities/learning-path-map";
import { HomeGoToSectionButton } from "@/components/buttons";
import { NavBar } from "@/components/layout/nav";
import {
  ActivitySection,
  ActivitySectionDivider,
  HomeSectionsContainer,
} from "@/components/sections";
import clsx from "clsx";
import Head from "next/head";
import Image from "next/image";

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
          "h-screen overflow-y-auto bg-neutral-600"
        )}
      >
        <HomeSectionsContainer>
          <ActivitySection
            number={0}
            className="relative flex min-h-screen snap-center flex-col"
          >
            <NavBar />

            <Image
              className="absolute inset-0 block h-full w-full object-cover"
              src="/sections/welcome/background.png"
              height={1280}
              width={720}
              aria-hidden
              alt=""
            />

            <div className="relative z-10 flex flex-1 flex-row p-6">
              <div className="flex flex-1 flex-col items-center justify-center">
                <header className="max-w-[24.5rem] space-y-6">
                  <h1 className="leading-snug text-neutral-dark-700 text-4xl">
                    You are probably wondering, <b>What is a rainforest?</b>
                  </h1>

                  <HomeGoToSectionButton />
                </header>
              </div>

              <aside className="w-[289px]">
                <LearningPath />
              </aside>
            </div>
          </ActivitySection>

          <ActivitySection
            number={1}
            className="relative flex min-h-screen snap-center"
          >
            <Image
              className="absolute inset-0 block h-full w-full object-cover"
              src="/pages/about-the-amazon/activities/1-bg.png"
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

              <Image
                className="mt-16 flex w-full max-w-[814px] -rotate-[4deg] flex-col bg-secondary-100 object-contain p-2 shadow-app-lg shadow-shadow-gray"
                src="/pages/about-the-amazon/activities/1-img.webp"
                height={1280}
                width={720}
                aria-hidden
                alt=""
              />

              <HomeGoToSectionButton />
            </div>
          </ActivitySection>

          <ActivitySection
            number={2}
            className="relative flex min-h-screen snap-center"
          >
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
                className="mt-16 flex w-full max-w-[814px] -rotate-[4deg] flex-col bg-secondary-100 object-contain p-2 shadow-app-lg shadow-shadow-gray"
                src="/pages/about-the-amazon/activities/1-img.webp"
                height={1280}
                width={720}
                aria-hidden
                alt=""
              />
              <HomeGoToSectionButton />
            </div>
          </ActivitySection>
          <SelectAmazonImages />
        </HomeSectionsContainer>
      </main>
    </>
  );
}
