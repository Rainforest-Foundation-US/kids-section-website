import clsx from "@/utils/clsx";
import { TypedObject } from "sanity";
import PortableTextRenderer from "../portable-text-renderer";

interface PlainTextContentProps {
  caption?: string;
  subText?: string;
  text: TypedObject | string;
  wideness?: "sm" | "md" | "lg" | "xl" | "2xl" | "custom";
  customWidth?: string;
  textSize?: "base" | "md";
  textAlign?: "left" | "center" | "right";
  subTextSize?: "lg" | "xl";
  subTextColor?: string;
  tracking?: string;
  paddingTop?: string;
  children?: React.ReactNode;
}
export function PlainTextContent({
  wideness = "lg",
  subTextSize = "lg",
  textAlign = "center",
  textSize = "base",
  subTextColor,
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
        textAlign === "left" && "text-left",
        textAlign === "center" && "text-center",
        textAlign === "right" && "text-right",
      )}
      style={{
        maxWidth: wideness === "custom" ? customWidth : undefined,
        letterSpacing: tracking || undefined,
        paddingTop: paddingTop || undefined,
      }}
    >
      {props.caption && (
        <p className="text-center text-xl font-medium text-primary-700">
          {props.caption}
        </p>
      )}
      <div
        className={clsx(
          "primary-strong whitespace-pre-line",
          textSize === "md" && "text-xl",
          textSize === "base" && "text-3xl",
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
            "primary-strong whitespace-pre-line leading-snug",
            `text-${subTextSize}`,
            subTextColor && `${subTextColor}`,
          )}
        >
          {props.subText}
        </p>
      )}

      {props.children}
    </section>
  );
}
