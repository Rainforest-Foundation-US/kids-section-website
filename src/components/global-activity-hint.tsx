import { useMatchesBreakpoint } from "@/utils/hooks";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";
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

export function GlobalActivityHint() {
  const hint = useAtomValue(hintAtom);
  const hintStatus = useAtomValue(hintStatusAtom);
  const setHint = useSetHint();

  const isSm = useMatchesBreakpoint("lg");

  useEffect(() => {
    if (!hint) return;

    const timeout = setTimeout(() => {
      setHint("", "info");
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [hint, setHint]);

  useEffect(() => {
    return () => {
      setHint("", "info");
    };
  }, [setHint]);

  return (
    <ActivityHint
      hint={hint}
      hintPosition={isSm ? "center" : "end"}
      status={hintStatus}
      hintSize="xs"
    />
  );
}
