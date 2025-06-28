import { NodeId, ConnectionId, PortId, Position, Size, Port as BasePort, DragState, ResizeState, ResizeHandle, ConnectionDragState, ConnectionDisconnectState, ContextMenuState } from '../types/core';
import * as React from "react";
export interface SelectionBox {
    start: Position;
    end: Position;
}
export interface EditorActionState {
    selectedNodeIds: NodeId[];
    selectedConnectionIds: ConnectionId[];
    selectionBox: SelectionBox | null;
    dragState: DragState | null;
    resizeState: ResizeState | null;
    hoveredNodeId: NodeId | null;
    hoveredConnectionId: ConnectionId | null;
    connectionDragState: ConnectionDragState | null;
    connectionDisconnectState: ConnectionDisconnectState | null;
    hoveredPort: BasePort | null;
    connectedPorts: Set<PortId>;
    connectablePortIds: Set<PortId>;
    contextMenu: ContextMenuState;
}
export type EditorActionStateAction = {
    type: "SELECT_NODE";
    payload: {
        nodeId: NodeId;
        multiple: boolean;
    };
} | {
    type: "SELECT_CONNECTION";
    payload: {
        connectionId: ConnectionId;
        multiple: boolean;
    };
} | {
    type: "CLEAR_SELECTION";
} | {
    type: "SELECT_ALL_NODES";
    payload: {
        nodeIds: NodeId[];
    };
} | {
    type: "SET_SELECTION_BOX";
    payload: {
        box: SelectionBox | null;
    };
} | {
    type: "START_NODE_DRAG";
    payload: {
        nodeIds: NodeId[];
        startPosition: {
            x: number;
            y: number;
        };
        initialPositions: Record<NodeId, {
            x: number;
            y: number;
        }>;
        affectedChildNodes: Record<NodeId, NodeId[]>;
    };
} | {
    type: "UPDATE_NODE_DRAG";
    payload: {
        offset: {
            x: number;
            y: number;
        };
    };
} | {
    type: "END_NODE_DRAG";
} | {
    type: "SET_HOVERED_NODE";
    payload: {
        nodeId: NodeId | null;
    };
} | {
    type: "SET_HOVERED_CONNECTION";
    payload: {
        connectionId: ConnectionId | null;
    };
} | {
    type: "START_CONNECTION_DRAG";
    payload: {
        fromPort: BasePort;
    };
} | {
    type: "UPDATE_CONNECTION_DRAG";
    payload: {
        toPosition: {
            x: number;
            y: number;
        };
        candidatePort: BasePort | null;
    };
} | {
    type: "END_CONNECTION_DRAG";
} | {
    type: "START_CONNECTION_DISCONNECT";
    payload: {
        originalConnection: {
            id: ConnectionId;
            fromNodeId: NodeId;
            fromPortId: PortId;
            toNodeId: NodeId;
            toPortId: PortId;
        };
        disconnectedEnd: 'from' | 'to';
        fixedPort: BasePort;
        draggingPosition: {
            x: number;
            y: number;
        };
    };
} | {
    type: "UPDATE_CONNECTION_DISCONNECT";
    payload: {
        draggingPosition: Position;
        candidatePort: BasePort | null;
    };
} | {
    type: "END_CONNECTION_DISCONNECT";
} | {
    type: "SET_HOVERED_PORT";
    payload: {
        port: BasePort | null;
    };
} | {
    type: "UPDATE_CONNECTED_PORTS";
    payload: {
        connectedPorts: Set<PortId>;
    };
} | {
    type: "UPDATE_CONNECTABLE_PORTS";
    payload: {
        connectablePortIds: Set<PortId>;
    };
} | {
    type: "START_NODE_RESIZE";
    payload: {
        nodeId: NodeId;
        startPosition: Position;
        startSize: Size;
        handle: ResizeHandle;
    };
} | {
    type: "UPDATE_NODE_RESIZE";
    payload: {
        currentSize: Size;
    };
} | {
    type: "END_NODE_RESIZE";
} | {
    type: "SHOW_CONTEXT_MENU";
    payload: {
        position: Position;
        nodeId?: NodeId;
        canvasPosition?: Position;
    };
} | {
    type: "HIDE_CONTEXT_MENU";
};
export declare const editorActionStateReducer: (state: EditorActionState, action: EditorActionStateAction) => EditorActionState;
export declare const defaultEditorActionState: EditorActionState;
export declare const editorActionStateActions: {
    selectNode: (nodeId: NodeId, multiple?: boolean) => EditorActionStateAction;
    selectConnection: (connectionId: ConnectionId, multiple?: boolean) => EditorActionStateAction;
    clearSelection: () => EditorActionStateAction;
    selectAllNodes: (nodeIds: NodeId[]) => EditorActionStateAction;
    setSelectionBox: (box: SelectionBox | null) => EditorActionStateAction;
    startNodeDrag: (nodeIds: NodeId[], startPosition: {
        x: number;
        y: number;
    }, initialPositions: Record<NodeId, {
        x: number;
        y: number;
    }>, affectedChildNodes: Record<NodeId, NodeId[]>) => EditorActionStateAction;
    updateNodeDrag: (offset: {
        x: number;
        y: number;
    }) => EditorActionStateAction;
    endNodeDrag: () => EditorActionStateAction;
    setHoveredNode: (nodeId: NodeId | null) => EditorActionStateAction;
    setHoveredConnection: (connectionId: ConnectionId | null) => EditorActionStateAction;
    startConnectionDrag: (fromPort: BasePort) => EditorActionStateAction;
    updateConnectionDrag: (toPosition: {
        x: number;
        y: number;
    }, candidatePort: BasePort | null) => EditorActionStateAction;
    endConnectionDrag: () => EditorActionStateAction;
    setHoveredPort: (port: BasePort | null) => EditorActionStateAction;
    updateConnectedPorts: (connectedPorts: Set<PortId>) => EditorActionStateAction;
    updateConnectablePorts: (connectablePortIds: Set<PortId>) => EditorActionStateAction;
    startConnectionDisconnect: (originalConnection: {
        id: ConnectionId;
        fromNodeId: NodeId;
        fromPortId: PortId;
        toNodeId: NodeId;
        toPortId: PortId;
    }, disconnectedEnd: "from" | "to", fixedPort: BasePort, draggingPosition: {
        x: number;
        y: number;
    }) => EditorActionStateAction;
    updateConnectionDisconnect: (draggingPosition: {
        x: number;
        y: number;
    }, candidatePort: BasePort | null) => EditorActionStateAction;
    endConnectionDisconnect: () => EditorActionStateAction;
    startNodeResize: (nodeId: NodeId, startPosition: {
        x: number;
        y: number;
    }, startSize: {
        width: number;
        height: number;
    }, handle: "se") => EditorActionStateAction;
    updateNodeResize: (currentSize: {
        width: number;
        height: number;
    }) => EditorActionStateAction;
    endNodeResize: () => EditorActionStateAction;
    showContextMenu: (position: {
        x: number;
        y: number;
    }, nodeId?: NodeId, canvasPosition?: {
        x: number;
        y: number;
    }) => EditorActionStateAction;
    hideContextMenu: () => EditorActionStateAction;
};
export interface EditorActionStateContextValue {
    state: EditorActionState;
    dispatch: React.Dispatch<EditorActionStateAction>;
    actions: typeof editorActionStateActions;
}
export declare const EditorActionStateContext: React.Context<EditorActionStateContextValue | null>;
export interface EditorActionStateProviderProps {
    children: React.ReactNode;
    initialState?: Partial<EditorActionState>;
}
export declare const EditorActionStateProvider: React.FC<EditorActionStateProviderProps>;
export declare const useEditorActionState: () => EditorActionStateContextValue;
