import clsx from "@/utils/clsx";
import { wrapText, truncateText } from "@/utils/truncateText";
import { StaticImageData } from "next/image";
import { useMemo } from "react";

const MAX_POLAROID_LENGTH = 32; // Max chars in line - eye precision 😉.

export enum PolaroidCaptionStyle {
  wrap,
  truncate,
}

interface PolaroidProps {
  className?: string;
  src: string | StaticImageData;
  caption?: string;
  captionStyle?: PolaroidCaptionStyle;
  shrinkOnResponsive?: boolean;
  verticalAlign?: "top" | "center" | "bottom";
}
export function Polaroid(props: PolaroidProps) {
  const captionFromProps = props.caption ?? ""; // ?? "Fujifilm Instax Wide Format";

  const noCaption = !props.caption?.length;

  const lines = useMemo(() => {
    if (props.captionStyle === PolaroidCaptionStyle.wrap) {
      return wrapText(captionFromProps, MAX_POLAROID_LENGTH);
    }

    const [caption, truncated] = truncateText(
      captionFromProps,
      MAX_POLAROID_LENGTH
    );

    return [caption + (truncated ? "..." : "")];
  }, [props.captionStyle, captionFromProps]);

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
        "border-1 shadow-app-lg shadow-shadow-gray box-content flex min-w-[272px] flex-col border-neutral-600 bg-neutral-100 p-2 lg:p-4",
        props.className
      )}
      viewBox={`0 0 140 ${132 + (lines.length - 1) * 16}`}
    >
      {blurDataURL && (
        <image
          x="0"
          y="0"
          style={style}
          preserveAspectRatio="xMidYMax slice"
          href={blurDataURL}
          width={140}
          height={noCaption ? 132 : 110}
        />
      )}
      <image
        x="0"
        y="0"
        style={style}
        preserveAspectRatio="xMidYMax slice"
        href={imageSrc}
        width={140}
        height={noCaption ? 132 : 110}
      />

      {lines.map((caption, i) => (
        <text
          key={i}
          className="text-4xs"
          textAnchor="middle"
          x={70}
          y={127 + 16 * i}
        >
          {caption}
        </text>
      ))}
    </svg>
  );
}
