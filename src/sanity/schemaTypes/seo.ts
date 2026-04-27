import { defineField, defineType } from "sanity";

export const SeoObjectType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "Meta title",
      type: "string",
      description: "Optional. Shown in search results; ~50–60 characters ideal.",
      validation: (r) => r.max(70),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "Optional. Shown in search results; ~150–160 characters ideal.",
      validation: (r) => r.max(200),
    }),
    defineField({
      name: "image",
      title: "Share image",
      type: "image",
      options: { hotspot: true },
      description: "Open Graph / Twitter. ~1200×630 works best.",
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
    }),
  ],
});

export interface SeoFields {
  title?: string;
  description?: string;
  noIndex?: boolean;
  /** Set by GROQ when projecting `image.asset->url` */
  imageUrl?: string | null;
}
