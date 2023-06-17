import clsx from "@/utils/clsx";
import { truncateText } from "@/utils/truncateText";
import { StaticImageData } from "next/image";
import { useMemo } from "react";

const MAX_POLAROID_LENGTH = 31;

interface PolaroidProps {
  className?: string;
  src: string | StaticImageData;
  caption?: string;
  shrinkOnResponsive?: boolean;
  verticalAlign?: "top" | "center" | "bottom";
}
export function Polaroid(props: PolaroidProps) {
  const captionFromProps = props.caption ?? "Fujifilm Instax Wide Format";

  const [caption, truncated] = useMemo(
    () => truncateText(captionFromProps, MAX_POLAROID_LENGTH),
    [captionFromProps]
  );

  const style = {
    "--el-align": props.verticalAlign ?? "center",
  } as React.CSSProperties;

  let imageSrc: string;
  let blurDataURL: string | undefined;

  if (typeof props.src === "string") {
    imageSrc = props.src;
  } else {
    imageSrc = props.src.src;
    blurDataURL = props.src.blurDataURL;
  }

  return (
    <svg
      className={clsx(
        "transition-all duration-75",
        "box-content flex min-w-[272px] flex-col border-1 border-neutral-600 bg-neutral-100 p-2 shadow-app-lg shadow-shadow-gray lg:p-4",
        props.className
      )}
      viewBox="0 0 140 132"
    >
      {blurDataURL && (
        <image
          x="0"
          y="0"
          style={style}
          preserveAspectRatio="xMidYMax slice"
          href={blurDataURL}
          width={140}
          height={110}
        />
      )}
      <image
        x="0"
        y="0"
        style={style}
        preserveAspectRatio="xMidYMax slice"
        href={imageSrc}
        width={140}
        height={110}
      />

      <text className="text-3xs" textAnchor="middle" x={70} y={127}>
        {caption}
        {truncated && "..."}
      </text>
    </svg>
  );
}
