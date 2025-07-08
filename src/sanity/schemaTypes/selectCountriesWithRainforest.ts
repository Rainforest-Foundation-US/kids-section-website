import { defineField, defineType } from "sanity";
import { MarkerIcon } from "@sanity/icons";
import {
  sectionNames,
  SectionName,
} from "@/hooks/useGetDiscoverTheAmazonContent";
import { SanityImageObject } from "@sanity/image-url/lib/types/types";
import { SelectCountriesWithRainforestActivityOptions } from "@/components/content/activities/select-countries-with-rainforest";
import { Marker } from "@/components/content/maps/map-with-markers-component";

export const SelectCountriesWithRainforestSchemaType = defineType({
  name: "selectCountriesWithRainforest",
  title: "Select Countries With Rainforest Game",
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
      name: "markers",
      title: "Country Markers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "countryCode",
              title: "Country Code",
              description: "ISO 3166-1 alpha-3 country code (e.g. BRA, USA)",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "position",
              title: "Position [longitude, latitude]",
              type: "array",
              of: [{ type: "number" }],
              validation: (rule) => rule.required().length(2),
            },
            {
              name: "tooltipTitle",
              title: "Tooltip Title",
              type: "string",
            },
            {
              name: "tooltipDescription",
              title: "Tooltip Description",
              type: "text",
            },
          ],
          preview: {
            select: {
              title: "tooltipTitle",
              subtitle: "countryCode",
            },
          },
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

export interface SelectCountriesWithRainforestData
  extends Pick<
    SelectCountriesWithRainforestActivityOptions,
    "center" | "scale"
  > {
  _type: "selectCountriesWithRainforest";
  name: SectionName;
  background: SanityImageObject;
  backgroundColor: string;
  defaultHintContent: {
    hint: string;
  };
  markers: ({
    countryCode: string;
  } & Marker)[];
}
