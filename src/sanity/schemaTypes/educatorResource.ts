import { defineType, defineField } from "sanity";
import { DocumentPdfIcon } from "@sanity/icons";

export const EducatorResource = defineType({
  name: "educatorResource",
  title: "Educator Resource",
  icon: DocumentPdfIcon,
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
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "file",
      options: {
        accept: ".zip",
      },
      validation: (rule) => rule.required(),
    }),
  ],
});

export interface EducatorResource {
  title: string;
  description: string;
  link: string;
}
