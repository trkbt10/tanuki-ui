import type { NodeDefinition } from "./NodeDefinition";

// Built-in node behaviors
export type NodeBehavior = "appearance" | "node" | "group";

/**
 * Resolve behaviors for a node definition.
 * Falls back to `supportsChildren` for backward compatibility.
 * @deprecated The `supportsChildren` fallback is deprecated and will be removed in a future version. Define `behaviors` explicitly.
 */
export function getBehaviors(def?: NodeDefinition | null): NodeBehavior[] {
  if (!def) return ["node"];
  const b = (def as any).behaviors as NodeBehavior[] | undefined;
  if (Array.isArray(b) && b.length > 0) return b;
  // Backward compatibility: infer group from supportsChildren (deprecated)
  const arr: NodeBehavior[] = ["node"];
  if (def.supportsChildren) arr.push("group");
  return arr;
}

export function hasGroupBehavior(def?: NodeDefinition | null): boolean {
  return getBehaviors(def).includes("group");
}

export function hasAppearanceBehavior(def?: NodeDefinition | null): boolean {
  return getBehaviors(def).includes("appearance");
}
