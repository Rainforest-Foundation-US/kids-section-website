import clsx from "clsx";
import { useCallback, useMemo, useState } from "react";
import invariant from "tiny-invariant";
import { useDraggable, useDroppable } from "../../utils/draggable";

type StringifiedQuestion<S extends string> =
  S extends `${infer _}<blank />${infer __}` ? S : never;

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

function parseQuestion<S extends string>(
  question: StringifiedQuestion<S>,
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

function useSyncParseQuestions<S extends string>(
  question: StringifiedQuestion<S>,
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
        "inline-block rounded-lg border-1 border-neutral-600 bg-secondary-100 px-8 py-4 text-base font-medium text-neutral-dark-600 shadow-app-lg shadow-shadow-gray transition-all duration-75 hover:bg-neutral-100"
      )}
      tabIndex={0}
      onClick={props.onClick}
    >
      {props.option.text}
    </span>
  );
}

export function FillInTheBlankActivityDropZone(props: {
  blank: ParsedBlank;
  onDrop: (option: ParsedBlankOption) => void;
  selectedOption: ParsedBlankOption | null;
}) {
  const [droppableProps] = useDroppable(
    "blank-" + props.blank.id,
    props.onDrop
  );

  return (
    <span
      {...droppableProps}
      className={clsx(
        props.selectedOption && "bg-secondary-100 shadow-shadow-gray",
        !props.selectedOption && "dashed-border-lg",
        "mx-2 inline-block rounded-lg px-8 py-4 align-middle text-base font-medium shadow-app-lg transition-all duration-75 active:translate-x-1 active:translate-y-1 active:shadow-app-sm"
      )}
    >
      {props.selectedOption ? props.selectedOption.text : "Fill in the option"}
    </span>
  );
}

interface FillInTheBlankActivityProps<S extends string> {
  question: StringifiedQuestion<S>;
  numberToOptions: NumberToOptions;
}
export function FillInTheBlankActivity<S extends string>(
  props: FillInTheBlankActivityProps<S>
) {
  const [{ elements: questions, allOptions }, answers, setAnswers] =
    useSyncParseQuestions(props.question, props.numberToOptions);

  const onSelectOption = useCallback(
    (option: ParsedBlankOption) => {
      const nextAnswers = { ...answers };

      if (option.isValid) {
        // Do success animation
        nextAnswers[option.blankId] = option.id;
      } else {
        // Do failure animation
        delete nextAnswers[option.blankId];
      }

      setAnswers(nextAnswers);
    },
    [answers, setAnswers]
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

  return (
    <div className="flex flex-col items-center space-y-9">
      <p className="max-w-3xl text-center text-4xl font-bold leading-loose text-neutral-dark-700">
        {questions.map((blank) => {
          if ("text" in blank) {
            return <span key={blank.id}>{blank.text}</span>;
          } else if (blank satisfies ParsedBlank) {
            return (
              <FillInTheBlankActivityDropZone
                key={blank.id}
                blank={blank}
                onDrop={onSelectOption}
                selectedOption={getSelectedOption(blank)}
              />
            );
          }
        })}
      </p>

      <ul className="flex flex-row flex-wrap gap-4">
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
  );
}