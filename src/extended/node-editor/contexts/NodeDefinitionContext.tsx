import * as React from "react";
import {
  NodeDefinition,
  NodeDefinitionRegistry,
  createNodeDefinitionRegistry,
  StandardNodeDefinition,
  GroupNodeDefinition,
} from "../types/NodeDefinition";

/**
 * Context value for node definitions
 */
export interface NodeDefinitionContextValue {
  registry: NodeDefinitionRegistry;
}

/**
 * Node definition context
 */
export const NodeDefinitionContext = React.createContext<NodeDefinitionContextValue | null>(null);

/**
 * Node definition provider props
 */
export interface NodeDefinitionProviderProps {
  children: React.ReactNode;
  /** Custom node definitions to register */
  nodeDefinitions?: NodeDefinition[];
  /** Whether to include default definitions */
  includeDefaults?: boolean;
}

/**
 * Node definition provider
 */
export const NodeDefinitionProvider: React.FC<NodeDefinitionProviderProps> = ({
  children,
  nodeDefinitions = [],
  includeDefaults = true,
}) => {
  const registry = React.useMemo(() => {
    const reg = createNodeDefinitionRegistry();

    // Register default definitions if requested
    if (includeDefaults) {
      reg.register(StandardNodeDefinition);
      reg.register(GroupNodeDefinition);
    }

    // Register custom definitions
    nodeDefinitions.forEach((def) => reg.register(def));

    return reg;
  }, [nodeDefinitions, includeDefaults]);

  const contextValue: NodeDefinitionContextValue = {
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
 */
export const useNodeDefinitions = (): NodeDefinitionContextValue => {
  const context = React.useContext(NodeDefinitionContext);
  if (!context) {
    throw new Error("useNodeDefinitions must be used within a NodeDefinitionProvider");
  }
  return context;
};

/**
 * Hook to get a specific node definition
 */
export const useNodeDefinition = (type: string): NodeDefinition | undefined => {
  const { registry } = useNodeDefinitions();
  return registry.get(type);
};

/**
 * Hook to get all node definitions as an array
 */
export const useNodeDefinitionList = (): NodeDefinition[] => {
  const { registry } = useNodeDefinitions();
  return registry.getAll();
};