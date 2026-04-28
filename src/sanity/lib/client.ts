import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

/**
 * `useCdn: false` so SSG/ISR and server rendering see fresh published content
 * (Sanity API direct; use ISR `revalidate` for caching).
 */
export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});
