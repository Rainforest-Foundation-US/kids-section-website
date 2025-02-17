import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";
import { StaticImageData } from "next/image";

export const PostcardSchemaType = defineType({
  name: "postcard",
  title: "Postcard",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: "alt",
        },
      },
      validation: (rule) => rule.required(),
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessibility.",
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.picture as any)?.asset?._ref && !alt) {
                return "Required";
              }
              return true;
            });
          },
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
  ],
  preview: {
    select: {
      media: "image",
    },
    prepare(selection) {
      const { media } = selection;
      return {
        title: media.alt,
        media,
      };
    },
  },
});

export interface PostcardData {
  image: string | StaticImageData;
  description?: string;
  alt: string;
}
