import { NodeId, PortId, Position } from './core';
/**
 * Computed position information for a port
 */
export interface PortPosition {
    /** Port identifier */
    portId: PortId;
    /** Position relative to the node (for rendering the port) */
    renderPosition: Position & {
        /** Optional CSS transform for fine positioning */
        transform?: string;
    };
    /** Absolute position on canvas (for drawing connections) */
    connectionPoint: Position;
}
/**
 * Map of port positions for a single node
 */
export type NodePortPositions = Map<PortId, PortPosition>;
/**
 * Map of all port positions in the editor
 * NodeId -> PortId -> PortPosition
 */
export type EditorPortPositions = Map<NodeId, NodePortPositions>;
/**
 * Configuration for port positioning
 */
export interface PortPositionConfig {
    /** Visual size of the port circle */
    visualSize: number;
    /** Distance beyond port's visual boundary for connections */
    connectionMargin: number;
    /** Padding from node edges when positioning multiple ports */
    edgePadding: number;
    /** Relative padding as fraction of total dimension (0-1) */
    relativePadding: number;
}
/**
 * Default port position configuration
 */
export declare const DEFAULT_PORT_POSITION_CONFIG: PortPositionConfig;
