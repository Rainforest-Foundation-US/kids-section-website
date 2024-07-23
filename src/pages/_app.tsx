import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Head from "next/head";
import { Provider } from "jotai";

const fontFamily = Poppins({
  subsets: ["latin"],
  variable: "--app-font",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="The RFUS Kids' Corner is a place to discover the fascinating secrets of the Amazon and help us protect its animals, plants and communities."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={`${fontFamily.variable} font-sans`}>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </div>
    </>
  );
}
