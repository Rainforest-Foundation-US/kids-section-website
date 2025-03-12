import { ActivityHintStatus } from "@/components/activity-hint";
import clsx from "@/utils/clsx";
import React from "react";
import { v4 as uuid } from "uuid";
import { CommonActivityOptions } from "./common";
import { StaticImageData } from "next/image";
import { Postcard } from "@/components/postcard";
import { useAtom } from "jotai";
import { congratulationsAtom } from "@/components/congratulations";
import { usePlaySounds } from "@/hooks/usePlaySound";

export interface PickTheOptionActivityOptions {
  question: string;
  options: Omit<Option, "id">[];
  postCardContent?: {
    image: string | StaticImageData;
    alt: string;
    description?: string;
  };
  wrap?: boolean;
  rotateOptions?: boolean;
  isLastAnswer?: boolean;
}

interface Option {
  id: string;
  text: string;
  wrongAlertText?: string;
  isCorrect: boolean;
}

interface PickTheOptionOptionProps {
  option: Option;
  isSelected: boolean;
  disabled: boolean;
  onClick: () => void;
}
function PickTheOptionOption(props: PickTheOptionOptionProps) {
  return (
    <button
      disabled={props.disabled}
      className={clsx(
        "inline-block rounded-lg border-1 px-4 py-4 text-base font-medium text-neutral-dark-600 shadow-app-lg shadow-shadow-gray transition-all duration-75 lg:px-8",
        props.isSelected
          ? props.option.isCorrect
            ? "border-primary-500 bg-primary-100 hover:border-primary-600"
            : "border-error-500 bg-error-100 hover:border-error-600"
          : "border-neutral-100 bg-neutral-100 hover:border-neutral-500",
      )}
      onClick={props.onClick}
    >
      {props.option.text}
    </button>
  );
}

type PickTheOptionActivityProps = React.PropsWithChildren<
  PickTheOptionActivityOptions & CommonActivityOptions
>;
export function PickTheOptionActivity({
  onHint,
  ...props
}: PickTheOptionActivityProps) {
  const [congratulations, setCongratulations] = useAtom(congratulationsAtom);
  const localOptions = React.useMemo<Option[]>(() => {
    return props.options.map((option) => ({
      ...option,
      id: uuid(),
    }));
  }, [props.options]);

  const { playSound } = usePlaySounds();

  const [selectedOptions, setSelectedOptions] = React.useState<
    Record<string, boolean>
  >({});

  const correctOptions = React.useMemo(
    () => localOptions.filter((option) => option.isCorrect),
    [localOptions],
  );
  const missingCorrectOptions = React.useMemo(
    () =>
      correctOptions.length -
      correctOptions.filter((option) => selectedOptions[option.id]).length,
    [correctOptions, selectedOptions],
  );

  const allCorrectOptionsSelected = missingCorrectOptions === 0;

  const onSelectOption = React.useCallback(
    (option: Option) => {
      if (option.isCorrect) {
        if (missingCorrectOptions === 1) {
          onHint({ hint: "", status: ActivityHintStatus.CORRECT });

          if (congratulations[props.name] !== undefined && props.isLastAnswer) {
            playSound("congratulations");
            setCongratulations({ ...congratulations, [props.name]: true });
          } else {
            playSound("correct");
          }
        } else {
          onHint({ hint: "", status: ActivityHintStatus.KEEP_GOING });
        }
      } else {
        playSound("incorrect");
        onHint({
          hint: option.wrongAlertText ?? "",
          status: ActivityHintStatus.INCORRECT,
        });
      }

      setSelectedOptions((v) => ({ ...v, [option.id]: !v[option.id] }));
    },
    [
      props.isLastAnswer,
      props.name,
      missingCorrectOptions,
      congratulations,
      playSound,
      onHint,
      setCongratulations,
    ],
  );

  return (
    <div className="flex max-w-3xl flex-col items-center space-y-6">
      <p
        className="text-center text-4xl leading-snug"
        dangerouslySetInnerHTML={{ __html: props.question }}
      />

      {props.postCardContent && (
        <div className="relative py-4">
          <Postcard {...props.postCardContent} />
        </div>
      )}

      {props.children}

      <ul
        className={clsx(
          "flex justify-center gap-4",
          props.wrap ? "flex-row flex-wrap" : "flex-col items-center",
        )}
      >
        {localOptions.map((option, i) => {
          const isOdd = i % 2 !== 0;
          return (
            <li
              key={option.id}
              className={clsx(
                props.rotateOptions &&
                  (isOdd ? "rotate-[6.5deg]" : "-rotate-[6.5deg]"),
              )}
            >
              <PickTheOptionOption
                option={option}
                disabled={
                  allCorrectOptionsSelected ||
                  (selectedOptions[option.id] && option.isCorrect)
                }
                isSelected={selectedOptions[option.id]}
                onClick={() => onSelectOption(option)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
