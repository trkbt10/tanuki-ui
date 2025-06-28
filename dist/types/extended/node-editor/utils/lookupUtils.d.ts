import { Node, NodeId, Connection, ConnectionId, Port, PortId } from '../types/core';
/**
 * Utility for creating lookup maps for O(1) access patterns
 */
/**
 * Create a lookup map from port ID to node ID
 * @param nodes - The nodes object
 * @param getNodePorts - Optional function to get ports for a node. If not provided, will use node.ports directly
 */
export declare function createPortToNodeMap(nodes: Record<NodeId, Node>, getNodePorts?: (nodeId: NodeId) => Port[]): Map<PortId, NodeId>;
/**
 * Create a lookup map from parent ID to child node IDs
 */
export declare function createParentToChildrenMap(nodes: Record<NodeId, Node>): Map<NodeId, NodeId[]>;
/**
 * Create lookup maps for connections by endpoints
 */
export declare function createConnectionLookupMaps(connections: Record<ConnectionId, Connection>): {
    byFromNode: Map<NodeId, Connection[]>;
    byToNode: Map<NodeId, Connection[]>;
    byFromPort: Map<PortId, Connection[]>;
    byToPort: Map<PortId, Connection[]>;
    byEndpoint: Map<string, Connection[]>;
};
/**
 * Create a lookup map from position to ports on a node
 */
export declare function createPortsByPositionMap(ports: Port[]): Map<string, Port[]>;
/**
 * Group array items by a key function
 */
export declare function groupBy<T, K extends string | number>(items: T[], keyFn: (item: T) => K): Map<K, T[]>;
/**
 * Create a spatial grid for efficient spatial queries
 */
export declare class SpatialGrid<T> {
    private cells;
    private cellSize;
    constructor(cellSize?: number);
    /**
     * Get cell key for a position
     */
    private getCellKey;
    /**
     * Insert item at position
     */
    insert(item: T, x: number, y: number): void;
    /**
     * Get all items in cells near a position
     */
    getNearby(x: number, y: number, radius?: number): T[];
    /**
     * Clear all items
     */
    clear(): void;
    /**
     * Get all items in a rectangular area
     */
    getInArea(minX: number, minY: number, maxX: number, maxY: number): T[];
}
