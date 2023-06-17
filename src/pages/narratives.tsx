import { LearningPath } from "@/components/activities/learning-path-map";
import { HomeGoToSectionButton } from "@/components/buttons";
import { NavBar } from "@/components/layout/nav";
import { ActivitySection, HomeSectionsContainer } from "@/components/sections";

import Head from "next/head";
import Image from "next/image";

import { Footer } from "@/components/layout/footer";

export default function NarrativesRoute() {
  return (
    <>
      <Head>
        <title>{"Narratives - Kids' Corner - Rainforest Foundation US"}</title>
      </Head>

      <main className="h-screen overflow-hidden overflow-y-auto bg-neutral-600">
        <HomeSectionsContainer>
          <ActivitySection number={0} className="py-0">
            <NavBar />

            <Image
              className="absolute inset-0 block h-full w-full object-cover"
              src="/sections/welcome/background.png"
              height={1280}
              width={720}
              aria-hidden
              alt=""
            />

            <div className="z-10 flex flex-1 flex-col items-center justify-center p-6">
              <header className="max-w-[30rem] space-y-6">
                <h1 className="leading-snug text-neutral-dark-700 text-4xl">
                  You might be wondering: <b>What is a rainforest?</b>
                </h1>

                <HomeGoToSectionButton />
              </header>
            </div>
          </ActivitySection>
        </HomeSectionsContainer>

        <Footer />
      </main>
    </>
  );
}
