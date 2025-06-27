import { Node } from '../types/core';
/**
 * Hook to calculate which nodes are visible in the current viewport
 * Adds a buffer zone to prevent nodes from popping in/out during pan
 */
export declare const useVisibleNodes: (nodes: Record<string, Node>, bufferFactor?: number) => Node[];
