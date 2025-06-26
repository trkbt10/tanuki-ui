import type { NodeEditorData } from "tanuki-ui/extended/node-editor";

export const simpleTestData: NodeEditorData = {
  nodes: {
    node1: {
      id: "node1",
      type: "standard",
      position: { x: 100, y: 100 },
      size: { width: 150, height: 80 },
      data: { title: "Input Node" },
      ports: [
        { id: "output1", nodeId: "node1", type: "output", label: "Data Out", position: "right" },
        { id: "output2", nodeId: "node1", type: "output", label: "Signal", position: "right" },
      ],
    },
    node2: {
      id: "node2",
      type: "standard",
      position: { x: 400, y: 100 },
      size: { width: 150, height: 80 },
      data: { title: "Process Node" },
      ports: [
        { id: "input1", nodeId: "node2", type: "input", label: "Data In", position: "left" },
        { id: "output1", nodeId: "node2", type: "output", label: "Result", position: "right" },
      ],
    },
  },
  connections: {
    conn1: {
      id: "conn1",
      fromNodeId: "node1",
      fromPortId: "output1",
      toNodeId: "node2",
      toPortId: "input1",
    },
  },
};