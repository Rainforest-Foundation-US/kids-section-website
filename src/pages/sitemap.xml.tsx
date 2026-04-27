import { GetServerSideProps } from "next";
import { SITE_URL } from "@/lib/site";
import { getSitemapLastModified } from "@/sanity/lib/queries";

const STATIC_PATHS: { loc: string; pathKey: "home" | "discover" | "stories" | "faq" | "credits" }[] = [
  { loc: "", pathKey: "home" },
  { loc: "/discover-the-amazon", pathKey: "discover" },
  { loc: "/stories", pathKey: "stories" },
  { loc: "/q-and-a", pathKey: "faq" },
  { loc: "/credits", pathKey: "credits" },
];

function escapeUrl(url: string) {
  return url.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default function SitemapPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const lastModified = await getSitemapLastModified();
  const fallback = new Date().toISOString();

  const urlEntries = STATIC_PATHS.map(({ loc, pathKey }) => {
    const lastmod =
      (pathKey in lastModified && lastModified[pathKey as keyof typeof lastModified]) || fallback;
    return `  <url>
    <loc>${escapeUrl(`${SITE_URL}${loc || "/"}`)}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.write(xml);
  res.end();

  return { props: {} };
};
