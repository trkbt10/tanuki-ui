import * as React from "react";
import {
  NodeDefinition,
  NodeDefinitionRegistry,
  createNodeDefinitionRegistry,
  StandardNodeDefinition,
  GroupNodeDefinition,
  LabelNodeDefinition,
} from "../types/NodeDefinition";

/**
 * Context value for node definitions
 * @template TNodeDataTypeMap - The node data type map
 */
export interface NodeDefinitionContextValue<TNodeDataTypeMap = {}> {
  registry: NodeDefinitionRegistry<TNodeDataTypeMap>;
}

/**
 * Node definition context
 */
export const NodeDefinitionContext = React.createContext<NodeDefinitionContextValue<any> | null>(null);

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
    const reg = createNodeDefinitionRegistry<TNodeDataTypeMap>();

    // Register default definitions if requested
    if (includeDefaults) {
      reg.register(StandardNodeDefinition as any);
      reg.register(GroupNodeDefinition as any);
      reg.register(LabelNodeDefinition as any);
    }

    // Register custom definitions
    nodeDefinitions.forEach((def) => reg.register(def));

    return reg;
  }, [nodeDefinitions, includeDefaults]);

  const contextValue: NodeDefinitionContextValue<TNodeDataTypeMap> = {
    registry,
  };

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
export const useNodeDefinitions = <TNodeDataTypeMap = {}>(): NodeDefinitionContextValue<TNodeDataTypeMap> => {
  const context = React.useContext(NodeDefinitionContext);
  if (!context) {
    throw new Error("useNodeDefinitions must be used within a NodeDefinitionProvider");
  }
  return context as NodeDefinitionContextValue<TNodeDataTypeMap>;
};

/**
 * Hook to get a specific node definition
 * @template TNodeDataTypeMap - The node data type map
 */
export const useNodeDefinition = <TNodeDataTypeMap = {}>(type: string): NodeDefinition<string, TNodeDataTypeMap> | undefined => {
  const { registry } = useNodeDefinitions<TNodeDataTypeMap>();
  return registry.get(type);
};

/**
 * Hook to get all node definitions as an array
 * @template TNodeDataTypeMap - The node data type map
 */
export const useNodeDefinitionList = <TNodeDataTypeMap = {}>(): NodeDefinition<string, TNodeDataTypeMap>[] => {
  const { registry } = useNodeDefinitions<TNodeDataTypeMap>();
  return registry.getAll();
};
