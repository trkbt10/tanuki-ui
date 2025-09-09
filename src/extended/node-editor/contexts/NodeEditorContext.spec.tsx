import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import {
  NodeEditorProvider,
  useNodeEditor,
  nodeEditorActions,
  nodeEditorReducer,
  type NodeEditorData,
} from "./node-editor";

const makeBasicData = (): NodeEditorData => ({
  nodes: {
    n1: {
      id: "n1",
      type: "standard",
      position: { x: 0, y: 0 },
      data: { title: "Node 1", content: "c1" },
    },
  },
  connections: {},
});

const UncontrolledHarness: React.FC<{ initial?: Partial<NodeEditorData> }> = ({ initial }) => {
  const { state, dispatch, actions } = useNodeEditor();

  React.useEffect(() => {
    // simple update to verify state mutation in uncontrolled mode
    dispatch(
      actions.updateNode("n1", {
        position: { x: 10, y: 20 },
      })
    );
  }, [dispatch, actions]);

  return (
    <div>
      <div data-testid="pos-x">{state.nodes.n1?.position.x}</div>
      <div data-testid="pos-y">{state.nodes.n1?.position.y}</div>
    </div>
  );
};

const ControlledHarness: React.FC<{
  data: NodeEditorData;
  onChange: (d: NodeEditorData) => void;
}> = ({ data, onChange }) => {
  const { dispatch, actions, state } = useNodeEditor();

  React.useEffect(() => {
    // Dispatch should not mutate context state directly in controlled mode,
    // but should call onDataChange with the new state
    dispatch(
      actions.updateNode("n1", {
        position: { x: 99, y: 77 },
      })
    );
  }, [dispatch, actions]);

  return (
    <div>
      <div data-testid="pos-x">{state.nodes.n1?.position.x}</div>
      <div data-testid="pos-y">{state.nodes.n1?.position.y}</div>
    </div>
  );
};

describe("NodeEditorContext reducer - updates", () => {
  it("UPDATE_NODE merges shallowly and preserves other fields", () => {
    const initial = makeBasicData();

    const next = nodeEditorReducer(initial, nodeEditorActions.updateNode("n1", { position: { x: 5, y: 6 } }));

    expect(next.nodes.n1.position).toEqual({ x: 5, y: 6 });
    // unchanged fields remain
    expect(next.nodes.n1.data).toEqual(initial.nodes.n1.data);

    // data replacement behaves as shallow merge
    const next2 = nodeEditorReducer(
      next,
      nodeEditorActions.updateNode("n1", { data: { title: "Changed" } })
    );

    // since reducer shallow merges, provided data replaces previous data entirely
    expect(next2.nodes.n1.data).toEqual({ title: "Changed" });
  });

  it("MOVE_NODES updates multiple positions", () => {
    const initial: NodeEditorData = {
      nodes: {
        a: { id: "a", type: "standard", position: { x: 0, y: 0 }, data: {} },
        b: { id: "b", type: "standard", position: { x: 1, y: 2 }, data: {} },
      },
      connections: {},
    };

    const updated = nodeEditorReducer(
      initial,
      nodeEditorActions.moveNodes({ a: { x: 10, y: 11 }, b: { x: 20, y: 21 } })
    );

    expect(updated.nodes.a.position).toEqual({ x: 10, y: 11 });
    expect(updated.nodes.b.position).toEqual({ x: 20, y: 21 });
  });

  it("DELETE_NODE removes related connections", () => {
    const initial: NodeEditorData = {
      nodes: {
        a: { id: "a", type: "standard", position: { x: 0, y: 0 }, data: {} },
        b: { id: "b", type: "standard", position: { x: 0, y: 0 }, data: {} },
      },
      connections: {
        c1: { id: "c1", fromNodeId: "a", fromPortId: "o", toNodeId: "b", toPortId: "i" },
        c2: { id: "c2", fromNodeId: "b", fromPortId: "o", toNodeId: "a", toPortId: "i" },
      },
    };

    const updated = nodeEditorReducer(initial, nodeEditorActions.deleteNode("a"));
    expect(updated.nodes.a).toBeUndefined();
    // All connections touching node a should be removed
    expect(updated.connections.c1).toBeUndefined();
    expect(updated.connections.c2).toBeUndefined();
  });

  it("ADD_CONNECTION enforces single connection per input port (last wins)", () => {
    const initial: NodeEditorData = {
      nodes: {
        a: { id: "a", type: "t", position: { x: 0, y: 0 }, data: {} },
        b: { id: "b", type: "t", position: { x: 0, y: 0 }, data: {} },
        c: { id: "c", type: "t", position: { x: 0, y: 0 }, data: {} },
      },
      connections: {},
    };

    const s1 = nodeEditorReducer(initial, nodeEditorActions.addConnection({ fromNodeId: "a", fromPortId: "out", toNodeId: "c", toPortId: "in" }));
    const s2 = nodeEditorReducer(s1, nodeEditorActions.addConnection({ fromNodeId: "b", fromPortId: "out", toNodeId: "c", toPortId: "in" }));

    // Only one connection should remain to (c:in), and it should be from b
    const conns = Object.values(s2.connections);
    expect(conns.length).toBe(1);
    expect(conns[0]).toEqual(expect.objectContaining({ fromNodeId: "b", toNodeId: "c", toPortId: "in" }));
  });

  it("DUPLICATE_NODES creates offset copy with 'Copy' title and tracks lastDuplicatedNodeIds", () => {
    const initial: NodeEditorData = {
      nodes: {
        n1: { id: "n1", type: "t", position: { x: 10, y: 20 }, data: { title: "Original" } },
      },
      connections: {},
    };

    const next = nodeEditorReducer(initial, nodeEditorActions.duplicateNodes(["n1"]));

    const added = Object.values(next.nodes).filter((n) => n.id !== "n1");
    expect(added.length).toBe(1);
    const dup = added[0];
    expect(dup.position).toEqual({ x: 60, y: 70 });
    expect(String(dup.data.title)).toMatch(/Copy$/);
    expect(next.lastDuplicatedNodeIds).toBeTruthy();
    expect(next.lastDuplicatedNodeIds?.length).toBe(1);
    expect(next.lastDuplicatedNodeIds?.[0]).toBe(dup.id);
  });

  it("GROUP_NODES adds a group node bounding children and listing them", () => {
    const initial: NodeEditorData = {
      nodes: {
        a: { id: "a", type: "t", position: { x: 100, y: 100 }, size: { width: 100, height: 50 }, data: {} },
        b: { id: "b", type: "t", position: { x: 250, y: 180 }, size: { width: 120, height: 60 }, data: {} },
      },
      connections: {},
    };

    const next = nodeEditorReducer(initial, nodeEditorActions.groupNodes(["a", "b"]));

    const groups = Object.values(next.nodes).filter((n) => n.type === "group");
    expect(groups.length).toBe(1);
    const g = groups[0];
    expect(g.children).toEqual(["a", "b"]);
    // basic bounding sanity
    expect(g.size?.width).toBeGreaterThan(0);
    expect(g.size?.height).toBeGreaterThan(0);
  });
});

describe("NodeEditorProvider - uncontrolled vs controlled updates", () => {
  it("uncontrolled: dispatch mutates internal state", async () => {
    await act(async () => {
      render(
        <NodeEditorProvider initialState={makeBasicData()}>
          <UncontrolledHarness />
        </NodeEditorProvider>
      );
    });

    expect(screen.getByTestId("pos-x").textContent).toBe("10");
    expect(screen.getByTestId("pos-y").textContent).toBe("20");
  });

  it("controlled: dispatch calls onDataChange with new state and does not mutate context state directly", async () => {
    const onChange = vi.fn();
    const data = makeBasicData();

    await act(async () => {
      render(
        <NodeEditorProvider controlledData={data} onDataChange={onChange}>
          <ControlledHarness data={data} onChange={onChange} />
        </NodeEditorProvider>
      );
    });

    // Context state should still reflect controlledData values (0,0) until parent feeds new data
    expect(screen.getByTestId("pos-x").textContent).toBe("0");
    expect(screen.getByTestId("pos-y").textContent).toBe("0");

    // But onDataChange should have been called with updated positions (99,77)
    expect(onChange).toHaveBeenCalled();
    const lastCallArg = onChange.mock.calls.at(-1)?.[0] as NodeEditorData;
    expect(lastCallArg.nodes.n1.position).toEqual({ x: 99, y: 77 });
  });
});

describe("onDataChange loop prevention", () => {
  it("uncontrolled: parent setState in onDataChange does not cause infinite loops", async () => {
    const initial = makeBasicData();

    const Parent: React.FC = () => {
      const [mirror, setMirror] = React.useState<NodeEditorData | null>(null);
      const callsRef = React.useRef(0);

      return (
        <NodeEditorProvider initialState={initial} onDataChange={(d) => { callsRef.current += 1; setMirror(d); }}>
          <UncontrolledHarness />
          <div data-testid="calls">{String(callsRef.current)}</div>
          <div data-testid="mirror-null">{String(mirror === null)}</div>
        </NodeEditorProvider>
      );
    };

    await act(async () => {
      render(<Parent />);
    });

    // Expect onDataChange to have been called for initial notify + one dispatch from harness
    const calls = Number(screen.getByTestId("calls").textContent);
    expect(calls).toBeGreaterThanOrEqual(1);
    expect(calls).toBeLessThan(5); // sanity upper bound (no runaway loop)

    // Ensure mirror state was set at least once (parent rerender happened)
    expect(screen.getByTestId("mirror-null").textContent).toBe("false");
  });

  it("controlled: onDataChange updates parent and does not re-trigger without new dispatch", async () => {
    const initial = makeBasicData();

    const Parent: React.FC = () => {
      const [data, setData] = React.useState<NodeEditorData>(initial);
      const callsRef = React.useRef(0);

      return (
        <NodeEditorProvider controlledData={data} onDataChange={(d) => { callsRef.current += 1; setData(d); }}>
          <ControlledHarness data={data} onChange={setData} />
          <div data-testid="calls">{String(callsRef.current)}</div>
        </NodeEditorProvider>
      );
    };

    await act(async () => {
      render(<Parent />);
    });

    // One dispatch in ControlledHarness should yield exactly one onDataChange call
    const calls = Number(screen.getByTestId("calls").textContent);
    expect(calls).toBe(1);
  });
});
