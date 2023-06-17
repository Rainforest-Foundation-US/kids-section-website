import clsx from "@/utils/clsx";
import { useCallback, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface PickTheOptionOptionProps {
  option: Option;
  isSelected: boolean;
  onClick: () => void;
}
export function PickTheOptionOption(props: PickTheOptionOptionProps) {
  return (
    <button
      className={clsx(
        "inline-block rounded-lg border-1 py-4 px-4 font-medium text-neutral-dark-600 shadow-app-lg shadow-shadow-gray transition-all duration-75 text-base lg:px-8",
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

interface PickTheOptionActivityProps {
  question: string;
  options: Omit<Option, "id">[];
  wrap?: boolean;
  children?: React.ReactNode;
  rotateOptions?: boolean;
}
export function PickTheOptionActivity(props: PickTheOptionActivityProps) {
  const localOptions = useMemo<Option[]>(() => {
    return props.options.map((option) => ({
      ...option,
      id: uuid(),
    }));
  }, [props.options]);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, boolean>
  >({});

  const onSelectOption = useCallback((option: Option) => {
    setSelectedOptions((v) => ({ ...v, [option.id]: !v[option.id] }));
  }, []);

  return (
    <div className="flex max-w-3xl flex-col items-center space-y-6">
      <p className="text-center leading-snug text-4xl">{props.question}</p>

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
