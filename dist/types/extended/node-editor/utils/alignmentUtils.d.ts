import { Node, Position } from '../types/core';
/**
 * Calculate new positions for alignment operations
 */
export declare function calculateAlignmentPositions(nodes: Node[], alignmentType: string): Record<string, Position>;
