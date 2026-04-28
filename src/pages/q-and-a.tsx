import { WavingSlothIllustration } from "@/components/illustrations/activities-illustrations";
import { ActivityHint, ActivityHintStatus } from "@/components/activity-hint";
import { Footer } from "@/components/layout/footer";
import { NavBar } from "@/components/layout/nav";
import { RegularSection } from "@/components/sections/regular-section";
import { QANav } from "@/components/q-and-a/nav";
import type { QAndAQuestion } from "@/components/q-and-a/useGetContent";
import React from "react";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { Modal } from "@/components/modal";
import { PolymorphicIllustration } from "@/components/content/polymorphic-illustration";
import { getEducatorResources, getFaqs } from "@/sanity/lib/queries";
import { EducatorResource } from "@/sanity/schemaTypes/educatorResource";
import type { GetStaticProps } from "next";
import { Seo } from "@/components/seo";
import { JsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/components/json-ld";
import { resolveFaqSeo } from "@/lib/resolve-page-seo";

type QAndAProps = {
  qAndAContent: QAndAQuestion[];
  faqSeo: Parameters<typeof resolveFaqSeo>[0];
  educatorResources: EducatorResource[];
};

export const getStaticProps: GetStaticProps<QAndAProps> = async () => {
  const [faqs, educatorResources] = await Promise.all([
    getFaqs(),
    getEducatorResources(),
  ]);
  const entries = (faqs?.entries ?? []) as QAndAQuestion[];
  return {
    props: {
      qAndAContent: entries,
      faqSeo: faqs?.seo,
      educatorResources,
    },
    revalidate: 60,
  };
};

function combinedAnswerText(entry: QAndAQuestion) {
  return [entry.answer, entry.descriptionPlain].filter(Boolean).join(" ");
}

export default function QAndARoute({
  qAndAContent,
  faqSeo,
  educatorResources,
}: QAndAProps) {
  const mainRef = React.useRef<HTMLDivElement>(null);
  const [activeQuestionI, setActiveQuestionI] = React.useState(-1);
  const [isMobile, setIsMobile] = React.useState(true);
  const [isClient, setIsClient] = React.useState(false);

  const activeQuestion = qAndAContent[activeQuestionI] ?? null;

  React.useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navClick = (index: number) => {
    setActiveQuestionI(index);
  };

  const seo = resolveFaqSeo(faqSeo);
  const faqJson = qAndAContent.map((e) => ({
    question: e.question,
    answerText: combinedAnswerText(e),
  }));

  return (
    <>
      <Seo
        path="/q-and-a"
        title={seo.title}
        description={seo.description}
        imageUrl={seo.imageUrl}
        noIndex={seo.noIndex}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Q&A", path: "/q-and-a" },
        ])}
      />
      {faqJson.length > 0 ? <JsonLd data={faqPageJsonLd(faqJson)} /> : null}

      <section className="sr-only" aria-hidden>
        {qAndAContent.map((entry, i) => (
          <article key={i}>
            <h2>{entry.question}</h2>
            <p>{entry.answer}</p>
            {entry.descriptionPlain ? <p>{entry.descriptionPlain}</p> : null}
          </article>
        ))}
      </section>

      <main className="overflow-hidden overflow-y-auto bg-secondary-100">
        <RegularSection fullScreen textColor="#1e1f1b" name="q-and-a">
          <NavBar />

          <h1 className="sr-only">Amazon rainforest questions and answers for kids</h1>
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
                      Click on a question to see the answer.
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

      <Footer educatorResources={educatorResources} />
    </>
  );
}
