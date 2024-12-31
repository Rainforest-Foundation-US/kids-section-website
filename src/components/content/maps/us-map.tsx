import { USMapIllustration } from "@/components/illustrations/activities-illustrations";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

import usStatesTopoJSON from "@/assets/us-states.json";

export function USMapChart() {
  return (
    <>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 340, center: [-135, 28] }}
        className="h-full w-full"
      >
        <Geographies geography={usStatesTopoJSON}>
          {({ geographies }) =>
            geographies
              .filter(
                (geo) =>
                  geo.properties.code !== "MP" &&
                  geo.properties.code !== "GU" &&
                  geo.properties.code !== "AS" &&
                  geo.properties.code !== "PR" &&
                  geo.properties.code !== "HI" &&
                  geo.properties.code !== "AK",
              )
              .map((geo) => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    className="fill-secondary-400 stroke-none opacity-65 outline-none"
                  />
                );
              })
          }
        </Geographies>

        <Marker coordinates={[-120, 43]} className="outline-none">
          <USMapIllustration />
          <text className="text-xs font-semibold" y={2}>
            <tspan x={28} dy="1.25em">
              United States
            </tspan>
          </text>
        </Marker>
      </ComposableMap>
    </>
  );
}
