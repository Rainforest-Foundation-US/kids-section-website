import clsx from "@/utils/clsx";
import { TypedObject } from "sanity";
import PortableTextRenderer from "../portable-text-renderer";
import { textColorMap, type TextColor } from "@/sanity/lib/colors";

interface PlainTextContentProps {
  caption?: string;
  captionAlign?: "left" | "center" | "right";
  captionColor?: TextColor;
  title?: string;
  titleAlign?: "left" | "center" | "right";
  titleColor?: TextColor;
  subText?: string;
  text: TypedObject | string;
  wideness?: "sm" | "md" | "lg" | "xl" | "2xl" | "custom";
  customWidth?: string;
  textSize?: "base" | "md";
  textAlign?: "left" | "center" | "right";
  textColor?: TextColor;
  subTextSize?: "lg" | "xl";
  subTextColor?: TextColor;
  tracking?: string;
  paddingTop?: string;
  children?: React.ReactNode;
}
export function PlainTextContent({
  wideness = "lg",
  subTextSize = "lg",
  textAlign = "center",
  textSize = "base",
  customWidth,
  tracking,
  paddingTop,
  ...props
}: PlainTextContentProps) {
  return (
    <section
      className={clsx(
        "mx-auto space-y-6",
        wideness === "sm" && "max-w-[20rem]",
        wideness === "md" && "max-w-[30rem]",
        wideness === "lg" && "max-w-[40rem]",
        wideness === "xl" && "max-w-[60rem]",
        wideness === "2xl" && "max-w-[70rem]",
      )}
      style={{
        maxWidth: wideness === "custom" ? customWidth : undefined,
        letterSpacing: tracking || undefined,
        paddingTop: paddingTop || undefined,
      }}
    >
      {props.caption && (
        <p
          className={clsx(
            "text-center text-xl font-medium text-primary-700",
            props.captionAlign === "left" && "text-left",
            props.captionAlign === "right" && "text-right",
            props.captionColor && textColorMap[props.captionColor],
          )}
        >
          {props.caption}
        </p>
      )}

      {props.title && (
        <p
          className={clsx(
            "text-center text-3xl font-bold text-neutral-dark-800",
            props.titleAlign === "left" && "text-left",
            props.titleAlign === "right" && "text-right",
            props.titleColor && textColorMap[props.titleColor],
          )}
        >
          {props.title}
        </p>
      )}

      <div
        className={clsx(
          "whitespace-pre-line",
          textSize === "md" && "text-xl",
          textSize === "base" && "text-3xl",
          textAlign === "left" && "text-left",
          textAlign === "center" && "text-center",
          textAlign === "right" && "text-right",
          props.textColor && textColorMap[props.textColor],
        )}
      >
        {/* TODO: remove once everything is loaded from the Sanity CMS */}
        {typeof props.text === "string" ? (
          <p dangerouslySetInnerHTML={{ __html: props.text }} />
        ) : (
          <PortableTextRenderer content={props.text} />
        )}
      </div>
      {props.subText && (
        <p
          className={clsx(
            "whitespace-pre-line leading-snug",
            `text-${subTextSize}`,
            props.subTextColor && textColorMap[props.subTextColor],
            textAlign === "left" && "text-left",
            textAlign === "center" && "text-center",
            textAlign === "right" && "text-right",
          )}
        >
          {props.subText}
        </p>
      )}

      {props.children}
    </section>
  );
}
