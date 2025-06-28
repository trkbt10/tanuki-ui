import { Node, Position, Size } from '../types/core';
export interface BoundingBox {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
}
/**
 * Default node dimensions
 */
export declare const DEFAULT_NODE_SIZE: {
    readonly width: 150;
    readonly height: 50;
};
/**
 * Get the size of a node with fallback to defaults
 */
export declare function getNodeSize(node: Node): Size;
/**
 * Calculate the bounding box for a node
 */
export declare function getNodeBoundingBox(node: Node): BoundingBox;
/**
 * Create a bounding box from position and size
 */
export declare function createBoundingBox(position: Position, size: Size): BoundingBox;
/**
 * Check if two rectangles intersect
 */
export declare function doRectanglesIntersect(rect1: BoundingBox, rect2: BoundingBox): boolean;
/**
 * Check if one rectangle is completely inside another
 */
export declare function isRectangleInsideAnother(inner: BoundingBox, outer: BoundingBox): boolean;
/**
 * Check if a point is inside a rectangle
 */
export declare function isPointInRectangle(point: Position, rect: BoundingBox): boolean;
/**
 * Calculate the center point of a bounding box
 */
export declare function getBoundingBoxCenter(box: BoundingBox): Position;
/**
 * Create a bounding box from two corner points
 */
export declare function createBoundingBoxFromCorners(start: Position, end: Position): BoundingBox;
/**
 * Expand a bounding box by a margin
 */
export declare function expandBoundingBox(box: BoundingBox, margin: number): BoundingBox;
