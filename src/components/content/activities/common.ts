import { HintData } from "@/components/controlled-activity-hint";
import { SectionNames } from "../content";

export interface CommonActivityOptions {
  name: SectionNames;
  onHint: (hintData: HintData) => void;
}
