import Image, { StaticImageData } from "next/image";
import { ActivitySection } from "../sections";

import mainBackground from "@/assets/activities/1-background.png";
import clsx from "@/utils/clsx";

export interface RegularSectionProps {
  children?: React.ReactNode;
  backgroundImage?: string | null | StaticImageData;
  backgroundOpacity?: number;
  backgroundColor?: string;
  fullScreen?: boolean;
  number: number;
}
export function RegularSection(props: RegularSectionProps) {
  return (
    <ActivitySection
      number={props.number}
      className={clsx(
        "py-0",
        props.fullScreen && "text-neutral-dark-700 max-h-[unset] min-h-screen"
      )}
      style={{
        backgroundColor: props.backgroundColor,
      }}
    >
      {props.backgroundImage !== null && (
        <Image
          className="absolute inset-0 block h-full w-full object-cover"
          src={props.backgroundImage ?? mainBackground}
          height={1280}
          width={720}
          aria-hidden
          alt=""
          style={{
            opacity: props.backgroundOpacity ?? 1,
            backgroundColor: props.backgroundColor ?? "transparent",
          }}
        />
      )}

      {props.children}
    </ActivitySection>
  );
}
