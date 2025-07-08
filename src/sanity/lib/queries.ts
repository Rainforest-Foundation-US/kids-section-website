import { groq } from "next-sanity";

import { client } from "./client";
import { EducatorResource } from "../schemaTypes/educatorResource";
import { StatisticsCard } from "../schemaTypes/statisticsCard";
import { PickImageGameData } from "../schemaTypes/pickImageGame";
import { Navigation } from "../schemaTypes/navigation";
import { GameSounds } from "../schemaTypes/sounds";
import { StoryCompositionData } from "../schemaTypes/storyComposition";
import { PickOptionMultiPageGameData } from "../schemaTypes/pickOptionMultiPageGame";
import { FillInTheBlankGameData } from "../schemaTypes/fillInTheBlankGame";
import { FillInTheBlankMultiPageGameData } from "../schemaTypes/fillInTheBlankMultiPageGame";
import { PlainData } from "../schemaTypes/plain";
import { LocateInMapData } from "../schemaTypes/locateInMap";
import { SelectCountriesWithRainforestData } from "../schemaTypes/selectCountriesWithRainforest";

// Define reusable query fragments
const pickImageGameQuery = groq`
  {
    name,
    customName,
    question,
    "questionColor": questionColor.hex,
    hintContent {
      hint
    },
    options[]{
      "imageSrc": src.asset->url,
      alt,
      isCorrect,
      hintText,
    }
  }
`;

const plainDataQuery = groq`
  {
    name,
    customName,
    contentType,
    text,
    textAlign,
    "textColor": textColor.hex,
    caption,
    captionAlign,
    "captionColor": captionColor.hex,
    title,
    titleAlign,
    "titleColor": titleColor.hex,
    subText,
    "subTextColor": subTextColor.hex,
    subContent {
      type,
      "polaroids": reference[]->{
        _id,
        caption,
        captionStyle,
        image,
        description,
        imageAlignment,
        linkTo
      },
      "polaroid": singleReference->{
        _id,
        caption,
        captionStyle,
        image,
        description,
        imageAlignment,
        linkTo
      },
      "data": singleReference->{
        name,
        text,
        textAlign,
        caption,
        subText,
        subContent
      },
      "postcard": singleReference->{
        "alt": image.alt,
        "image": image{
          "src": asset->url,
          "blurDataURL": asset->metadata.lqip,
          "height": asset->metadata.dimensions.height,
          "width": asset->metadata.dimensions.width,
        },
        description,
      }
    }
  }
`;

const pickOptionGameQuery = groq`
  {
    name,
    customName,
    question,
    "questionColor": questionColor.hex,
    rotateOptions,
    options[]{
      text,
      isCorrect,
      hintText,
    }
  }
`;

const pickOptionMultiPageGameQuery = groq`
  {
    contentType,
    name,
    customName,
    title,
    "titleColor": titleColor.hex,
    gamePages[]->${pickOptionGameQuery}
  }
`;

const fillInTheBlankGameQuery = groq`
  {
    name,
    customName,
    question,
    preText,
    subText,
    "textColor": textColor.hex,
    fontWeightStyle,
    isNeutral,
    blanks[] {
      position,
      options,
      correctOptionPosition,
      correctHintText,
      incorrectHintText,
    },
    hint,
    subContent {
      "postcard": postcard->{
        "alt": image.alt,
        "image": image{
          "src": asset->url,
          "blurDataURL": asset->metadata.lqip,
          "height": asset->metadata.dimensions.height,
          "width": asset->metadata.dimensions.width,
        },
        description,
      },
      "polaroid": polaroid->{
        _id,
        caption,
        captionStyle,
        image,
        description,
        imageAlignment,
        linkTo
      },
    }
  }
`;

const fillInTheBlankMultiPageGameQuery = groq`
  {
    contentType,
    name,
    customName,
    title,
    "titleColor": titleColor.hex,
    gamePages[]->${fillInTheBlankGameQuery}
  }
`;

export async function getHomePage() {
  const homePage = await client.fetch(
    groq`*[_type == "home"][0]{
      welcomeMessage,
      title,
      subtitle,
      discoverTheAmazonButtonLabel,
      resourcesForTeachersButtonLabel,
      supportButtonLabel,
      supportLinkUrl,
      videoUrl,
      description,
      descriptionSubtitle,
      polaroids[]->{
        _id,
        caption,
        captionStyle,
        image,
        description,
        imageAlignment,
        linkTo
      }
    }`,
  );

  return homePage;
}
export async function getVignettes() {
  const vignettes = await client.fetch(
    groq`*[_type == "vignette"]{
      _id,
      name,
      title,
      subtitle,
      "image": image{
          alt,
          "data": asset->url,
          "height": asset->metadata.dimensions.height,
          "width": asset->metadata.dimensions.width,
      },
      imageAlignment,
      body,
      hintContent {
        hint
      }
    }`,
  );

  return vignettes;
}

export async function getMemoryGame() {
  const memoryGame = await client.fetch(
    groq`*[_type == "memoryGame"][0]{
      "backgroundImage": backgroundImage.asset->url,
      cards[]{
        "src": asset->url,
        "height": asset->metadata.dimensions.height,
        "width": asset->metadata.dimensions.width,
        description,
      },
      "backCardImage": backCard{
        "src": asset->url,
        "height": asset->metadata.dimensions.height,
        "width": asset->metadata.dimensions.width,
      },
      "backCardImageAlt": backCard.alt,
    }`,
  );

  return memoryGame;
}

export async function getEducatorResources() {
  const educatorResources = await client.fetch<EducatorResource[]>(
    groq`*[_type == "educatorResource"]{
      title,
      description,
      "link": link.asset->url,
    }`,
  );

  return educatorResources;
}

export async function getStatisticsCards() {
  const statisticsCards = await client.fetch<StatisticsCard[]>(
    groq`*[_type == "statisticsCard"]{
      title,
      description,
      "image":  image{
        alt,
        "data": asset->url
      },
    }`,
  );

  return statisticsCards;
}

export async function getPickImageGames() {
  const pickImageGames = await client.fetch<PickImageGameData[]>(
    groq`*[_type == "pickImageGame"]${pickImageGameQuery}`,
  );

  return pickImageGames;
}

export async function getPickOptionMultiPageGames() {
  const pickOptionMultiPageGames = await client.fetch<
    PickOptionMultiPageGameData[]
  >(groq`*[_type == "pickOptionMultiPageGame"]${pickOptionMultiPageGameQuery}`);

  return pickOptionMultiPageGames;
}

export async function getFillInTheBlankGames() {
  const fillInTheBlankGames = await client.fetch<FillInTheBlankGameData[]>(
    groq`*[_type == "fillInTheBlankGame"]${fillInTheBlankGameQuery}`,
  );

  return fillInTheBlankGames;
}

export async function getFillInTheBlankMultiPageGames() {
  const fillInTheBlankMultiPageGames = await client.fetch<
    FillInTheBlankMultiPageGameData[]
  >(
    groq`*[_type == "fillInTheBlankMultiPageGame"]${fillInTheBlankMultiPageGameQuery}`,
  );

  return fillInTheBlankMultiPageGames;
}

export async function getFaqs() {
  const faqs = await client.fetch(
    groq`*[_type == "faq"][0]{
      entries[]{
        question,
        hint,
        answer,
        description
      }
    }`,
  );

  return faqs;
}

export async function getNavigation() {
  const navigation = await client.fetch<Navigation>(
    groq`*[_type == "navigation"][0]{
      name,
      paths
    }`,
  );

  return navigation;
}

export async function getSounds() {
  const sounds = await client.fetch<GameSounds>(
    groq`*[_type == "gameSounds"][0]{
      name,
      "correct": correct.asset->url,
      "incorrect": incorrect.asset->url,
      "congratulations": congratulations.asset->url
    }`,
  );

  return sounds;
}

export async function getStoryComposition() {
  const storyComposition = await client.fetch<StoryCompositionData>(
    groq`*[_type == "storyComposition"][0]{
      title,
      description,
      contentItems[]->{
        "type": _type,
        "data": select(
          _type == "pickImageGame" => ${pickImageGameQuery},
          _type == "plain" => ${plainDataQuery},
          _type == "pickOptionGame" => ${pickOptionGameQuery}
        )
      }
    }`,
  );

  return storyComposition;
}

export async function getPlainData() {
  const plain = await client.fetch<PlainData[]>(
    groq`*[_type == "plain"]${plainDataQuery}`,
  );

  return plain;
}

export async function getLocateInMaps() {
  const locateInMaps = await client.fetch<LocateInMapData[]>(
    groq`*[_type == "locateInMap"]{
      name,
      background,
      "backgroundColor": backgroundColor.hex,
      defaultHintContent,
      question,
      questionPosition,
      questionIllustration,
      center,
      scale,
      highlightedCountries,
      secondaryCountries,
      shouldApplyLGVignette,
      markers[]{
        position,
        text,
        orientation,
      }
    }`,
  );

  return locateInMaps;
}

export async function getSelectCountriesWithRainforest() {
  const selectCountriesWithRainforest =
    await client.fetch<SelectCountriesWithRainforestData>(
      groq`*[_type == "selectCountriesWithRainforest"][0]{
      name,
      background,
      "backgroundColor": backgroundColor.hex,
      defaultHintContent,
      center,
      scale,
      markers[]{
        countryCode,
        position,
        tooltipTitle,
        tooltipDescription,
      }
    }`,
    );

  return selectCountriesWithRainforest;
}
