import React from "react";
import difference from "lodash/difference";
import random from "lodash/random";

import clsx from "@/utils/clsx";
import {
  MapWithMarkers,
  MapWithMarkersOptions,
  Marker,
} from "../base/map-with-markers";
import {
  PolymorphicIllustration,
  PolymorphicIllustrationOptions,
} from "../polymorphic-illustration";
import { CommonActivityOptions } from "./common";

export interface SelectCountriesWithRainforestActivityOptions
  extends MapWithMarkersOptions {
  question: string;
  questionPosition?: "top" /** Default */ | "left" | "right";
  questionIllustration?: PolymorphicIllustrationOptions["kind"];
}

const COUNTRIES_WITH_AMAZON_RAINFOREST = [
  "BRA",
  "COL",
  "BOL",
  "GUY",
  "SUR",
  "PER",
  "ECU",
  "VEN",
];

const COUNTRY_MARKERS: Record<string, Marker> = {
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
};

type SelectCountriesWithRainforestActivityProps = React.PropsWithChildren<
  SelectCountriesWithRainforestActivityOptions & CommonActivityOptions
>;
export function SelectCountriesWithRainforestActivity({
  questionPosition,
  scale,
  question,
  questionIllustration,
  center,
}: SelectCountriesWithRainforestActivityProps) {
  const [highlightedCountries, setHighlightedCountries] = React.useState<
    string[]
  >([]);
  const [markers, setMarkers] = React.useState<Marker[]>([]);
  const [hintedCountries, setHintedCountries] = React.useState<string[]>([]);
  const [errorCountries, setErrorCountries] = React.useState<string[]>([]);

  const correctCountriesLeft = React.useMemo(
    () => difference(COUNTRIES_WITH_AMAZON_RAINFOREST, highlightedCountries),
    [highlightedCountries],
  );

  function onSelectCountry(answer: string) {
    if (correctCountriesLeft.length === 0) {
      return;
    }

    if (COUNTRIES_WITH_AMAZON_RAINFOREST.includes(answer)) {
      if (!correctCountriesLeft.includes(answer)) {
        return;
      }

      setHighlightedCountries((prev) => [...prev, answer]);
      setMarkers((prev) => [...prev, COUNTRY_MARKERS[answer]]);
      setErrorCountries([]);
      setHintedCountries([]);
    } else {
      if (hintedCountries.length === 0) {
        const randomCountryWithAmazonRainforest =
          correctCountriesLeft[random(0, correctCountriesLeft.length - 1)];
        setHintedCountries([randomCountryWithAmazonRainforest]);
      }
      setErrorCountries([answer]);
    }
  }

  return (
    <div className="w-full max-w-5xl">
      <div
        className={clsx(
          "z-10 flex -translate-x-16 items-center",
          questionPosition === "left" &&
            "absolute inset-y-0 my-auto max-h-[200px] -translate-y-10 flex-row",
          (questionPosition === "top" || !questionPosition) &&
            "relative mx-auto max-w-[500px] translate-y-10 flex-col text-center",
        )}
      >
        {questionIllustration && (
          <PolymorphicIllustration kind={questionIllustration} />
        )}

        <p
          className={clsx(
            "z-10 text-3xl font-normal leading-relaxed text-neutral-dark-700",
            questionPosition === "left" && "max-w-[250px]",
          )}
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>

      <MapWithMarkers
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
