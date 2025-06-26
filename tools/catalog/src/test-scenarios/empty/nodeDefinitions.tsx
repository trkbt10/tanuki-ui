import type { NodeDefinition } from "tanuki-ui/extended/node-editor";

export const emptyNodeDefinitions: NodeDefinition[] = [
  {
    type: "standard",
    displayName: "Standard Node",
    category: "Basic",
    visualState: "info",
    ports: [
      { id: "input", type: "input", label: "Input", position: "left" },
      { id: "output", type: "output", label: "Output", position: "right" },
    ],
  },
];