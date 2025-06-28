import { NodeId, Position } from '../types/core';
import * as React from "react";
export interface DragState {
    nodeIds: NodeId[];
    startPosition: Position;
    offset: Position;
    initialPositions: Record<NodeId, Position>;
    affectedChildNodes: Record<NodeId, NodeId[]>;
}
export interface DragStateContextValue {
    dragState: DragState | null;
    startDrag: (nodeIds: NodeId[], startPosition: Position, initialPositions: Record<NodeId, Position>, affectedChildNodes: Record<NodeId, NodeId[]>) => void;
    updateDrag: (offset: Position) => void;
    endDrag: () => void;
}
export declare const DragStateProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useDragState: () => DragStateContextValue;
