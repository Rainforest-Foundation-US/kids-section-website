import clsx from "clsx";
import { useState } from "react";
import invariant from "tiny-invariant";

// Check if string contains <blank> and </blank>
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
  blankPosition: number;
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

    const options: ParsedBlankOption[] = numberToOptions[i].options.map(
      (option, j) => ({
        id: "blank-" + i + "-option-" + j,
        text: option,
        isValid: j === numberToOptions[i].correctOptionPosition - 1,
        blankPosition: i,
      })
    );

    const validOptionId = options.find(
      (_, j) => j === numberToOptions[i].correctOptionPosition - 1
    )?.id;

    invariant(validOptionId, "validOptionId should be defined");

    elements.push({
      id: "blank-" + i,
      options,
      validOptionId,
    } satisfies ParsedBlank);
    allOptions.push(...options);
  }

  return { elements, allOptions };
}

interface FillInTheBlankActivityProps<S extends string> {
  question: StringifiedQuestion<S>;
  numberToOptions: NumberToOptions;
}
export function FillInTheBlankActivity<S extends string>(
  props: FillInTheBlankActivityProps<S>
) {
  const { elements: questionObject, allOptions } = parseQuestion(
    props.question,
    props.numberToOptions
  );

  return (
    <div className="flex flex-col items-center space-y-9">
      <p className="max-w-3xl text-center text-4xl font-bold leading-loose text-neutral-dark-700">
        {questionObject.map((element) => {
          if ("text" in element) {
            return <span key={element.id}>{element.text}</span>;
          } else if (element satisfies ParsedBlank) {
            return (
              <span
                key={element.id}
                className={clsx(
                  "mx-2 inline-block rounded-lg px-8 py-4 align-middle text-base font-medium shadow-app-lg transition-all duration-75 dashed-border-lg active:translate-x-1 active:translate-y-1 active:shadow-app-sm"
                )}
              >
                Fill in the blank
              </span>
            );
          }
        })}
      </p>

      <ul className="flex flex-row flex-wrap gap-4">
        {allOptions.map((option, i) => {
          const isOddI = i % 2 === 1;
          return (
            <span
              key={option.id}
              className={clsx(
                isOddI ? "rotate-6" : "-rotate-6",
                "inline-block rounded-lg border-1 border-neutral-600 bg-secondary-100 px-8 py-4 text-base font-medium text-neutral-dark-600 shadow-app-lg shadow-shadow-gray transition-all duration-75 hover:bg-neutral-100"
              )}
            >
              {option.text}
            </span>
          );
        })}
      </ul>
    </div>
  );
}
