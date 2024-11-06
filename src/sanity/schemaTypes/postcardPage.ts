import { defineType } from "sanity";
import { CubeIcon } from "@sanity/icons";

export const PostcardSubContentSchemaType = defineType({
  name: "postcardSubContent",
  title: "Postcard Sub Content",
  type: "object",
  icon: CubeIcon,
  fields: [
    {
      name: "postcard",
      title: "Postcard",
      type: "reference",
      to: { type: "postcard" },
      description: "Select a postcard to display on the page.",
    },
    {
      name: "polaroid",
      title: "Polaroid",
      type: "reference",
      to: { type: "polaroid" },
      description: "Select a polaroid to display on the page.",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
