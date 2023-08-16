import clsx from "@/utils/clsx";

interface PlainTextContentProps {
  caption?: string;
  subText?: string;
  text: string;
  size?: "sm" | "md" | "lg" | "xl";
  textAlign?: "left" | "center" | "right";
  children?: React.ReactNode;
}
export function PlainTextContent({
  size = "lg",
  textAlign = "center",
  ...props
}: PlainTextContentProps) {
  return (
    <section
      className={clsx(
        "mx-auto space-y-6",
        size === "sm" && "max-w-[20rem]",
        size === "md" && "max-w-[30rem]",
        size === "lg" && "max-w-[40rem]",
        size === "xl" && "max-w-[60rem]",
        textAlign === "left" && "text-left",
        textAlign === "center" && "text-center",
        textAlign === "right" && "text-right"
      )}
    >
      {props.caption && <p className="text-primary-600">{props.caption}</p>}
      <p
        className="primary-strong whitespace-pre-line text-4xl leading-snug"
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
