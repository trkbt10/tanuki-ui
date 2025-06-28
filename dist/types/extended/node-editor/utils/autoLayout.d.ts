import { NodeEditorData, NodeId, Position } from '../types/core';
export interface LayoutOptions {
    iterations?: number;
    springLength?: number;
    springStrength?: number;
    repulsionStrength?: number;
    dampening?: number;
    maxForce?: number;
    padding?: number;
}
export interface LayoutResult {
    nodePositions: Record<NodeId, Position>;
    iterations: number;
}
/**
 * Force-directed graph layout algorithm
 * Based on Fruchterman-Reingold algorithm with improvements
 */
export declare function calculateAutoLayout(data: NodeEditorData, options?: LayoutOptions): LayoutResult;
/**
 * Hierarchical layout for directed graphs
 * Places nodes in layers based on their connectivity
 */
export declare function calculateHierarchicalLayout(data: NodeEditorData, options?: {
    spacing?: number;
    layerHeight?: number;
}): LayoutResult;
/**
 * Grid layout - arranges nodes in a regular grid
 */
export declare function calculateGridLayout(data: NodeEditorData, options?: {
    spacing?: number;
    columns?: number;
}): LayoutResult;
