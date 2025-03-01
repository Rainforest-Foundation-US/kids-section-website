import { LearningPath } from "@/components/learning-path-map";
import { NavBar } from "@/components/layout/nav";
import { HomeSectionsContainer } from "@/components/sections";
import Head from "next/head";

import { Footer } from "@/components/layout/footer";
import { ContentSectionList } from "@/components/content/content";
import { useGetDiscoverTheAmazonContent } from "@/hooks/useGetDiscoverTheAmazonContent";

export default function DiscoverTheAmazonRoute() {
  const discoverTheAmazonSections = useGetDiscoverTheAmazonContent();

  return (
    <>
      <Head>
        <title>
          {"Discover the Amazon - Kids' Corner - Rainforest Foundation US"}
        </title>
      </Head>

      <main className="overflow-hidden bg-neutral-600">
        <HomeSectionsContainer>
          <div className="absolute inset-x-0 top-0">
            <NavBar />
          </div>

          <aside className="absolute top-[8rem] z-20">
            <LearningPath />
          </aside>

          <ContentSectionList sections={discoverTheAmazonSections} />
        </HomeSectionsContainer>

        <Footer />
      </main>
    </>
  );
}
