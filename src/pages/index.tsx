import {
  AppButton,
  AppLink,
  HomeGoToSectionButton,
  NavBarLink,
} from "@/components/buttons";
import { Footer, NavBar } from "@/components/layout";
import { Polaroid } from "@/components/polaroid";
import { HomeSection, HomeSectionsContainer } from "@/components/sections";
import clsx from "clsx";
import Head from "next/head";
import Image from "next/image";

const fujifilmImages = [
  { id: 1, text: "Fujifilm Instax Wide Format" },
  { id: 2, text: "Fujifilm Instax Wide Format" },
  { id: 3, text: "Fujifilm Instax Wide Format" },
  { id: 4, text: "Fujifilm Instax Wide Format" },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>{"Kids' Corner - Rainforest Foundation US"}</title>
      </Head>

      <main className="bg-secondary-100">
        <div className="relative flex flex-col">
          {/* <Image
            className="object-cover z-20 block absolute left-0 top-[8rem] min-w-[17rem] max-w-[371px] object-bottom"
            src="/pages/home/sections/first-illustration-left.png"
            height={631}
            width={371}
            aria-hidden
            alt=""
          />

          <Image
            className="object-cover z-20 block absolute right-0 top-[25rem] min-w-[17rem] max-w-[314px] object-bottom"
            src="/pages/home/sections/first-illustration-right.png"
            height={1071}
            width={314}
            aria-hidden
            alt=""
          /> */}

          <div className="relative pb-[calc(4rem_+_(542px_/_2))]">
            <NavBar />

            <Image
              className="absolute top-0 left-0 right-0 block h-full w-full object-cover object-bottom"
              src="/pages/home/sections/first-background.png"
              height={1280}
              width={720}
              priority
              aria-hidden
              alt=""
            />

            <section className="relative z-10 mt-16 flex flex-1 flex-col items-center justify-center space-y-8 px-2">
              <header className="max-w-[605px] space-y-2 rounded-lg bg-secondary-100 bg-opacity-0 py-4 text-center">
                <p className="text-xl font-medium text-primary-600">
                  {"Welcome to the RFUS Kids' Corner!"}
                </p>

                <h1 className="text-5xl font-normal leading-snug text-neutral-dark-700">
                  Discover the fascinating secrets of the Amazon
                </h1>

                <p className="text-base font-medium text-neutral-dark-500">
                  And help us protect its animals, plants and communities.
                </p>
              </header>

              <div className="space-y-4 text-center xs:space-x-4 xs:space-y-0">
                <AppLink variant="primary" href="/about-the-amazon">
                  Discover the Amazon!
                </AppLink>
                <AppButton variant="secondary">Support our work</AppButton>
              </div>
            </section>
          </div>

          <div className="relative pb-12">
            <div className="absolute inset-0 w-full">
              <Image
                className="absolute inset-x-0 -mt-[360px] block h-[640px] w-full object-cover object-center"
                src="/pages/home/sections/first-divider.png"
                height={640}
                width={1280}
                aria-hidden
                priority
                alt=""
              />

              <Image
                className="block h-full w-full object-cover object-bottom"
                src="/pages/home/sections/second-background.png"
                height={1349}
                width={720}
                aria-hidden
                alt=""
              />
            </div>
            <div className="absolute inset-0 w-full overflow-hidden">
              <Image
                className="absolute inset-x-0 bottom-0 -mb-[160px] block h-[640px] w-full object-cover object-center"
                src="/pages/home/sections/second-divider.png"
                height={640}
                width={1280}
                aria-hidden
                alt=""
              />
            </div>

            <div className="relative z-10 -mt-[calc(542px_/_2)] flex flex-1 flex-col items-center justify-center px-2">
              <div className="-z-10 flex h-[542px] w-full max-w-[814px] flex-col border-1 border-neutral-600 bg-secondary-100 p-2 shadow-app-lg shadow-shadow-gray">
                <p className="my-auto text-center">Video here</p>
              </div>
            </div>

            <div className="relative z-30">
              <section className="mt-16 flex flex-1 flex-col items-center justify-center space-y-8 px-2">
                <header className="max-w-[605px] space-y-2 rounded-lg bg-secondary-100 bg-opacity-0 py-4 text-center">
                  <h2 className="text-5xl font-normal leading-snug text-neutral-dark-700">
                    Kids from around the world are helping protect the Amazon
                  </h2>

                  <p className="text-base font-medium text-neutral-dark-500">
                    What are you waiting for?
                  </p>
                </header>

                <div className="space-y-4 text-center xs:space-x-4 xs:space-y-0">
                  <AppLink variant="primary" href="./about-the-amazon">
                    Discover the Amazon!
                  </AppLink>
                  <AppButton variant="secondary">Support our work</AppButton>
                </div>
              </section>

              <ul className="z-10 mt-10 flex flex-1 flex-row-reverse flex-wrap items-center justify-center space-x-4 space-y-4 px-2">
                {fujifilmImages.map((image, i) => {
                  const isOdd = i % 2 !== 0;
                  return (
                    <li key={image.id}>
                      <Polaroid
                        className={clsx(
                          isOdd ? "rotate-[6.5deg]" : "-rotate-[6.5deg]",
                          "relative hover:z-10 hover:rotate-0 hover:scale-105"
                        )}
                        src=""
                      />
                    </li>
                  );
                })}
              </ul>

              <section className="z-30 flex flex-1 flex-col items-center justify-center space-y-4 px-2">
                <header className="max-w-[605px] space-y-4 rounded-lg bg-secondary-100 bg-opacity-0 text-center">
                  <Image
                    className="relative z-20 mx-auto -mt-4 block object-cover object-center"
                    src="/pages/home/sections/second-illustration-center.png"
                    height={372}
                    width={314}
                    aria-hidden
                    alt=""
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
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
