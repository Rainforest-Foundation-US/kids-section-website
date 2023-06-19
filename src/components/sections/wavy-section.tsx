import { WavySeparator } from "../activities-illustrations";
import { ActivitySection } from "../sections";

export interface WavySectionProps {
  children?: React.ReactNode;
  number: number;
}
export function WavySection(props: WavySectionProps) {
  return (
    <ActivitySection
      number={props.number}
      className="bg-complementary-700 text-primary-100 max-h-[72rem] min-h-[720px]"
    >
      <WavySeparator
        className="absolute top-0 -translate-y-[99%]"
        direction="up"
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center space-y-10 px-10">
        {props.children}
      </div>

      <WavySeparator
        className="absolute bottom-0 z-10 translate-y-[99%]"
        direction="down"
      />
    </ActivitySection>
  );
}
