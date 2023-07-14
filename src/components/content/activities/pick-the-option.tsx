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
        "border-1 text-neutral-dark-600 shadow-app-lg shadow-shadow-gray inline-block rounded-lg px-4 py-4 text-base font-medium transition-all duration-75 lg:px-8",
        props.isSelected
          ? props.option.isCorrect
            ? "border-primary-500 bg-primary-100 hover:border-primary-600"
            : "border-error-500 bg-error-100 hover:border-error-600"
          : "border-neutral-100 bg-neutral-100 hover:border-neutral-500"
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

  const allCorrectOptionsSelected = useMemo(() => {
    return localOptions
      .filter((option) => option.isCorrect)
      .every((option) => selectedOptions[option.id]);
  }, [localOptions, selectedOptions]);

  const onSelectOption = useCallback(
    (option: Option) => {
      if (option.isCorrect) {
        onHint(null, "correct");
      } else {
        onHint(null, "incorrect");
      }

      setSelectedOptions((v) => ({ ...v, [option.id]: !v[option.id] }));
    },
    [onHint]
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
          props.wrap ? "flex-row flex-wrap" : "flex-col items-center"
        )}
      >
        {localOptions.map((option, i) => {
          const isOdd = i % 2 !== 0;
          return (
            <li
              key={option.id}
              className={clsx(
                props.rotateOptions &&
                  (isOdd ? "rotate-[6.5deg]" : "-rotate-[6.5deg]")
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
