import { NavBar } from "@/components/layout/nav";

import Head from "next/head";

import { Footer } from "@/components/layout/footer";
import { RegularSection } from "@/components/sections/regular-section";
import {
  Content,
  ContentPager,
  PagerContent,
} from "@/components/content/content";
import { SectionContent } from "@/components/content/section-content";

import europeanCity from "@/assets/narratives/daniela-community/european-city.png";
import indigenousCommunity from "@/assets/narratives/daniela-community/indigenous-community.png";
import caribbeanCommunity from "@/assets/narratives/daniela-community/caribbean-community.png";

const contentFirstPart: PagerContent[] = [
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
      question:
        "Many Indigenous communities in the Amazon Rainforest do not have hospitals?",
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
  {
    type: "plain",
    data: {
      textAlign: "left",
      text: "I woke up early to make my favorite breakfast: casabe with tucupí (a pancake, with hot sauce that has crunchy ants). In the kitchen, I lit our wood-burning stove and made cashew tea to soothe Mom’s stomach. “Mom!” I called out, as the stove heated up. I heard her rising, the wooden floorboards creaking under her weight. “Hurry, or we’ll be late for your appointment.”\n\n“We’ll be on time, Dani.” Mom said, emerging from the family bedroom. While she drank her tea, I scarfed down my breakfast, gathered the pot of soup we’d made yesterday, and grabbed some serving spoons and supplies.",
    },
  },
  {
    type: "pick-the-option",
    data: {
      wrap: true,
      question: "Would you like to have ‘casabe con tucupí’ for breakfast?",
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
  {
    type: "plain",
    data: {
      textAlign: "left",
      text: "Outside, Dad was waiting for us. The sun wasn’t yet up, but the sky was dark blue and pink and full of birds, flitting between the trees. I loved how quiet and still the river was at this hour. Dad, who had been fishing all night, was too tired to say much. He smiled when we approached, kissed each of us on the cheek, and lowered us down into his peque peque. He wrapped Mom in a blanket, then set us off for Leticia.",
    },
  },
  {
    type: "plain",
    data: {
      textAlign: "left",
      text: "There are no roads leading to Daniela’s community, so boats are the main modes of transportation.",
    },
    subContent: {
      type: "postcard",
      image: indigenousCommunity,
    },
  },
  {
    type: "plain",
    data: {
      textAlign: "left",
      text: "I like the ride to the market. Sometimes the stars are still out, and I can connect the spaces between them, and make shapes in the sky. Once, Mom and I saw a caiman near the riverbank, disguised in twilight. Today, Mom was telling me how to run our stall at the market. She was teaching me to talk to customers when I interrupted her. “Look!” I shouted, pointing to our left.",
    },
  },
  {
    type: "pick-the-option",
    data: {
      wrap: true,
      question:
        "Indigenous Peoples live near (and often encounter) wild animals. This can be dangerous, but Indigenous Peoples have a knowledge of the forest that keeps them safe.",
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
  {
    type: "plain",
    data: {
      textAlign: "left",
      text: "There, a boat-length away, a pack of dolphins was splashing about. Hearing my call, they swam toward us. It was as if they spoke tikuna (our language) and understood me. Quickly, we were surrounded. My excitement turned to fear. These were gray dolphins, not pink ones. Countless times, Dad had told me how pink dolphins were a fisherman’s good omen. But you had to be careful with gray ones. They’re beautiful, he’d say, but aggressive if their babies are around.",
    },
  },
  {
    type: "pick-the-option",
    data: {
      wrap: true,
      question:
        "Indigenous peoples have unique languages. This influences their culture and identity. What language do the characters in this story speak?",
      options: [
        {
          text: "Spanish (this is the national language of Colombia, where the story takes place)",
          isCorrect: true,
        },
        {
          text: "English",
          isCorrect: false,
        },
        {
          text: "Tikuna",
          isCorrect: true,
        },
      ],
    },
  },
  {
    type: "plain",
    data: {
      textAlign: "left",
      text: "The dolphins began banging into our boat. I braced myself, thinking we would flip. Meanwhile, Mom thrust a paddle into the water to keep us steady. “We can’t lose the soup!” she called out. “A week’s work!”",
    },
  },
  {
    type: "pick-the-option",
    data: {
      wrap: true,
      question:
        "Do you think the dolphins will flip Daniela’s boat? This is not unheard of in the Amazon!",
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
  {
    type: "plain",
    data: {
      textAlign: "left",
      subText: "Story continues in second part...",
      text: "At her mention of the soup, I grabbed a spoonful of fish from Mom’s broth, and tossed it overboard. The dolphins peeled off, chasing down the easy breakfast. We were safe, but shaken. In the now motionless river, the sun reflected, peeking out over the upside-down tree-line. We collected our nerves, and made the rest of the trip to Leticia in silence.",
    },
  },
];

const contentSecondPart: PagerContent[] = [
  // {
  //   type: "plain",
  //   data: {
  //     textAlign: "left",
  //     text: "Despite the early hour, the market was hectic. There were vendors like us, preparing stalls to sell all kinds of goodies - tucupí, açaí with fariña, zapote. There were also passers-by, and church-goers, and kids playing football in the park. Lots of people, hurrying about.",
  //   },
  // },
];

const pageContent: PagerContent[] = [...contentFirstPart, ...contentSecondPart];

export default function NarrativesRoute() {
  return (
    <>
      <Head>
        <title>{"Narratives - Kids' Corner - Rainforest Foundation US"}</title>
      </Head>

      <main className="bg-secondary-100 overflow-hidden overflow-y-auto">
        <RegularSection number={1} fullScreen textColorStyle="dark">
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
