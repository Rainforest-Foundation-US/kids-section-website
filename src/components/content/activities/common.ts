import { ActivityHintStatus } from "@/components/activity-hint";

export interface CommonActivity {
  onHint: (hint: string | null, status: ActivityHintStatus) => void;
}
