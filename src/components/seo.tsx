import Head from "next/head";
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  getDefaultOgImageUrl,
} from "@/lib/site";

const OG_W = 1200;
const OG_H = 630;
const LOCALE = "en_US";

export type SeoProps = {
  /** URL path e.g. `/` or `/q-and-a` */
  path: string;
  title: string;
  description?: string;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  noIndex?: boolean;
  siteName?: string;
  ogType?: "website" | "article";
};

function normalizePath(path: string) {
  if (path === "" || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

function getCanonicalUrl(path: string) {
  const p = normalizePath(path);
  return p ? `${SITE_URL}${p}` : `${SITE_URL}/`;
}

/**
 * Per-route meta: title, description, canonical, Open Graph, Twitter, robots.
 */
export function Seo({
  path,
  title,
  description = DEFAULT_DESCRIPTION,
  imageUrl = getDefaultOgImageUrl(),
  imageWidth = OG_W,
  imageHeight = OG_H,
  imageAlt = `${SITE_NAME} — social preview image`,
  noIndex = false,
  siteName = SITE_NAME,
  ogType = "website",
}: SeoProps) {
  const canonical = getCanonicalUrl(path);
  const robots = noIndex ? "noindex, nofollow" : "index, follow";

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={robots} />

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={LOCALE} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content={String(imageWidth)} />
      <meta property="og:image:height" content={String(imageHeight)} />
      <meta property="og:image:alt" content={imageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  );
}

/** Default titles when Sanity `seo.title` is empty. */
export const SEO_DEFAULT_TITLES = {
  home: "Kids' Corner — Rainforest Foundation US",
  discover: "Discover the Amazon — Kids' Corner | RFUS",
  stories: "Amazon Stories for Kids — Kids' Corner | RFUS",
  qAndA: "Amazon Rainforest Q&A for Kids — Kids' Corner | RFUS",
  credits: "Credits — Kids' Corner | RFUS",
} as const;
