import { Position } from '../types/core';
/**
 * Calculate the distance between two points
 */
export declare function getDistance(a: Position, b: Position): number;
/**
 * Get vector components and distance between two points
 */
export declare function getVector(from: Position, to: Position): {
    dx: number;
    dy: number;
    distance: number;
};
/**
 * Normalize a vector to unit length
 */
export declare function normalizeVector(dx: number, dy: number): Position;
/**
 * Add two positions/vectors
 */
export declare function addVectors(a: Position, b: Position): Position;
/**
 * Subtract two positions/vectors
 */
export declare function subtractVectors(a: Position, b: Position): Position;
/**
 * Multiply a vector by a scalar
 */
export declare function scaleVector(vector: Position, scale: number): Position;
/**
 * Calculate dot product of two vectors
 */
export declare function dotProduct(a: Position, b: Position): number;
/**
 * Calculate the angle between two vectors in radians
 */
export declare function getAngleBetween(a: Position, b: Position): number;
/**
 * Rotate a vector by angle in radians
 */
export declare function rotateVector(vector: Position, angle: number): Position;
/**
 * Linearly interpolate between two positions
 */
export declare function lerp(a: Position, b: Position, t: number): Position;
/**
 * Clamp a position within bounds
 */
export declare function clampPosition(position: Position, min: Position, max: Position): Position;
/**
 * Calculate perpendicular vector (90 degrees counter-clockwise)
 */
export declare function getPerpendicularVector(vector: Position): Position;
/**
 * Calculate the closest point on a line segment to a given point
 */
export declare function getClosestPointOnSegment(point: Position, lineStart: Position, lineEnd: Position): Position;
