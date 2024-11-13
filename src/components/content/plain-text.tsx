import clsx from "@/utils/clsx";

interface PlainTextContentProps {
  caption?: string;
  subText?: string;
  text: string;
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
        wideness === "custom" && `max-w-[${customWidth}]`,
        textAlign === "left" && "text-left",
        textAlign === "center" && "text-center",
        textAlign === "right" && "text-right",
        tracking && `tracking-[${tracking}]`,
        paddingTop && `pt-[${paddingTop}]`,
      )}
    >
      {props.caption && (
        <p className="text-xl font-medium text-primary-700">{props.caption}</p>
      )}
      <p
        className={clsx(
          "primary-strong whitespace-pre-line leading-snug",
          textSize === "md" && "text-2xl",
          textSize === "base" && "text-4xl",
        )}
        dangerouslySetInnerHTML={{ __html: props.text }}
      />
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
