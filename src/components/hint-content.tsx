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
    <div className="left-[5%] top-12 z-20 mb-2 flex gap-2 lg:absolute lg:flex-col">
      <RoundSlothIllustration />
      {hintContent.text && name && (
        <p
          className={clsx(
            "text-white text-md mt-2 text-wrap rounded-3xl border-8 border-neutral-100 bg-primary-900 p-4 text-center font-medium leading-8 text-neutral-100 lg:max-h-full lg:max-w-[11.5rem] lg:text-xl",
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
