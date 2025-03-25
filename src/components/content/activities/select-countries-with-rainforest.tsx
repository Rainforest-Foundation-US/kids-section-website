import React from "react";
import difference from "lodash/difference";
import random from "lodash/random";

import { MapWithMarkers } from "../maps/map-with-markers";
import {
  Marker,
  MapWithMarkersOptions,
} from "../maps/map-with-markers-component";
import { PolymorphicIllustrationOptions } from "../polymorphic-illustration";
import { CommonActivityOptions } from "./common";
import { usePlaySounds } from "@/hooks/usePlaySound";

export interface SelectCountriesWithRainforestActivityOptions
  extends MapWithMarkersOptions {
  question: string;
  questionPosition?: "top" /** Default */ | "left" | "right";
  questionIllustration?: PolymorphicIllustrationOptions["kind"];
}

const ALL_SELECTABLE_COUNTRIES_KEYS = {
  BRA: true,
  COL: true,
  BOL: true,
  GUY: true,
  SUR: true,
  PER: true,
  ECU: true,
  VEN: true,
  FRA: true,
  PRY: true,
  CHL: true,
  URY: true,
  ARG: true,
};

const COUNTRIES_WITH_AMAZON_RAINFOREST = [
  "BRA",
  "COL",
  "BOL",
  "GUY",
  "SUR",
  "PER",
  "ECU",
  "VEN",
  "FRA",
] as const;

type CountryCode = (typeof COUNTRIES_WITH_AMAZON_RAINFOREST)[number];

const COUNTRY_MARKERS: Record<CountryCode, Marker> = {
  BRA: {
    position: [-50, -14],
    tooltipText: "Brazil",
  },
  COL: {
    position: [-74, 4.5],
    tooltipText: "Colombia",
  },
  BOL: {
    position: [-63.5, -16.2],
    tooltipText: "Bolivia",
  },
  GUY: { position: [-58.9, 4.8], tooltipText: "Guyana" },
  SUR: { position: [-56, 4], tooltipText: "Suriname" },
  PER: { position: [-75, -9.2], tooltipText: "Peru" },
  ECU: { position: [-78, -1.8], tooltipText: "Ecuador" },
  VEN: { position: [-66.5, 6.5], tooltipText: "Venezuela" },
  FRA: { position: [2.2, 46.2], tooltipText: "French Guiana" },
};

type SelectCountriesWithRainforestActivityProps = React.PropsWithChildren<
  SelectCountriesWithRainforestActivityOptions & CommonActivityOptions
>;
export function SelectCountriesWithRainforestActivity({
  scale,
  center,
}: SelectCountriesWithRainforestActivityProps) {
  const [highlightedCountries, setHighlightedCountries] = React.useState<
    string[]
  >([]);
  const [markers, setMarkers] = React.useState<Marker[]>([]);
  const [hintedCountries, setHintedCountries] = React.useState<string[]>([]);
  const [errorCountries, setErrorCountries] = React.useState<string[]>([]);
  const [, setRecentOptionSelect] = React.useState<{
    code: CountryCode;
    isCorrect: boolean;
  } | null>(null);

  const correctCountriesLeft = React.useMemo(
    () => difference(COUNTRIES_WITH_AMAZON_RAINFOREST, highlightedCountries),
    [highlightedCountries],
  );

  const { playSound } = usePlaySounds();

  function onSelectCountry(answer: string) {
    if (correctCountriesLeft.length === 0) {
      return;
    }

    if (!(answer in ALL_SELECTABLE_COUNTRIES_KEYS)) {
      return;
    }

    if (COUNTRIES_WITH_AMAZON_RAINFOREST.includes(answer as CountryCode)) {
      if (!correctCountriesLeft.includes(answer)) {
        return;
      }

      playSound("correct");
      setHighlightedCountries((prev) => [...prev, answer]);
      setMarkers((prev) => [...prev, COUNTRY_MARKERS[answer as CountryCode]]);
      setErrorCountries([]);
      setHintedCountries([]);
      setRecentOptionSelect({ code: answer as CountryCode, isCorrect: true });
    } else {
      playSound("incorrect");

      if (hintedCountries.length === 0) {
        const randomCountryWithAmazonRainforest =
          correctCountriesLeft[random(0, correctCountriesLeft.length - 1)];
        setHintedCountries([randomCountryWithAmazonRainforest]);
      }
      setErrorCountries([answer]);
      setRecentOptionSelect({ code: answer as CountryCode, isCorrect: false });
    }
  }

  return (
    <div className="w-full">
      <MapWithMarkers
        name="select-countries-with-rainforest"
        highlightedCountries={highlightedCountries}
        errorCountries={errorCountries}
        hintedCountries={hintedCountries}
        markers={markers}
        center={center}
        scale={scale}
        onSelectCountry={onSelectCountry}
      />
    </div>
  );
}
