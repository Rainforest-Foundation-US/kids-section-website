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
      className="text-primary-100 relative z-10 my-0 min-h-[0px] py-0"
    >
      <WavySeparator className="w-full" direction="up" />

      <div className="bg-complementary-700 absolute inset-x-0 inset-y-[110px]" />

      <div className="relative z-10 space-y-10 px-10">{props.children}</div>

      <WavySeparator className="bg-secondary-100" direction="down" />
    </ActivitySection>
  );
}
