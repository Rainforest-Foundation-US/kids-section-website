import clsx from "@/utils/clsx";
import {
  MapWithMarkers,
  MapWithMarkersOptions,
} from "../base/map-with-markers";
import {
  PolymorphicIllustration,
  PolymorphicIllustrationOptions,
} from "../polymorphic-illustration";
import { CommonActivityOptions } from "./common";

export interface LocateInMapActivityOptions extends MapWithMarkersOptions {
  question: string;
  questionPosition?: "top" /** Default */ | "left" | "right";
  questionIllustration?: PolymorphicIllustrationOptions["kind"];
}

type LocateInMapActivityProps = React.PropsWithChildren<
  LocateInMapActivityOptions & CommonActivityOptions
>;
export function LocateInMapActivity(props: LocateInMapActivityProps) {
  return (
    <div className="w-full max-w-5xl">
      <div
        className={clsx(
          "z-10 flex -translate-x-16 items-center",
          props.questionPosition === "left" &&
            "absolute inset-y-0 my-auto max-h-[200px] -translate-y-10 flex-row",
          (props.questionPosition === "top" || !props.questionPosition) &&
            "relative mx-auto max-w-[500px] translate-y-10 flex-col text-center"
        )}
      >
        {props.questionIllustration && (
          <PolymorphicIllustration kind={props.questionIllustration} />
        )}

        <p
          className={clsx(
            "text-neutral-dark-700 z-10 text-3xl font-normal leading-relaxed",
            props.questionPosition === "left" && "max-w-[250px]"
          )}
          dangerouslySetInnerHTML={{ __html: props.question }}
        />
      </div>

      <MapWithMarkers
        countries={props.countries}
        markers={props.markers}
        center={props.center}
        scale={props.scale}
      />
    </div>
  );
}
