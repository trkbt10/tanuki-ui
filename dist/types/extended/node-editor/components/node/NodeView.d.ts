import { Node, Position, Port } from '../../types/core';
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
export interface NodeViewProps {
    node: Node;
    isSelected: boolean;
    isDragging: boolean;
    isResizing?: boolean;
    dragOffset?: Position;
    onPointerDown: (e: React.PointerEvent, nodeId: string, isDragAllowed?: boolean) => void;
    onContextMenu: (e: React.MouseEvent, nodeId: string) => void;
    onPortPointerDown?: (e: React.PointerEvent, port: Port) => void;
    onPortPointerUp?: (e: React.PointerEvent, port: Port) => void;
    onPortPointerEnter?: (e: React.PointerEvent, port: Port) => void;
    onPortPointerLeave?: (e: React.PointerEvent, port: Port) => void;
    connectingPort?: Port;
    hoveredPort?: Port;
    connectedPorts?: Set<string>;
    nodeRenderer?: (props: CustomNodeRendererProps) => React.ReactNode;
    externalData?: unknown;
    onUpdateNode?: (updates: Partial<Node>) => void;
}
export declare const NodeView: React.NamedExoticComponent<NodeViewProps>;
