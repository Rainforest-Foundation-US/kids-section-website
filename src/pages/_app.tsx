import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Head from "next/head";
import Script from "next/script";
import { Provider } from "jotai";

export const fontFamily = Poppins({
  subsets: ["latin"],
  variable: "--app-font",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-8LJQVTYJ76"
        strategy="afterInteractive"
      />
      <Script id="google-tag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-8LJQVTYJ76');
        `}
      </Script>
      <Head>
        <meta
          name="description"
          content="The RFUS Kids' Corner is a place to discover the fascinating secrets of the Amazon and help us protect its animals, plants and communities."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={`${fontFamily.variable} font-sans`}>
        <div id="app-root">
          <Provider>
            <Component {...pageProps} />
          </Provider>
        </div>
      </div>
    </>
  );
}
