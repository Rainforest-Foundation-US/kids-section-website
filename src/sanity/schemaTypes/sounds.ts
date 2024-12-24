import { defineType, defineField } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export const GameSoundsSchemaType = defineType({
  name: "gameSounds",
  title: "Game Sounds",
  icon: DocumentIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "correct",
      title: "Correct",
      type: "file",
      options: { accept: "audio/*" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "incorrect",
      title: "Incorrect",
      type: "file",
      options: { accept: "audio/*" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "congratulations",
      title: "Congratulations",
      type: "file",
      options: { accept: "audio/*" },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});

export interface GameSounds {
  name: string;
  correct: string;
  incorrect: string;
  congratulations: string;
}
