import { RoundSlothIllustration } from "@/components/activities-illustrations";
import clsx from "@/utils/clsx";

interface ActivityHintProps {
  hint: string;
  hintPosition: "start" | "center" | "end";
  hintSize: "sm" | "md" | "lg" | "xl";
  status: "info" | "correct" | "incorrect";
}

/**
 * Shows a hint to the user before / during an activity to help them select the right answer, let them know when the answer is wrong and when its right.
 *
 * Note: This component should be positioned when used. It just handles the layout of its children.
 */
export function ActivityHint(props: ActivityHintProps) {
  return (
    <div
      className={clsx(
        "flex",
        props.hintPosition === "start" && "flex-row-reverse items-center",
        props.hintPosition === "center" && "flex-col items-center",
        props.hintPosition === "end" && "flex-row items-center"
      )}
    >
      <RoundSlothIllustration className="w-44 rounded-full shadow-app-lg shadow-shadow-gray " />

      <div
        className={clsx(
          "m-6 rounded-3xl border-4 border-neutral-100  p-4 text-neutral-100 shadow-app-lg shadow-shadow-gray",
          props.hintSize === "sm" && "max-w-[200px]",
          props.hintSize === "md" && "max-w-[280px]",
          props.hintSize === "lg" && "max-w-[380px]",
          props.hintSize === "xl" && "max-w-[600px]",
          (props.status == "correct" || props.status == "info") &&
            "bg-primary-800",
          props.status == "incorrect" && "bg-error-700"
        )}
      >
        {props.hint}
      </div>
    </div>
  );
}
