import { AppButton, AppLink } from "@/components/buttons";
import {
  HomeChameleonIllustration,
  HomeLastMonkeyIllustration,
  HomeLeftLeavesIllustration,
  HomeMonkeyIllustration,
  HomeParrotIllustration,
  HomeRightLeavesIllustration,
} from "@/components/illustrations/home-illustrations";
import { Polaroid } from "@/components/polaroid";
import clsx from "@/utils/clsx";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

import firstBackground from "@/assets/home/background/first-background.png";
import secondBackground from "@/assets/home/background/second-background.png";

import { NavBar } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { useGetHomePageData } from "@/hooks/useGetHomePageData";
import { urlFor } from "@/sanity/lib/image";
import React from "react";

export default function Home() {
  const homePageData = useGetHomePageData();

  const [isFlipped, setIsFlipped] = React.useState(-1);

  return (
    <>
      <Head>
        <title>{"Kids' Corner - Rainforest Foundation US"}</title>
      </Head>

      <main className="flex flex-col bg-secondary-100">
        <div className="relative pb-[calc(4rem_+_(542px_/_2))]">
          <NavBar />

          <Image
            placeholder="blur"
            className="absolute left-0 right-0 top-0 block h-full w-full object-cover object-bottom"
            src={firstBackground}
            height={1280}
            width={720}
            aria-hidden
            alt=""
          />

          <div className="relative z-30 mt-8 flex flex-col-reverse md:mt-16 md:flex-row">
            <section className="relative z-10 flex flex-1 flex-col items-center justify-center space-y-8 px-2">
              <header className="max-w-[605px] space-y-2 rounded-lg bg-secondary-100 bg-opacity-0 text-center">
                {homePageData?.welcomeMessage ? (
                  <p className="text-lg font-medium text-primary-600 md:text-xl">
                    {homePageData.welcomeMessage}
                  </p>
                ) : null}

                <h1 className="text-3xl font-normal leading-snug text-neutral-dark-700 md:text-5xl">
                  {homePageData?.title}
                </h1>

                {homePageData?.subtitle ? (
                  <p className="text-base font-medium text-neutral-dark-500">
                    {homePageData.subtitle}
                  </p>
                ) : null}
              </header>

              {homePageData ? (
                <div className="space-y-4 text-center xs:space-x-4">
                  <AppLink
                    className="inline-block"
                    variant="primary"
                    href="/about-the-amazon"
                  >
                    {homePageData.discoverTheAmazonButtonLabel}
                  </AppLink>

                  <AppLink
                    variant="secondary"
                    href={homePageData.supportLinkUrl}
                  >
                    {homePageData.supportButtonLabel}
                  </AppLink>
                </div>
              ) : null}
            </section>

            <HomeChameleonIllustration className="absolute hidden w-[25vw] min-w-[9rem] max-w-[21rem] -translate-y-6 md:block" />
          </div>
        </div>

        <div className="relative pb-12">
          <div className="absolute inset-0 w-full">
            <div
              className={clsx(
                "absolute inset-x-0 -mt-[360px] block h-[640px] w-full object-cover object-center",
                styles.firstDivider,
              )}
            />

            <Image
              placeholder="blur"
              className="block h-full w-full object-cover object-bottom"
              src={secondBackground}
              height={1349}
              width={720}
              aria-hidden
              alt=""
            />
          </div>

          <div className="absolute inset-0 w-full overflow-hidden">
            <div
              className={clsx(
                "absolute inset-x-0 bottom-0 -mb-[160px] block h-[640px] w-full object-cover object-center",
                styles.secondDivider,
              )}
            />
          </div>

          {homePageData?.videoUrl ? (
            <div className="relative z-20 -mt-[calc(542px_/_2)]">
              <div className="relative mx-2 flex flex-1 flex-col items-center justify-center md:mx-10">
                <div className="relative z-10 w-full max-w-[814px] border-1 border-neutral-600 bg-neutral-100 p-2 lg:p-4">
                  <div className="relative aspect-video w-full flex-col shadow-app-lg shadow-shadow-gray">
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={homePageData.videoUrl}
                      title="Rainforest Foundation US-Kids'corner"
                      allow="autoplay; fullscreen; picture-in-picture; web-share"
                    ></iframe>
                  </div>
                </div>
              </div>

              <HomeMonkeyIllustration className="absolute bottom-0 right-0 my-auto block w-[25vw] min-w-[9rem] max-w-[21rem] translate-y-[100%] md:inset-y-0 md:translate-y-4" />
            </div>
          ) : null}

          <div className="relative z-30">
            <div className="relative flex flex-col-reverse md:flex-row">
              <section className="mx-2 flex flex-1 flex-col items-center justify-center space-y-8 md:mt-16">
                <header className="max-w-[605px] space-y-2 rounded-lg bg-secondary-100 bg-opacity-0 py-4 text-center">
                  {homePageData?.description ? (
                    <h2 className="text-3xl font-normal leading-snug text-neutral-dark-700 md:text-5xl">
                      {homePageData.description}
                    </h2>
                  ) : null}

                  {homePageData?.descriptionSubtitle ? (
                    <p className="text-base font-medium text-neutral-dark-500">
                      {homePageData.descriptionSubtitle}
                    </p>
                  ) : null}
                </header>

                <div className="space-y-4 text-center xs:space-x-4">
                  <AppLink
                    className="inline-block"
                    variant="primary"
                    href="./about-the-amazon"
                  >
                    Discover the Amazon!
                  </AppLink>
                  <AppButton className="inline-block" variant="secondary">
                    Support our work
                  </AppButton>
                </div>
              </section>

              <HomeParrotIllustration className="mt-16 block w-[25vw] min-w-[9rem] max-w-[21rem] md:absolute md:mt-0 md:-translate-y-24" />
            </div>

            {homePageData?.polaroids?.length ? (
              <ul className="z-10 mx-auto mt-10 flex max-w-5xl flex-1 flex-row-reverse flex-wrap items-center justify-center space-x-4 space-y-4 px-2">
                {homePageData.polaroids.map((polaroid, i) => {
                  const isOdd = i % 2 !== 0;
                  return (
                    <li
                      key={polaroid._id}
                      onClick={() =>
                        setIsFlipped((prev) => {
                          if (i === prev) {
                            return -1;
                          }

                          return i;
                        })
                      }
                      className={clsx(
                        isOdd ? "rotate-[6.5deg]" : "-rotate-[6.5deg]",
                        "relative w-[18rem] hover:z-10 hover:rotate-0 hover:scale-105",
                      )}
                    >
                      <Polaroid
                        src={urlFor(polaroid.image).url()}
                        caption={polaroid.caption}
                        captionStyle={polaroid.captionStyle}
                        verticalAlign={polaroid.imageAlignment}
                        description={polaroid.description}
                        isFlipped={isFlipped === i}
                      />
                    </li>
                  );
                })}
              </ul>
            ) : null}

            <section className="z-30 mx-2 flex flex-1 flex-col items-center justify-center space-y-4">
              <header className="max-w-[605px] space-y-4 rounded-lg bg-secondary-100 bg-opacity-0 text-center">
                <HomeLastMonkeyIllustration
                  className="relative z-20 mx-auto -mt-4 block h-[372px] w-[314px] object-cover object-center"
                  aria-hidden
                />

                <h2 className="invisible text-4xl font-normal leading-snug text-neutral-dark-700">
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

          <HomeLeftLeavesIllustration className="absolute bottom-[clamp(-5rem,_-6vw,_-2rem)] left-0 block w-[25vw] min-w-[9rem] max-w-[21rem]" />
          <HomeRightLeavesIllustration className="absolute bottom-[clamp(-6.5rem,_-8vw,_-2.75rem)] right-0 z-20 block w-[25vw] min-w-[9rem] max-w-[21rem]" />
        </div>

        <Footer />
      </main>
    </>
  );
}
