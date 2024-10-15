import { type SchemaTypeDefinition } from "sanity";
import { VignetteSchemaType } from "./vignette";
import { MemoryGameSchemaType } from "./memoryGame";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [VignetteSchemaType, MemoryGameSchemaType],
};
