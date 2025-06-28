import { NodeId } from '../../types/core';
import * as React from "react";
export interface NodeDragHandlerProps {
    nodeId: NodeId;
    children: (props: {
        onPointerDown: (e: React.PointerEvent) => void;
        isDragging: boolean;
    }) => React.ReactNode;
}
/**
 * Handles drag operations for individual nodes
 * Extracts drag logic from NodeLayer for better separation of concerns
 */
export declare const NodeDragHandler: React.FC<NodeDragHandlerProps>;
