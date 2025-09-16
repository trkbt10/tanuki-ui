import { Connection, Node, NodeId, Port } from '../types/core';
import { NodeDefinition } from '../types/NodeDefinition';
/**
 * How the editor should respond when a port at capacity is used to start a new connection drag.
 */
export declare enum ConnectionSwitchBehavior {
    /** Simply append the new connection */
    Append = "append",
    /** Replace existing connections owned by the dragging port */
    Replace = "replace",
    /** Ignore the drag result completely */
    Ignore = "ignore"
}
interface BehaviorContext {
    behavior: ConnectionSwitchBehavior;
    existingConnections: Connection[];
    maxConnections?: number;
}
/**
 * Parameters required to plan how a drag between two ports should be handled.
 */
export interface ConnectionPlanParams {
    fromPort: Port;
    toPort: Port;
    nodes: Record<NodeId, Node>;
    connections: Record<string, Connection>;
    getNodeDefinition: (type: string) => NodeDefinition | undefined;
}
/**
 * Result of evaluating how to handle a connection drag.
 */
export interface ConnectionPlan {
    behavior: ConnectionSwitchBehavior;
    connection: Omit<Connection, "id"> | null;
    connectionIdsToReplace: string[];
}
/**
 * Decide how to handle a completed drag between two ports while respecting connection limits.
 */
export declare const planConnectionChange: ({ fromPort, toPort, nodes, connections, getNodeDefinition, }: ConnectionPlanParams) => ConnectionPlan;
export type { BehaviorContext };
export declare const getConnectionSwitchContext: (port: Port, nodes: Record<NodeId, Node>, connections: Record<string, Connection>, getNodeDefinition: (type: string) => NodeDefinition | undefined) => BehaviorContext;
export declare const createConnectionSnapshotWithout: (connections: Record<string, Connection>, toRemove: Connection[]) => Record<string, Connection>;
