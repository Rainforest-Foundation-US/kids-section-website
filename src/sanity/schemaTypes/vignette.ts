import { VignetteSectionOptions } from "@/components/sections/vignette-section";
import { ComponentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const VignetteSchemaType = defineType({
  name: "vignette",
  title: "Vignette",
  icon: ComponentIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      options: {
        list: [
          { title: "Biodiversity 1", value: "biodiversity-1" },
          { title: "Biodiversity 2", value: "biodiversity-2" },
          { title: "Biodiversity 3", value: "biodiversity-3" },
          { title: "Biodiversity 4", value: "biodiversity-4" },
        ],
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
          description: "Important for SEO and accessiblity.",
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
        hotspot: true,
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
  name: string;
}
