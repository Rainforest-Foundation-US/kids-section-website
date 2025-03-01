import { WavySeparator } from "../illustrations/activities-illustrations";
import { SectionName } from "@/hooks/useGetDiscoverTheAmazonContent";
import { ActivitySection } from "../sections";

export interface WavySectionProps {
  name?: SectionName;
  children?: React.ReactNode;
}
export function WavySection(props: WavySectionProps) {
  return (
    <ActivitySection
      name={props.name}
      className="relative z-10 my-0 max-h-full min-h-[0px] py-0 text-primary-100"
    >
      <WavySeparator direction="up" />

      <div className="absolute inset-x-0 inset-y-[110px] bg-complementary-700" />

      <div className="relative z-10 space-y-10 px-10">{props.children}</div>

      <WavySeparator className="bg-secondary-100" direction="down" />
    </ActivitySection>
  );
}
