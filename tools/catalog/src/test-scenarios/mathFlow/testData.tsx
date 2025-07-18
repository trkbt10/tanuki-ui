import type { NodeEditorData } from "tanuki-ui/extended/node-editor";

export const mathFlowTestData: NodeEditorData = {
  nodes: {
    input1: {
      id: "input1",
      type: "data-source",
      position: { x: 50, y: 100 },
      size: { width: 180, height: 100 },
      data: { title: "Input A", value: 10 },
    },
    input2: {
      id: "input2",
      type: "data-source",
      position: { x: 50, y: 250 },
      size: { width: 180, height: 100 },
      data: { title: "Input B", value: 5 },
    },
    add: {
      id: "add",
      type: "math-add",
      position: { x: 350, y: 175 },
      size: { width: 150, height: 80 },
      data: { title: "Add Operation", result: 0, operation: "add", precision: 2 },
    },
    multiply: {
      id: "multiply",
      type: "math-multiply",
      position: { x: 600, y: 100 },
      size: { width: 150, height: 80 },
      data: { title: "Multiply by 2", result: 0, operation: "multiply", precision: 2 },
    },
    multiplier: {
      id: "multiplier",
      type: "data-source",
      position: { x: 350, y: 50 },
      size: { width: 180, height: 100 },
      data: { title: "Multiplier", value: 2 },
    },
    converter: {
      id: "converter",
      type: "number-to-string",
      position: { x: 850, y: 175 },
      size: { width: 160, height: 80 },
      data: { title: "Num→Str" },
    },
    display: {
      id: "display",
      type: "text-display",
      position: { x: 1100, y: 175 },
      size: { width: 160, height: 90 },
      data: { title: "Final Result", text: "30" },
    },
    numberDisplay: {
      id: "numberDisplay",
      type: "number-display",
      position: { x: 600, y: 250 },
      size: { width: 160, height: 90 },
      data: { title: "Sum", value: 15 },
    },
  },
  connections: {
    conn1: {
      id: "conn1",
      fromNodeId: "input1",
      fromPortId: "output",
      toNodeId: "add",
      toPortId: "a",
    },
    conn2: {
      id: "conn2",
      fromNodeId: "input2",
      fromPortId: "output",
      toNodeId: "add",
      toPortId: "b",
    },
    conn3: {
      id: "conn3",
      fromNodeId: "add",
      fromPortId: "result",
      toNodeId: "multiply",
      toPortId: "a",
    },
    conn4: {
      id: "conn4",
      fromNodeId: "multiplier",
      fromPortId: "output",
      toNodeId: "multiply",
      toPortId: "b",
    },
    conn5: {
      id: "conn5",
      fromNodeId: "multiply",
      fromPortId: "result",
      toNodeId: "converter",
      toPortId: "input",
    },
    conn6: {
      id: "conn6",
      fromNodeId: "converter",
      fromPortId: "output",
      toNodeId: "display",
      toPortId: "input",
    },
    conn7: {
      id: "conn7",
      fromNodeId: "add",
      fromPortId: "result",
      toNodeId: "numberDisplay",
      toPortId: "input",
    },
  },
};