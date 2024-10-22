import { WavingSlothIllustration } from "@/components/activities-illustrations";
import { ActivityHint, ActivityHintStatus } from "@/components/activity-hint";
import { Footer } from "@/components/layout/footer";
import { NavBar } from "@/components/layout/nav";
import { RegularSection } from "@/components/sections/regular-section";
import { QANav } from "@/components/q-and-a/nav";
import { useGetQAndAContent } from "@/components/q-and-a/useGetContent";
import Head from "next/head";
import { useRef, useState } from "react";
import { PortableText } from "@portabletext/react";

export default function QAndARoute() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [activeQuestionI, setActiveQuestionI] = useState(0);

  const qAndAContent = useGetQAndAContent();
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

      <main className="overflow-hidden overflow-y-auto bg-secondary-100">
        <RegularSection number={1} fullScreen textColorStyle="dark">
          <NavBar />

          <div className="relative z-10 mx-6 my-4 flex flex-1 flex-col justify-center space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0">
            <QANav
              activeQuestionI={activeQuestionI}
              qAndAContent={qAndAContent}
              itemClick={navClick}
            />

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
                    <h2 className="whitespace-pre-line text-3xl font-bold text-neutral-dark-800">
                      {activeQuestion.answer}
                    </h2>

                    <PortableText value={activeQuestion.description} />
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
