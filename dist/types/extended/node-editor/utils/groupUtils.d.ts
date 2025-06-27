import { Node, NodeId } from '../types/core';
export interface GroupBounds {
    x: number;
    y: number;
    width: number;
    height: number;
}
/**
 * Calculate the bounds of a group node
 */
export declare const getGroupBounds: (groupNode: Node) => GroupBounds;
/**
 * Calculate the bounds of a regular node
 */
export declare const getNodeBounds: (node: Node) => GroupBounds;
/**
 * Check if a node is completely inside a group's bounds
 */
export declare const isNodeInsideGroup: (node: Node, groupNode: Node) => boolean;
/**
 * Check if a node overlaps with a group's bounds (for visual feedback)
 */
export declare const isNodeOverlappingGroup: (node: Node, groupNode: Node) => boolean;
/**
 * Find which group (if any) a node should belong to
 * Returns the most specific (smallest) group that completely contains the node
 */
export declare const findContainingGroup: (node: Node, allNodes: Record<NodeId, Node>) => NodeId | null;
/**
 * Get all nodes that are children of a group (optimized with caching)
 */
export declare const getGroupChildren: (groupId: NodeId, allNodes: Record<NodeId, Node>) => Node[];
/**
 * Get all descendants of a group (children and their children recursively)
 */
export declare const getGroupDescendants: (groupId: NodeId, allNodes: Record<NodeId, Node>) => Node[];
/**
 * Calculate the offset between a group and its child when the group moves
 */
export declare const calculateChildOffset: (groupDelta: {
    x: number;
    y: number;
}, child: Node, group: Node) => {
    x: number;
    y: number;
};
/**
 * Update group membership based on current node positions
 */
export declare const updateGroupMembership: (allNodes: Record<NodeId, Node>) => Record<NodeId, Partial<Node>>;
/**
 * Get the root position of a node (accounting for group hierarchy)
 */
export declare const getAbsolutePosition: (node: Node, allNodes: Record<NodeId, Node>) => {
    x: number;
    y: number;
};
/**
 * Convert absolute position to relative position within a group
 */
export declare const getRelativePosition: (absolutePosition: {
    x: number;
    y: number;
}, groupNode: Node) => {
    x: number;
    y: number;
};
/**
 * Check if a group move would cause invalid nesting
 */
export declare const isValidGroupMove: (groupId: NodeId, newPosition: {
    x: number;
    y: number;
}, allNodes: Record<NodeId, Node>) => boolean;
