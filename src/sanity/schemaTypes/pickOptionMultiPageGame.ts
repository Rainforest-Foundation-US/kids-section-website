import { SectionNames } from "@/components/content/content";
import { sectionNames } from "@/hooks/useGetDiscoverTheAmazonContent";
import { ComponentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { PickOptionGameData } from "./pickOptionGame";
import { textColorList, type TextColor } from "../lib/colors";

export const PickOptionMultiPageGameSchemaType = defineType({
  name: "pickOptionMultiPageGame",
  title: "Pick Option Multi-Page Game",
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
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titleColor",
      title: "Title Color",
      type: "color",
      options: {
        colorList: textColorList,
      },
    }),
    defineField({
      name: "gamePages",
      title: "Game Pages",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "pickOptionGame" }],
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "contentType",
    },
  },
});

export interface PickOptionMultiPageGameData {
  contentType: "aboutTheAmazon" | "stories";
  name?: SectionNames;
  customName?: string;
  title: string;
  titleColor?: TextColor;
  gamePages: PickOptionGameData[];
}
