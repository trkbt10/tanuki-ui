import { Port, Node, Connection } from '../types/core';
/**
 * Check if a port has any connections
 */
export declare function getPortConnections(port: Port, connections: Record<string, Connection>): Connection[];
/**
 * Determine which nodes should be dragged
 */
export declare function getNodesToDrag(nodeId: string, isMultiSelect: boolean, selectedNodeIds: string[], nodes: Record<string, Node>, isInteractive: boolean, isDragAllowed: boolean): string[];
/**
 * Create a connection object based on port types
 */
export declare function createConnection(fromPort: Port, toPort: Port): {
    fromNodeId: string;
    fromPortId: string;
    toNodeId: string;
    toPortId: string;
} | null;
/**
 * Check if a reconnection is valid
 */
export declare function isValidReconnection(fixedPort: Port, targetPort: Port): boolean;
/**
 * Collect initial positions for dragging nodes
 */
export declare function collectInitialPositions(nodeIds: string[], nodes: Record<string, Node>, getGroupChildren: (groupId: string) => Node[]): {
    initialPositions: Record<string, {
        x: number;
        y: number;
    }>;
    affectedChildNodes: Record<string, string[]>;
};
/**
 * Calculate new positions for nodes after dragging
 */
export declare function calculateNewPositions(nodeIds: string[], initialPositions: Record<string, {
    x: number;
    y: number;
}>, offset: {
    x: number;
    y: number;
}): Record<string, {
    x: number;
    y: number;
}>;
/**
 * Handle group movement with children
 */
export declare function handleGroupMovement(nodeIds: string[], nodes: Record<string, Node>, snappedPositions: Record<string, {
    x: number;
    y: number;
}>, initialPositions: Record<string, {
    x: number;
    y: number;
}>, moveGroupWithChildren: (groupId: string, delta: {
    x: number;
    y: number;
}) => void): Record<string, {
    x: number;
    y: number;
}>;
/**
 * Get the other port information for a connection
 */
export declare function getOtherPortInfo(connection: Connection, port: Port, nodes: Record<string, Node>, getNodePorts: (nodeId: string) => Port[]): {
    otherNode: Node;
    otherPort: Port;
    isFromPort: boolean;
} | null;
