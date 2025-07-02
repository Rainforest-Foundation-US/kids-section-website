import Image, { StaticImageData } from "next/image";
import { ActivitySection } from "../sections";

import mainBackground from "@/assets/activities/1-background.png";
import clsx from "@/utils/clsx";
import { SectionName } from "@/hooks/useGetDiscoverTheAmazonContent";
import { textColorMap, type TextColor } from "@/sanity/lib/colors";

interface RegularSectionProps {
  children?: React.ReactNode;
  backgroundImage?: string | null | StaticImageData;
  backgroundOpacity?: number;
  backgroundColor?: string;
  fullScreen?: boolean;
  textColor?: TextColor;
  name?: SectionName;
  className?: string;
}
export function RegularSection(props: RegularSectionProps) {
  const color = textColorMap[props.textColor ?? "#1e1f1b"];

  return (
    <ActivitySection
      name={props.name}
      className={clsx(
        "py-0",
        color,
        props.fullScreen && "max-h-[unset] min-h-screen",
        props.className,
      )}
      style={{ backgroundColor: props.backgroundColor }}
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
