import { NavBar } from "@/components/layout/nav";

import Head from "next/head";

import { Footer } from "@/components/layout/footer";
import { RegularSection } from "@/components/sections/regular-section";
import { Content, ContentPager } from "@/components/content/content";
import { SectionContent } from "@/components/content/section-content";

import europeanCity from "@/assets/narratives/daniela-community/european-city.png";
import indigenousCommunity from "@/assets/narratives/daniela-community/indigenous-community.png";
import caribbeanCommunity from "@/assets/narratives/daniela-community/caribbean-community.png";

const pageContent: Content[] = [
  {
    type: "plain",
    data: {
      textAlign: "left",
      caption: "Narratives",
      text: "Learn about Daniela, a young girl from an Indigenous community along the Amazon river. Answer questions as you read her story!",
    },
  },
  {
    type: "pick-the-image",
    data: {
      wrap: true,
      question: "Which photo might represent Daniela’s community?",
      options: [
        {
          alt: "An aerial view of an european city",
          imageSrc: europeanCity,
          isCorrect: false,
        },
        {
          alt: "An aerial view of an indigenous community",
          imageSrc: indigenousCommunity,
          isCorrect: true,
        },
        {
          alt: "An aerial view of a caribbean community",
          imageSrc: caribbeanCommunity,
          isCorrect: false,
        },
      ],
    },
  },
  {
    type: "plain",
    data: {
      textAlign: "left",
      text: "Lately Mom’s been sick, so I’ve been doing a lot around the house. I’m only eight, but I cook, clean, and do laundry. I even garden, harvesting plantain, yucca, and lots of other crops. I wish Mom and Dad would have another kid. That way, I’d have someone to help me with these chores! Most importantly, I’d have a new best friend!",
    },
  },
  {
    type: "pick-the-option",
    data: {
      wrap: true,
      rotateOptions: true,
      question: "How old is Daniela?",
      options: [
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
      ],
    },
  },
  {
    type: "plain",
    data: {
      textAlign: "left",
      text: "Today was Sunday. On Sundays, Mom usually travels about two hours down-river to Leticia, the nearest town, and sells soup in the local market. Today would be different, though. Mom had an appointment with the doctor in Leticia (our community doesn’t have a hospital). I’m happy she’s getting help, but I’m nervous, too. I’d have to work in the market all by myself.",
    },
  },
  {
    type: "pick-the-option",
    data: {
      wrap: true,
      question: "What does Daniela’s mom do on Sundays?",
      options: [
        {
          text: "True",
          isCorrect: true,
        },
        {
          text: "False",
          isCorrect: false,
        },
      ],
    },
  },
];

export default function NarrativesRoute() {
  return (
    <>
      <Head>
        <title>{"Narratives - Kids' Corner - Rainforest Foundation US"}</title>
      </Head>

      <main className="bg-secondary-100 overflow-hidden overflow-y-auto">
        <RegularSection number={1} fullScreen>
          <NavBar />

          <SectionContent>
            <ContentPager contentList={pageContent} />
          </SectionContent>
        </RegularSection>
      </main>

      <Footer />
    </>
  );
}
