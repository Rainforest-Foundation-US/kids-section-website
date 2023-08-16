import { atom, useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";
import { ActivityHint, ActivityHintStatus } from "./activity-hint";

const hintAtom = atom("");
const hintStatusAtom = atom<ActivityHintStatus>("info");

const incorrectHints = ["Woops!\nTry again!"];
const correctHints = ["That’s perfect!\nKeep it up!"];

export const useSetHint = () => {
  const setHint = useSetAtom(hintAtom);
  const setHintStatus = useSetAtom(hintStatusAtom);

  return useCallback(
    (hint: string | null, status: ActivityHintStatus) => {
      if (!hint && status === "correct") {
        hint = correctHints[Math.floor(Math.random() * correctHints.length)];
      } else if (!hint && status === "incorrect") {
        hint =
          incorrectHints[Math.floor(Math.random() * incorrectHints.length)];
      }

      setHint(hint ?? "");
      setHintStatus(status);
    },
    [setHint, setHintStatus]
  );
};

export const useResetHint = () => {
  const setHint = useSetAtom(hintAtom);
  const setHintStatus = useSetAtom(hintStatusAtom);

  return useCallback(() => {
    setHint("");
    setHintStatus("info");
  }, [setHint, setHintStatus]);
};

export function ControlledActivityHint() {
  const hint = useAtomValue(hintAtom);
  const hintStatus = useAtomValue(hintStatusAtom);
  const setHint = useSetHint();

  return (
    <ActivityHint
      hint={hint}
      hintPosition="center"
      status={hintStatus}
      hintSize="xs"
    />
  );
}
