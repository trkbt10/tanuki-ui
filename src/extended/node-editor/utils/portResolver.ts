import type { Node, Port, PortId, NodeId } from "../types/core";
import type { NodeDefinition, PortDefinition } from "../types/NodeDefinition";

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
  createPortLookupMap(
    nodes: Record<NodeId, Node>,
    getDefinition: (type: string) => NodeDefinition | undefined
  ): Map<string, { node: Node; port: Port }>;
}

/**
 * Resolve ports from node definition, applying any node-specific overrides
 */
export function getNodePorts(node: Node, definition: NodeDefinition): Port[] {
  // If node has ports array (legacy), return it for backward compatibility
  if (node.ports) {
    return node.ports;
  }

  const basePorts = definition.ports || [];
  const nodeWithOverrides = node as NodeWithPortOverrides;

  return basePorts.map((portDef) => {
    const port: Port = {
      id: portDef.id,
      type: portDef.type,
      label: portDef.label,
      nodeId: node.id,
      position: portDef.position,
      dataType: portDef.dataType,
      maxConnections: portDef.maxConnections,
    };

    // Apply any node-specific overrides
    const override = nodeWithOverrides.portOverrides?.find(
      (o) => o.portId === portDef.id
    );

    if (override) {
      // Skip disabled ports
      if (override.disabled) {
        return null;
      }

      if (override.maxConnections !== undefined) {
        port.maxConnections = override.maxConnections;
      }
      if (override.allowedNodeTypes) {
        port.allowedNodeTypes = override.allowedNodeTypes;
      }
      if (override.allowedPortTypes) {
        port.allowedPortTypes = override.allowedPortTypes;
      }
    }

    return port;
  }).filter((port): port is Port => port !== null);
}

/**
 * Get a specific port for a node
 */
export function getPort(
  node: Node,
  portId: string,
  definition: NodeDefinition
): Port | undefined {
  const ports = getNodePorts(node, definition);
  return ports.find((p) => p.id === portId);
}

/**
 * Create a lookup map for quick port access
 * Key format: "nodeId:portId"
 */
export function createPortLookupMap(
  nodes: Record<NodeId, Node>,
  getDefinition: (type: string) => NodeDefinition | undefined
): Map<string, { node: Node; port: Port }> {
  const map = new Map<string, { node: Node; port: Port }>();

  for (const node of Object.values(nodes)) {
    const definition = getDefinition(node.type);
    if (!definition) continue;

    const ports = getNodePorts(node, definition);
    for (const port of ports) {
      const key = `${node.id}:${port.id}`;
      map.set(key, { node, port });
    }
  }

  return map;
}

/**
 * Create port resolver with caching
 */
export function createCachedPortResolver(): PortResolver & {
  clearCache: () => void;
  clearNodeCache: (nodeId: NodeId) => void;
} {
  // Cache for resolved ports per node
  const portCache = new Map<NodeId, Port[]>();
  
  // Cache for individual ports
  const singlePortCache = new Map<string, Port | undefined>();

  return {
    getNodePorts(node: Node, definition: NodeDefinition): Port[] {
      const cacheKey = node.id;
      
      // Check cache first
      if (portCache.has(cacheKey)) {
        return portCache.get(cacheKey)!;
      }

      // Resolve ports
      const ports = getNodePorts(node, definition);
      
      // Cache the result
      portCache.set(cacheKey, ports);
      
      return ports;
    },

    getPort(node: Node, portId: string, definition: NodeDefinition): Port | undefined {
      const cacheKey = `${node.id}:${portId}`;
      
      // Check cache first
      if (singlePortCache.has(cacheKey)) {
        return singlePortCache.get(cacheKey);
      }

      // Get port
      const port = getPort(node, portId, definition);
      
      // Cache the result
      singlePortCache.set(cacheKey, port);
      
      return port;
    },

    createPortLookupMap(
      nodes: Record<NodeId, Node>,
      getDefinition: (type: string) => NodeDefinition | undefined
    ): Map<string, { node: Node; port: Port }> {
      return createPortLookupMap(nodes, getDefinition);
    },

    clearCache() {
      portCache.clear();
      singlePortCache.clear();
    },

    clearNodeCache(nodeId: NodeId) {
      portCache.delete(nodeId);
      
      // Clear single port cache entries for this node
      const keysToDelete: string[] = [];
      singlePortCache.forEach((_, key) => {
        if (key.startsWith(`${nodeId}:`)) {
          keysToDelete.push(key);
        }
      });
      keysToDelete.forEach(key => singlePortCache.delete(key));
    },
  };
}

/**
 * Default port resolver instance
 */
export const defaultPortResolver: PortResolver = {
  getNodePorts,
  getPort,
  createPortLookupMap,
};