import { ComponentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const PickImageGameSchemaType = defineType({
  name: "pickImageGame",
  title: "Pick Image Game",
  icon: ComponentIcon,
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "leftSideContent",
      title: "Left Side Content",
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
      media: "backgroundImage",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title,
        media,
      };
    },
  },
});

export interface PickImageGameData {
  question: string;
  bacgroundImage: string;
  leftSideContent: {
    hint: string;
  };
  options: {
    src: string;
    alt: string;
    isCorrect: boolean;
    reason: string;
  }[];
}
