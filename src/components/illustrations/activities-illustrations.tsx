import clsx from "@/utils/clsx";

interface WavySeparatorProps {
  direction: "up" | "down";
  color?: string;
  className?: string;
}
export function WavySeparator(props: WavySeparatorProps) {
  return (
    <svg
      className={clsx("h-28 w-full", props.className)}
      preserveAspectRatio="none"
      viewBox="0 0 1279 120"
    >
      {props.direction === "up" && (
        <path
          d="M1050.55 92.4612C966.359 71.3484 878.012 29.7919 792.81 12.7537C705.134 -4.82168 613.686 -3.79797 525.872 13.149C464.224 25.0382 404.367 44.6407 342.548 55.5772C227.676 75.6708 109.211 65.4739 0 26.0923L0 120H1279V95.4715C1206.73 118.905 1125.21 111.192 1050.55 92.4612Z"
          className={props.color ? "" : "fill-complementary-700"}
          fill={props.color}
        />
      )}

      {props.direction === "down" && (
        <path
          d="M228.629 27.5388C312.885 48.6516 401.301 90.2081 486.571 107.246C574.315 124.822 665.835 123.798 753.717 106.851C815.413 94.9618 875.317 75.3593 937.184 64.4228C1052.15 44.3292 1170.7 54.5261 1280 93.9077V0H-0.00012207V24.5285C72.3306 1.09466 153.909 8.80796 228.629 27.5388Z"
          className={props.color ? "" : "fill-complementary-700"}
          fill={props.color}
        />
      )}
    </svg>
  );
}

export * from "./LeavesAndBushes";
export * from "./USMapIllustration";
export * from "./SadSlothIllustration";
export * from "./HappySlothIllustration";
export * from "./RoundSlothIllustration";
export * from "./SittingSlothIllustration";
export * from "./RightLeavesWithParrotIllustration";
export * from "./WavingSlothIllustration";
export * from "./MonkeyInABushIllustration";
export * from "./HangingSlothOnTreeIllustration";
export * from "./FlamingoAndChameleonIllustration";
export * from "./FlamingoChameleonAndButterflyIIllustration";
export * from "./SlothInABushIllustration";
export * from "./LemurInABushIllustration";
export * from "./ChameleonInABushIllustration";
export * from "./ToucanWithDeadLeavesIllustration";
export * from "./LeftDeadLeavesIllustration";
export * from "./HangingSlothIllustration";
export * from "./BottomLeftBushIllustration";
export * from "./HelpSlothIllustration";
export * from "./RightParrotIllustration";
export * from "./RightParrotAndLemurIllustration";
export * from "./RightParrotLemurAndFrogIllustration";
