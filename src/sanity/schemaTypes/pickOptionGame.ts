import { SectionNames } from "@/components/content/content";
import { sectionNames } from "@/hooks/useGetAboutTheAmazonContent";
import { narrativesSectionNames } from "@/pages/narratives";
import { ComponentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const PickOptionGameSchemaType = defineType({
  name: "pickOptionGame",
  title: "Pick Option Game",
  icon: ComponentIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
      options: {
        list: [...narrativesSectionNames, ...sectionNames],
      },
    }),
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (rule) => rule.required(),
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
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "question",
    },
  },
});

export interface PickOptionGameData {
  name: SectionNames;
  question: string;
  options: {
    isCorrect: boolean;
    text: string;
  }[];
}
