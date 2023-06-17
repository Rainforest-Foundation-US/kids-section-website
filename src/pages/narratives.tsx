import { LearningPath } from "@/components/activities/learning-path-map";
import { GoToButton } from "@/components/buttons";
import { NavBar } from "@/components/layout/nav";
import { ActivitySection, HomeSectionsContainer } from "@/components/sections";

import Head from "next/head";
import Image from "next/image";

import { Footer } from "@/components/layout/footer";
import { PickTheOptionActivity } from "@/components/activities/pick-the-option";
import mainBackground from "@/assets/activities/1-background.png";

export default function NarrativesRoute() {
  return (
    <>
      <Head>
        <title>{"Narratives - Kids' Corner - Rainforest Foundation US"}</title>
      </Head>

      <main className="h-screen overflow-hidden overflow-y-auto bg-secondary-100">
        <HomeSectionsContainer>
          <ActivitySection number={0} className="py-0">
            <NavBar />

            <Image
              className="absolute inset-0 block h-full w-full object-cover"
              src={mainBackground}
              height={1280}
              width={720}
              aria-hidden
              alt=""
            />

            <div className="z-10 flex flex-1 flex-col items-center justify-center p-6">
              <header className="max-w-[40rem] space-y-6">
                <p className="text-primary-600">Narratives</p>
                <h1 className="leading-snug text-neutral-dark-700 text-4xl">
                  Learn about Daniela, a young girl from an Indigenous community
                  along the Amazon river. Answer questions as you read her
                  story!
                </h1>

                <GoToButton
                  direction="right"
                  disabled={false}
                  onClick={() => {}}
                />
              </header>
            </div>
          </ActivitySection>

          <ActivitySection number={1}>
            <Image
              className="absolute inset-0 block h-full w-full object-cover"
              src="/sections/welcome/background.png"
              height={1280}
              width={720}
              aria-hidden
              alt=""
            />

            <div className="z-10 flex flex-1 flex-col items-center justify-center p-6">
              <header className="max-w-[40rem] space-y-6">
                <h1 className="leading-snug text-neutral-dark-700 text-3xl">
                  Lately Mom’s been sick, so I’ve been doing a lot around the
                  house. I’m only eight, but I cook, clean, and do laundry. I
                  even garden, harvesting plantain, yucca, and lots of other
                  crops. I wish Mom and Dad would have another kid. That way,
                  I’d have someone to help me with these chores! Most
                  importantly, I’d have a new best friend!
                </h1>

                <GoToButton
                  direction="right"
                  position="center"
                  disabled={false}
                  onClick={() => {}}
                />
              </header>
            </div>
          </ActivitySection>

          <ActivitySection number={2}>
            <Image
              className="absolute inset-0 block h-full w-full object-cover"
              src="/sections/welcome/background.png"
              height={1280}
              width={720}
              aria-hidden
              alt=""
            />

            <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-10">
              <PickTheOptionActivity
                wrap
                rotateOptions
                question="How old is Daniela?"
                options={[
                  {
                    text: "7",
                    isCorrect: false,
                  },
                  {
                    text: "8",
                    isCorrect: true,
                  },
                  {
                    text: "9",
                    isCorrect: false,
                  },
                  {
                    text: "10",
                    isCorrect: false,
                  },
                ]}
              />

              <GoToButton
                className="mt-8"
                direction="right"
                position="center"
                disabled={false}
                onClick={() => {}}
              />
            </div>
          </ActivitySection>

          <ActivitySection number={3}>
            <Image
              className="absolute inset-0 block h-full w-full object-cover"
              src="/sections/welcome/background.png"
              height={1280}
              width={720}
              aria-hidden
              alt=""
            />

            <div className="z-10 flex flex-1 flex-col items-center justify-center p-6">
              <header className="max-w-[40rem] space-y-6">
                <h1 className="leading-snug text-neutral-dark-700 text-3xl">
                  Today was Sunday. On Sundays, Mom usually travels about two
                  hours down-river to Leticia, the nearest town, and sells soup
                  in the local market. Today would be different, though. Mom had
                  an appointment with the doctor in Leticia (our community
                  doesn’t have a hospital). I’m happy she’s getting help, but
                  I’m nervous, too. I’d have to work in the market all by
                  myself.
                </h1>

                <GoToButton
                  direction="right"
                  position="center"
                  disabled={false}
                  onClick={() => {}}
                />
              </header>
            </div>
          </ActivitySection>

          <ActivitySection number={2}>
            <Image
              className="absolute inset-0 block h-full w-full object-cover"
              src="/sections/welcome/background.png"
              height={1280}
              width={720}
              aria-hidden
              alt=""
            />

            <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-10">
              <header className="text-center">
                <p className="font-medium leading-snug text-primary-600 text-xl">
                  True or false
                </p>
              </header>

              <PickTheOptionActivity
                wrap
                question="Many Indigenous communities in the Amazon Rainforest do not have hospitals."
                options={[
                  {
                    text: "True",
                    isCorrect: true,
                  },
                  {
                    text: "False",
                    isCorrect: false,
                  },
                ]}
              />

              <GoToButton
                className="mt-8"
                direction="right"
                position="center"
                disabled={false}
                onClick={() => {}}
              />
            </div>
          </ActivitySection>
        </HomeSectionsContainer>

        <Footer />
      </main>
    </>
  );
}
