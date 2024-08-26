import { WavingSlothIllustration } from "@/components/activities-illustrations";
import { ActivityHint, ActivityHintStatus } from "@/components/activity-hint";
import { Footer } from "@/components/layout/footer";
import { NavBar } from "@/components/layout/nav";
import { RegularSection } from "@/components/sections/regular-section";
import { QANav } from "@/components/q-and-a/nav";
import { qAndAContent } from "@/components/q-and-a/constants";
import Head from "next/head";
import { useRef, useState } from "react";

export default function QAndARoute() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [activeQuestionI, setActiveQuestionI] = useState(0);

  const activeQuestion = qAndAContent[activeQuestionI] ?? null;

  const navClick = (index: number) => {
    setActiveQuestionI(index);
    mainRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
  };

  return (
    <>
      <Head>
        <title>{"Q&A - Kids' Corner - Rainforest Foundation US"}</title>
      </Head>

      <main className="bg-secondary-100 overflow-hidden overflow-y-auto">
        <RegularSection number={1} fullScreen textColorStyle="dark">
          <NavBar />

          <div className="relative z-10 mx-6 my-4 flex flex-1 flex-col justify-center space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0">
            <QANav activeQuestionI={activeQuestionI} itemClick={navClick} />

            <div
              className="flex flex-1 flex-col justify-around space-y-6 pt-6 lg:flex-row lg:space-y-0"
              ref={mainRef}
            >
              {activeQuestion && (
                <>
                  <span className="mx-auto inline-flex flex-col space-y-6">
                    <span className="ml-16 inline-flex w-min">
                      <ActivityHint
                        noSloth
                        noAnimation
                        hintSize="md"
                        hintPosition="center"
                        status={ActivityHintStatus.CORRECT}
                        hint={activeQuestion.hint}
                      />
                    </span>
                    <WavingSlothIllustration />
                  </span>

                  <section className="space-y-6">
                    <h2 className="text-neutral-dark-800 whitespace-pre-line text-3xl font-bold">
                      {activeQuestion.answer}
                    </h2>

                    <p
                      className="text-neutral-dark-700 whitespace-pre-line"
                      dangerouslySetInnerHTML={{
                        __html: activeQuestion.description,
                      }}
                    ></p>
                  </section>
                </>
              )}
            </div>
          </div>
        </RegularSection>
      </main>

      <Footer />
    </>
  );
}
