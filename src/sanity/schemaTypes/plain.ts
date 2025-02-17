import { defineField, defineType, TypedObject } from "sanity";
import { InfoOutlineIcon } from "@sanity/icons";
import { narrativesSectionNames } from "@/pages/narratives";
import { sectionNames } from "@/hooks/useGetAboutTheAmazonContent";
import { PostcardData } from "./postcard";
import { PolaroidData } from "./polaroid";
import { defaultMarkAnnotations } from "../lib/defaultMarkAnnotations";
import { SectionNames } from "@/components/content/content";

export const PlainSchemaType = defineType({
  name: "plain",
  title: "Plain",
  type: "document",
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      options: {
        list: [...narrativesSectionNames, ...sectionNames],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "array",
      of: [{ type: "block", marks: { annotations: defaultMarkAnnotations } }],
    }),
    defineField({
      name: "textAlign",
      title: "Text Align",
      type: "string",
      options: {
        list: ["left", "center", "right"],
      },
      initialValue: "left",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
    defineField({
      name: "subText",
      title: "Sub Text",
      type: "string",
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
            (document as any)?.subContent?.type !== "polaroids",
        }),
        defineField({
          name: "singleReference",
          title: "Reference",
          type: "reference",
          to: [{ type: "postcard" }, { type: "plain" }],
          hidden: ({ document }) =>
            (document as any)?.subContent?.type === "polaroids",
          options: {
            filter: ({ document }) => {
              const type = (document as any)?.subContent?.type;
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
      title: "name",
    },
  },
});

interface BasePlainData {
  name: SectionNames;
  text: TypedObject;
  textAlign: "left" | "center" | "right";
  caption: string;
  subText: string;
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
