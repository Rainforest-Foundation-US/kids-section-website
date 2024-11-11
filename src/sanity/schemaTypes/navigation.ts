import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";
import { SectionName, sectionNames } from "@/hooks/useGetAboutTheAmazonContent";

export const NavigationSchemaType = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "paths",
      title: "Paths",
      type: "array",
      of: [
        {
          name: "path",
          title: "Path",
          type: "object",
          fields: [
            {
              name: "id",
              type: "string",
              title: "Id",
              options: {
                list: sectionNames,
              },
              validation: (rule) => rule.required(),
            },
            {
              name: "name",
              type: "string",
              title: "Name",
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

export interface Navigation {
  name: string;
  paths: {
    id: SectionName;
    name: string;
  }[];
}
