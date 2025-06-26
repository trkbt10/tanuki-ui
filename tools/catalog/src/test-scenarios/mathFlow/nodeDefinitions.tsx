import type { NodeDefinition } from "tanuki-ui/extended/node-editor";
import { MathNodeRenderer, DataSourceRenderer, DisplayNodeRenderer } from "./renderers";
import { DataSourceInspector, MathOperationInspector, DisplayNodeInspector } from "./inspectors";

export const mathFlowNodeDefinitions: NodeDefinition[] = [
  {
    type: "data-source",
    displayName: "Data Source",
    category: "Input",
    visualState: "success",
    ports: [
      { id: "output", type: "output", label: "Output", position: "right" },
    ],
    renderNode: DataSourceRenderer,
    renderInspector: DataSourceInspector,
  },
  {
    type: "math-add",
    displayName: "Add",
    category: "Math",
    visualState: "info",
    ports: [
      { id: "a", type: "input", label: "A", position: "left" },
      { id: "b", type: "input", label: "B", position: "left" },
      { id: "result", type: "output", label: "Result", position: "right" },
    ],
    renderNode: MathNodeRenderer,
    renderInspector: MathOperationInspector,
  },
  {
    type: "math-multiply",
    displayName: "Multiply",
    category: "Math",
    visualState: "info",
    ports: [
      { id: "a", type: "input", label: "A", position: "left" },
      { id: "b", type: "input", label: "B", position: "left" },
      { id: "result", type: "output", label: "Result", position: "right" },
    ],
    renderNode: MathNodeRenderer,
    renderInspector: MathOperationInspector,
  },
  {
    type: "number-to-string",
    displayName: "Number → String",
    category: "Converter",
    visualState: "info",
    ports: [
      { id: "input", type: "input", label: "Input", position: "left" },
      { id: "output", type: "output", label: "Output", position: "right" },
    ],
    renderNode: MathNodeRenderer,
    renderInspector: MathOperationInspector,
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
    type: "number-display",
    displayName: "Number Display",
    category: "Output",
    visualState: "success",
    ports: [
      { id: "input", type: "input", label: "Input", position: "left" },
    ],
    renderNode: DisplayNodeRenderer,
    renderInspector: DisplayNodeInspector,
  },
];