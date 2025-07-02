import {
  HappySlothIllustration,
  SadSlothIllustration,
  SittingSlothIllustration,
  WavingSlothIllustration,
} from "../illustrations/activities-illustrations";

export interface PolymorphicIllustrationOptions {
  kind: "sitting-sloth" | "waving-sloth" | "happy-sloth" | "sad-sloth";
  className?: string;
}

export function PolymorphicIllustration(props: PolymorphicIllustrationOptions) {
  if (props.kind === "sitting-sloth")
    return <SittingSlothIllustration className={props.className} />;
  if (props.kind === "waving-sloth")
    return <WavingSlothIllustration className={props.className} />;
  if (props.kind === "happy-sloth")
    return <HappySlothIllustration className={props.className} />;
  if (props.kind === "sad-sloth")
    return <SadSlothIllustration className={props.className} />;

  return null;
}
