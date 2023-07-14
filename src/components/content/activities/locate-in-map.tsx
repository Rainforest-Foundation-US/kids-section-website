import {
  MapWithMarkers,
  MapWithMarkersOptions,
} from "../base/map-with-markers";
import { CommonActivityOptions } from "./common";

export interface LocateInMapActivityOptions extends MapWithMarkersOptions {
  question: string;
}

type LocateInMapActivityProps = React.PropsWithChildren<
  LocateInMapActivityOptions & CommonActivityOptions
>;
export function LocateInMapActivity(props: LocateInMapActivityProps) {
  return (
    <div className="w-full">
      <p className="text-neutral-dark-700 relative z-10 mx-auto max-w-[500px] translate-y-10 text-center text-3xl font-normal leading-relaxed">
        {props.question}
      </p>

      <MapWithMarkers
        countries={props.countries}
        markers={props.markers}
        center={props.center}
        scale={props.scale}
      />
    </div>
  );
}
