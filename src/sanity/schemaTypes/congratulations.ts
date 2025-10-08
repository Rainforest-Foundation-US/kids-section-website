import { defineField, defineType } from "sanity";
import { OkHandIcon } from "@sanity/icons";

export const CongratulationsSchemaType = defineType({
  name: "congratulations",
  title: "Congratulations",
  type: "document",
  icon: OkHandIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The main congratulations message",
      validation: (rule) => rule.required(),
      initialValue: "Congratulations!",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      description: "The description text below the title",
      validation: (rule) => rule.required(),
      initialValue: "Great job on finishing the game!",
    }),
    defineField({
      name: "buttonLabel",
      title: "Button Label",
      type: "string",
      description: "The text displayed on the action button",
      validation: (rule) => rule.required(),
      initialValue: "New Game",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
});

export interface CongratulationsData {
  title: string;
  description: string;
  buttonLabel: string;
}
