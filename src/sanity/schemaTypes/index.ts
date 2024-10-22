import { type SchemaTypeDefinition } from "sanity";
import { VignetteSchemaType } from "./vignette";
import { MemoryGameSchemaType } from "./memoryGame";
import { EducatorResource } from "./educatorResource";
import { FaqSchemaType } from "./faq";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    VignetteSchemaType,
    MemoryGameSchemaType,
    EducatorResource,
    FaqSchemaType,
  ],
};
