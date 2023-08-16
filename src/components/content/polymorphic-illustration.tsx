import {
  HappySlothIllustration,
  SittingSlothIllustration,
  WavingSlothIllustration,
} from "../activities-illustrations";

export interface PolymorphicIllustrationOptions {
  kind: "sitting-sloth" | "waving-sloth" | "happy-sloth";
  className?: string;
}

export function PolymorphicIllustration(props: PolymorphicIllustrationOptions) {
  if (props.kind === "sitting-sloth") return <SittingSlothIllustration />;
  if (props.kind === "waving-sloth") return <WavingSlothIllustration />;
  if (props.kind === "happy-sloth") return <HappySlothIllustration />;

  return null;
}
