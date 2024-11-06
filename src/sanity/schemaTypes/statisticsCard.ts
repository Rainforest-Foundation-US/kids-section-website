import { defineType, defineField } from "sanity";
import { ClipboardImageIcon } from "@sanity/icons";

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
              if ((context.document?.picture as any)?.asset?._ref && !alt) {
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
      of: [{ type: "block" }],
    }),
    defineField({
      name: "description",
      title: "Statistics description",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});

export interface StatisticsCard {
  title: string;
  description: string;
  image: {
    data: string;
    alt: string;
  };
}
