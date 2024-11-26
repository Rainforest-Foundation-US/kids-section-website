import { ActivityHintStatus } from "@/components/activity-hint";
import clsx from "@/utils/clsx";
import Image, { StaticImageData } from "next/image";
import { useCallback, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { CommonActivityOptions } from "./common";
import { RoundSlothIllustration } from "@/components/activities-illustrations";

export type LeftSideContent = {
  type: "sloth";
  text?: string;
};

export function PolymorphicLeftSideContent({
  leftSideContent,
  recentOptionSelect,
}: {
  leftSideContent: LeftSideContent;
  recentOptionSelect: Option | null;
}) {
  if (leftSideContent.type === "sloth") {
    return (
      <div className="-left-32 z-10 mb-2 flex gap-2 lg:absolute lg:flex-col">
        <RoundSlothIllustration />
        {leftSideContent.text && (
          <p
            className={clsx(
              "text-white mt-2 max-h-36 text-wrap rounded-3xl border-8 border-neutral-100 bg-primary-900 p-4 text-center text-xl font-medium leading-8 text-neutral-100 lg:max-h-full lg:max-w-[11.5rem]",
              recentOptionSelect &&
                !recentOptionSelect.isCorrect &&
                "bg-error-700",
            )}
          >
            {recentOptionSelect
              ? recentOptionSelect.reason
              : leftSideContent.text}
          </p>
        )}
      </div>
    );
  }
}

export interface PickTheImageActivityOptions {
  question: string;
  wideness?: "sm" | "md" | "lg" | "xl" | "2xl";
  options: Omit<Option, "id">[];
  wrap?: boolean;
  rotateOptions?: boolean;
  leftSideContent?: LeftSideContent;
}

interface Option {
  id: string;
  imageSrc: string | StaticImageData;
  alt: string;
  isCorrect: boolean;
  reason?: string;
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
      <div className="line-clamp-1">{props.option.alt}</div>
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
  const localOptions = useMemo<Option[]>(() => {
    return props.options.map((option) => ({
      ...option,
      id: uuid(),
    }));
  }, [props.options]);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, boolean>
  >({});

  const [recentOptionSelect, setResentOptionSelect] = useState<Option | null>(
    null,
  );

  const onSelectOption = useCallback(
    (option: Option) => {
      if (option.isCorrect) {
        onHint(null, ActivityHintStatus.CORRECT);
      } else {
        onHint(null, ActivityHintStatus.INCORRECT);
      }

      setSelectedOptions((v) => ({ ...v, [option.id]: !v[option.id] }));
    },
    [onHint],
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
      <p className="text-center text-4xl leading-snug">{props.question}</p>

      {props.leftSideContent && (
        <PolymorphicLeftSideContent
          leftSideContent={props.leftSideContent}
          recentOptionSelect={recentOptionSelect}
        />
      )}

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
                onClick={() => {
                  onSelectOption(option);
                  setResentOptionSelect(option);
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
