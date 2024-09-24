import { ActivityHintStatus } from "@/components/activity-hint";
import clsx from "@/utils/clsx";
import { useCallback, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { CommonActivityOptions } from "./common";

export interface PickTheOptionActivityOptions {
  question: string;
  options: Omit<Option, "id">[];
  wrap?: boolean;
  rotateOptions?: boolean;
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
export function PickTheOptionOption(props: PickTheOptionOptionProps) {
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
  const localOptions = useMemo<Option[]>(() => {
    return props.options.map((option) => ({
      ...option,
      id: uuid(),
    }));
  }, [props.options]);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, boolean>
  >({});

  const correctOptions = useMemo(
    () => localOptions.filter((option) => option.isCorrect),
    [localOptions],
  );
  const missingCorrectOptions = useMemo(
    () =>
      correctOptions.length -
      correctOptions.filter((option) => selectedOptions[option.id]).length,
    [correctOptions, selectedOptions],
  );

  const allCorrectOptionsSelected = missingCorrectOptions === 0;

  const onSelectOption = useCallback(
    (option: Option) => {
      if (option.isCorrect) {
        if (missingCorrectOptions === 1) {
          onHint(null, ActivityHintStatus.CORRECT);
        } else {
          onHint(null, ActivityHintStatus.KEEP_GOING);
        }
      } else {
        onHint(option.wrongAlertText ?? null, ActivityHintStatus.INCORRECT);
      }

      setSelectedOptions((v) => ({ ...v, [option.id]: !v[option.id] }));
    },
    [missingCorrectOptions, onHint],
  );

  return (
    <div className="flex max-w-3xl flex-col items-center space-y-6">
      <p
        className="text-center text-4xl leading-snug"
        dangerouslySetInnerHTML={{ __html: props.question }}
      />

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
