import type { NodeDefinition } from "tanuki-ui/extended/node-editor";

export const simpleNodeDefinitions: NodeDefinition[] = [
  {
    type: "standard",
    displayName: "Standard Node",
    category: "Basic",
    visualState: "info",
    ports: [
      {
        type: "input",
        label: "Input",
        position: "left",
        id: "std-input",
      },
      { type: "output", label: "Output", position: "right", id: "std-output" },
    ],
  },
];
