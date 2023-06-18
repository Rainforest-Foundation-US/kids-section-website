import Image from "next/image";
import { ActivitySection } from "../sections";

import mainBackground from "@/assets/activities/1-background.png";
import clsx from "@/utils/clsx";

export interface RegularSectionProps {
  children?: React.ReactNode;
  fullScreen?: boolean;
  number: number;
}
export function RegularSection(props: RegularSectionProps) {
  return (
    <ActivitySection
      number={props.number}
      className={clsx("py-0", props.fullScreen && "max-h-[unset] min-h-screen")}
    >
      <Image
        className="absolute inset-0 block h-full w-full object-cover"
        src={mainBackground}
        height={1280}
        width={720}
        aria-hidden
        alt=""
      />

      {props.children}
    </ActivitySection>
  );
}
