import { SectionNames } from "@/components/content/content";
import { sectionNames } from "@/hooks/useGetDiscoverTheAmazonContent";
import { ComponentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const PickOptionGameSchemaType = defineType({
  name: "pickOptionGame",
  title: "Pick Option Game",
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
      name: "rotateOptions",
      title: "Rotate Options",
      type: "boolean",
      initialValue: false,
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
              name: "text",
              title: "Text",
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
              name: "hintText",
              title: "Hint Text",
              type: "string",
            },
          ],
        },
      ],
    }),
  ],
  preview: { select: { title: "question" } },
});

export interface PickOptionGameData {
  contentType: "aboutTheAmazon" | "stories";
  name?: SectionNames;
  customName?: string;
  question: string;
  rotateOptions: boolean;
  options: {
    isCorrect: boolean;
    text: string;
    hintText?: string;
  }[];
}
