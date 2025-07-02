import { ThLargeIcon } from "@sanity/icons";
import { SanityImageObject } from "@sanity/image-url/lib/types/types";
import { defineField, defineType } from "sanity";

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
    defineField({
      name: "hintContent",
      title: "Hint Content",
      type: "object",
      fields: [
        {
          name: "hint",
          title: "Hint",
          type: "string",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});
