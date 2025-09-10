import { describe, it, expect } from "vitest";
import { countNodesByType, canAddNodeType, getDisabledNodeTypes, filterDuplicableNodeIds } from "./nodeTypeLimits";

const makeState = (nodes: Array<{ id: string; type: string }>) => ({
  nodes: nodes.reduce((acc, n) => {
    acc[n.id] = { id: n.id, type: n.type, position: { x: 0, y: 0 }, data: {} } as any;
    return acc;
  }, {} as Record<string, any>),
  connections: {},
});

const defs = (
  limits: Record<string, number | undefined>
): Array<any> => Object.keys(limits).map((t) => ({ type: t, displayName: t, maxPerFlow: limits[t] }));

describe("nodeTypeLimits utils", () => {
  it("counts nodes by type", () => {
    const state = makeState([
      { id: "a", type: "T1" },
      { id: "b", type: "T1" },
      { id: "c", type: "T2" },
    ]);
    const m = countNodesByType(state as any);
    expect(m.get("T1")).toBe(2);
    expect(m.get("T2")).toBe(1);
  });

  it("canAddNodeType respects maxPerFlow", () => {
    const state = makeState([
      { id: "a", type: "T1" },
      { id: "b", type: "T1" },
    ]);
    const counts = countNodesByType(state as any);
    const d = defs({ T1: 2, T2: 1 });
    expect(canAddNodeType("T1", d as any, counts)).toBe(false);
    expect(canAddNodeType("T2", d as any, counts)).toBe(true);
  });

  it("getDisabledNodeTypes lists types at limit", () => {
    const state = makeState([
      { id: "a", type: "T1" },
      { id: "b", type: "T1" },
      { id: "c", type: "T2" },
    ]);
    const counts = countNodesByType(state as any);
    const d = defs({ T1: 2, T2: 2, T3: undefined });
    const disabled = getDisabledNodeTypes(d as any, counts);
    expect(disabled).toContain("T1");
    expect(disabled).not.toContain("T2");
    expect(disabled).not.toContain("T3");
  });

  it("filterDuplicableNodeIds caps by remaining capacity per type", () => {
    const state = makeState([
      { id: "a", type: "T1" },
      { id: "b", type: "T1" },
      { id: "c", type: "T2" },
    ]);
    const d = defs({ T1: 3, T2: 1 });
    // Request duplicate all three; Only one T1 remaining (max 3 with 2 existing), T2 is already at max (1), so 1 allowed total
    const selected = ["a", "b", "c"]; // types: T1,T1,T2
    const filtered = filterDuplicableNodeIds(selected, state as any, d as any);
    expect(filtered.length).toBe(1);
    // The allowed one must be T1 (since T2 has 0 remaining). Order preserved.
    const allowedId = filtered[0];
    expect(state.nodes[allowedId].type).toBe("T1");
  });
});

