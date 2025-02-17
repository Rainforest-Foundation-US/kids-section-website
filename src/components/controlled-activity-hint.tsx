import { atom, useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";
import { ActivityHint, ActivityHintStatus } from "./activity-hint";
import { SectionName } from "@/hooks/useGetAboutTheAmazonContent";
import { NarrativesSectionName } from "@/pages/narratives";
import { SectionNames } from "./content/content";

export type HintData = {
  hint: string;
  status: ActivityHintStatus;
};
export type HintAtomValue = Record<SectionNames, HintData>;

export const hintAtom = atom<Partial<HintAtomValue>>({
  "rainforests-are-exactly-what-you-d-think": {
    hint: "",
    status: ActivityHintStatus.INFO,
  },
  "rainforests-have-a-lot-of-rain": {
    hint: "",
    status: ActivityHintStatus.INFO,
  },
  "the-amazon-spreads-across-multiple-countries": {
    hint: "",
    status: ActivityHintStatus.INFO,
  },
  biodiversity: {
    hint: "",
    status: ActivityHintStatus.INFO,
  },
  "rainforests-in-danger": {
    hint: "",
    status: ActivityHintStatus.INFO,
  },
  "what-are-rainforests-quiz": {
    hint: "",
    status: ActivityHintStatus.INFO,
  },
  "rainforests-are-important-quiz": {
    hint: "",
    status: ActivityHintStatus.INFO,
  },
  "climate-change-quiz": {
    hint: "",
    status: ActivityHintStatus.INFO,
  },
  "is-this-actor-deforesting-the-amazon": {
    hint: "",
    status: ActivityHintStatus.INFO,
  },
  narratives: { hint: "", status: ActivityHintStatus.INFO },
});

const incorrectHints = ["Whoops!\nTry again!"];
const keepGoingHints = ["You're doing great!\nCheck all valid answers!"];
const correctHints = ["That’s perfect!\nKeep it up!"];

export const useSetHint = () => {
  const hintAtomValue = useAtomValue(hintAtom);
  const setHint = useSetAtom(hintAtom);

  return useCallback(
    (key: SectionNames, hintData: HintData) => {
      if (!hintData.hint && hintData.status === ActivityHintStatus.KEEP_GOING) {
        hintData.hint =
          keepGoingHints[Math.floor(Math.random() * keepGoingHints.length)];
      } else if (
        !hintData.hint &&
        hintData.status === ActivityHintStatus.CORRECT
      ) {
        hintData.hint =
          correctHints[Math.floor(Math.random() * correctHints.length)];
      } else if (
        !hintData.hint &&
        hintData.status === ActivityHintStatus.INCORRECT
      ) {
        hintData.hint =
          incorrectHints[Math.floor(Math.random() * incorrectHints.length)];
      }

      setHint({ ...hintAtomValue, [key]: hintData });
    },
    [hintAtomValue, setHint],
  );
};

export const useResetHint = () => {
  const hintAtomValue = useAtomValue(hintAtom);
  const setHint = useSetAtom(hintAtom);

  return useCallback(
    (key: SectionNames) => {
      setHint({
        ...hintAtomValue,
        [key]: { hint: "", status: ActivityHintStatus.INFO },
      });
    },
    [hintAtomValue, setHint],
  );
};

export function ControlledActivityHint(props: {
  noSloth?: boolean;
  name: SectionName | NarrativesSectionName;
}) {
  const hintAtomValue = useAtomValue(hintAtom);

  const hintData = hintAtomValue[props.name];

  if (!hintData) return null;

  return (
    <ActivityHint
      hintData={hintData}
      hintPosition="center"
      noSloth={props.noSloth}
      hintSize="xs"
    />
  );
}
