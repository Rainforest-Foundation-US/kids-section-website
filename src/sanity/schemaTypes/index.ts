import { type SchemaTypeDefinition } from "sanity";
import { VignetteSchemaType } from "./vignette";
import { MemoryGameSchemaType } from "./memoryGame";
import { EducatorResource } from "./educatorResource";
import { PickImageGameSchemaType } from "./pickImageGame";
import { FaqSchemaType } from "./faq";
import { PolaroidSchemaType } from "./polaroid";
import { PostcardSchemaType } from "./postcard";
import { HomePageSchemaType } from "./home";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    VignetteSchemaType,
    MemoryGameSchemaType,
    EducatorResource,
    PickImageGameSchemaType,
    FaqSchemaType,
    PolaroidSchemaType,
    PostcardSchemaType,
    HomePageSchemaType,
  ],
};
