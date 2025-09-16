import { QAndAButton } from "./buttons";
import { QAndAQuestion } from "./useGetContent";

type Props = {
  activeQuestionI: number;
  qAndAContent: QAndAQuestion[];
  itemClick: (index: number) => void;
};

export function QANav({ activeQuestionI, qAndAContent, itemClick }: Props) {
  return (
    <nav className="h-full overflow-hidden px-6 lg:h-[calc(100vh-theme(height.header))] lg:overflow-auto">
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
