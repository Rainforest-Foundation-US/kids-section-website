import { SectionNames } from "@/components/content/content";
import { ComponentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { type TextColor, textColorList } from "../lib/colors";
import { PolaroidData } from "./polaroid";
import { PostcardData } from "./postcard";
import { SanityImageObject } from "@sanity/image-url/lib/types/types";

export const FillInTheBlankGameSchemaType = defineType({
  name: "fillInTheBlankGame",
  title: "Fill In The Blank Game",
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
      name: "background",
      title: "Background",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "preText",
      title: "Pre Text",
      description: "Text that appears before the question",
      type: "string",
      initialValue: "",
    }),
    defineField({
      name: "question",
      title: "Question",
      description: "Text with <blank /> placeholders where options will appear",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subText",
      title: "Sub Text",
      description: "Text that appears after the question",
      type: "string",
    }),
    defineField({
      name: "textColor",
      title: "Text Color",
      type: "color",
      options: {
        colorList: textColorList,
      },
    }),
    defineField({
      name: "fontWeightStyle",
      title: "Font Weight Style",
      type: "string",
      options: {
        list: [
          { title: "Regular", value: "regular" },
          { title: "Bold", value: "bold" },
        ],
      },
      initialValue: "regular",
    }),
    defineField({
      name: "isNeutral",
      title: "Is Neutral",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "blanks",
      title: "Blanks",
      type: "array",
      of: [
        {
          name: "blank",
          type: "object",
          title: "Blank",
          fields: [
            {
              name: "position",
              title: "Position",
              description: "The 0-based index of this blank in the question",
              type: "number",
              validation: (rule) => rule.required().min(0),
            },
            {
              name: "options",
              title: "Options",
              type: "array",
              of: [{ type: "string" }],
              validation: (rule) => rule.required().min(2),
            },
            {
              name: "correctOptionPosition",
              title: "Correct Option Position",
              description: "The 1-based index of the correct option",
              type: "number",
              validation: (rule) => rule.required().min(0),
            },
            {
              name: "correctHintText",
              title: "Correct Hint Text",
              type: "string",
            },
            {
              name: "incorrectHintText",
              title: "Incorrect Hint Text",
              type: "string",
            },
          ],
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "hint",
      title: "Hint",
      type: "string",
      initialValue: "",
    }),
    defineField({
      name: "subContent",
      title: "Sub Content",
      type: "object",
      fields: [
        defineField({
          name: "postcard",
          title: "Postcard",
          type: "reference",
          to: { type: "postcard" },
          description: "Select a postcard to display on the page.",
        }),
        defineField({
          name: "polaroid",
          title: "Polaroid",
          type: "reference",
          to: { type: "polaroid" },
          description: "Select a polaroid to display on the page.",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "preText",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Fill in the blank game",
        subtitle: subtitle || "",
      };
    },
  },
});

export interface FillInTheBlankGameData {
  contentType: "aboutTheAmazon" | "stories";
  name?: SectionNames;
  customName?: string;
  background?: SanityImageObject;
  preText: string;
  question: string;
  subText?: string;
  textColor?: TextColor;
  fontWeightStyle?: "regular" | "bold";
  isNeutral?: boolean;
  blanks: {
    position: number;
    options: string[];
    correctOptionPosition: number;
    correctHintText?: string;
    incorrectHintText?: string;
  }[];
  hint: string;
  subContent: {
    postcard?: PostcardData;
    polaroid?: PolaroidData;
  };
}
