import type { NodeDefinition } from "tanuki-ui/extended/node-editor";
import { RandomGeneratorRenderer, ConditionRenderer, StringSourceRenderer, ChartDisplayRenderer } from "./renderers";
import { RandomGeneratorInspector, ConditionInspector, StringSourceInspector, ChartDisplayInspector } from "./inspectors";
import { DisplayNodeRenderer } from "../mathFlow/renderers";
import { DisplayNodeInspector } from "../mathFlow/inspectors";

export const complexFlowNodeDefinitions: NodeDefinition[] = [
  {
    type: "random-generator",
    displayName: "Random Generator",
    category: "Input",
    visualState: "info",
    ports: [
      { id: "output", type: "output", label: "Output", position: "right" },
    ],
    renderNode: RandomGeneratorRenderer,
    renderInspector: RandomGeneratorInspector,
  },
  {
    type: "condition",
    displayName: "Condition",
    category: "Logic",
    visualState: "warning",
    ports: [
      { id: "a", type: "input", label: "A", position: "left" },
      { id: "b", type: "input", label: "B", position: "left" },
      { id: "true", type: "output", label: "True", position: "right" },
      { id: "false", type: "output", label: "False", position: "right" },
    ],
    renderNode: ConditionRenderer,
    renderInspector: ConditionInspector,
  },
  {
    type: "string-source",
    displayName: "String Source",
    category: "Input",
    visualState: "info",
    ports: [
      { id: "output", type: "output", label: "Output", position: "right" },
    ],
    renderNode: StringSourceRenderer,
    renderInspector: StringSourceInspector,
  },
  {
    type: "text-display",
    displayName: "Text Display",
    category: "Output",
    visualState: "success",
    ports: [
      { id: "input", type: "input", label: "Input", position: "left" },
    ],
    renderNode: DisplayNodeRenderer,
    renderInspector: DisplayNodeInspector,
  },
  {
    type: "chart-display",
    displayName: "Chart Display",
    category: "Output",
    visualState: "success",
    ports: [
      { id: "value", type: "input", label: "Value", position: "left" },
    ],
    renderNode: ChartDisplayRenderer,
    renderInspector: ChartDisplayInspector,
  },
];