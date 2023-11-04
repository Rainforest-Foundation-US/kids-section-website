import clsx from "@/utils/clsx";
import { useCallback, useMemo, useState } from "react";
import invariant from "tiny-invariant";
import { useDraggable, useDroppable } from "@/utils/draggable";
import { useAnimate, motion, easeIn } from "framer-motion";
import { CommonActivityOptions } from "./common";
import { ActivityHintStatus } from "@/components/activity-hint";

export interface FillInTheBlankActivityOptions {
  preText: string;
  subText?: string;
  question: StringifiedQuestion;
  numberToOptions: NumberToOptions;
}

type StringifiedQuestion = string;

type NumberToOptions = Record<
  number,
  {
    options: string[];
    /** Element *position* in options list === index + 1 */
    correctOptionPosition: number;
  }
>;

interface ParsedSentence {
  id: Id;
  text: string;
}

interface ParsedBlankOption {
  id: Id;
  text: string;
  isValid: boolean;
  blankId: Id;
}

interface ParsedBlank {
  id: Id;
  validOptionId: Id;
  options: ParsedBlankOption[];
}

function parseQuestion(
  question: StringifiedQuestion,
  numberToOptions: NumberToOptions
) {
  const elements: (ParsedSentence | ParsedBlank)[] = [];
  const allOptions: ParsedBlankOption[] = [];
  const splittedQuestion = question.split(/<blank *?\/>/g);

  for (let i = 0; i < splittedQuestion.length; i++) {
    const sentence = splittedQuestion[i];

    elements.push({ id: i, text: sentence } satisfies ParsedSentence);

    if (i === splittedQuestion.length - 1) continue;
    if (!numberToOptions[i]) {
      throw new Error(
        "No options provided for blank " +
          i +
          ' that follows "' +
          sentence +
          '" in question: "' +
          question +
          '".'
      );
    }

    if (
      numberToOptions[i].correctOptionPosition < 1 ||
      numberToOptions[i].correctOptionPosition >
        numberToOptions[i].options.length
    ) {
      throw new Error(
        "Correct option position provided (" +
          numberToOptions[i].correctOptionPosition +
          ") for blank " +
          i +
          ' that follows "' +
          sentence +
          '" in question: "' +
          question +
          '" is out of range for the number of options provided (1 - ' +
          numberToOptions[i].options.length +
          ")."
      );
    }

    const blankId = "blank-" + i;
    const options: ParsedBlankOption[] = numberToOptions[i].options.map(
      (option, j) => ({
        id: blankId + "-option-" + j,
        text: option,
        isValid: j === numberToOptions[i].correctOptionPosition - 1,
        blankId: blankId,
      })
    );

    const validOptionId = options.find(
      (_, j) => j === numberToOptions[i].correctOptionPosition - 1
    )?.id;

    invariant(validOptionId, "validOptionId should be defined");

    elements.push({
      id: blankId,
      options,
      validOptionId,
    } satisfies ParsedBlank);
    allOptions.push(...options);
  }

  return { elements, allOptions };
}

function useSyncParseQuestions(
  question: StringifiedQuestion,
  numberToOptions: NumberToOptions
) {
  const parsedQuestion = useMemo(
    () => parseQuestion(question, numberToOptions),
    [numberToOptions, question]
  );

  // blank.id -> option.id
  const [answers, setAnswers] = useState<Record<Id, Id>>({});

  return [parsedQuestion, answers, setAnswers] as const;
}

interface FillInTheBlankActivityOptionProps {
  option: ParsedBlankOption;
  isOddI: boolean;
  onClick: () => void;
}
export function FillInTheBlankActivityOption(
  props: FillInTheBlankActivityOptionProps
) {
  const [draggableProps, isDragging] = useDraggable(
    "blank-" + props.option.blankId,
    props.option,
    props.onClick
  );

  return (
    <span
      {...draggableProps}
      className={clsx(
        props.isOddI ? "rotate-6" : "-rotate-6",
        isDragging ? "cursor-grabbing" : "cursor-grab",
        isDragging ? "opacity-50" : "opacity-100",
        "border-1 bg-secondary-100 text-neutral-dark-600 shadow-app-lg shadow-shadow-gray inline-block rounded-lg border-neutral-600 px-4 py-4 text-base font-medium transition-all duration-75 hover:bg-neutral-100 lg:px-8"
      )}
      tabIndex={0}
      onClick={props.onClick}
    >
      {props.option.text}
    </span>
  );
}

export function FillInTheBlankActivityDropZone({
  onDrop,
  ...props
}: {
  blank: ParsedBlank;
  onDrop: (option: ParsedBlankOption) => void;
  onClick: () => void;
  selectedOption: ParsedBlankOption | null;
}) {
  const [scope, animate] = useAnimate();
  const blankId = props.blank.id;

  const [droppableProps] = useDroppable(
    "blank-" + blankId,
    useCallback(
      async (option: ParsedBlankOption, _target: HTMLButtonElement) => {
        if (option.blankId !== blankId || !option.isValid) {
          const options = { duration: 100 / 1000, transition: easeIn };

          await animate(
            scope.current,
            { transform: "translateX(-8px)" },
            options
          );
          await animate(
            scope.current,
            { transform: "translateX(8px)" },
            options
          );
          await animate(scope.current, { transform: "translateY(0)" }, options);
          return;
        }

        onDrop(option);
      },
      [animate, blankId, onDrop, scope]
    )
  );

  return (
    <motion.span ref={scope} className="inline-block">
      <button
        {...droppableProps}
        className={clsx(
          props.selectedOption && "bg-secondary-100 shadow-shadow-gray",
          !props.selectedOption && "dashed-border-lg",
          "shadow-app-lg active:shadow-app-sm mx-2 inline-block rounded-lg px-8 py-4 align-middle text-base font-medium transition-all duration-75 active:translate-x-1 active:translate-y-1"
        )}
        onClick={props.onClick}
      >
        {props.selectedOption
          ? props.selectedOption.text
          : "Fill in the option"}
      </button>
    </motion.span>
  );
}

type FillInTheBlankActivityProps = React.PropsWithChildren<
  FillInTheBlankActivityOptions & CommonActivityOptions
>;
export function FillInTheBlankActivity({
  onHint,
  ...props
}: FillInTheBlankActivityProps) {
  const [{ elements: questions, allOptions }, answers, setAnswers] =
    useSyncParseQuestions(props.question, props.numberToOptions);

  const onSelectOption = useCallback(
    (option: ParsedBlankOption) => {
      const updatedAnswers = { ...answers };

      // If the option is already selected, skip it.
      if (updatedAnswers[option.blankId]) {
        // TODO: Do animation to indicate that the option is already selected.
        return;
      }

      if (option.isValid) {
        onHint(null, ActivityHintStatus.CORRECT);
        updatedAnswers[option.blankId] = option.id;
      } else {
        onHint(null, ActivityHintStatus.INCORRECT);
        // TODO: Do failure animation
        delete updatedAnswers[option.blankId];
      }

      setAnswers(updatedAnswers);
    },
    [answers, onHint, setAnswers]
  );

  const getSelectedOption = useCallback(
    (blank: ParsedBlank) => {
      const answer = answers[blank.id];
      if (answer) {
        const option = allOptions.find((option) => option.id === answer);

        if (option) {
          return option;
        }
      }

      return null;
    },
    [answers, allOptions]
  );

  const onDeselectOption = useCallback(
    (blank: ParsedBlank) => {
      const nextAnswers = { ...answers };

      // TODO: Do remove animation
      delete nextAnswers[blank.id];

      setAnswers(nextAnswers);
    },
    [answers, setAnswers]
  );

  return (
    <div className="text-center">
      <p className="text-primary-600 text-xl font-medium leading-snug">
        Click on the box with the right answer
      </p>

      <p className="text-neutral-dark-700 mb-2 text-4xl leading-snug">
        {props.preText}
      </p>

      <div className="flex flex-col items-center space-y-9">
        <div>
          <p className="text-neutral-dark-700 max-w-3xl select-none text-center text-3xl font-bold leading-loose md:text-4xl">
            {questions.map((blank) => {
              if ("text" in blank) {
                return <span key={blank.id}>{blank.text}</span>;
              } else if (blank satisfies ParsedBlank) {
                return (
                  <FillInTheBlankActivityDropZone
                    key={blank.id}
                    blank={blank}
                    onDrop={onSelectOption}
                    onClick={() => onDeselectOption(blank)}
                    selectedOption={getSelectedOption(blank)}
                  />
                );
              }
            })}
          </p>

          {props.subText && (
            <p className="text-neutral-dark-700 mt-2 text-4xl leading-snug">
              {props.subText}
            </p>
          )}
        </div>

        <ul className="flex flex-row flex-wrap justify-center gap-4">
          {allOptions.map((option, i) => (
            <li key={option.id}>
              <FillInTheBlankActivityOption
                option={option}
                isOddI={i % 2 === 1}
                onClick={() => onSelectOption(option)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
