import clsx from "@/utils/clsx";

interface SectionContentProps {
  children?: React.ReactNode;
  className?: string;
}
export function SectionContent(props: SectionContentProps) {
  return (
    <div
      className={clsx(
        "z-10 flex flex-1 flex-col items-center justify-center space-y-4 px-6 py-16",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
