import { NavBar } from "@/components/layout/nav";

import Head from "next/head";

import { Footer } from "@/components/layout/footer";
import { RegularSection } from "@/components/sections/regular-section";
import { ContentPager, PagerContent } from "@/components/content/content";
import { SectionContent } from "@/components/content/section-content";

import React from "react";
import { PlainData } from "@/sanity/schemaTypes/plain";
import {
  getPickOptionGames,
  getPlainData,
  getPickImageGames,
} from "@/sanity/lib/queries";
import { PickImageGameData } from "@/sanity/schemaTypes/pickImageGame";
import { PickOptionGameData } from "@/sanity/schemaTypes/pickOptionGame";
import { SectionName } from "@/hooks/useGetAboutTheAmazonContent";

export const narrativesSectionNames = [
  { title: "learn-about-daniela", value: "learn-about-daniela" as const },
  {
    title: "which-photo-represents-danielas-community",
    value: "which-photo-represents-danielas-community" as const,
  },
  {
    title: "helping-with-chores",
    value: "helping-with-chores" as const,
  },
  {
    title: "how-old-is-daniela",
    value: "how-old-is-daniela" as const,
  },
  {
    title: "today-was-sunday",
    value: "today-was-sunday" as const,
  },
  {
    title: "indigenous-communities-do-not-have-hospitals",
    value: "indigenous-communities-do-not-have-hospitals" as const,
  },
  {
    title: "favorite-breakfast",
    value: "favorite-breakfast" as const,
  },
  {
    title: "casabe-con-tucupi",
    value: "casabe-con-tucupi" as const,
  },
  {
    title: "dad-was-waiting-for-us",
    value: "dad-was-waiting-for-us" as const,
  },
  {
    title: "no-roads-just-boats",
    value: "no-roads-just-boats" as const,
  },
  {
    title: "ride-to-the-market",
    value: "ride-to-the-market" as const,
  },
  {
    title: "indigenous-peoples-live-near-wild-animals",
    value: "indigenous-peoples-live-near-wild-animals" as const,
  },
  {
    title: "pack-of-dolphins",
    value: "pack-of-dolphins" as const,
  },
  {
    title: "indigenous-peoples-unique-languages",
    value: "indigenous-peoples-unique-languages" as const,
  },
  {
    title: "dolphin-banging-on-the-boat",
    value: "dolphin-banging-on-the-boat" as const,
  },
  {
    title: "will-the-dolphin-flip-danielas-boat",
    value: "will-the-dolphin-flip-danielas-boat" as const,
  },
  {
    title: "the-dolphins-peeled-off",
    value: "the-dolphins-peeled-off" as const,
  },
];

export type NarrativesSectionName =
  (typeof narrativesSectionNames)[number]["value"];
const narrativesSectionNameKeys = narrativesSectionNames.map(
  (item) => item.value,
);

function arrayOfObjectsToDictionary<T extends { name: string }>(
  array: T[],
): Record<string, T> {
  return array.reduce(
    (acc, curr) => {
      acc[curr.name] = curr;
      return acc;
    },
    {} as Record<string, T>,
  );
}

function useGetNarrativesContent() {
  const [plainData, setPlainData] =
    React.useState<Record<NarrativesSectionName | SectionName, PlainData>>();
  const [pickTheImageData, setPickTheImageData] =
    React.useState<
      Record<NarrativesSectionName | SectionName, PickImageGameData>
    >();
  const [pickTheOptionData, setPickTheOptionData] =
    React.useState<
      Record<NarrativesSectionName | SectionName, PickOptionGameData>
    >();

  React.useEffect(() => {
    async function getData() {
      const plainDataFromServer = await getPlainData();
      const pickTheImageDataFromServer = await getPickImageGames();
      const pickTheOptionDataFromServer = await getPickOptionGames();

      const plainDataDictionary =
        arrayOfObjectsToDictionary(plainDataFromServer);
      const pickTheImageDataDictionary = arrayOfObjectsToDictionary(
        pickTheImageDataFromServer,
      );
      const pickTheOptionDataDictionary = arrayOfObjectsToDictionary(
        pickTheOptionDataFromServer,
      );

      setPlainData(plainDataDictionary);
      setPickTheImageData(pickTheImageDataDictionary);
      setPickTheOptionData(pickTheOptionDataDictionary);
    }

    getData();
  }, []);

  if (!plainData || !pickTheImageData || !pickTheOptionData) {
    return null;
  }

  const contentFirstPart: Record<NarrativesSectionName, PagerContent> = {
    "learn-about-daniela": {
      type: "plain",
      data: plainData["learn-about-daniela"],
    },
    "which-photo-represents-danielas-community": {
      type: "pick-the-image",
      data: {
        wrap: true,
        ...pickTheImageData["which-photo-represents-danielas-community"],
      },
    },
    "helping-with-chores": {
      type: "plain",
      data: plainData["helping-with-chores"],
    },
    "how-old-is-daniela": {
      type: "pick-the-option",
      data: {
        wrap: true,
        rotateOptions: true,
        ...pickTheOptionData["how-old-is-daniela"],
      },
    },
    "today-was-sunday": {
      type: "plain",
      data: plainData["today-was-sunday"],
    },
    "indigenous-communities-do-not-have-hospitals": {
      type: "pick-the-option",
      data: {
        wrap: true,
        ...pickTheOptionData["indigenous-communities-do-not-have-hospitals"],
      },
    },
    "favorite-breakfast": {
      type: "plain",
      data: plainData["favorite-breakfast"],
    },
    "casabe-con-tucupi": {
      type: "pick-the-option",
      data: {
        wrap: true,
        ...pickTheOptionData["casabe-con-tucupi"],
      },
    },
    "dad-was-waiting-for-us": {
      type: "plain",
      data: plainData["dad-was-waiting-for-us"],
    },
    "no-roads-just-boats": {
      type: "plain",
      data: plainData["no-roads-just-boats"],
      subContent: plainData["no-roads-just-boats"].subContent?.postcard && {
        type: plainData["no-roads-just-boats"].subContent?.type as "postcard",
        postcard: plainData["no-roads-just-boats"].subContent?.postcard,
      },
    },
    "ride-to-the-market": {
      type: "plain",
      data: plainData["ride-to-the-market"],
    },
    "indigenous-peoples-live-near-wild-animals": {
      type: "pick-the-option",
      data: {
        wrap: true,
        ...pickTheOptionData["indigenous-peoples-live-near-wild-animals"],
      },
    },
    "pack-of-dolphins": {
      type: "plain",
      data: plainData["pack-of-dolphins"],
    },
    "indigenous-peoples-unique-languages": {
      type: "pick-the-option",
      data: {
        wrap: true,
        ...pickTheOptionData["indigenous-peoples-unique-languages"],
      },
    },
    "dolphin-banging-on-the-boat": {
      type: "plain",
      data: plainData["dolphin-banging-on-the-boat"],
    },
    "will-the-dolphin-flip-danielas-boat": {
      type: "pick-the-option",
      data: {
        wrap: true,
        ...pickTheOptionData["will-the-dolphin-flip-danielas-boat"],
      },
    },
    "the-dolphins-peeled-off": {
      type: "plain",
      data: plainData["the-dolphins-peeled-off"],
    },
  };

  const pageContent: PagerContent[] = narrativesSectionNameKeys.map(
    (key) => contentFirstPart[key],
  );

  return pageContent;
}

export default function NarrativesRoute() {
  const pageContent = useGetNarrativesContent();

  if (!pageContent) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{"Narratives - Kids' Corner - Rainforest Foundation US"}</title>
      </Head>

      <main className="overflow-hidden overflow-y-auto bg-secondary-100">
        <RegularSection fullScreen textColorStyle="dark" name="narratives">
          <NavBar />

          <SectionContent>
            <ContentPager name="narratives" contentList={pageContent} />
          </SectionContent>
        </RegularSection>
      </main>

      <Footer />
    </>
  );
}
