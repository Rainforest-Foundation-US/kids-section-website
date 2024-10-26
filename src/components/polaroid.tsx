import clsx from "@/utils/clsx";
import { wrapText, truncateText } from "@/utils/truncateText";
import { StaticImageData } from "next/image";
import { useMemo } from "react";
import { RoundSlothIllustration } from "./activities-illustrations";

const MAX_POLAROID_LENGTH = 30; // Max chars in line - eye precision 😉.

export enum PolaroidCaptionStyle {
  wrap,
  wrapPreserveAspectRation,
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
    if (
      props.captionStyle === PolaroidCaptionStyle.wrap ||
      props.captionStyle === PolaroidCaptionStyle.wrapPreserveAspectRation
    ) {
      return wrapText(captionFromProps, MAX_POLAROID_LENGTH);
    }

    const [caption, truncated] = truncateText(
      captionFromProps,
      MAX_POLAROID_LENGTH,
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

  const shouldWrapPreserveAspectRation =
    props.captionStyle === PolaroidCaptionStyle.wrapPreserveAspectRation;

  const textStartY = shouldWrapPreserveAspectRation
    ? 127 - 16 * (lines.length - 1)
    : 127;

  const svgHeight = shouldWrapPreserveAspectRation
    ? 132
    : 132 + (lines.length - 1) * 16;
  const imageHeight = textStartY - 17;

  return (
    <svg
      className={clsx(
        "transition-all duration-75",
        "box-content flex min-w-[272px] flex-col border-1 border-neutral-600 bg-neutral-100 p-2 shadow-app-lg shadow-shadow-gray lg:p-4",
        props.className,
      )}
      viewBox={`0 0 140 ${svgHeight}`}
      onClick={() => {
        console.log("flip it");
      }}
    >
      {/* {blurDataURL && (
        <image
          x="0"
          y="0"
          style={style}
          preserveAspectRatio="xMidYMax slice"
          href={blurDataURL}
          width={140}
          height={noCaption ? 132 : imageHeight}
        />
      )} */}
      {/* <image
        x="0"
        y="0"
        style={style}
        preserveAspectRatio="xMidYMax slice"
        href={imageSrc}
        width={140}
        height={noCaption ? 132 : imageHeight}
      /> */}

      <RoundSlothIllustration height={32} width={32} x={10} y={40} />

      <text
        className="text-md text-primary-400 [text-shadow:none]"
        textAnchor="middle"
        x={70}
        y={32}
      >
        Title
      </text>
      <text
        className="w-48 text-wrap text-4xs text-primary-400 [text-shadow:none]"
        textAnchor="middle"
        x={70}
        y={48}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </text>

      {/* {lines.map((caption, i) => (
        <text
          key={i}
          className="text-4xs [text-shadow:none]"
          textAnchor="middle"
          x={70}
          y={textStartY + 16 * i}
        >
          {caption}
        </text>
      ))} */}
    </svg>
  );
}
