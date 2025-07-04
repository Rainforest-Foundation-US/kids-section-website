import { RoundSlothIllustration } from "@/components/illustrations/activities-illustrations";
import clsx from "@/utils/clsx";
import { useAtomValue } from "jotai";
import { hintAtom } from "@/components/controlled-activity-hint";
import { ActivityHintStatus } from "@/components/activity-hint";
import { SectionName } from "@/hooks/useGetDiscoverTheAmazonContent";

type HintContentData = { text?: string };

export function HintContent({
  name,
  hintContent,
}: {
  name?: SectionName;
  hintContent: HintContentData;
}) {
  const hintAtomValue = useAtomValue(hintAtom);

  return (
    <div className="z-20 mb-2 flex items-center gap-2 pl-3 lg:absolute lg:left-[5%] lg:top-12 lg:flex-col">
      <RoundSlothIllustration className="z-20" />
      {hintContent.text && name && (
        <p
          className={clsx(
            "text-white text-md z-20 mt-2 max-h-fit text-wrap rounded-3xl border-4 border-neutral-100 bg-primary-900 p-1 text-center font-medium leading-8 text-neutral-100 lg:max-h-full lg:max-w-[11.5rem] lg:border-8 lg:p-4 lg:text-xl",
            hintAtomValue[name]?.status === ActivityHintStatus.INCORRECT &&
              "bg-error-700",
          )}
        >
          {hintAtomValue[name]?.hint
            ? hintAtomValue[name].hint
            : hintContent.text}
        </p>
      )}
    </div>
  );
}
