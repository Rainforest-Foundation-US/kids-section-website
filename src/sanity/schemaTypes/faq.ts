import { defineField, defineType } from "sanity";
import { InfoOutlineIcon } from "@sanity/icons";

export const FaqSchemaType = defineType({
  name: "faq",
  title: "Faq",
  type: "document",
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "entries",
      title: "Entries",
      type: "array",
      of: [
        {
          name: "entry",
          title: "Entry",
          type: "object",
          fields: [
            {
              name: "question",
              type: "string",
              title: "Question",
              validation: (rule) => rule.required(),
            },
            {
              name: "hint",
              type: "string",
              title: "Hint",
              validation: (rule) => rule.required(),
            },
            {
              name: "answer",
              type: "string",
              title: "Answer",
              validation: (rule) => rule.required(),
            },
            {
              name: "description",
              type: "array",
              title: "Description",
              of: [{ type: "block" }],
              validation: (rule) => rule.required(),
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
