import { RoundSlothIllustration } from "@/components/illustrations/activities-illustrations";
import clsx from "@/utils/clsx";
import { AnimatePresence, motion } from "framer-motion";
import { HintData } from "./controlled-activity-hint";

export enum ActivityHintStatus {
  /**
   * Used for multiple-answer questions for every correct answer but the last one.
   */
  KEEP_GOING = "keep-going",

  /**
   * Used for hints.
   */
  INFO = "info",

  /**
   * Used when the user answered correctly.
   */
  CORRECT = "correct",

  /**
   * Used when the user picked the wrong option.
   */
  INCORRECT = "incorrect",
}

interface ActivityHintProps {
  hintData: HintData;
  noSloth?: boolean;
  noAnimation?: boolean;
  hintPosition: "start" | "center" | "end";
  hintPositioning?: "absolute" | "relative";
  hintSize: "xs" | "sm" | "md" | "lg" | "xl";
  hintClassName?: string;
  textAlign?: "left" | "center" | "right";
  slothClassName?: string;
}

/**
 * Shows a hint to the user before / during an activity to help them select the right answer, let them know when the answer is wrong and when its right.
 *
 * Note: This component should be positioned when used. It just handles the layout of its children.
 */
export function ActivityHint({
  textAlign = "center",
  hintPositioning = "relative",
  hintData,
  hintClassName,
  slothClassName,
  ...props
}: ActivityHintProps) {
  const content = hintData.hint && (
    <motion.div
      key={hintData.hint}
      role="alert"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={clsx(
        "whitespace-pre rounded-3xl border-4 border-neutral-100 p-4 italic text-neutral-100 shadow-app-lg shadow-shadow-gray",
        hintPositioning === "absolute" && "absolute m-6",
        hintPositioning === "absolute" &&
          props.hintPosition === "center" &&
          "inset-x-0 top-[100%] mx-auto translate-x-[-50%]",
        hintPositioning === "absolute" &&
          props.hintPosition === "end" &&
          "left-[100%]",
        hintPositioning === "absolute" &&
          props.hintPosition === "start" &&
          "right-[100%]",
        props.hintSize === "xs" && "min-w-[150px]",
        props.hintSize === "sm" && "min-w-[200px]",
        props.hintSize === "md" && "min-w-[280px]",
        props.hintSize === "lg" && "min-w-[380px]",
        props.hintSize === "xl" && "min-w-[600px]",
        hintData.status === ActivityHintStatus.CORRECT && "bg-primary-400",
        hintData.status === ActivityHintStatus.KEEP_GOING && "bg-primary-600",
        hintData.status === ActivityHintStatus.INFO && "bg-primary-800",
        hintData.status === ActivityHintStatus.INCORRECT && "bg-error-700",
        textAlign === "left" && "text-left",
        textAlign === "center" && "text-center [text-wrap:balance]",
        textAlign === "right" && "text-right",
        hintClassName,
      )}
    >
      {hintData.hint}
    </motion.div>
  );

  return (
    <div
      className={clsx(
        "relative flex",
        hintPositioning === "relative" &&
          props.hintPosition === "center" &&
          "flex-col items-center space-y-4",
        hintPositioning === "relative" &&
          props.hintPosition === "start" &&
          "flex-row-reverse space-x-4",
        hintPositioning === "relative" &&
          props.hintPosition === "end" &&
          "flex-row space-x-4",
        props.noSloth && "mt-4",
      )}
    >
      {!props.noSloth && (
        <RoundSlothIllustration
          className={clsx("shadow-app-lg shadow-shadow-gray", slothClassName)}
        />
      )}

      {props.noAnimation ? (
        content
      ) : (
        <AnimatePresence mode="popLayout">{content}</AnimatePresence>
      )}
    </div>
  );
}
