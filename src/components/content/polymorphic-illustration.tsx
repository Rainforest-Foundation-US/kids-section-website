import { SittingSlothIllustration } from "../activities-illustrations";

export interface PolymorphicIllustrationOptions {
  kind: "sitting-sloth";
  className?: string;
}

export function PolymorphicIllustration(props: PolymorphicIllustrationOptions) {
  if (props.kind === "sitting-sloth") return <SittingSlothIllustration />;

  return null;
}
