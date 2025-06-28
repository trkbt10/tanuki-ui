import { Node, Connection, NodeId, ConnectionId } from '../types/core';
import * as React from "react";
/**
 * Custom equality function for nodes that ignores position changes during drag
 */
export declare function areNodesEqual(prevNode: Node, nextNode: Node, isDragging: boolean): boolean;
/**
 * Custom equality function for connections that considers endpoint positions
 */
export declare function areConnectionsEqual(prevConnection: Connection, nextConnection: Connection, prevNodes: Record<NodeId, Node>, nextNodes: Record<NodeId, Node>): boolean;
/**
 * Memoized sorted nodes calculation
 */
export declare function useSortedNodes(nodes: Record<NodeId, Node>): Node[];
/**
 * Memoized connected ports calculation
 */
export declare function useConnectedPorts(connections: Record<ConnectionId, Connection>): Set<string>;
/**
 * Create a memoized component with custom comparison
 */
export declare function createMemoizedComponent<P extends object>(Component: React.ComponentType<P>, propsAreEqual?: (prevProps: P, nextProps: P) => boolean): React.ComponentType<P>;
