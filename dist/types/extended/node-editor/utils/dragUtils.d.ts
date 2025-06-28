import { NodeId, Position } from '../types/core';
export interface DragState {
    nodeIds: NodeId[];
    offset: Position;
    affectedChildNodes: Record<NodeId, NodeId[]>;
}
/**
 * Calculate drag offsets for all affected nodes (directly dragged + children)
 */
export declare function calculateNodeDragOffsets(dragState: DragState | null): Record<NodeId, Position>;
/**
 * Calculate the combined bounding box of all nodes being dragged
 */
export declare function getDraggedNodesBounds(nodeIds: NodeId[], nodes: Record<NodeId, any>, offset?: Position): {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
} | null;
/**
 * Check if a drag operation would move nodes outside canvas bounds
 */
export declare function isDragWithinBounds(nodeIds: NodeId[], nodes: Record<NodeId, any>, offset: Position, canvasBounds: {
    width: number;
    height: number;
    margin?: number;
}): boolean;
/**
 * Clamp drag offset to keep nodes within bounds
 */
export declare function clampDragToBounds(nodeIds: NodeId[], nodes: Record<NodeId, any>, requestedOffset: Position, canvasBounds: {
    width: number;
    height: number;
    margin?: number;
}): Position;
