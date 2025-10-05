import type { NodeData } from "../core";

export interface LabelNodeData extends NodeData {
  title?: string;
  subtitle?: string;
  caption?: string;
  align?: 'left' | 'center' | 'right';
  wrap?: 'normal' | 'nowrap' | 'balance';
  ellipsis?: boolean;
  textColor?: string;
}

export type LabelNodeDataMap = {
  label: LabelNodeData;
};
