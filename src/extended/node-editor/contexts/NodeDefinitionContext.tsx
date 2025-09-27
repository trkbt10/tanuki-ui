import * as React from "react";
import {
  NodeDefinition,
  NodeDefinitionRegistry,
  createNodeDefinitionRegistry,
  GroupNodeDefinition,
  LabelNodeDefinition,
  type NodeDataTypeMap,
} from "../types/NodeDefinition";
import { toUntypedDefinition } from "../types/NodeDefinition";
import { isDefinitionForCombinedMap } from "../types/typeGuards";

/**
 * Context value for node definitions
 * @template TNodeDataTypeMap - The node data type map
 */
export interface NodeDefinitionContextValue { registry: NodeDefinitionRegistry<NodeDataTypeMap>; }

/**
 * Node definition context
 */
export const NodeDefinitionContext = React.createContext<NodeDefinitionContextValue | null>(null);

/**
 * Node definition provider props
 */
export interface NodeDefinitionProviderProps<TNodeDataTypeMap = {}> {
  children: React.ReactNode;
  /** Custom node definitions to register */
  nodeDefinitions?: NodeDefinition<string, TNodeDataTypeMap>[];
  /** Whether to include default definitions */
  includeDefaults?: boolean;
}

/**
 * Node definition provider
 */
export const NodeDefinitionProvider = <TNodeDataTypeMap = {}>({
  children,
  nodeDefinitions = [],
  includeDefaults = true,
}: NodeDefinitionProviderProps<TNodeDataTypeMap>) => {
  const registry = React.useMemo(() => {
    const reg = createNodeDefinitionRegistry<NodeDataTypeMap>();

    // Register default definitions if requested
    if (includeDefaults) {
      if (isDefinitionForCombinedMap(GroupNodeDefinition)) reg.register(toUntypedDefinition(GroupNodeDefinition));
      if (isDefinitionForCombinedMap(LabelNodeDefinition)) reg.register(toUntypedDefinition(LabelNodeDefinition));
    }

    // Register custom definitions
    nodeDefinitions.forEach((def) => {
      if (isDefinitionForCombinedMap(def)) reg.register(toUntypedDefinition(def));
    });

    return reg;
  }, [nodeDefinitions, includeDefaults]);

  const contextValue: NodeDefinitionContextValue = { registry };

  return (
    <NodeDefinitionContext.Provider value={contextValue}>
      {children}
    </NodeDefinitionContext.Provider>
  );
};

/**
 * Hook to use node definitions
 * @template TNodeDataTypeMap - The node data type map
 */
export const useNodeDefinitions = <TNodeDataTypeMap = {}>(): NodeDefinitionContextValue => {
  const context = React.useContext(NodeDefinitionContext);
  if (!context) {
    throw new Error("useNodeDefinitions must be used within a NodeDefinitionProvider");
  }
  return context;
};

/**
 * Hook to get a specific node definition
 * @template TNodeDataTypeMap - The node data type map
 */
export const useNodeDefinition = <TNodeDataTypeMap = {}>(type: string): NodeDefinition<string, NodeDataTypeMap> | undefined => {
  const { registry } = useNodeDefinitions<TNodeDataTypeMap>();
  return registry.get(type);
};

/**
 * Hook to get all node definitions as an array
 * @template TNodeDataTypeMap - The node data type map
 */
export const useNodeDefinitionList = <TNodeDataTypeMap = {}>(): NodeDefinition<string, NodeDataTypeMap>[] => {
  const { registry } = useNodeDefinitions<TNodeDataTypeMap>();
  return registry.getAll();
};
