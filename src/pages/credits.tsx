import { NavBar } from "@/components/layout/nav";

import { Footer } from "@/components/layout/footer";
import CreditsPage, { ContributorData } from "@/components/credits";
import { RegularSection } from "@/components/sections/regular-section";
import { SectionContent } from "@/components/content/section-content";
import { getEducatorResources } from "@/sanity/lib/queries";
import { EducatorResource } from "@/sanity/schemaTypes/educatorResource";
import { Seo } from "@/components/seo";
import { JsonLd, breadcrumbJsonLd } from "@/components/json-ld";
import { staticPageSeo } from "@/lib/resolve-page-seo";

export async function getStaticProps() {
  const [contributorData, educatorResources] = await Promise.all([
    Promise.resolve([
      {
        title: "Development",
        contributors: [
          { name: "Rowin Hernández", role: "Lead developer" },
          { name: "Kokan Malenko", role: "Lead developer" },
          { name: "Kari Hernández", role: "Developer" },
          { name: "Lokesh Pathrabe", role: "Developer" },
          { name: "Ali Aizaz", role: "Developer" },
          { name: "Mohammed Agboola", role: "Developer" },
          { name: "Amaan Salheen", role: "Developer" },
          { name: "Nelio Carneiro", role: "Developer" },
        ],
      },
      {
        title: "Project Management Support",
        contributors: [{ name: "Simone Theeboom" }],
      },
      {
        title: "Content Development",
        contributors: [
          { name: "Rainforest Foundation US" },
          { name: "Jeremy Kundtz " },
        ],
      },
      {
        title: "UX Design",
        contributors: [
          { name: "Darwin Álvarez", role: "Lead UX designer" },
          { name: "Salman Syed Muhammad", role: "UX designer" },
        ],
      },
      {
        title: "Assets",
        contributors: [
          { name: "Golshid Yazdi", role: "Illustrations" },
          { name: "Simon Dures Productions", role: "Video" },
          { name: "Rainforest Foundation US", role: "Images" },
          { name: "Adobe Stock", role: "Images" },
        ],
      },
    ] satisfies ContributorData[]),
    getEducatorResources(),
  ]);

  return {
    props: {
      contributorData,
      educatorResources,
    },
    revalidate: 60,
  };
}

export default function CreditsRoute({
  contributorData,
  educatorResources,
}: {
  contributorData: ContributorData[];
  educatorResources: EducatorResource[];
}) {
  const seo = staticPageSeo("credits");

  return (
    <>
      <Seo
        path="/credits"
        title={seo.title}
        description={seo.description}
        imageUrl={seo.imageUrl}
        noIndex={seo.noIndex}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Credits", path: "/credits" },
        ])}
      />

      <main className="overflow-hidden bg-secondary-100">
        <RegularSection fullScreen textColor="#1e1f1b" name="credits">
          <NavBar />

          <h1 className="sr-only">Credits</h1>
          <div className="relative">
            <SectionContent>
              <CreditsPage contributorData={contributorData} />
            </SectionContent>
          </div>
        </RegularSection>
      </main>
      <Footer educatorResources={educatorResources} />
    </>
  );
}
