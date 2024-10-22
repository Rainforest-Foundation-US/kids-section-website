import { QAndAButton } from "./buttons";
import { QAndAQuestion } from "./useGetContent";

type Props = {
  activeQuestionI: number;
  qAndAContent: QAndAQuestion[];
  itemClick: (index: number) => void;
};

export function QANav({ activeQuestionI, qAndAContent, itemClick }: Props) {
  return (
    <nav
      className={`h-full overflow-hidden lg:h-[calc(100vh-theme(height.header))] lg:overflow-auto`}
    >
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
