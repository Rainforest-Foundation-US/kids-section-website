import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const PolaroidSchemaType = defineType({
  name: "polaroid",
  title: "Polaroid",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "captionStyle",
      title: "Caption Style",
      type: "string",
      options: {
        list: [
          { title: "Wrap", value: "wrap" },
          {
            title: "Wrap and preserve aspect ratio",
            value: "wrapPreserveAspectRatio",
          },
          { title: "Truncate", value: "truncate" },
        ],
      },
      initialValue: "wrap",
    }),
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
    defineField({
      name: "imageAlignment",
      title: "Image Vertical Alignment",
      type: "string",
      options: {
        list: [
          { title: "Top", value: "top" },
          { title: "Center", value: "center" },
          { title: "Bottom", value: "bottom" },
        ],
      },
      initialValue: "center",
    }),
  ],
  preview: {
    select: {
      title: "caption",
      media: "image",
    },
  },
});
