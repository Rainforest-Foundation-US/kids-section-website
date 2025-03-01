import { ComponentIcon } from "@sanity/icons";
import { SanityImageObject } from "@sanity/image-url/lib/types/types";
import { defineField, defineType } from "sanity";

export const MemoryGameSchemaType = defineType({
  name: "memoryGame",
  title: "Memory Game",
  icon: ComponentIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        {
          name: "card",
          type: "image",
          title: "Card",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "description",
              type: "string",
              title: "Image description",
            },
          ],
        },
      ],
      options: {
        layout: "grid",
      },
    }),
    defineField({
      name: "backCard",
      title: "Back of the card",
      type: "image",
      validation: (rule) => rule.required(),
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessibility.",
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if (
                (context.document?.picture as SanityImageObject)?.asset?._ref &&
                !alt
              ) {
                return "Required";
              }
              return true;
            });
          },
        },
      ],
      options: {
        aiAssist: {
          imageDescriptionField: "alt",
        },
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      images: "cards",
      backgroundImage: "backgroundImage",
    },
    prepare(selection) {
      const { title, backgroundImage } = selection;

      return {
        title,
        media: backgroundImage,
      };
    },
  },
});

export interface MemoryGameData {
  backgroundImage: string;
  backCardImage: {
    src: string;
    height: number;
    width: number;
  };
  backCardImageAlt: string;
  cards: {
    src: string;
    height: number;
    width: number;
    description: string;
  }[];
}
