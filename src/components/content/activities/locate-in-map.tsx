import clsx from "@/utils/clsx";
import { MapWithMarkers } from "../maps/map-with-markers";
import { MapWithMarkersOptions } from "../maps/map-with-markers-component";
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
          "z-10 flex flex-col items-center text-center",
          props.questionPosition === "left" &&
            "absolute inset-y-0 mx-auto max-w-[50%] justify-center",
          (props.questionPosition === "top" || !props.questionPosition) &&
            "relative mx-auto max-w-[500px] translate-y-10",
        )}
      >
        {props.questionIllustration && (
          <PolymorphicIllustration
            kind={props.questionIllustration}
            className="w-[200px] lg:h-[200px] lg:w-[400px]"
          />
        )}

        <p
          className={clsx(
            "z-10 text-3xl font-normal leading-relaxed text-neutral-dark-700",
            props.questionPosition === "left" && "max-w-[250px]",
          )}
          dangerouslySetInnerHTML={{ __html: props.question }}
        />
      </div>

      <MapWithMarkers
        highlightedCountries={props.highlightedCountries}
        secondaryCountries={props.secondaryCountries}
        shouldApplyLGVignette={props.shouldApplyLGVignette}
        markers={props.markers}
        center={props.center}
        scale={props.scale}
        name={props.name}
      />
    </div>
  );
}
