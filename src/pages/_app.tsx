import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "@next/font/google";

const fontFamily = Poppins({
  subsets: ["latin"],
  variable: "--app-font",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${fontFamily.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
