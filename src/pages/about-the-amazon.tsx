import { HomeGoNextSectionButton, NavBarLink } from "@/components/buttons";
import { NavBar } from "@/components/layout";
import { HomeSection, HomeSectionsContainer } from "@/components/sections";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>About the Amazon</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="snap-mandatory snap-y h-screen overflow-y-auto bg-neutral-600">
        <HomeSectionsContainer>
          <HomeSection className="h-screen snap-center flex flex-col relative">
            <NavBar />

            <Image
              className="object-cover block absolute inset-0 w-full h-full"
              src="/sections/welcome/background.png"
              height={1280}
              width={720}
              aria-hidden
              alt=""
            />

            <div className="z-10">
              <HomeGoNextSectionButton />
            </div>
          </HomeSection>

          <HomeSection className="h-screen snap-center flex bg-complementary-600 relative">
            <div className="z-10">
              <HomeGoNextSectionButton />
            </div>
          </HomeSection>

          <HomeSection className="h-screen snap-center bg-error-700 flex relative">
            <div className="z-10">
              <HomeGoNextSectionButton />
            </div>
          </HomeSection>
        </HomeSectionsContainer>
      </main>
    </>
  );
}