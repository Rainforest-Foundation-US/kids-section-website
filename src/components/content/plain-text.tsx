interface PlainTextContentProps {
  caption?: string;
  text: string;
  children?: React.ReactNode;
}
export function PlainTextContent(props: PlainTextContentProps) {
  return (
    <section className="max-w-[40rem] space-y-6">
      {props.caption && <p className="text-primary-600">{props.caption}</p>}
      <p className="leading-snug text-neutral-dark-700 text-4xl">
        {props.text}
      </p>

      {props.children}
    </section>
  );
}
