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
      block: "nearest",
      inline: "nearest",
    });
  };

  return (
    <>
      <Head>
        <title>{"Q&A - Kids' Corner - Rainforest Foundation US"}</title>
      </Head>

      <main className="overflow-hidden overflow-y-auto bg-secondary-100">
        <RegularSection fullScreen textColorStyle="dark" name="faq">
          <NavBar />

          <div className="relative z-10 my-4 flex flex-1 flex-col justify-center space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0">
            <QANav
              activeQuestionI={activeQuestionI}
              qAndAContent={qAndAContent}
              itemClick={navClick}
            />

            <div className="flex flex-1 flex-col space-y-6 pt-6 lg:flex-row lg:space-y-0">
              {activeQuestion && (
                <>
                  <span className="inline-flex max-w-sm flex-col space-y-6">
                    <span className="ml-8 inline-flex w-min lg:ml-16">
                      <ActivityHint
                        noSloth
                        noAnimation
                        hintSize="md"
                        hintPosition="center"
                        hintData={{
                          hint: activeQuestion.hint,
                          status: ActivityHintStatus.CORRECT,
                        }}
                      />
                    </span>
                    <WavingSlothIllustration />
                  </span>

                  <section
                    className="space-y-6 px-8 pb-8 lg:max-w-5xl lg:px-16"
                    ref={mainRef}
                  >
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
