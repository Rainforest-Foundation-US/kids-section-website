import React from "react";
import dynamic from "next/dynamic";
import { MapWithMarkersProps } from "./map-with-markers-component";

const MapWithMarkersComponent = dynamic(
  () => import("./map-with-markers-component"),
  { ssr: false },
);

export function MapWithMarkers(props: MapWithMarkersProps) {
  return <MapWithMarkersComponent {...props} />;
}
