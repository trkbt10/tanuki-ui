import type { NodeEditorData } from "tanuki-ui/extended/node-editor";

export const complexFlowTestData: NodeEditorData = {
  nodes: {
    rand1: {
      id: "rand1",
      type: "random-generator",
      position: { x: 50, y: 100 },
      size: { width: 180, height: 100 },
      data: { title: "Random A", min: 1, max: 50, value: 25 },
    },
    rand2: {
      id: "rand2",
      type: "random-generator",
      position: { x: 50, y: 250 },
      size: { width: 180, height: 100 },
      data: { title: "Random B", min: 1, max: 50, value: 35 },
    },
    condition: {
      id: "condition",
      type: "condition",
      position: { x: 350, y: 175 },
      size: { width: 180, height: 120 },
      data: { title: "A > B?", condition: "greater" },
    },
    winner: {
      id: "winner",
      type: "string-source",
      position: { x: 600, y: 100 },
      size: { width: 180, height: 100 },
      data: { title: "Winner Text", value: "A Wins!" },
    },
    loser: {
      id: "loser",
      type: "string-source",
      position: { x: 600, y: 250 },
      size: { width: 180, height: 100 },
      data: { title: "Loser Text", value: "B Wins!" },
    },
    result: {
      id: "result",
      type: "text-display",
      position: { x: 850, y: 175 },
      size: { width: 160, height: 90 },
      data: { title: "Result", text: "Click to compare!" },
    },
    chart: {
      id: "chart",
      type: "chart-display",
      position: { x: 350, y: 350 },
      size: { width: 200, height: 120 },
      data: { title: "Comparison", data: [] },
    },
  },
  connections: {
    conn1: {
      id: "conn1",
      fromNodeId: "rand1",
      fromPortId: "output",
      toNodeId: "condition",
      toPortId: "a",
    },
    conn2: {
      id: "conn2",
      fromNodeId: "rand2",
      fromPortId: "output",
      toNodeId: "condition",
      toPortId: "b",
    },
    conn3: {
      id: "conn3",
      fromNodeId: "condition",
      fromPortId: "true",
      toNodeId: "result",
      toPortId: "input",
    },
    conn4: {
      id: "conn4",
      fromNodeId: "condition",
      fromPortId: "false",
      toNodeId: "result",
      toPortId: "input",
    },
    conn5: {
      id: "conn5",
      fromNodeId: "rand1",
      fromPortId: "output",
      toNodeId: "chart",
      toPortId: "value",
    },
  },
};