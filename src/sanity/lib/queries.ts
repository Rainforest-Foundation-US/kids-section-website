import { groq } from "next-sanity";

import { client } from "./client";
import { EducatorResource } from "../schemaTypes/educatorResource";
import { StatisticsCard } from "../schemaTypes/statisticsCard";
import { PickImageGameData } from "../schemaTypes/pickImageGame";
import { Navigation } from "../schemaTypes/navigation";
import { PickOptionGameData } from "../schemaTypes/pickOptionGame";
import { PlainData } from "../schemaTypes/plain";

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

export async function getPickImageGames() {
  const pickImageGames = await client.fetch<PickImageGameData[]>(
    groq`*[_type == "pickImageGame"]{
      name,
      question,
      hintContent {
        hint
      },
      options[]{
        "imageSrc": src.asset->url,
        alt,
        isCorrect,
        reason,
      },
    }`,
  );

  return pickImageGames;
}

export async function getPickOptionGames() {
  const pickOptionGames = await client.fetch<PickOptionGameData[]>(
    groq`*[_type == "pickOptionGame"]{
      name,
      question,
      options[]{
        text,
        isCorrect,
      }
    }`,
  );

  return pickOptionGames;
}

export async function getPlainData() {
  const plainData = await client.fetch<PlainData[]>(
    groq`*[_type == "plain"]{
      name,
      text,
      textAlign,
      caption,
      subText,
      subContent {
        type,
        "polaroids": reference[]->{
          _id,
          caption,
          captionStyle,
          image,
          description,
          imageAlignment
        },
        "polaroid": singleReference->{
          _id,
          caption,
          captionStyle,
          image,
          description,
          imageAlignment
        },
        "data": singleReference->{
          name,
          text,
          textAlign,
          caption,
          subText,
          subContent
        },
        "postcard": singleReference->{
          "alt": image.alt,
          "image": image{
            "src": asset->url,
            "blurDataURL": asset->metadata.lqip,
            "height": asset->metadata.dimensions.height,
            "width": asset->metadata.dimensions.width,
          },
          description,
        }
      }
    }`,
  );

  return plainData;
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

export async function getNavigation() {
  const navigation = await client.fetch<Navigation>(
    groq`*[_type == "navigation"][0]{
      name,
      paths
    }`,
  );

  return navigation;
}
