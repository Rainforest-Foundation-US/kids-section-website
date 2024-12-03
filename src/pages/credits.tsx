import { NavBar } from "@/components/layout/nav";
import Head from "next/head";

import { Footer } from "@/components/layout/footer";
import CreditsPage from "@/components/credits";
import { RegularSection } from "@/components/sections/regular-section";
import { SectionContent } from "@/components/content/section-content";

export default function CreditsRoute() {
  return (
    <>
      <Head>
        <title>{"Credits - Kids' Corner - Rainforest Foundation US"}</title>
      </Head>

      <main className="overflow-hidden bg-secondary-100">
        <RegularSection fullScreen textColorStyle="dark" name="credits">
          <NavBar />

          <div className="relative">
            <SectionContent>
              <CreditsPage />
            </SectionContent>
          </div>
        </RegularSection>
      </main>
      <Footer />
    </>
  );
}
