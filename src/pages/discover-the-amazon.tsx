import { LearningPath } from "@/components/learning-path-map";
import { NavBar } from "@/components/layout/nav";
import { HomeSectionsContainer } from "@/components/sections";
import React, { useMemo } from "react";
import type { GetStaticProps } from "next";

import { Footer } from "@/components/layout/footer";
import { ContentSectionList } from "@/components/content/content";
import {
  buildDiscoverTheAmazonContent,
  fetchDiscoverTheAmazonData,
  type DiscoverTheAmazonData,
} from "@/hooks/useGetDiscoverTheAmazonContent";
import { getEducatorResources, getNavigation } from "@/sanity/lib/queries";
import { Navigation } from "@/sanity/schemaTypes/navigation";
import { EducatorResource } from "@/sanity/schemaTypes/educatorResource";
import { Seo } from "@/components/seo";
import { JsonLd, breadcrumbJsonLd } from "@/components/json-ld";
import { staticPageSeo } from "@/lib/resolve-page-seo";

type Props = {
  discoverData: DiscoverTheAmazonData;
  navigation: Navigation | null;
  educatorResources: EducatorResource[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const [discoverData, navigation, educatorResources] = await Promise.all([
    fetchDiscoverTheAmazonData(),
    getNavigation(),
    getEducatorResources(),
  ]);
  return {
    props: {
      discoverData,
      navigation,
      educatorResources,
    },
    revalidate: 60,
  };
};

export default function DiscoverTheAmazonRoute({
  discoverData,
  navigation,
  educatorResources,
}: Props) {
  const discoverTheAmazonSections =
    buildDiscoverTheAmazonContent(discoverData);
  const seo = staticPageSeo("discover");
  const initialPaths = useMemo(
    () => navigation?.paths.map((p) => ({ id: p.id, title: p.name })) ?? [],
    [navigation],
  );

  return (
    <>
      <Seo
        path="/discover-the-amazon"
        title={seo.title}
        description={seo.description}
        imageUrl={seo.imageUrl}
        noIndex={seo.noIndex}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Discover the Amazon", path: "/discover-the-amazon" },
        ])}
      />

      <main className="overflow-hidden bg-neutral-600">
        <h1 className="sr-only">
          Discover the Amazon — interactive learning path
        </h1>
        <HomeSectionsContainer>
          <div className="absolute inset-x-0 top-0">
            <NavBar />
          </div>

          <aside className="absolute top-[8rem] z-20">
            <LearningPath initialPaths={initialPaths} />
          </aside>

          <ContentSectionList sections={discoverTheAmazonSections} />
        </HomeSectionsContainer>

        <Footer educatorResources={educatorResources} />
      </main>
    </>
  );
}
