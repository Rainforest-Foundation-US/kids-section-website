import { groq } from "next-sanity";

import { client } from "./client";
import { EducatorResource } from "../schemaTypes/educatorResource";
import { StatisticsCard } from "../schemaTypes/statisticsCard";
import { PickImageGameData } from "../schemaTypes/pickImageGame";

export async function getHomePage() {
  const homePage = await client.fetch(
    groq`*[_type == "home"][0]{
      welcomeMessage,
      title,
      subtitle,
      discoverTheAmazonButtonLabel,
      supportButtonLabel,
      supportLinkUrl,
      videoUrl,
      description,
      descriptionSubtitle,
      polaroids[]->{
        _id,
        caption,
        captionStyle,
        image,
        description,
        imageAlignment
      }
    }`,
  );

  return homePage;
}
export async function getVignettes() {
  const vignettes = await client.fetch(
    groq`*[_type == "vignette"]{
      name,
      title,
      subtitle,
      "image": image{
          alt,
          "data": asset->url
      },
      imageAlignment,
      body
    }`,
  );

  return vignettes;
}

export async function getMemoryGame() {
  const memoryGame = await client.fetch(
    groq`*[_type == "memoryGame"][0]{
      "backgroundImage": backgroundImage.asset->url,
      cards[]{
        "src": asset->url,
        "height": asset->metadata.dimensions.height,
        "width": asset->metadata.dimensions.width,
        description,
      },
      "backCardImage": backCard{
        "src": asset->url,
        "height": asset->metadata.dimensions.height,
        "width": asset->metadata.dimensions.width,
      },
      "backCardImageAlt": backCard.alt,
    }`,
  );

  return memoryGame;
}

export async function getEducatorResources() {
  const educatorResources = await client.fetch<EducatorResource[]>(
    groq`*[_type == "educatorResource"]{
      title,
      description,
      "link": link.asset->url,
    }`,
  );

  return educatorResources;
}

export async function getStatisticsCards() {
  const statisticsCards = await client.fetch<StatisticsCard[]>(
    groq`*[_type == "statisticsCard"]{
      title,
      description,
      "image":  image{
        alt,
        "data": asset->url
      },
    }`,
  );

  return statisticsCards;
}

export async function getPickImageGame() {
  const pickImageGame = await client.fetch<PickImageGameData[]>(
    groq`*[_type == "pickImageGame"]{
      question,
      "backgroundImage": backgroundImage.asset->url,
      leftSideContent->{
        hint
      },
      options[]{
        "src": option.image.asset->url,
        alt,
        isCorrect,
        reason,
      },
    }`,
  );

  return pickImageGame;
}

export async function getFaqs() {
  const faqs = await client.fetch(
    groq`*[_type == "faq"][0]{
      entries[]{
        question,
        hint,
        answer,
        description
      }
    }`,
  );

  return faqs;
}
