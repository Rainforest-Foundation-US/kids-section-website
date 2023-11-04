import clsx from "@/utils/clsx";

interface PlainTextContentProps {
  caption?: string;
  subText?: string;
  text: string;
  wideness?: "sm" | "md" | "lg" | "xl" | "2xl";
  textSize?: "base" | "md";
  textAlign?: "left" | "center" | "right";
  children?: React.ReactNode;
}
export function PlainTextContent({
  wideness = "lg",
  textAlign = "center",
  textSize = "base",
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
        textAlign === "right" && "text-right"
      )}
    >
      {props.caption && (
        <p className="text-primary-700 text-xl font-medium">{props.caption}</p>
      )}
      <p
        className={clsx(
          "primary-strong whitespace-pre-line leading-snug",
          textSize === "md" && "text-2xl",
          textSize === "base" && "text-4xl"
        )}
        dangerouslySetInnerHTML={{ __html: props.text }}
      />
      {props.subText && (
        <p className="primary-strong whitespace-pre-line text-lg leading-snug">
          {props.subText}
        </p>
      )}

      {props.children}
    </section>
  );
}
