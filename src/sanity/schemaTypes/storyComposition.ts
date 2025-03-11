import { DocumentsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { PlainData } from "./plain";
import { PickImageGameData } from "./pickImageGame";
import { PickOptionGameData } from "./pickOptionGame";

export const StoryCompositionSchemaType = defineType({
  name: "storyComposition",
  title: "Story Composition",
  icon: DocumentsIcon,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "contentItems",
      title: "Content Items",
      type: "array",
      of: [
        {
          type: "reference",
          title: "Content Item",
          to: [
            { type: "plain" },
            { type: "pickOptionGame" },
            { type: "pickImageGame" },
          ],
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
});

interface ContentItem {
  type: "plain" | "pickOptionGame" | "pickImageGame";
  data: PlainData | PickOptionGameData | PickImageGameData;
}

export interface StoryCompositionData {
  title: string;
  description?: string;
  contentItems: ContentItem[];
}
