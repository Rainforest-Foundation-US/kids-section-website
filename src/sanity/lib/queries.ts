import { groq } from "next-sanity";

import { client } from "./client";
import { EducatorResource } from "../schemaTypes/educatorResource";
import { PickImageGameData } from "../schemaTypes/pickImageGame";

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
    groq`*[_type == "memoryGame"]{
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
      "backCardImageAlt": backCard.asset->alt,
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
