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
import { PlainSchemaType } from "./plain";
import { PickOptionGameSchemaType } from "./pickOptionGame";
import { GameSoundsSchemaType } from "./sounds";
import { StoryCompositionSchemaType } from "./storyComposition";
import { PickOptionMultiPageGameSchemaType } from "./pickOptionMultiPageGame";
import { FillInTheBlankGameSchemaType } from "./fillInTheBlankGame";
import { FillInTheBlankMultiPageGameSchemaType } from "./fillInTheBlankMultiPageGame";
import { LocateInMapSchemaType } from "./locateInMap";
import { SelectCountriesWithRainforestSchemaType } from "./selectCountriesWithRainforest";

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
    PlainSchemaType,
    PickOptionGameSchemaType,
    GameSoundsSchemaType,
    StoryCompositionSchemaType,
    PickOptionMultiPageGameSchemaType,
    FillInTheBlankGameSchemaType,
    FillInTheBlankMultiPageGameSchemaType,
    LocateInMapSchemaType,
    SelectCountriesWithRainforestSchemaType,
  ],
};
