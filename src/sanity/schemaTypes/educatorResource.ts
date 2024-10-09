import { defineType } from "sanity";
import { DocumentPdfIcon } from "@sanity/icons";

export const educatorResource = defineType({
  name: "educatorResource",
  title: "Educator Resource",
  type: "file",
  icon: DocumentPdfIcon,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required(),
    },
  ],
});
