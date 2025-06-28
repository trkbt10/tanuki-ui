/**
 * Core type definitions for the Node Editor
 * These types are shared across all components and contexts
 */
export type NodeId = string;
export type ConnectionId = string;
export type PortId = string;
export interface Position {
    x: number;
    y: number;
}
export interface Size {
    width: number;
    height: number;
}
export interface Bounds {
    x: number;
    y: number;
    width: number;
    height: number;
}
export type PortType = "input" | "output";
export type PortPosition = "left" | "right" | "top" | "bottom";
export interface Port {
    id: PortId;
    type: PortType;
    label: string;
    nodeId: NodeId;
    position: PortPosition;
    dataType?: string;
    maxConnections?: number;
    allowedNodeTypes?: string[];
    allowedPortTypes?: string[];
}
export type NodeVisualState = "info" | "success" | "warning" | "error" | "disabled";
export interface NodeData {
    title?: string;
    content?: string;
    visualState?: NodeVisualState;
    [key: string]: unknown;
}
export interface Node {
    id: NodeId;
    type: string;
    position: Position;
    size?: Size;
    data: NodeData;
    /**
     * @deprecated Ports are now inferred from NodeDefinitions.
     * This field is only used for backward compatibility and will be removed in a future version.
     * Use NodeEditorContext.getNodePorts() instead.
     */
    ports?: Port[];
    children?: NodeId[];
    parentId?: NodeId;
    expanded?: boolean;
    visible?: boolean;
    locked?: boolean;
    resizable?: boolean;
    minSize?: Size;
    maxSize?: Size;
}
export interface Connection {
    id: ConnectionId;
    fromNodeId: NodeId;
    fromPortId: PortId;
    toNodeId: NodeId;
    toPortId: PortId;
}
export interface NodeEditorData {
    nodes: Record<NodeId, Node>;
    connections: Record<ConnectionId, Connection>;
    lastDuplicatedNodeIds?: NodeId[];
}
export interface Viewport {
    offset: Position;
    scale: number;
}
export interface SelectionState {
    nodes: Set<NodeId>;
    connections: Set<ConnectionId>;
}
export interface DragState {
    nodeIds: NodeId[];
    startPosition: Position;
    offset: Position;
    initialPositions: Record<NodeId, Position>;
    affectedChildNodes: Record<NodeId, NodeId[]>;
}
export interface ResizeState {
    nodeId: NodeId;
    handle: ResizeHandle;
    startSize: Size;
    startPosition: Position;
    currentSize: Size;
    currentPosition: Position;
}
export type ResizeHandle = "se";
export interface ConnectionDragState {
    fromPort: Port;
    toPosition: Position;
    validTarget: Port | null;
    candidatePort: Port | null;
}
export interface ConnectionDisconnectState {
    connectionId: ConnectionId;
    fixedPort: Port;
    draggingEnd: "from" | "to";
    draggingPosition: Position;
    originalConnection: {
        id: ConnectionId;
        fromNodeId: NodeId;
        fromPortId: PortId;
        toNodeId: NodeId;
        toPortId: PortId;
    };
    disconnectedEnd: "from" | "to";
    candidatePort: Port | null;
}
export interface ContextMenuState {
    visible: boolean;
    position: Position;
    canvasPosition?: Position;
    nodeId?: NodeId;
}
export interface GridSettings {
    enabled: boolean;
    size: number;
    showGrid: boolean;
    snapToGrid: boolean;
    snapThreshold: number;
}
export interface EditorSettings {
    grid: GridSettings;
    showPorts: "always" | "hover" | "connected";
    connectionStyle: "bezier" | "straight" | "step";
    theme: "light" | "dark" | "auto";
}
export interface NodeEditorPointerEvent extends PointerEvent {
    canvasPosition: Position;
    nodeId?: NodeId;
    portId?: PortId;
    connectionId?: ConnectionId;
}
export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;
