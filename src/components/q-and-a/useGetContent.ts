import type { TypedObject } from "sanity";

export interface QAndAQuestion {
  question: string;
  hint: string;
  answer: string;
  description: TypedObject | TypedObject[];
  /** Plain text for SEO / JSON-LD (from GROQ `pt::text`) */
  descriptionPlain?: string | null;
}
