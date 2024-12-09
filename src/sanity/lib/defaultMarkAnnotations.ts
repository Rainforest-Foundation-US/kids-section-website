import { LinkIcon, HighlightIcon } from "@sanity/icons";

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
];
