import { Port, NodeId, Node, Connection, PortId } from '../types/core';
import { NodeDefinition, NodeDefinitionRegistry } from '../types/NodeDefinition';
/**
 * Calculate which ports can be connected to from a given source port
 */
export declare const calculateConnectablePorts: (fromPort: Port, allNodes: Record<NodeId, Node>, nodeDefinitions: NodeDefinitionRegistry, connections: Record<string, Connection>) => Set<PortId>;
/**
 * Check if two ports can be connected
 */
export declare const canConnectPorts: (fromPort: Port, toPort: Port, fromNodeDef?: NodeDefinition, toNodeDef?: NodeDefinition, connections?: Record<string, Connection>) => boolean;
/**
 * Get port definition from node definition
 */
export declare const getPortDefinition: (port: Port, nodeDefinition?: NodeDefinition) => import('../types/NodeDefinition').PortDefinition | undefined;
