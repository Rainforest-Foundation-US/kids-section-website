import { ActivityHintStatus } from "@/components/activity-hint";

export interface CommonActivityOptions {
  onHint: (hint: string | null, status: ActivityHintStatus) => void;
}
