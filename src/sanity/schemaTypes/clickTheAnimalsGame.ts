import { defineField, defineType } from "sanity";
import { ComponentIcon } from "@sanity/icons";
import { SectionNames } from "@/components/content/content";

export const ClickTheAnimalsGameSchemaType = defineType({
  name: "clickTheAnimalsGame",
  title: "Click The Animals Game",
  icon: ComponentIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "defaultText",
      title: "Default Text",
      description: "The instructional text displayed above the animals",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "animals",
      title: "Animals",
      description: "Configure the clickable animals and their tooltip content",
      type: "array",
      of: [
        {
          name: "animal",
          type: "object",
          title: "Animal",
          fields: [
            {
              name: "id",
              title: "Animal ID",
              description:
                "Must match the animal element ID in the illustration (e.g., 'flamingo', 'chameleon')",
              type: "string",
              options: {
                list: [
                  { title: "Flamingo", value: "flamingo" },
                  { title: "Chameleon", value: "chameleon" },
                  { title: "Butterfly", value: "butterfly" },
                  { title: "Parrot", value: "parrot" },
                  { title: "Lemur", value: "lemur" },
                  { title: "Frog", value: "frog" },
                ],
              },
              validation: (rule) => rule.required(),
            },
            {
              name: "content",
              title: "Tooltip Content",
              description:
                "The message that appears when the animal is clicked",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            },
            {
              name: "place",
              title: "Tooltip Position",
              description:
                "Where the tooltip should appear relative to the animal",
              type: "string",
              options: {
                list: [
                  { title: "Top", value: "top" },
                  { title: "Bottom", value: "bottom" },
                  { title: "Left", value: "left" },
                  { title: "Right", value: "right" },
                  { title: "Top Start", value: "top-start" },
                  { title: "Top End", value: "top-end" },
                  { title: "Bottom Start", value: "bottom-start" },
                  { title: "Bottom End", value: "bottom-end" },
                  { title: "Left Start", value: "left-start" },
                  { title: "Left End", value: "left-end" },
                  { title: "Right Start", value: "right-start" },
                  { title: "Right End", value: "right-end" },
                ],
              },
              validation: (rule) => rule.required(),
            },
            {
              name: "offset",
              title: "Tooltip Offset",
              description: "Fine-tune tooltip position with x and y offsets",
              type: "object",
              fields: [
                {
                  name: "x",
                  title: "X Offset",
                  type: "number",
                  initialValue: 0,
                },
                {
                  name: "y",
                  title: "Y Offset",
                  type: "number",
                  initialValue: 0,
                },
              ],
            },
          ],
          preview: {
            select: {
              title: "id",
              subtitle: "content",
            },
            prepare({ title, subtitle }) {
              return {
                title: title
                  ? title.charAt(0).toUpperCase() + title.slice(1)
                  : "Animal",
                subtitle: subtitle ? `${subtitle.substring(0, 50)}...` : "",
              };
            },
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "defaultText",
      name: "name",
    },
    prepare({ title, name }) {
      return {
        title: name || "Click The Animals Game",
        subtitle: title,
      };
    },
  },
});

export interface ClickTheAnimalsGameData {
  name?: SectionNames;
  defaultText: string;
  animals: {
    id: string;
    content: string;
    place:
      | "top"
      | "bottom"
      | "left"
      | "right"
      | "top-start"
      | "top-end"
      | "bottom-start"
      | "bottom-end"
      | "left-start"
      | "left-end"
      | "right-start"
      | "right-end";
    offset?: {
      x: number;
      y: number;
    };
  }[];
}
