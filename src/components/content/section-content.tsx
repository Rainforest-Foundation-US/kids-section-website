interface SectionContentProps {
  children?: React.ReactNode;
}
export function SectionContent(props: SectionContentProps) {
  return (
    <div className="z-10 flex flex-1 flex-col items-center justify-center px-6 py-16">
      {props.children}
    </div>
  );
}
