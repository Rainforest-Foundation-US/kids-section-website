import { WavingSlothIllustration } from "@/components/illustrations/activities-illustrations";
import { ActivityHint, ActivityHintStatus } from "@/components/activity-hint";
import { Footer } from "@/components/layout/footer";
import { NavBar } from "@/components/layout/nav";
import { RegularSection } from "@/components/sections/regular-section";
import { QANav } from "@/components/q-and-a/nav";
import { useGetQAndAContent } from "@/components/q-and-a/useGetContent";
import Head from "next/head";
import React from "react";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { Modal } from "@/components/modal";
import { PolymorphicIllustration } from "@/components/content/polymorphic-illustration";

export default function QAndARoute() {
  const mainRef = React.useRef<HTMLDivElement>(null);
  const [activeQuestionI, setActiveQuestionI] = React.useState(-1);
  const [isMobile, setIsMobile] = React.useState(true);
  const [isClient, setIsClient] = React.useState(false);

  const qAndAContent = useGetQAndAContent();
  const activeQuestion = qAndAContent[activeQuestionI] ?? null;

  React.useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navClick = (index: number) => {
    setActiveQuestionI(index);
  };

  return (
    <>
      <Head>
        <title>{"Q&A - Kids' Corner - Rainforest Foundation US"}</title>
      </Head>

      <main className="overflow-hidden overflow-y-auto bg-secondary-100">
        <RegularSection fullScreen textColor="#1e1f1b" name="q-and-a">
          <NavBar />

          <div className="relative z-10 my-4 flex flex-1 flex-col justify-center space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0">
            <QANav
              activeQuestionI={activeQuestionI}
              qAndAContent={qAndAContent}
              itemClick={navClick}
            />

            {!isClient ? null : isMobile ? (
              <Modal
                isOpen={Boolean(activeQuestion)}
                onClose={() => setActiveQuestionI(-1)}
                title={activeQuestion?.answer}
                hint={activeQuestion?.hint}
              >
                <PortableTextRenderer content={activeQuestion?.description} />
              </Modal>
            ) : (
              <div className="flex flex-1 flex-col space-y-6 pt-6 lg:flex-row lg:space-y-0">
                {activeQuestion ? (
                  <>
                    <span className="inline-flex max-w-sm flex-col">
                      <span className="ml-[5%] inline-flex w-min">
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
                      <WavingSlothIllustration className="w-[90%] lg:w-full" />
                    </span>

                    <section
                      className="space-y-6 px-8 pb-8 lg:max-w-5xl lg:px-16"
                      ref={mainRef}
                    >
                      <h2 className="whitespace-pre-line text-3xl font-bold text-neutral-dark-800">
                        {activeQuestion.answer}
                      </h2>

                      <PortableTextRenderer
                        content={activeQuestion.description}
                      />
                    </section>
                  </>
                ) : (
                  <div className="mx-auto mt-16 flex flex-col items-center">
                    <p className="text-center text-2xl font-bold text-primary-500">
                      Click on a question to see the answer
                    </p>
                    <PolymorphicIllustration
                      kind="happy-sloth"
                      className="scale-75 md:scale-100 xl:scale-125"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </RegularSection>
      </main>

      <Footer />
    </>
  );
}
