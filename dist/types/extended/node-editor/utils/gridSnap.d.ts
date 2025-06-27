import { Position, GridSettings } from '../types/core';
/**
 * Snap a position to the nearest grid point
 */
export declare function snapToGrid(position: Position, gridSettings: GridSettings): Position;
/**
 * Snap multiple positions to grid while maintaining relative positions
 */
export declare function snapMultipleToGrid(positions: Record<string, Position>, gridSettings: GridSettings, primaryNodeId: string): Record<string, Position>;
/**
 * Get visual snap guides for a position
 */
export declare function getSnapGuides(position: Position, gridSettings: GridSettings): {
    horizontal: number | null;
    vertical: number | null;
};
/**
 * Calculate grid-aligned bounding box
 */
export declare function getGridAlignedBounds(bounds: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}, gridSize: number): {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
};
