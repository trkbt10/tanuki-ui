import { NodeId, Node } from '../types/core';
export interface UseGroupManagementOptions {
    /** Whether to automatically update group membership when nodes move */
    autoUpdateMembership?: boolean;
    /** Debounce delay for membership updates (ms) */
    membershipUpdateDelay?: number;
}
export interface UseGroupManagementResult {
    /** Update group membership for all nodes */
    updateAllGroupMembership: () => void;
    /** Check if a node is in a group */
    isNodeInGroup: (nodeId: NodeId) => boolean;
    /** Get the parent group of a node */
    getNodeParentGroup: (nodeId: NodeId) => NodeId | null;
    /** Get all children of a group */
    getGroupChildren: (groupId: NodeId) => Node[];
    /** Get all descendants of a group */
    getGroupDescendants: (groupId: NodeId) => Node[];
    /** Move a group with all its children */
    moveGroupWithChildren: (groupId: NodeId, delta: {
        x: number;
        y: number;
    }) => void;
    /** Check if a group move would be valid */
    isValidGroupMove: (groupId: NodeId, newPosition: {
        x: number;
        y: number;
    }) => boolean;
}
/**
 * Hook for managing group relationships and operations
 */
export declare const useGroupManagement: (options?: UseGroupManagementOptions) => UseGroupManagementResult;
