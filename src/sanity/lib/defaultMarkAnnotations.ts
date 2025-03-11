import { LinkIcon, HighlightIcon, ImageIcon } from "@sanity/icons";
import type { SanityImageObject } from "@sanity/image-url/lib/types/types";
import type { Rule, ValidationContext } from "sanity";

export const defaultMarkAnnotations = [
  {
    name: "link",
    icon: LinkIcon,
    type: "object",
    title: "Link",
    fields: [
      {
        name: "href",
        type: "url",
        title: "URL",
      },
    ],
  },
  {
    name: "highlightWithTooltip",
    type: "object",
    icon: HighlightIcon,
    title: "Highlight with Tooltip",
    fields: [
      {
        name: "description",
        type: "string",
        title: "Description",
      },
    ],
  },
  {
    name: "highlightWithImage",
    type: "object",
    icon: ImageIcon,
    title: "Highlight with Image",
    fields: [
      {
        name: "image",
        type: "image",
        title: "Image",
        options: {
          hotspot: true,
          aiAssist: {
            imageDescriptionField: "alt",
          },
        },
        fields: [
          {
            name: "alt",
            type: "string",
            title: "Alternative text",
            description: "Important for SEO and accessibility.",
            validation: (rule: Rule) => {
              return rule.custom((alt: string, context: ValidationContext) => {
                if (
                  (context.document?.picture as SanityImageObject)?.asset
                    ?._ref &&
                  !alt
                ) {
                  return "Required";
                }
                return true;
              });
            },
          },
        ],
      },
    ],
  },
];
