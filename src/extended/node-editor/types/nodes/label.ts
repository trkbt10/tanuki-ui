import type { NodeData } from "../core";

export interface LabelNodeData extends NodeData {
  title?: string;
  subtitle?: string;
  caption?: string;
}

export type LabelNodeDataMap = {
  label: LabelNodeData;
};
