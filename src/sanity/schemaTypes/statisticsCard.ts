import { defineType, defineField, PortableTextBlock } from "sanity";
import { ClipboardImageIcon } from "@sanity/icons";
import { defaultMarkAnnotations } from "../lib/defaultMarkAnnotations";
import { SanityImageObject } from "@sanity/image-url/lib/types/types";

export const StatisticsCard = defineType({
  name: "statisticsCard",
  title: "Statistics Card",
  icon: ClipboardImageIcon,
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessibility.",
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if (
                (context.document?.picture as SanityImageObject)?.asset?._ref &&
                !alt
              ) {
                return "Required";
              }
              return true;
            });
          },
        },
      ],
      options: {
        aiAssist: {
          imageDescriptionField: "alt",
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Statistics title",
      type: "array",
      of: [{ type: "block", marks: { annotations: defaultMarkAnnotations } }],
    }),
    defineField({
      name: "description",
      title: "Statistics description",
      type: "array",
      of: [
        {
          type: "block",
          marks: {
            annotations: defaultMarkAnnotations,
          },
        },
      ],
    }),
  ],
});

export interface StatisticsCard {
  title: PortableTextBlock[];
  description: PortableTextBlock[];
  image: {
    data: string;
    alt: string;
  };
}
