import type { NodeDefinition, NodeRenderProps, InspectorRenderProps, NodeDataTypeMap } from "./NodeDefinition";
import type { BuiltinNodeDataMap } from "./builtin";
import type { LabelNodeData, LabelNodeDataMap } from "./nodes/label";

function isStringOrUndefined(v: unknown): v is string | undefined {
  return typeof v === "string" || typeof v === "undefined";
}

export function isLabelNodeData(data: unknown): data is LabelNodeData {
  if (data == null || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return isStringOrUndefined(d.title) && isStringOrUndefined(d.subtitle) && isStringOrUndefined(d.caption);
}

/**
 * Runtime guard to validate that a NodeDefinition is compatible with the CombinedMap = (UserMap & BuiltinNodeDataMap).
 * It validates built-in types that have stricter data contracts (currently: "label").
 */
export function isDefinitionForCombinedMap(def: NodeDefinition<string, unknown>): boolean {
  if (def.type === "label") {
    return isLabelNodeData((def as any).defaultData);
  }
  return true;
}

// Type guard: render props is for label node with correct data shape
export function isLabelNodeRenderProps(
  props: NodeRenderProps<string, NodeDataTypeMap>
): props is NodeRenderProps<"label", LabelNodeDataMap> {
  return props.node.type === "label" && isLabelNodeData(props.node.data);
}

// Generic type-only guard based on node type (data shape is not validated)
export function createTypeGuard<T extends string>(type: T) {
  return (
    props: NodeRenderProps<string, NodeDataTypeMap>
  ): props is NodeRenderProps<T, NodeDataTypeMap> => props.node.type === type;
}

export function isLabelInspectorProps(
  props: InspectorRenderProps<string, NodeDataTypeMap>
): props is InspectorRenderProps<"label", LabelNodeDataMap> {
  return props.node.type === "label" && isLabelNodeData(props.node.data);
}

export function createInspectorTypeGuard<T extends string>(type: T) {
  return (
    props: InspectorRenderProps<string, NodeDataTypeMap>
  ): props is InspectorRenderProps<T, NodeDataTypeMap> => props.node.type === type;
}
