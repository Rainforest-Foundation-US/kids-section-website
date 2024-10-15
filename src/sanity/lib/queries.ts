import { groq } from "next-sanity";

import { client } from "./client";

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
