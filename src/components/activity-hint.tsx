import { RoundSlothIllustration } from "@/components/activities-illustrations";
import clsx from "@/utils/clsx";
import { AnimatePresence, motion } from "framer-motion";

export type ActivityHintStatus = "info" | "correct" | "incorrect";

interface ActivityHintProps {
  hint: string;
  hintPosition: "start" | "center" | "end";
  hintSize: "xs" | "sm" | "md" | "lg" | "xl";
  textAlign?: "left" | "center" | "right";
  status: ActivityHintStatus;
}

/**
 * Shows a hint to the user before / during an activity to help them select the right answer, let them know when the answer is wrong and when its right.
 *
 * Note: This component should be positioned when used. It just handles the layout of its children.
 */
export function ActivityHint({
  textAlign = "center",
  ...props
}: ActivityHintProps) {
  return (
    <div className="relative flex">
      <RoundSlothIllustration className="shadow-app-lg shadow-shadow-gray w-28 rounded-full sm:w-32 lg:w-44 " />

      <AnimatePresence>
        {props.hint && (
          <motion.div
            key={props.hint}
            role="alert"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={clsx(
              "shadow-app-lg shadow-shadow-gray absolute m-6 whitespace-pre rounded-3xl border-4 border-neutral-100 p-4 italic text-neutral-100",
              props.hintPosition === "center" &&
                "inset-x-0 left-[4rem] top-[100%] mx-auto translate-x-[-50%]",
              props.hintPosition === "end" && "left-[100%]",
              props.hintPosition === "start" && "right-[100%]",
              props.hintSize === "xs" && "w-[150px]",
              props.hintSize === "sm" && "w-[200px]",
              props.hintSize === "md" && "w-[280px]",
              props.hintSize === "lg" && "w-[380px]",
              props.hintSize === "xl" && "w-[600px]",
              props.status == "correct" && "bg-primary-600",
              props.status == "info" && "bg-primary-800",
              props.status == "incorrect" && "bg-error-700",
              textAlign === "left" && "text-left",
              textAlign === "center" && "text-center",
              textAlign === "right" && "text-right"
            )}
          >
            {props.hint}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
