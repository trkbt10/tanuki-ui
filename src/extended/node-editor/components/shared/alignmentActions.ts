import type { ComponentType } from "react";
import {
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignTopIcon,
  AlignMiddleIcon,
  AlignBottomIcon,
  DistributeHorizontalIcon,
  DistributeVerticalIcon,
} from "../elements/icons";

export type AlignmentActionType =
  | "align-left"
  | "align-center-horizontal"
  | "align-right"
  | "align-top"
  | "align-center-vertical"
  | "align-bottom"
  | "distribute-horizontal"
  | "distribute-vertical";

export type AlignmentActionGroup = "horizontal" | "vertical";

export interface AlignmentActionConfig {
  type: AlignmentActionType;
  icon: ComponentType<{ size?: number }>;
  title: string;
  group: AlignmentActionGroup;
}

export const ALIGNMENT_GROUPS: AlignmentActionGroup[] = ["horizontal", "vertical"];

export const ALIGNMENT_ACTIONS: AlignmentActionConfig[] = [
  { type: "align-left", icon: AlignLeftIcon, title: "Align Left", group: "horizontal" },
  { type: "align-center-horizontal", icon: AlignCenterIcon, title: "Align Center Horizontal", group: "horizontal" },
  { type: "align-right", icon: AlignRightIcon, title: "Align Right", group: "horizontal" },
  { type: "distribute-horizontal", icon: DistributeHorizontalIcon, title: "Distribute Horizontally", group: "horizontal" },
  { type: "align-top", icon: AlignTopIcon, title: "Align Top", group: "vertical" },
  { type: "align-center-vertical", icon: AlignMiddleIcon, title: "Align Center Vertical", group: "vertical" },
  { type: "align-bottom", icon: AlignBottomIcon, title: "Align Bottom", group: "vertical" },
  { type: "distribute-vertical", icon: DistributeVerticalIcon, title: "Distribute Vertically", group: "vertical" },
];
