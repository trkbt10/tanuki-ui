import type { NodeDefinition } from "../../../src/extended/node-editor/types/NodeDefinition";
import { createMathNodeDefinitions } from "./mathNodes";
import { createDataNodeDefinitions } from "./dataNodes";
import { createGraphicsNodeDefinitions } from "./graphicsNodes";
import { createUIElementNodeDefinitions } from "./uiElementNodes";
import { createExternalDataNodeDefinitions } from "./externalDataNodes";
import { createDataProcessingNodeDefinitions } from "./dataProcessingNodes";
import { createProgressNodeDefinitions } from "./progressNodes";

export interface TestNodeFactories {
  getConnectedValue: (nodeId: string, portId: string) => any;
  updateNodeValue: (nodeId: string, value: any) => void;
}

export const createAllTestNodeDefinitions = (factories: TestNodeFactories): NodeDefinition[] => {
  const { getConnectedValue, updateNodeValue } = factories;

  return [
    ...createMathNodeDefinitions(),
    ...createDataNodeDefinitions(),
    ...createGraphicsNodeDefinitions(getConnectedValue, updateNodeValue),
    ...createUIElementNodeDefinitions(updateNodeValue),
    ...createExternalDataNodeDefinitions(updateNodeValue),
    ...createDataProcessingNodeDefinitions(getConnectedValue, updateNodeValue),
    ...createProgressNodeDefinitions(getConnectedValue),
  ];
};

export * from "./mathNodes";
export * from "./dataNodes";
export * from "./graphicsNodes";
export * from "./uiElementNodes";
export * from "./externalDataNodes";
export * from "./dataProcessingNodes";
export * from "./progressNodes";