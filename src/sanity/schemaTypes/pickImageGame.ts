import { SectionNames } from "@/components/content/content";
import { sectionNames } from "@/hooks/useGetDiscoverTheAmazonContent";
import { ComponentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const PickImageGameSchemaType = defineType({
  name: "pickImageGame",
  title: "Pick Image Game",
  icon: ComponentIcon,
  type: "document",
  fields: [
    defineField({
      name: "contentType",
      title: "Content Type",
      type: "string",
      options: {
        list: [
          { title: "About the Amazon", value: "aboutTheAmazon" },
          { title: "Stories", value: "stories" },
        ],
        layout: "radio",
      },
      initialValue: "aboutTheAmazon",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      options: {
        list: sectionNames,
      },
      hidden: ({ document }) => document?.contentType === "stories",
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.contentType === "aboutTheAmazon") {
            return value
              ? true
              : "Name is required for About the Amazon content";
          }
          return true;
        }),
    }),
    defineField({
      name: "customName",
      title: "Name",
      type: "string",
      hidden: ({ document }) => document?.contentType !== "stories",
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.contentType === "stories") {
            return value ? true : "Custom name is required for Stories content";
          }
          return true;
        }),
    }),
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (rule) => rule.required(),
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
          validation: (rule) => rule.required(),
        },
      ],
    }),
    defineField({
      name: "options",
      title: "Options",
      type: "array",
      of: [
        {
          name: "option",
          type: "object",
          title: "Option",
          fields: [
            {
              name: "src",
              title: "Image Source",
              type: "image",
              validation: (rule) => rule.required(),
            },
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "isCorrect",
              title: "Is Correct",
              type: "boolean",
              validation: (rule) => rule.required(),
            },
            {
              name: "reason",
              title: "Reason",
              type: "text",
              deprecated: {
                reason: "Use hintText instead",
              },
            },
            { name: "hintText", title: "Hint Text", type: "text" },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "question", media: "backgroundImage" },
    prepare(selection) {
      const { title, media } = selection;
      return { title, media };
    },
  },
});

export interface PickImageGameData {
  contentType: "aboutTheAmazon" | "stories";
  name?: SectionNames;
  customName?: string;
  question: string;
  hintContent: { hint: string };
  options: {
    imageSrc: string;
    alt: string;
    isCorrect: boolean;
    hintText: string;
  }[];
}
