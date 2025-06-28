import { NodeDefinition, NodeDefinitionRegistry } from '../types/NodeDefinition';
import * as React from "react";
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
export declare const NodeDefinitionContext: React.Context<NodeDefinitionContextValue<any> | null>;
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
export declare const NodeDefinitionProvider: <TNodeDataTypeMap = {}>({ children, nodeDefinitions, includeDefaults, }: NodeDefinitionProviderProps<TNodeDataTypeMap>) => React.JSX.Element;
/**
 * Hook to use node definitions
 * @template TNodeDataTypeMap - The node data type map
 */
export declare const useNodeDefinitions: <TNodeDataTypeMap = {}>() => NodeDefinitionContextValue<TNodeDataTypeMap>;
/**
 * Hook to get a specific node definition
 * @template TNodeDataTypeMap - The node data type map
 */
export declare const useNodeDefinition: <TNodeDataTypeMap = {}>(type: string) => NodeDefinition<string, TNodeDataTypeMap> | undefined;
/**
 * Hook to get all node definitions as an array
 * @template TNodeDataTypeMap - The node data type map
 */
export declare const useNodeDefinitionList: <TNodeDataTypeMap = {}>() => NodeDefinition<string, TNodeDataTypeMap>[];
