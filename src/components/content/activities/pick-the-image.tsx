import clsx from "@/utils/clsx";
import Image, { StaticImageData } from "next/image";
import { useCallback, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { CommonActivity } from "./common";

export interface PickTheImageActivityOptions {
  question: string;
  options: Omit<Option, "id">[];
  wrap?: boolean;
  rotateOptions?: boolean;
}

interface Option {
  id: string;
  imageSrc: string | StaticImageData;
  alt: string;
  isCorrect: boolean;
}

interface PickTheImageOptionProps {
  option: Option;
  isSelected: boolean;
  disabled: boolean;
  onClick: () => void;
}
export function PickTheImageOption(props: PickTheImageOptionProps) {
  return (
    <button
      disabled={props.disabled}
      className={clsx(
        "border-1 text-neutral-dark-600 shadow-app-lg shadow-shadow-gray inline-block rounded-lg p-3 text-base font-medium transition-all duration-75",
        props.isSelected
          ? props.option.isCorrect
            ? "border-primary-500 bg-primary-100 hover:border-primary-600"
            : "border-error-500 bg-error-100 hover:border-error-600"
          : "border-neutral-600 bg-neutral-100 hover:border-neutral-500"
      )}
      onClick={props.onClick}
    >
      <Image
        src={props.option.imageSrc}
        width={224}
        height={160}
        alt={props.option.alt}
      />
    </button>
  );
}

type PickTheImageActivityProps = React.PropsWithChildren<
  PickTheImageActivityOptions & CommonActivity
>;
export function PickTheImageActivity({
  onHint,
  ...props
}: PickTheImageActivityProps) {
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
      <p className="text-center text-4xl leading-snug">{props.question}</p>

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
              <PickTheImageOption
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
