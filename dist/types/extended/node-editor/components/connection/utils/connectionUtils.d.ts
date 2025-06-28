import { Position } from '../../../types/core';
/**
 * Get the opposite port position for connection drawing
 * Used when dragging to predict where the connection will end
 */
export declare const getOppositePortPosition: (portPosition: "left" | "right" | "top" | "bottom") => "left" | "right" | "top" | "bottom";
/**
 * Calculate a bezier curve path between two points
 * Creates a smooth curve that enters/exits ports horizontally or vertically based on port position
 */
export declare const calculateBezierPath: (from: Position, to: Position, fromPortPosition?: "left" | "right" | "top" | "bottom", toPortPosition?: "left" | "right" | "top" | "bottom") => string;
/**
 * Calculate the midpoint of a bezier curve (approximation)
 */
export declare const getConnectionMidpoint: (from: Position, to: Position) => Position;
/**
 * Check if a point is near a connection line
 * Used for connection selection and interaction
 */
export declare const isPointNearConnection: (point: Position, from: Position, to: Position, threshold?: number) => boolean;
/**
 * Interpolate between two colors based on a factor (0-1)
 * Used for visual feedback during connection editing
 */
export declare const interpolateColor: (color1: string, color2: string, factor: number) => string;
