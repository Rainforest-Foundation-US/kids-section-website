import { QAndAButton } from "./buttons";
import { qAndAContent } from "./constants";

type Props = {
  activeQuestionI: number;
  itemClick: (index: number) => void;
};

export function QANav({ activeQuestionI, itemClick }: Props) {
  return (
    <nav className={`lg:h-[calc(100vh-theme(height.header))] h-full lg:overflow-auto overflow-hidden`}>
      <h1 className="mb-4 text-lg text-primary-800">What’s your question?</h1>

      <ul className="space-y-4 lg:max-w-xs">
        {qAndAContent.map((content, index) => (
          <li key={content.question}>
            <QAndAButton
              isActive={activeQuestionI === index}
              onClick={() => itemClick(index)}
            >
              {content.question}
            </QAndAButton>
          </li>
        ))}
      </ul>
    </nav>
  );
}
