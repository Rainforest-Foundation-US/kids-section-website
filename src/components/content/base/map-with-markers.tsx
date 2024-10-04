import { useMemo, useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "framer-motion";
import { Tooltip } from "react-tooltip";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import countriesTopoJSON from "@/assets/countries-topo.json";
import clsx from "@/utils/clsx";
import { wrapTextToLength } from "@/utils/wrapTextToLength";

export interface MapWithMarkersOptions {
  /**
   * Country ids in ISO 3166-1 alpha-3 format (mapped directly to the TopoJSON).
   */
  center: [number, number];
  scale: number;
  highlightedCountries?: string[];
  errorCountries?: string[];
  hintedCountries?: string[];
  markers?: Marker[];
  onSelectCountry?: (country: string) => void;
}

const countryCodeKey = "ADM0_ISO";

function getCountryCode(geo: any) {
  return geo.properties[countryCodeKey];
}

const mapAnnotationPadding = 10;
const mapAnnotationOffset = 5;

export interface Marker {
  position: [number, number];
  text?: string;
  // TODO: remove this prop and find a better solution for the hovering markers
  hoverText?: string;
  orientation?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "left"
    | "right";
}

function MapAnnotation(props: Marker) {
  const textRef = useRef<SVGTextElement>(null);
  const markerLines = useMemo(
    () => wrapTextToLength(props?.text ?? "", 17),
    [props.text],
  );

  const [bbox, setBbox] = useState<{
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

  /* TODO:  find a better solution for the hovering markers */
  const hoverProps = props.hoverText
    ? {
        "data-tooltip-id": "marker-tooltip",
        "data-tooltip-content": props?.hoverText,
      }
    : {};
  return (
    <Marker
      key={props.position[0] + "-" + props.position[1]}
      coordinates={props.position}
      {...hoverProps}
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
  );
}

type MapWithMarkersProps = MapWithMarkersOptions;
export function MapWithMarkers({
  center,
  scale,
  markers,
  highlightedCountries,
  hintedCountries,
  errorCountries,
  onSelectCountry,
}: MapWithMarkersProps) {
  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center,
          scale,
        }}
        className="scale-125 [filter:url(#vignette)] lg:[filter:url(#lg-vignette)]"
        data-tip=""
      >
        <defs>
          <filter id="vignette" x="0%" y="0%" width="100%" height="100%">
            <feFlood floodColor="black" result="BLACK_FLOOD" />
            <feGaussianBlur
              in="BLACK_FLOOD"
              stdDeviation="0 50"
              result="BLURRED_BLACK_FLOOD"
            />
            <feComponentTransfer
              in="BLURRED_BLACK_FLOOD"
              result="VIGNETTE_MASK"
            >
              <feFuncA type="table" tableValues="0 0 0 0 1% 100%" />
            </feComponentTransfer>
            <feComposite in="SourceGraphic" in2="VIGNETTE_MASK" operator="in" />
          </filter>

          <filter id="lg-vignette" x="0%" y="0%" width="100%" height="100%">
            <feFlood floodColor="black" result="BLACK_FLOOD" />
            <feGaussianBlur
              in="BLACK_FLOOD"
              stdDeviation="50 200"
              result="BLURRED_BLACK_FLOOD"
            />
            <feComponentTransfer
              in="BLURRED_BLACK_FLOOD"
              result="VIGNETTE_MASK"
            >
              <feFuncA type="table" tableValues="0 0 0 0.2 3% 100%" />
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
                        "fill-primary-300 opacity-100 transition-all duration-150 hover:z-10 focus:stroke-primary-600 focus:stroke-1",
                      isErrorCountry &&
                        "fill-error-500 opacity-100 transition-all duration-150 hover:z-10",
                      isHintedCountry && "stroke-primary-400 stroke-1",
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
            hoverText={marker.hoverText}
          />
        ))}
      </ComposableMap>

      {/* TODO:  find a better solution for the hovering markers */}
      <Tooltip id="marker-tooltip" />
    </div>
  );
}
