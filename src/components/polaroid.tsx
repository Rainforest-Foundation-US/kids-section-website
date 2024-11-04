import clsx from "@/utils/clsx";
import { wrapText, truncateText } from "@/utils/truncateText";
import { motion } from "framer-motion";
import { StaticImageData } from "next/image";
import { useMemo } from "react";
import React from "react";

const MAX_POLAROID_LENGTH = 30; // Max chars in line - eye precision 😉.
const DEFAULT_POLAROID_HEIGHT = 132;
const DEFAULT_POLAROID_WIDTH = 140;

export enum PolaroidCaptionStyle {
  wrap = "wrap",
  wrapPreserveAspectRatio = "wrapPreserveAspectRatio",
  truncate = "truncate",
}

interface PolaroidProps {
  className?: string;
  src: string | StaticImageData;
  caption?: string;
  captionStyle?: PolaroidCaptionStyle;
  verticalAlign?: "top" | "center" | "bottom";
  description?: string;
  isFlipped?: boolean;
}

export function Polaroid({ isFlipped, ...rest }: PolaroidProps) {
  if (rest.description) {
    return (
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <PolaroidFront {...rest} />

        <PolaroidBack {...rest} />

        {/* Invisible back side in order to make the parent div grow to the SVG size. Absolute SVGs cannot achieve this. */}
        <PolaroidBack className="invisible relative" {...rest} />
      </motion.div>
    );
  }

  return <PolaroidFront className="relative" {...rest} />;
}

function PolaroidFront(props: PolaroidProps) {
  const captionFromProps = props.caption ?? ""; // ?? "Fujifilm Instax Wide Format";

  const noCaption = !props.caption?.length;

  const lines = useMemo(() => {
    if (
      props.captionStyle === PolaroidCaptionStyle.wrap ||
      props.captionStyle === PolaroidCaptionStyle.wrapPreserveAspectRatio
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

  const shouldWrapPreserveAspectRatio =
    props.captionStyle === PolaroidCaptionStyle.wrapPreserveAspectRatio;

  const textStartY = shouldWrapPreserveAspectRatio
    ? 127 - 16 * (lines.length - 1)
    : 127;

  const svgHeight = shouldWrapPreserveAspectRatio
    ? DEFAULT_POLAROID_HEIGHT
    : DEFAULT_POLAROID_HEIGHT + (lines.length - 1) * 16;
  const imageHeight = textStartY - 17;

  return (
    <motion.svg
      className={clsx(
        "absolute box-content h-auto w-full border-1 border-neutral-600 bg-neutral-100 p-2 shadow-app-lg shadow-shadow-gray lg:p-4",
        props.className,
      )}
      style={{
        backfaceVisibility: "hidden",
      }}
      viewBox={`0 0 ${DEFAULT_POLAROID_WIDTH} ${svgHeight}`}
    >
      {blurDataURL && (
        <image
          x="0"
          y="0"
          style={style}
          preserveAspectRatio="xMidYMax slice"
          href={blurDataURL}
          width={DEFAULT_POLAROID_WIDTH}
          height={noCaption ? DEFAULT_POLAROID_HEIGHT : imageHeight}
        />
      )}
      <image
        x="0"
        y="0"
        style={style}
        preserveAspectRatio="xMidYMax slice"
        href={imageSrc}
        width={DEFAULT_POLAROID_WIDTH}
        height={noCaption ? DEFAULT_POLAROID_HEIGHT : imageHeight}
      />

      {lines.map((caption, i) => (
        <text
          key={i}
          className="text-4xs [text-shadow:none]"
          textAnchor="middle"
          x={70}
          y={textStartY + 16 * i}
        >
          {caption}
        </text>
      ))}
    </motion.svg>
  );
}

function PolaroidBack(props: PolaroidProps) {
  const captionFromProps = props.caption ?? ""; // ?? "Fujifilm Instax Wide Format";

  const noCaption = !props.caption?.length;

  const lines = useMemo(() => {
    if (
      props.captionStyle === PolaroidCaptionStyle.wrap ||
      props.captionStyle === PolaroidCaptionStyle.wrapPreserveAspectRatio
    ) {
      return wrapText(captionFromProps, MAX_POLAROID_LENGTH);
    }

    const [caption, truncated] = truncateText(
      captionFromProps,
      MAX_POLAROID_LENGTH,
    );

    return [caption + (truncated ? "..." : "")];
  }, [props.captionStyle, captionFromProps]);

  const shouldWrapPreserveAspectRatio =
    props.captionStyle === PolaroidCaptionStyle.wrapPreserveAspectRatio;

  const textStartY = shouldWrapPreserveAspectRatio
    ? 127 - 16 * (lines.length - 1)
    : 127;

  const svgHeight = shouldWrapPreserveAspectRatio
    ? DEFAULT_POLAROID_HEIGHT
    : DEFAULT_POLAROID_HEIGHT + (lines.length - 1) * 16;
  const imageHeight = textStartY - 17;

  return (
    <motion.svg
      className={clsx(
        "absolute box-content h-auto w-full border-1 border-neutral-600 bg-neutral-100 p-2 shadow-app-lg shadow-shadow-gray lg:p-4",
        props.className,
      )}
      style={{
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)", // Rotate the back side
      }}
      viewBox={`0 0 ${DEFAULT_POLAROID_WIDTH} ${svgHeight}`}
    >
      <g>
        <rect
          className="fill-primary-400 p-2"
          width={DEFAULT_POLAROID_WIDTH}
          height={noCaption ? DEFAULT_POLAROID_HEIGHT : imageHeight}
        />
        {wrapText(props.description ?? "", MAX_POLAROID_LENGTH + 4).map(
          (caption, i) => (
            <text
              key={i}
              className="fill-neutral-100 text-6xs [text-shadow:none]"
              x={3}
              y={10 + 12 * i}
            >
              {caption}
            </text>
          ),
        )}
      </g>

      {lines.map((caption, i) => (
        <text
          key={i}
          className="text-4xs [text-shadow:none]"
          textAnchor="middle"
          x={70}
          y={textStartY + 16 * i}
        >
          {caption}
        </text>
      ))}
    </motion.svg>
  );
}
