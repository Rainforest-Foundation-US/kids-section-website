import Image from "next/image";
import { ActivitySection, ActivitySectionDivider } from "../sections";
import { HomeGoToSectionButton } from "../buttons";
import clsx from "@/utils/clsx";

interface VignetteSectionProps {
  number: number;
  title: string;
  subtitle: string;
  body?: string;
  imageAlignment?: "start" | "middle" | "end";
  image: PropsOf<typeof Image>["src"];
}
export function VignetteSection({
  imageAlignment = "middle",
  ...props
}: VignetteSectionProps) {
  return (
    <>
      <div className="h-[120px] bg-neutral-dark-700" />

      <ActivitySection number={props.number} className="min-h-[720px]">
        <Image
          className={clsx(
            "absolute inset-0 block h-full w-full bg-neutral-dark-800 object-cover",
            imageAlignment === "start" && "object-left-top",
            imageAlignment === "end" && "object-right-bottom"
          )}
          src={props.image}
          height={1280}
          width={720}
          aria-hidden
          alt=""
        />

        <div
          style={{
            background:
              "linear-gradient(180deg, #1E1F1B 0%, rgba(30, 31, 27, 0) 100%)",
          }}
          className="absolute inset-x-0 top-0 h-[240px]"
        />

        <div
          style={{
            background:
              "linear-gradient(180deg, #1E1F1B 0%, rgba(30, 31, 27, 0) 100%)",
          }}
          className="absolute inset-x-0 bottom-0 h-[240px] rotate-180"
        />

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-10 text-center">
          <p className="break-all font-medium text-neutral-100 text-7xl">
            {props.title}
          </p>

          <p className="my-2 text-secondary-100 text-base">{props.subtitle}</p>

          {props.body && (
            <>
              <div className="my-2 h-1 w-8 bg-neutral-100" />
              <p className="my-2 max-w-xl text-secondary-100 text-base">
                {props.body}
              </p>
            </>
          )}

          <HomeGoToSectionButton className="mt-2" />
        </div>
      </ActivitySection>
    </>
  );
}
