import { NavBar } from "@/components/layout/nav";

import { Footer } from "@/components/layout/footer";
import { RegularSection } from "@/components/sections/regular-section";
import { ContentPager, PagerContent } from "@/components/content/content";
import { SectionContent } from "@/components/content/section-content";

import React from "react";
import { PlainData } from "@/sanity/schemaTypes/plain";
import { getEducatorResources, getStoryComposition } from "@/sanity/lib/queries";
import { PickImageGameData } from "@/sanity/schemaTypes/pickImageGame";
import { PickOptionGameData } from "@/sanity/schemaTypes/pickOptionGame";
import {
  MonkeyInABushIllustration,
  RightLeavesIllustration,
} from "@/components/illustrations/activities-illustrations";
import {
  bottomLeftIllustrationStyles,
  bottomRightIllustrationStyles,
} from "@/styles/illustration-styles";
import { StoryCompositionData } from "@/sanity/schemaTypes/storyComposition";
import type { GetStaticProps } from "next";
import { EducatorResource } from "@/sanity/schemaTypes/educatorResource";
import { Seo } from "@/components/seo";
import { JsonLd, breadcrumbJsonLd } from "@/components/json-ld";
import { resolveStoriesSeo } from "@/lib/resolve-page-seo";

function buildStoriesPageContent(
  storyComposition: StoryCompositionData,
): PagerContent[] {
  return storyComposition.contentItems.map((item) => {
    switch (item.type) {
      case "plain": {
        const plainData = item.data as PlainData;
        return {
          type: "plain",
          data: plainData,
          ...(plainData.subContent?.postcard
            ? {
                subContent: {
                  type: plainData.subContent.type as "postcard",
                  postcard: plainData.subContent.postcard,
                },
              }
            : {}),
        };
      }
      case "pickImageGame": {
        const pickImageGameData = item.data as PickImageGameData;
        return {
          type: "pick-the-image",
          data: {
            wrap: true,
            ...pickImageGameData,
          },
        };
      }
      case "pickOptionGame": {
        const pickOptionGameData = item.data as PickOptionGameData;
        return {
          type: "pick-the-option",
          data: {
            wrap: true,
            ...pickOptionGameData,
          },
        };
      }
    }
  });
}

type StoriesProps = {
  storyComposition: StoryCompositionData | null;
  pageContent: PagerContent[] | null;
  educatorResources: EducatorResource[];
};

export const getStaticProps: GetStaticProps<StoriesProps> = async () => {
  const [storyComposition, educatorResources] = await Promise.all([
    getStoryComposition(),
    getEducatorResources(),
  ]);
  const pageContent = storyComposition
    ? buildStoriesPageContent(storyComposition)
    : null;
  return {
    props: {
      storyComposition,
      pageContent,
      educatorResources,
    },
    revalidate: 60,
  };
};

export default function StoriesRoute({
  storyComposition,
  pageContent,
  educatorResources,
}: StoriesProps) {
  if (!pageContent || !storyComposition) {
    return (
      <>
        <Seo
          path="/stories"
          title={resolveStoriesSeo(null).title}
          description={resolveStoriesSeo(null).description}
          noIndex
        />
        <main className="overflow-hidden bg-secondary-100 p-8">
          <p className="text-neutral-dark-700">Stories are not available.</p>
        </main>
      </>
    );
  }

  const seo = resolveStoriesSeo(storyComposition);

  return (
    <>
      <Seo
        path="/stories"
        title={seo.title}
        description={seo.description}
        imageUrl={seo.imageUrl}
        noIndex={seo.noIndex}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Stories", path: "/stories" },
        ])}
      />

      <main className="overflow-hidden bg-secondary-100">
        <RegularSection fullScreen textColor="#1e1f1b" name="stories">
          <NavBar />

          <SectionContent className="justify-start">
            <h1 className="sr-only">Amazon stories for kids</h1>
            <MonkeyInABushIllustration
              className={bottomLeftIllustrationStyles}
            />

            <RightLeavesIllustration
              className={bottomRightIllustrationStyles}
            />

            <ContentPager
              name="stories"
              contentList={pageContent}
              mainContentClassName="mb-24 bg-primary-300 border-2 border-primary-600 bg-opacity-60 rounded-lg p-4 pb-12"
            />
          </SectionContent>
        </RegularSection>
      </main>

      <Footer educatorResources={educatorResources} />
    </>
  );
}
