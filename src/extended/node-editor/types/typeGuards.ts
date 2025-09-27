import type { NodeDefinition } from "./NodeDefinition";
import type { BuiltinNodeDataMap } from "./builtin";
import type { LabelNodeData } from "./nodes/label";

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
export function isDefinitionForCombinedMap<TUserMap>(
  def: NodeDefinition<string, any>
): def is NodeDefinition<string, TUserMap & BuiltinNodeDataMap> {
  if (def.type === "label") {
    // For the label node, ensure defaultData matches LabelNodeData shape
    return isLabelNodeData((def as any).defaultData);
  }
  // Other built-ins or user types are allowed (defaultData treated as Record<string, unknown>)
  return true;
}

