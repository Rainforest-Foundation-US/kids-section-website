import clsx from "clsx";

interface PolaroidProps {
  className?: string;
  src: string;
}
export function Polaroid(props: PolaroidProps) {
  return (
    <div
      className={clsx(
        props.className,
        "transition-all duration-75",
        "box-content min-w-[272px] border-1 border-neutral-600 bg-neutral-100 p-4 shadow-app-lg shadow-shadow-gray"
      )}
    >
      <div className="aspect-[13_/_10] w-full bg-secondary-300">
        {/** Insert image here */}
      </div>

      <p className="pt-4 text-center text-base">Fujifilm Instax Wide Format</p>
    </div>
  );
}
