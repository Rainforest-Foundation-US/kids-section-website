import { VignetteSectionOptions } from "@/components/sections/vignette-section";
import { SectionName, sectionNames } from "@/hooks/useGetAboutTheAmazonContent";
import { ThLargeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const vignetteNames = sectionNames.filter(({ value }) =>
  [
    "biodiversity-1",
    "biodiversity-2",
    "biodiversity-3",
    "biodiversity-4",
  ].includes(value),
);

export const VignetteSchemaType = defineType({
  name: "vignette",
  title: "Vignette",
  icon: ThLargeIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      options: {
        list: vignetteNames,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      validation: (rule) => rule.required(),
    }),
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
      name: "imageAlignment",
      title: "Image Alignment",
      type: "string",
      options: {
        list: [
          { title: "Start", value: "start" },
          { title: "Middle", value: "middle" },
          { title: "End", value: "end" },
        ],
      },
      initialValue: "middle",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});

export interface VignetteSection extends VignetteSectionOptions {
  name: SectionName;
}
