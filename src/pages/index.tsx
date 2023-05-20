import { AppButton, AppLink } from "@/components/buttons";
import {
  HomeChameleonIllustration,
  HomeLastMonkeyIllustration,
  HomeLeftLeavesIllustration,
  HomeMonkeyIllustration,
  HomeParrotIllustration,
  HomeRightLeavesIllustration,
} from "@/components/home-illustrations";
import { Polaroid } from "@/components/polaroid";
import clsx from "@/utils/clsx";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

import firstBackground from "@/images/home/background/first-background.png";
import secondBackground from "@/images/home/background/second-background.png";

import firstPolaroid from "@/images/home/polaroids/Emily Saves the World Fundraiser.png";
import secondPolaroid from "@/images/home/polaroids/Heritage Montessori School Bake Sale.jpg";
import thirdPolaroid from "@/images/home/polaroids/Josalyn_s Lemonade for the Rainforest.jpg";
import fourthPolaroid from "@/images/home/polaroids/Noah Chan Art for the Rainforest.jpg";
import fifthPolaroid from "@/images/home/polaroids/Noah Chan Art for the Rainforest(1).jpg";
import { NavBar } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

const polaroids = [
  {
    id: 1,
    caption: "Emily Saves the World Fundraiser",
    src: firstPolaroid,
    verticalAlign: "center",
  },
  {
    id: 2,
    caption: "Heritage Montessori School Bake Sale",
    src: secondPolaroid,
    verticalAlign: "center",
  },
  {
    id: 3,
    caption: "Josalyn's Lemonade for the Rainforest",
    src: thirdPolaroid,
    verticalAlign: "center",
  },
  {
    id: 4,
    caption: "Noah Chan Art for the Rainforest",
    src: fourthPolaroid,
    verticalAlign: "top",
  },
  {
    id: 5,
    caption: "Noah Chan Art for the Rainforest",
    src: fifthPolaroid,
    verticalAlign: "center",
  },
] as const;

export default function Home() {
  return (
    <>
      <Head>
        <title>{"Kids' Corner - Rainforest Foundation US"}</title>
      </Head>

      <main className="flex flex-col bg-secondary-100">
        <div className="relative pb-[calc(4rem_+_(542px_/_2))]">
          <NavBar />

          <Image
            className="absolute top-0 left-0 right-0 block h-full w-full object-cover object-bottom"
            src={firstBackground}
            height={1280}
            width={720}
            aria-hidden
            placeholder="blur"
            alt=""
          />

          <div className="relative z-30 flex flex-col-reverse md:mt-16 md:flex-row">
            <section className="relative z-10 flex flex-1 flex-col items-center justify-center space-y-8 px-2">
              <header className="max-w-[605px] space-y-2 rounded-lg bg-secondary-100 bg-opacity-0 text-center">
                <p className="font-medium text-primary-600 text-xl">
                  {"Welcome to the RFUS Kids' Corner!"}
                </p>

                <h1 className="font-normal leading-snug text-neutral-dark-700 text-5xl">
                  Discover the fascinating secrets of the Amazon
                </h1>

                <p className="font-medium text-neutral-dark-500 text-base">
                  And help us protect its animals, plants and communities.
                </p>
              </header>

              <div className="space-y-4 text-center xs:space-x-4">
                <AppLink
                  className="inline-block"
                  variant="primary"
                  href="/about-the-amazon"
                >
                  Discover the Amazon!
                </AppLink>

                <AppButton variant="secondary">Support our work</AppButton>
              </div>
            </section>

            <HomeChameleonIllustration className="block w-[25vw] min-w-[9rem] max-w-[21rem] md:absolute md:-translate-y-6" />
          </div>
        </div>

        <div className="relative pb-12">
          <div className="absolute inset-0 w-full">
            <div
              className={clsx(
                "absolute inset-x-0 -mt-[360px] block h-[640px] w-full object-cover object-center",
                styles.firstDivider
              )}
            />

            <Image
              className="block h-full w-full object-cover object-bottom"
              src={secondBackground}
              height={1349}
              width={720}
              aria-hidden
              placeholder="blur"
              alt=""
            />
          </div>

          <div className="absolute inset-0 w-full overflow-hidden">
            <div
              className={clsx(
                "absolute inset-x-0 bottom-0 -mb-[160px] block h-[640px] w-full object-cover object-center",
                styles.secondDivider
              )}
            />
          </div>

          <div className="relative z-20 -mt-[calc(542px_/_2)]">
            <div className="relative mx-10 flex flex-1 flex-col items-center justify-center">
              {/* TODO: Replace with actual video */}
              <div className="flex h-[542px] w-full max-w-[814px] flex-col border-1 border-neutral-600 bg-secondary-100 p-2 shadow-app-lg shadow-shadow-gray">
                <p className="my-auto text-center">Video here</p>
              </div>
            </div>

            <HomeMonkeyIllustration className="absolute inset-y-0 right-0 my-auto block w-[25vw] min-w-[9rem] max-w-[21rem] translate-y-4" />
          </div>

          <div className="relative z-30">
            <div className="relative flex flex-col-reverse md:flex-row">
              <section className="mx-2 flex flex-1 flex-col items-center justify-center space-y-8 md:mt-16">
                <header className="max-w-[605px] space-y-2 rounded-lg bg-secondary-100 bg-opacity-0 py-4 text-center">
                  <h2 className="font-normal leading-snug text-neutral-dark-700 text-5xl">
                    Kids from around the world are helping protect the Amazon
                  </h2>

                  <p className="font-medium text-neutral-dark-500 text-base">
                    What are you waiting for?
                  </p>
                </header>

                <div className="space-y-4 text-center xs:space-x-4">
                  <AppLink
                    className="inline-block"
                    variant="primary"
                    href="./about-the-amazon"
                  >
                    Discover the Amazon!
                  </AppLink>
                  <AppButton variant="secondary">Support our work</AppButton>
                </div>
              </section>

              <HomeParrotIllustration className="mt-16 block w-[25vw] min-w-[9rem] max-w-[21rem] md:absolute md:mt-0 md:-translate-y-24" />
            </div>

            <ul className="z-10 mx-auto mt-10 flex max-w-5xl flex-1 flex-row-reverse flex-wrap items-center justify-center space-x-4 space-y-4 px-2">
              {polaroids.map((polaroid, i) => {
                const isOdd = i % 2 !== 0;
                return (
                  <li key={polaroid.id}>
                    <Polaroid
                      className={clsx(
                        isOdd ? "rotate-[6.5deg]" : "-rotate-[6.5deg]",
                        "relative w-[18rem] hover:z-10 hover:rotate-0 hover:scale-105"
                      )}
                      src={polaroid.src}
                      caption={polaroid.caption}
                      verticalAlign={polaroid.verticalAlign}
                    />
                  </li>
                );
              })}
            </ul>

            <section className="z-30 mx-2 flex flex-1 flex-col items-center justify-center space-y-4">
              <header className="max-w-[605px] space-y-4 rounded-lg bg-secondary-100 bg-opacity-0 text-center">
                <HomeLastMonkeyIllustration
                  className="relative z-20 mx-auto -mt-4 block h-[372px] w-[314px] object-cover object-center"
                  aria-hidden
                />

                <h2 className="invisible font-normal leading-snug text-neutral-dark-700 text-4xl">
                  Teach the Amazon in class
                </h2>
              </header>

              <div className="invisible space-y-4 text-center xs:space-x-4 xs:space-y-0">
                <AppButton variant="secondary">
                  Resources for educators
                </AppButton>
              </div>
            </section>
          </div>

          <HomeLeftLeavesIllustration className="absolute left-0 bottom-[clamp(-5rem,_-6vw,_-2rem)] block w-[25vw] min-w-[9rem] max-w-[21rem]" />
          <HomeRightLeavesIllustration className="absolute right-0 bottom-[clamp(-6.5rem,_-8vw,_-2.75rem)] z-20 block w-[25vw] min-w-[9rem] max-w-[21rem]" />
        </div>

        <Footer />
      </main>
    </>
  );
}
