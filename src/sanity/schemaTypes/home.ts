import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";
import { PolaroidData } from "./polaroid";

export const HomePageSchemaType = defineType({
  name: "home",
  title: "Home",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "welcomeMessage",
      title: "Welcome message",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "discoverTheAmazonButtonLabel",
      title: "Discover the amazon button label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "supportButtonLabel",
      title: "Support button label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "supportLinkUrl",
      title: "Support link URL",
      type: "string",
      validation: (rule) =>
        rule.required().custom((url) => {
          const urlPattern =
            /^(https?:\/\/)?(([\da-z.-]+)\.([a-z.]{2,6})|([0-9]{1,3}\.){3}[0-9]{1,3})([\/\w .-]*)*\/?$/;
          return (
            (url && urlPattern.test(url)) ||
            "Please enter a valid URL (starting with http:// or https://)"
          );
        }),
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "string",
    }),
    {
      name: "polaroids",
      title: "Polaroids",
      type: "array",
      of: [{ type: "reference", to: { type: "polaroid" } }],
      description: "Select multiple polaroids to display on the homepage.",
    },

    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "descriptionSubtitle",
      title: "Description Subtitle",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});

export interface HomePageData {
  descriptionSubtitle?: string;
  polaroids?: PolaroidData[];
  welcomeMessage?: string;
  discoverTheAmazonButtonLabel: string;
  videoUrl?: string;
  description?: string;
  title: string;
  subtitle?: string;
  supportButtonLabel: string;
  supportLinkUrl: string;
}
