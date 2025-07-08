import React from "react";
import difference from "lodash/difference";
import random from "lodash/random";
import keyBy from "lodash/keyBy";

import { MapWithMarkers } from "../maps/map-with-markers";
import {
  Marker,
  MapWithMarkersOptions,
} from "../maps/map-with-markers-component";
import { CommonActivityOptions } from "./common";
import { usePlaySounds } from "@/hooks/usePlaySound";

export interface SelectCountriesWithRainforestActivityOptions
  extends MapWithMarkersOptions {
  markers?: ({
    countryCode: string;
  } & Marker)[];
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
  FRG: true,
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
  "FRG",
] as const;

type CountryCode = (typeof COUNTRIES_WITH_AMAZON_RAINFOREST)[number];

type SelectCountriesWithRainforestActivityProps = React.PropsWithChildren<
  SelectCountriesWithRainforestActivityOptions & CommonActivityOptions
>;
export function SelectCountriesWithRainforestActivity({
  scale,
  center,
  markers: markersFromProps,
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

  const countryMarkers = React.useMemo(
    () => keyBy(markersFromProps, "countryCode"),
    [markersFromProps],
  );

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
      setMarkers((prev) => [...prev, countryMarkers[answer as CountryCode]]);
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
