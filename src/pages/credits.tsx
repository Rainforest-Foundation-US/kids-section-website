import { NavBar } from "@/components/layout/nav";
import Head from "next/head";

import { Footer } from "@/components/layout/footer";
import CreditsPage, { ContributorData } from "@/components/credits";
import { RegularSection } from "@/components/sections/regular-section";
import { SectionContent } from "@/components/content/section-content";

export async function getStaticProps() {
  const contributorData = [
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
  ];

  return {
    props: {
      contributorData,
    },
  };
}

export default function CreditsRoute({
  contributorData,
}: {
  contributorData: ContributorData[];
}) {
  return (
    <>
      <Head>
        <title>{"Credits - Kids' Corner - Rainforest Foundation US"}</title>
      </Head>

      <main className="overflow-hidden bg-secondary-100">
        <RegularSection fullScreen textColor="#1e1f1b" name="credits">
          <NavBar />

          <div className="relative">
            <SectionContent>
              <CreditsPage contributorData={contributorData} />
            </SectionContent>
          </div>
        </RegularSection>
      </main>
      <Footer />
    </>
  );
}
