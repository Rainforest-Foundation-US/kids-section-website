export const SITE_URL = "https://kids.rainforestfoundation.org" as const;

export const SITE_NAME = "Kids' Corner — Rainforest Foundation US" as const;

/** Default social preview asset in `/public` (add `.webp` when available). */
export function getDefaultOgImageUrl(): string {
  return `${SITE_URL}/rfus-web-preview.jpeg`;
}

export const DEFAULT_DESCRIPTION =
  "The RFUS Kids' Corner is a place to discover the fascinating secrets of the Amazon and help us protect its animals, plants and communities." as const;
