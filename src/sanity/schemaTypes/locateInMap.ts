import { defineField, defineType } from "sanity";
import { MarkerIcon } from "@sanity/icons";
import { MapWithMarkersOptions } from "@/components/content/maps/map-with-markers-component";
import { SanityImageObject } from "@sanity/image-url/lib/types/types";
import {
  sectionNames,
  SectionName,
} from "@/hooks/useGetDiscoverTheAmazonContent";

export const LocateInMapSchemaType = defineType({
  name: "locateInMap",
  title: "Locate In Map",
  icon: MarkerIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
      options: {
        list: sectionNames,
      },
    }),
    defineField({
      name: "background",
      title: "Background",
      type: "image",
    }),
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "color",
      options: {
        colorList: ["#1E1F1B", "#F0F4EF", "FAF5EE"],
      },
    }),
    defineField({
      name: "defaultHintContent",
      title: "Default Hint Content",
      type: "object",
      fields: [
        {
          name: "hint",
          title: "Hint",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "question",
      title: "Question",
      description: "Can include HTML tags like <b> for emphasis",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "questionPosition",
      title: "Question Position",
      type: "string",
      options: {
        list: [
          { title: "Top", value: "top" },
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
      },
      initialValue: "top",
    }),
    defineField({
      name: "questionIllustration",
      title: "Question Illustration",
      type: "string",
      options: {
        list: [
          { title: "Sitting Sloth", value: "sitting-sloth" },
          { title: "Waving Sloth", value: "waving-sloth" },
          { title: "Happy Sloth", value: "happy-sloth" },
          { title: "Sad Sloth", value: "sad-sloth" },
        ],
      },
    }),
    defineField({
      name: "center",
      title: "Map Center [longitude, latitude]",
      description: "Array of two numbers for map centering, e.g. [-65, -22]",
      type: "array",
      of: [{ type: "number" }],
      validation: (rule) => rule.required().length(2),
    }),
    defineField({
      name: "scale",
      title: "Map Scale",
      description: "Zoom level for the map (e.g. 280)",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "highlightedCountries",
      title: "Highlighted Countries",
      description: "ISO 3166-1 alpha-3 country codes (e.g. BRA, USA)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "secondaryCountries",
      title: "Secondary Countries",
      description:
        "ISO 3166-1 alpha-3 country codes (e.g. BRA, USA) with secondary highlight style ",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "shouldApplyLGVignette",
      title: "Apply Large Vignette Effect",
      description: "Whether to apply a vignette effect on larger screens",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "markers",
      title: "Map Markers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "position",
              title: "Position [longitude, latitude]",
              type: "array",
              of: [{ type: "number" }],
              validation: (rule) => rule.required().length(2),
            },
            {
              name: "text",
              title: "Marker Text",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "orientation",
              title: "Text Orientation",
              type: "string",
              options: {
                list: [
                  { title: "Top Right", value: "top-right" },
                  { title: "Top Left", value: "top-left" },
                  { title: "Bottom Right", value: "bottom-right" },
                  { title: "Bottom Left", value: "bottom-left" },
                  { title: "Left", value: "left" },
                  { title: "Right", value: "right" },
                ],
              },
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
      subtitle: "question",
    },
  },
});

export interface LocateInMapData
  extends Omit<MapWithMarkersOptions, "onSelectCountry"> {
  name: SectionName;
  question: string;
  questionPosition: "top" | "left" | "right";
  questionIllustration:
    | "sitting-sloth"
    | "waving-sloth"
    | "happy-sloth"
    | "sad-sloth";
  background: SanityImageObject;
  backgroundColor: string;
  defaultHintContent: {
    hint: string;
  };
}
