import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";
import { PolaroidCaptionStyle } from "@/components/polaroid";
import { SanityImageObject } from "@sanity/image-url/lib/types/types";
import {
  SectionName,
  sectionNames,
} from "@/hooks/useGetDiscoverTheAmazonContent";

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
    defineField({
      name: "linkTo",
      title: "Link To",
      type: "string",
      options: {
        list: sectionNames,
      },
    }),
  ],
  preview: {
    select: {
      title: "caption",
      media: "image",
    },
  },
});

export interface PolaroidData {
  _id: string;
  image: SanityImageObject;
  description?: string;
  linkTo?: SectionName;
  imageAlignment: "top" | "center" | "bottom";
  caption: string;
  captionStyle?: PolaroidCaptionStyle;
}
