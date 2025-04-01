import { NavBar } from "@/components/layout/nav";

import Head from "next/head";

import { Footer } from "@/components/layout/footer";
import { RegularSection } from "@/components/sections/regular-section";
import { ContentPager, PagerContent } from "@/components/content/content";
import { SectionContent } from "@/components/content/section-content";

import React from "react";
import { PlainData } from "@/sanity/schemaTypes/plain";
import { getStoryComposition } from "@/sanity/lib/queries";
import { PickImageGameData } from "@/sanity/schemaTypes/pickImageGame";
import { PickOptionGameData } from "@/sanity/schemaTypes/pickOptionGame";
import {
  MonkeyInABushIllustration,
  RightLeavesIllustration,
} from "@/components/illustrations/activities-illustrations";
import {
  bottomLeftIllustrationStyles,
  rightIllustrationStyles,
} from "@/styles/illustration-styles";
import { StoryCompositionData } from "@/sanity/schemaTypes/storyComposition";

function useGetStoriesContent() {
  const [storyComposition, setStoryComposition] =
    React.useState<StoryCompositionData>();

  React.useEffect(() => {
    async function getData() {
      const storyCompositionFromServer = await getStoryComposition();

      setStoryComposition(storyCompositionFromServer);
    }

    getData();
  }, []);

  if (!storyComposition) {
    return null;
  }

  const pageContent: PagerContent[] = storyComposition.contentItems.map(
    (item) => {
      switch (item.type) {
        case "plain":
          const plainData = item.data as PlainData;
          return {
            type: "plain",
            data: plainData,
            subContent: plainData.subContent?.postcard && {
              type: plainData.subContent?.type as "postcard",
              postcard: plainData.subContent?.postcard,
            },
          };
        case "pickImageGame":
          const pickImageGameData = item.data as PickImageGameData;
          return {
            type: "pick-the-image",
            data: {
              wrap: true,
              ...pickImageGameData,
            },
          };
        case "pickOptionGame":
          const pickOptionGameData = item.data as PickOptionGameData;
          return {
            type: "pick-the-option",
            data: {
              wrap: true,
              ...pickOptionGameData,
            },
          };
      }
    },
  );

  return pageContent;
}

export default function StoriesRoute() {
  const pageContent = useGetStoriesContent();

  if (!pageContent) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{"Stories - Kids' Corner - Rainforest Foundation US"}</title>
      </Head>

      <main className="overflow-hidden bg-secondary-100">
        <RegularSection fullScreen textColorStyle="dark" name="stories">
          <NavBar />

          <SectionContent>
            {/* Bottom left illustration */}
            <MonkeyInABushIllustration
              className={bottomLeftIllustrationStyles}
            />

            {/* Right leaves illustration */}
            <RightLeavesIllustration className={rightIllustrationStyles} />

            <ContentPager
              name="stories"
              contentList={pageContent}
              mainContentClassName="h-[50vh] overflow-y-auto overflow-x-hidden"
              leftArrowClassName="top-1/3"
              rightArrowClassName="top-1/3"
              isStories
            />
          </SectionContent>
        </RegularSection>
      </main>

      <Footer />
    </>
  );
}
