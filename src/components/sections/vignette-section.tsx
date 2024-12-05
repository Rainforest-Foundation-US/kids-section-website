import Image, { StaticImageData } from "next/image";
import { ActivitySection } from "../sections";
import clsx from "@/utils/clsx";
import { SectionName } from "@/hooks/useGetAboutTheAmazonContent";
import { HintContent } from "../hint-content";

export interface VignetteSectionOptions {
  title: string;
  subtitle: string;
  image: {
    data: string | StaticImageData;
    alt: string;
  };
  body?: string;
  imageAlignment?: "start" | "middle" | "end";
}

interface VignetteSectionProps extends VignetteSectionOptions {
  name?: SectionName;
  defaultHintContent?: {
    hint: string;
  };
}
export function VignetteSection({
  imageAlignment = "middle",
  ...props
}: VignetteSectionProps) {
  console.log({ props });
  return (
    <>
      <div className="h-[120px] bg-neutral-dark-700" />

      <ActivitySection name={props.name} className="min-h-[720px]">
        {props.defaultHintContent && (
          <HintContent
            name={props.name}
            hintContent={{
              text: props.defaultHintContent.hint,
            }}
          />
        )}

        <Image
          className={clsx(
            "absolute inset-0 block h-full w-full bg-neutral-dark-800 object-cover",
            imageAlignment === "start" && "object-left-top",
            imageAlignment === "end" && "object-right-bottom",
          )}
          src={props.image.data}
          height={1280}
          width={720}
          alt={props.image.alt}
          aria-hidden
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
          <p className="break-all text-7xl font-medium text-neutral-100">
            {props.title}
          </p>

          <p className="my-2 text-base text-secondary-100">{props.subtitle}</p>

          {props.body && (
            <>
              <div className="my-2 h-1 w-8 bg-neutral-100" />
              <p className="my-2 max-w-xl text-base text-secondary-100">
                {props.body}
              </p>
            </>
          )}
        </div>
      </ActivitySection>
    </>
  );
}
