import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import countriesTopoJSON from "@/assets/countries-topo.json";
import clsx from "@/utils/clsx";
import { wrapTextToLength } from "@/utils/wrapTextToLength";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { CommonActivity } from "./common";

export interface LocateInMapActivityOptions {}

const countryCodeKey = "ADM0_ISO";

function getCountryCode(geo: any) {
  return geo.properties[countryCodeKey];
}

const mapAnnotationPadding = 10;
const mapAnnotationOffset = 5;

interface Marker {
  position: [number, number];
  text: string;
  orientation:
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
    () => wrapTextToLength(props.text, 17),
    [props.text]
  );

  const [bbox, setBbox] = useState<{
    width: number;
    height: number;
  }>({
    width: 186,
    height: 0,
  });

  useLayoutEffect(() => {
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

  return (
    <Marker
      key={props.position[0] + "-" + props.position[1]}
      coordinates={props.position}
    >
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

      <circle r={4} cx={3} cy={3} fill="#00000018" />
      <circle r={4} cx={2} cy={2} fill="#00000025" />
      <circle r={5} fill="#FFF" />
      <circle r={3} fill="#000" />
    </Marker>
  );
}

type LocateInMapActivityProps = React.PropsWithChildren<
  LocateInMapActivityOptions & CommonActivity
>;
export function LocateInMapActivity(props: LocateInMapActivityProps) {
  const highlightedCountries = [
    "USA",
    "VEN",
    "COL",
    "BRA",
    "PER",
    "ECU",
    "GUY",
    "SUR",
    "CMR",
    "GAB",
    "COG",
    "COD",
    "CAF",
    "IDN",
  ];

  const markers: Marker[] = [
    { position: [-110, 46], text: "United States", orientation: "top-right" },
    {
      position: [-81, -1],
      text: "The Amazon Basin, in South America",
      orientation: "left",
    },
    {
      position: [10, 7],
      text: "The Congo Basin, in Subsaharan Africa",
      orientation: "top-left",
    },
    {
      position: [105, -6],
      text: "The Indonesian Archipelago",
      orientation: "bottom-left",
    },
  ];

  return (
    <div className="relative w-full max-w-6xl">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [0, 20],
          scale: 145,
        }}
        className="lg:[filter:url(#lg-vignette)] scale-125 [filter:url(#vignette)]"
      >
        <defs>
          <filter id="vignette" x="0%" y="0%" width="100%" height="100%">
            <feFlood flood-color="black" result="BLACK_FLOOD" />
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
            <feFlood flood-color="black" result="BLACK_FLOOD" />
            <feGaussianBlur
              in="BLACK_FLOOD"
              stdDeviation="50 75"
              result="BLURRED_BLACK_FLOOD"
            />
            <feComponentTransfer
              in="BLURRED_BLACK_FLOOD"
              result="VIGNETTE_MASK"
            >
              <feFuncA type="table" tableValues="0 0 0 1% 100%" />
            </feComponentTransfer>
            <feComposite in="SourceGraphic" in2="VIGNETTE_MASK" operator="in" />
          </filter>
        </defs>

        <g>
          <Geographies geography={countriesTopoJSON}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <>
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    className={clsx(
                      highlightedCountries.includes(getCountryCode(geo))
                        ? "fill-primary-300 focus:stroke-primary-600 focus:stroke-[1px] stroke-neutral-100 stroke-[0.5px] opacity-100 transition-all duration-150 hover:z-10"
                        : "fill-neutral-100 opacity-50",
                      "focus-visible::stroke-primary-600 outline-none"
                    )}
                    tabIndex={
                      highlightedCountries.includes(getCountryCode(geo))
                        ? 0
                        : -1
                    }
                  />
                </>
              ))
            }
          </Geographies>
        </g>

        {markers.map((marker) => (
          <MapAnnotation
            orientation={marker.orientation}
            key={marker.position[0] + "-" + marker.position[1]}
            position={marker.position}
            text={marker.text}
          />
        ))}
      </ComposableMap>
    </div>
  );
}
