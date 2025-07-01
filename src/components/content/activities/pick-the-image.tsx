import { ActivityHintStatus } from "@/components/activity-hint";
import clsx from "@/utils/clsx";
import Image, { StaticImageData } from "next/image";
import { useCallback, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { CommonActivityOptions } from "./common";
import { usePlaySounds } from "@/hooks/usePlaySound";
import { textColorMap, type TextColor } from "@/sanity/lib/colors";

interface PickTheImageOption {
  id: string;
  imageSrc: string | StaticImageData;
  alt: string;
  isCorrect: boolean;
  hintText?: string;
}

export interface PickTheImageActivityOptions {
  question: string;
  questionColor?: TextColor;
  wideness?: "sm" | "md" | "lg" | "xl" | "2xl";
  options: Omit<PickTheImageOption, "id">[];
  wrap?: boolean;
  rotateOptions?: boolean;
  showAltText?: boolean;
}

interface PickTheImageOptionProps {
  option: PickTheImageOption;
  isSelected: boolean;
  disabled: boolean;
  showAltText?: boolean;
  onClick: () => void;
}
export function PickTheImageOption(props: PickTheImageOptionProps) {
  return (
    <button
      type="button"
      title={props.option.alt}
      disabled={props.disabled}
      className={clsx(
        "inline-block max-w-[250px] rounded-lg border-1 p-3 text-base font-medium text-neutral-dark-600 shadow-app-lg shadow-shadow-gray transition-all duration-75",
        props.isSelected
          ? props.option.isCorrect
            ? "border-primary-500 bg-primary-100 outline outline-2 outline-primary-500 hover:border-primary-600 hover:outline-primary-600"
            : "border-error-500 bg-error-100 hover:border-error-600"
          : "border-neutral-600 bg-neutral-100 bg-opacity-80 hover:border-neutral-500",
      )}
      onClick={props.onClick}
    >
      <Image
        src={props.option.imageSrc}
        width={224}
        height={160}
        alt={props.option.alt}
      />
      {props.showAltText && <div className="pt-3">{props.option.alt}</div>}
    </button>
  );
}

type PickTheImageActivityProps = React.PropsWithChildren<
  PickTheImageActivityOptions & CommonActivityOptions
>;
export function PickTheImageActivity({
  onHint,
  wideness,
  ...props
}: PickTheImageActivityProps) {
  const localOptions = useMemo<PickTheImageOption[]>(() => {
    return props.options.map((option) => ({
      ...option,
      id: uuid(),
    }));
  }, [props.options]);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, boolean>
  >({});

  const { playSound } = usePlaySounds();

  const onSelectOption = useCallback(
    (option: PickTheImageOption) => {
      if (option.isCorrect) {
        playSound("correct");
      } else {
        playSound("incorrect");
      }

      onHint({
        hint: option.hintText || "",
        status: option.isCorrect
          ? ActivityHintStatus.CORRECT
          : ActivityHintStatus.INCORRECT,
      });

      setSelectedOptions((v) => ({ ...v, [option.id]: !v[option.id] }));
    },
    [onHint, playSound],
  );

  return (
    <div
      className={clsx(
        "relative flex max-w-4xl flex-col items-center space-y-6",
        wideness === "sm" && "max-w-[20rem]",
        wideness === "md" && "max-w-[30rem]",
        wideness === "lg" && "max-w-[40rem]",
        wideness === "xl" && "max-w-[60rem]",
        wideness === "2xl" && "max-w-[70rem]",
      )}
    >
      <p
        className={clsx(
          "text-center text-4xl leading-snug",
          props.questionColor && textColorMap[props.questionColor],
        )}
      >
        {props.question}
      </p>

      {props.children}

      <ul
        className={clsx(
          "flex justify-center gap-x-4 gap-y-8",
          props.wrap ? "flex-row flex-wrap" : "flex-col items-center",
        )}
      >
        {localOptions.map((option, i) => {
          const isOdd = i % 2 !== 0;
          return (
            <li
              key={option.id}
              className={clsx(
                "odd:mr-auto even:ml-auto sm:!ml-0 sm:!mr-0",
                props.rotateOptions &&
                  (isOdd ? "rotate-[6.5deg]" : "-rotate-[6.5deg]"),
              )}
            >
              <PickTheImageOption
                option={option}
                disabled={selectedOptions[option.id] && option.isCorrect}
                isSelected={selectedOptions[option.id]}
                showAltText={props.showAltText}
                onClick={() => {
                  onSelectOption(option);
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
