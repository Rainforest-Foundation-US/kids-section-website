import Head from "next/head";
import { NavBar } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";

export default function UnderConstructionPage() {
  return (
    <>
      <Head>
        <title>
          {"Under Construction - Kids' Corner - Rainforest Foundation US"}
        </title>
      </Head>

      <main className="flex min-h-screen flex-col bg-neutral-600">
        <div className="w-full">
          <NavBar />
        </div>

        <div className="flex flex-grow flex-col items-center justify-center px-4 py-16">
          <div className="w-full max-w-2xl rounded-lg bg-neutral-100 p-8 text-center shadow-lg">
            <h1 className="text-green-700 mb-6 text-3xl font-bold md:text-4xl">
              Page Under Construction
            </h1>

            <div className="text-yellow-600 mb-6 text-6xl">🚧</div>

            <p className="text-gray-700 mb-8 text-lg">
              We&apos;re working hard to bring you an amazing experience. This
              section of the Kids&apos; Corner will be available soon!
            </p>

            <Link
              href="/"
              className="bg-green-600 hover:bg-green-700 inline-block rounded-md px-6 py-3 text-lg font-medium text-primary-500 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
