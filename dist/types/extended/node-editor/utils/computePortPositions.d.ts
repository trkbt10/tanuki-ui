import { Node } from '../types/core';
import { NodePortPositions, EditorPortPositions, PortPositionConfig } from '../types/portPosition';
/**
 * Compute all port positions for a single node
 */
export declare function computeNodePortPositions(node: Node, config?: PortPositionConfig): NodePortPositions;
/**
 * Compute port positions for all nodes in the editor
 */
export declare function computeAllPortPositions(nodes: Node[], config?: PortPositionConfig): EditorPortPositions;
/**
 * Update port positions for specific nodes
 */
export declare function updatePortPositions(currentPositions: EditorPortPositions, nodesToUpdate: Node[], config?: PortPositionConfig): EditorPortPositions;
