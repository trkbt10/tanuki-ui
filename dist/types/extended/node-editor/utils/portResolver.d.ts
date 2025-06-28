import { Node, Port, NodeId } from '../types/core';
import { NodeDefinition } from '../types/NodeDefinition';
/**
 * Port override configuration for node-specific customizations
 */
export interface PortOverride {
    /** References port from definition */
    portId: string;
    /** Override max connections */
    maxConnections?: number;
    /** Override allowed node types */
    allowedNodeTypes?: string[];
    /** Override allowed port types */
    allowedPortTypes?: string[];
    /** Disable this port */
    disabled?: boolean;
}
/**
 * Extended Node interface with port overrides
 */
export interface NodeWithPortOverrides extends Omit<Node, "ports"> {
    /** Optional port-specific overrides */
    portOverrides?: PortOverride[];
}
/**
 * Port resolver interface
 */
export interface PortResolver {
    /** Get all ports for a node */
    getNodePorts(node: Node, definition: NodeDefinition): Port[];
    /** Get a specific port for a node */
    getPort(node: Node, portId: string, definition: NodeDefinition): Port | undefined;
    /** Create a lookup map for all ports */
    createPortLookupMap(nodes: Record<NodeId, Node>, getDefinition: (type: string) => NodeDefinition | undefined): Map<string, {
        node: Node;
        port: Port;
    }>;
}
/**
 * Resolve ports from node definition, applying any node-specific overrides
 */
export declare function getNodePorts(node: Node, definition: NodeDefinition): Port[];
/**
 * Get a specific port for a node
 */
export declare function getPort(node: Node, portId: string, definition: NodeDefinition): Port | undefined;
/**
 * Create a lookup map for quick port access
 * Key format: "nodeId:portId"
 */
export declare function createPortLookupMap(nodes: Record<NodeId, Node>, getDefinition: (type: string) => NodeDefinition | undefined): Map<string, {
    node: Node;
    port: Port;
}>;
/**
 * Create port resolver with caching
 */
export declare function createCachedPortResolver(): PortResolver & {
    clearCache: () => void;
    clearNodeCache: (nodeId: NodeId) => void;
};
/**
 * Default port resolver instance
 */
export declare const defaultPortResolver: PortResolver;
