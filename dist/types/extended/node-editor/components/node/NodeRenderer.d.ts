import { Node, NodeId } from '../../types/core';
import * as React from "react";
export interface CustomNodeRendererProps {
    node: Node;
    isSelected: boolean;
    isDragging: boolean;
    isEditing: boolean;
    externalData: unknown;
    isLoadingExternalData: boolean;
    externalDataError: Error | null;
    onStartEdit: () => void;
    onUpdateNode: (updates: Partial<Node>) => void;
}
export interface NodeRendererProps {
    node: Node;
    isSelected: boolean;
    isDragging: boolean;
    dragOffset?: {
        x: number;
        y: number;
    };
    nodeRenderer?: (props: CustomNodeRendererProps) => React.ReactNode;
    onUpdateNode?: (nodeId: NodeId, updates: Partial<Node>) => void;
    onNodeContextMenu?: (e: React.MouseEvent, nodeId: NodeId) => void;
    externalDataMap?: Map<NodeId, unknown>;
}
export declare const NodeRenderer: React.ComponentType<NodeRendererProps>;
