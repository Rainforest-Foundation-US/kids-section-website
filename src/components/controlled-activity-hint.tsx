import { atom, useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";
import { ActivityHint, ActivityHintStatus } from "./activity-hint";

const hintAtom = atom("");
const hintStatusAtom = atom<ActivityHintStatus>(ActivityHintStatus.INFO);

const incorrectHints = ["Woops!\nTry again!"];
const keepGoingHints = ["You're doing great!\nCheck all valid answers!"];
const correctHints = ["That’s perfect!\nKeep it up!"];

export const useSetHint = () => {
  const setHint = useSetAtom(hintAtom);
  const setHintStatus = useSetAtom(hintStatusAtom);

  return useCallback(
    (hint: string | null, status: ActivityHintStatus) => {
      if (!hint && status === ActivityHintStatus.KEEP_GOING) {
        hint =
          keepGoingHints[Math.floor(Math.random() * keepGoingHints.length)];
      } else if (!hint && status === ActivityHintStatus.CORRECT) {
        hint = correctHints[Math.floor(Math.random() * correctHints.length)];
      } else if (!hint && status === ActivityHintStatus.INCORRECT) {
        hint =
          incorrectHints[Math.floor(Math.random() * incorrectHints.length)];
      }

      setHint(hint ?? "");
      setHintStatus(status);
    },
    [setHint, setHintStatus],
  );
};

export const useResetHint = () => {
  const setHint = useSetAtom(hintAtom);
  const setHintStatus = useSetAtom(hintStatusAtom);

  return useCallback(() => {
    setHint("");
    setHintStatus(ActivityHintStatus.INFO);
  }, [setHint, setHintStatus]);
};

export function ControlledActivityHint(props: { noSloth?: boolean }) {
  const hint = useAtomValue(hintAtom);
  const hintStatus = useAtomValue(hintStatusAtom);

  return (
    <ActivityHint
      hint={hint}
      hintPosition="center"
      status={hintStatus}
      noSloth={props.noSloth}
      hintSize="xs"
    />
  );
}
