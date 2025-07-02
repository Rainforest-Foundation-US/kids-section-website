/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineField, defineType, TypedObject } from "sanity";
import { InfoOutlineIcon } from "@sanity/icons";
import { sectionNames } from "@/hooks/useGetDiscoverTheAmazonContent";
import { PostcardData } from "./postcard";
import { PolaroidData } from "./polaroid";
import { defaultMarkAnnotations } from "../lib/defaultMarkAnnotations";
import { SectionNames } from "@/components/content/content";
import { type TextColor, textColorList } from "../lib/colors";

export const PlainSchemaType = defineType({
  name: "plain",
  title: "Plain",
  type: "document",
  icon: InfoOutlineIcon,
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
      name: "caption",
      title: "Caption",
      type: "string",
    }),
    defineField({
      name: "captionAlign",
      title: "Caption Align",
      type: "string",
      options: {
        list: ["left", "center", "right"],
      },
    }),
    defineField({
      name: "captionColor",
      title: "Caption Color",
      type: "color",
      options: {
        colorList: textColorList,
      },
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "titleAlign",
      title: "Title Align",
      type: "string",
      options: {
        list: ["left", "center", "right"],
      },
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
      name: "text",
      title: "Text",
      type: "array",
      of: [{ type: "block", marks: { annotations: defaultMarkAnnotations } }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "textAlign",
      title: "Text Align",
      type: "string",
      options: {
        list: ["left", "center", "right"],
      },
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
      name: "subText",
      title: "Sub Text",
      type: "string",
    }),
    defineField({
      name: "subTextColor",
      title: "Sub Text Color",
      type: "color",
      options: {
        colorList: textColorList,
      },
    }),
    defineField({
      name: "subContent",
      title: "Sub Content",
      type: "object",
      fields: [
        defineField({
          name: "type",
          title: "Type",
          type: "string",
          options: {
            list: [
              { title: "Polaroids", value: "polaroids" },
              { title: "Postcard", value: "postcard" },
              { title: "Plain", value: "plain" },
            ],
            layout: "radio",
          },
        }),
        defineField({
          name: "reference",
          title: "Reference",
          type: "array",
          of: [{ type: "reference", to: [{ type: "polaroid" }] }],
          hidden: ({ document }) =>
            (document?.subContent as any)?.type !== "polaroids",
        }),
        defineField({
          name: "singleReference",
          title: "Reference",
          type: "reference",
          to: [{ type: "postcard" }, { type: "plain" }],
          hidden: ({ document }) =>
            (document?.subContent as any)?.type === "polaroids",
          options: {
            filter: ({ document }) => {
              const type = (document?.subContent as any)?.type;
              return {
                filter: `_type == "${type}"`,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      name: "name",
      customName: "customName",
    },
    prepare(selection) {
      return {
        title: selection.name || selection.customName,
      };
    },
  },
});

interface BasePlainData {
  contentType: "aboutTheAmazon" | "stories";
  name?: SectionNames;
  customName?: string;
  text: TypedObject;
  textAlign?: "left" | "center" | "right";
  textColor?: TextColor;
  caption?: string;
  captionAlign?: "left" | "center" | "right";
  captionColor?: TextColor;
  title?: string;
  titleAlign?: "left" | "center" | "right";
  titleColor?: TextColor;
  subText?: string;
  subTextColor?: TextColor;
}

export interface PlainData extends BasePlainData {
  subContent: {
    type: "polaroids" | "postcard" | "plain";
    postcard?: PostcardData;
    polaroid?: PolaroidData;
    polaroids?: PolaroidData[];
    data?: PlainData;
  };
}
