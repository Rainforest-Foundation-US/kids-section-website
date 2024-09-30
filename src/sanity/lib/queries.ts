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
