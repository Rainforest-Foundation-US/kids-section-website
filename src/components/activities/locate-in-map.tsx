import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import countriesTopoJSON from "./countries-topo.json";
import clsx from "@/utils/clsx";

const countryCodeKey = "ADM0_ISO";

function getCountryCode(geo: any) {
  return geo.properties[countryCodeKey];
}

export function LocateInMapActivity() {
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
  return (
    <div className="relative w-full max-w-6xl">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [0, 20],
          scale: 145,
        }}
        className="scale-125 [filter:url(#vignette)] lg:[filter:url(#lg-vignette)]"
      >
        <defs>
          {/* // filter transparency at borders (10px) */}

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
                        ? "fill-primary-300 stroke-neutral-100 stroke-[0.5px] opacity-100 transition-all duration-150 hover:z-10 focus:stroke-primary-600 focus:stroke-[1px]"
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

        <Marker coordinates={[-110, 46]}>
          <circle r={4} cx={3} cy={3} fill="#00000018" />
          <circle r={4} cx={2} cy={2} fill="#00000025" />
          <circle r={5} fill="#FFF" />
          <circle r={3} fill="#000" />
        </Marker>
      </ComposableMap>
    </div>
  );
}
