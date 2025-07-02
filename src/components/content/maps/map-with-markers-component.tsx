import ReactDOMServer from "react-dom/server";
import { wrapTextToLength } from "@/utils/wrapTextToLength";
import clsx from "clsx";
import { useIsomorphicLayoutEffect } from "framer-motion";
import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import countriesTopoJSON from "@/assets/countries-topo.json";
import { USMapChart } from "./us-map";
import { SectionNames } from "../content";

export interface MapWithMarkersOptions {
  /**
   * Country ids in ISO 3166-1 alpha-3 format (mapped directly to the TopoJSON).
   */
  center: [number, number];
  scale: number;
  highlightedCountries?: string[];
  errorCountries?: string[];
  hintedCountries?: string[];
  secondaryCountries?: string[];
  markers?: Marker[];
  shouldApplyLGVignette?: boolean;
  onSelectCountry?: (country: string) => void;
}

export interface Marker {
  position: [number, number];
  text?: string;
  tooltipText?: string;
  orientation?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "left"
    | "right";
}

export type MapWithMarkersProps = MapWithMarkersOptions & {
  name: SectionNames;
};

const countryCodeKey = "ADM0_ISO";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getCountryCode(geo: any) {
  return geo.properties[countryCodeKey];
}

const mapAnnotationPadding = 10;
const mapAnnotationOffset = 5;

function MapAnnotation(props: Marker) {
  const textRef = React.useRef<SVGTextElement>(null);
  const markerLines = React.useMemo(
    () => wrapTextToLength(props?.text ?? "", 17),
    [props.text],
  );

  const [bbox, setBbox] = React.useState<{
    width: number;
    height: number;
  }>({
    width: 186,
    height: 0,
  });

  useIsomorphicLayoutEffect(() => {
    if (!textRef.current) return;

    const bbox = textRef.current.getBBox();

    const width = bbox.width + mapAnnotationPadding * 2;
    const height = bbox.height + mapAnnotationPadding * 2;

    setBbox({
      width,
      height,
    });
  }, [textRef, markerLines]);

  let groupPosition: [number, number];

  switch (props.orientation) {
    case "bottom-left":
      groupPosition = [
        -(mapAnnotationOffset + bbox.width),
        mapAnnotationOffset,
      ];
      break;
    case "top-left":
      groupPosition = [
        -(mapAnnotationOffset + bbox.width),
        -(mapAnnotationOffset + bbox.height),
      ];
      break;
    case "bottom-right":
      groupPosition = [mapAnnotationOffset, mapAnnotationOffset];
      break;
    case "left":
      groupPosition = [
        -(mapAnnotationOffset * 2 + bbox.width),
        -(bbox.height / 2),
      ];
      break;
    case "right":
      groupPosition = [mapAnnotationOffset, -(bbox.height / 2)];
      break;
    default:
    case "top-right":
      groupPosition = [
        mapAnnotationOffset,
        -(mapAnnotationOffset + bbox.height),
      ];
      break;
  }

  const tooltipProps = props.tooltipText
    ? {
        "data-tooltip-id": props.tooltipText,
        "data-tooltip-html": ReactDOMServer.renderToStaticMarkup(
          <div>
            <div className="text-lg font-bold">{props.tooltipText}</div>
            <hr className="border-gray-300 my-2" />
            <div className="text-gray-200 text-sm">
              This is a description with some extra information. You can add
              more content here.
            </div>
          </div>,
        ),
      }
    : {};

  return (
    <>
      <Marker
        key={props.position[0] + "-" + props.position[1]}
        coordinates={props.position}
        className="outline-none"
        {...tooltipProps}
      >
        {props.text && (
          <g transform={`translate(${groupPosition[0]}, ${groupPosition[1]})`}>
            <rect
              rx={4}
              x={4}
              y={4}
              width={bbox.width}
              height={bbox.height}
              className="fill-shadow-gray"
            />

            <rect
              rx={4}
              x={0}
              y={0}
              width={bbox.width}
              height={bbox.height}
              className="fill-secondary-100 stroke-neutral-600 stroke-[0.5px]"
            />

            <text
              ref={textRef}
              className="text-3xs font-semibold"
              y={mapAnnotationPadding}
            >
              {markerLines.map((text, l) => (
                <tspan x={mapAnnotationPadding} dy="1.25em" key={l}>
                  {text}
                </tspan>
              ))}
            </text>
          </g>
        )}

        <circle r={4} cx={3} cy={3} fill="#00000018" />
        <circle r={4} cx={2} cy={2} fill="#00000025" />
        <circle r={5} fill="#FFF" />
        <circle r={3} fill="#000" />
      </Marker>
    </>
  );
}

// Include the rest of your component code here
const MapWithMarkersComponent = ({
  name,
  center,
  scale,
  markers,
  highlightedCountries,
  hintedCountries,
  errorCountries,
  secondaryCountries,
  shouldApplyLGVignette = true,
  onSelectCountry,
}: MapWithMarkersProps) => {
  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center,
          scale,
        }}
        className={clsx(
          "scale-[2] [filter:url(#vignette)] lg:scale-[1.5]",
          shouldApplyLGVignette && "lg:[filter:url(#lg-vignette)]",
        )}
        data-tip=""
      >
        {/* Check for mobile and tablet and apply different filter */}

        <defs>
          <filter id="vignette" x="0%" y="0%" width="100%" height="100%">
            <feFlood floodColor="black" result="BLACK_FLOOD" />
            <feGaussianBlur
              in="BLACK_FLOOD"
              stdDeviation="50 30"
              result="BLURRED_BLACK_FLOOD"
            />
            <feComponentTransfer
              in="BLURRED_BLACK_FLOOD"
              result="VIGNETTE_MASK"
            >
              <feFuncA type="table" tableValues="0 0 0 0 0 1" />
            </feComponentTransfer>
            <feComposite in="SourceGraphic" in2="VIGNETTE_MASK" operator="in" />
          </filter>

          <filter id="lg-vignette" x="0%" y="0%" width="100%" height="100%">
            <feFlood floodColor="black" result="BLACK_FLOOD" />
            <feGaussianBlur
              in="BLACK_FLOOD"
              stdDeviation="200 150"
              result="BLURRED_BLACK_FLOOD"
            />
            <feComponentTransfer
              in="BLURRED_BLACK_FLOOD"
              result="VIGNETTE_MASK"
            >
              <feFuncA type="table" tableValues="0 0 0 0 0 1" />
            </feComponentTransfer>
            <feComposite in="SourceGraphic" in2="VIGNETTE_MASK" operator="in" />
          </filter>
        </defs>

        <g>
          <Geographies geography={countriesTopoJSON}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isHighlightedCountry = highlightedCountries?.includes(
                  getCountryCode(geo),
                );
                const isErrorCountry = errorCountries?.includes(
                  getCountryCode(geo),
                );
                const isHintedCountry = hintedCountries?.includes(
                  getCountryCode(geo),
                );
                const isSecondaryCountry = secondaryCountries?.includes(
                  getCountryCode(geo),
                );

                return (
                  <Geography
                    key={geo.rsmKey}
                    onClick={() => {
                      onSelectCountry?.(getCountryCode(geo));
                    }}
                    geography={geo}
                    className={clsx(
                      "focus-visible::stroke-primary-600 fill-neutral-100 stroke-neutral-600 stroke-[0.5px] opacity-50 outline-none",
                      isHighlightedCountry &&
                        "!fill-primary-300 !opacity-100 transition-all duration-150 hover:z-10 focus:stroke-primary-600 focus:stroke-1",
                      isErrorCountry &&
                        "!fill-error-500 !opacity-100 transition-all duration-150 hover:z-10",
                      isHintedCountry && "!stroke-primary-400 !stroke-1",
                      isSecondaryCountry && "!fill-secondary-300 !opacity-100",
                    )}
                    tabIndex={
                      highlightedCountries?.includes(getCountryCode(geo))
                        ? 0
                        : -1
                    }
                  />
                );
              })
            }
          </Geographies>
        </g>

        {markers?.map((marker) => (
          <MapAnnotation
            orientation={marker.orientation}
            key={marker.position[0] + "-" + marker.position[1]}
            position={marker.position}
            text={marker.text}
            tooltipText={marker.tooltipText}
          />
        ))}

        {name === "the-whole-united-states-in-the-amazon" && (
          <USMapChart scale={scale - 25} />
        )}
      </ComposableMap>

      {markers?.map((marker) =>
        marker.tooltipText ? (
          <Tooltip
            key={marker.tooltipText}
            id={marker.tooltipText}
            className="!z-[9999] !w-48 !rounded-md !bg-neutral-100 !text-primary-700 !opacity-100"
            defaultIsOpen
            globalCloseEvents={{
              clickOutsideAnchor: true,
            }}
          />
        ) : null,
      )}
    </div>
  );
};

export default MapWithMarkersComponent;
