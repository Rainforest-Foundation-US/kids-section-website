import { type SchemaTypeDefinition } from "sanity";
import { VignetteSchemaType } from "./vignette";
import { MemoryGameSchemaType } from "./memoryGame";
import { EducatorResource } from "./educatorResource";
import { StatisticsCard } from "./statisticsCard";
import { PickImageGameSchemaType } from "./pickImageGame";
import { FaqSchemaType } from "./faq";
import { PolaroidSchemaType } from "./polaroid";
import { PostcardSchemaType } from "./postcard";
import { HomePageSchemaType } from "./home";
import { NavigationSchemaType } from "./navigation";
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    VignetteSchemaType,
    MemoryGameSchemaType,
    EducatorResource,
    StatisticsCard,
    PickImageGameSchemaType,
    FaqSchemaType,
    PolaroidSchemaType,
    PostcardSchemaType,
    HomePageSchemaType,
    NavigationSchemaType,
  ],
};
