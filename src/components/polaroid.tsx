import clsx from "clsx";
import Image from "next/image";

interface PolaroidProps {
  className?: string;
  src: PropsOf<typeof Image>["src"];
  caption?: string;
  verticalAlign?: "top" | "center" | "bottom";
}
export function Polaroid(props: PolaroidProps) {
  const caption = props.caption ?? "Fujifilm Instax Wide Format";

  const style = {
    "--el-align": props.verticalAlign ?? "center",
  } as React.CSSProperties;

  return (
    <div
      className={clsx(
        props.className,
        "transition-all duration-75",
        "box-content min-w-[272px] border-1 border-neutral-600 bg-neutral-100 p-4 shadow-app-lg shadow-shadow-gray"
      )}
    >
      <figure>
        <Image
          style={style}
          className="aspect-[13_/_10] w-full object-contain object-[var(--el-align)]"
          src={props.src}
          width={130}
          height={100}
          alt={caption}
        />

        <figcaption
          className="mt-4 text-center text-base max-lines-1"
          title={caption}
        >
          {caption}
        </figcaption>
      </figure>
    </div>
  );
}
