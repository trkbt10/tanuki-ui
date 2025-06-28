import * as React from "react";
import type { NodeDefinition } from "@/extended/node-editor/types/NodeDefinition";

export const createMathNodeDefinitions = (): NodeDefinition[] => [
  {
    type: "math-add",
    displayName: "Add",
    description: "Adds two numbers together",
    category: "Math",
    icon: "➕",
    defaultSize: { width: 150, height: 80 },
    defaultData: { title: "Add", result: 0 },
    ports: [
      { id: "a", type: "input", label: "A", position: "left", dataType: "number" },
      { id: "b", type: "input", label: "B", position: "left", dataType: "number" },
      { id: "result", type: "output", label: "Result", position: "right", dataType: "number" },
    ],
  },
  {
    type: "math-multiply",
    displayName: "Multiply",
    description: "Multiplies two numbers",
    category: "Math",
    icon: "✖️",
    defaultSize: { width: 150, height: 80 },
    defaultData: { title: "Multiply", result: 0 },
    ports: [
      { id: "a", type: "input", label: "A", position: "left", dataType: "number" },
      { id: "b", type: "input", label: "B", position: "left", dataType: "number" },
      { id: "result", type: "output", label: "Result", position: "right", dataType: "number" },
    ],
  },
];