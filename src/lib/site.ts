export const SITE_URL = "https://kids.rainforestfoundation.org" as const;

export const SITE_NAME = "Kids' Corner — Rainforest Foundation US" as const;

/** Default social preview asset in `/public` (add `.webp` when available). */
export function getDefaultOgImageUrl(): string {
  return `${SITE_URL}/rfus-web-preview.jpeg`;
}

export const DEFAULT_DESCRIPTION =
  "Learn About Rainforests. Dive into our rainforest-related games, activities, and learning materials for kids. Plus examples of how kids can help to protect rainforests." as const;
