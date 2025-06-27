import { Connection, ConnectionId, Node, NodeEditorData, NodeId, Position, Port } from '../types/core';
import { SettingsManager } from '../settings/SettingsManager';
import * as React from "react";
export type { NodeEditorData };
export type NodeEditorAction = {
    type: "ADD_NODE";
    payload: {
        node: Omit<Node, "id">;
    };
} | {
    type: "UPDATE_NODE";
    payload: {
        nodeId: NodeId;
        updates: Partial<Node>;
    };
} | {
    type: "DELETE_NODE";
    payload: {
        nodeId: NodeId;
    };
} | {
    type: "MOVE_NODE";
    payload: {
        nodeId: NodeId;
        position: Position;
    };
} | {
    type: "MOVE_NODES";
    payload: {
        updates: Record<NodeId, Position>;
    };
} | {
    type: "ADD_CONNECTION";
    payload: {
        connection: Omit<Connection, "id">;
    };
} | {
    type: "DELETE_CONNECTION";
    payload: {
        connectionId: ConnectionId;
    };
} | {
    type: "SET_NODE_DATA";
    payload: {
        data: NodeEditorData;
    };
} | {
    type: "RESTORE_STATE";
    payload: {
        data: NodeEditorData;
    };
} | {
    type: "DUPLICATE_NODES";
    payload: {
        nodeIds: NodeId[];
    };
} | {
    type: "GROUP_NODES";
    payload: {
        nodeIds: NodeId[];
        groupId?: NodeId;
    };
} | {
    type: "UNGROUP_NODE";
    payload: {
        groupId: NodeId;
    };
} | {
    type: "UPDATE_GROUP_MEMBERSHIP";
    payload: {
        updates: Record<NodeId, {
            parentId?: NodeId;
        }>;
    };
} | {
    type: "MOVE_GROUP_WITH_CHILDREN";
    payload: {
        groupId: NodeId;
        delta: {
            x: number;
            y: number;
        };
    };
} | {
    type: "AUTO_LAYOUT";
    payload: {
        layoutType: "force" | "hierarchical" | "grid";
        selectedOnly?: boolean;
    };
};
export declare const nodeEditorReducer: (state: NodeEditorData, action: NodeEditorAction) => NodeEditorData;
export declare const defaultNodeEditorData: NodeEditorData;
export declare const nodeEditorActions: {
    addNode: (node: Omit<Node, "id">) => NodeEditorAction;
    updateNode: (nodeId: NodeId, updates: Partial<Node>) => NodeEditorAction;
    deleteNode: (nodeId: NodeId) => NodeEditorAction;
    moveNode: (nodeId: NodeId, position: Position) => NodeEditorAction;
    moveNodes: (updates: Record<NodeId, Position>) => NodeEditorAction;
    addConnection: (connection: Omit<Connection, "id">) => NodeEditorAction;
    deleteConnection: (connectionId: ConnectionId) => NodeEditorAction;
    setNodeData: (data: NodeEditorData) => NodeEditorAction;
    restoreState: (data: NodeEditorData) => NodeEditorAction;
    duplicateNodes: (nodeIds: NodeId[]) => NodeEditorAction;
    groupNodes: (nodeIds: NodeId[], groupId?: NodeId) => NodeEditorAction;
    ungroupNode: (groupId: NodeId) => NodeEditorAction;
    updateGroupMembership: (updates: Record<NodeId, {
        parentId?: NodeId;
    }>) => NodeEditorAction;
    moveGroupWithChildren: (groupId: NodeId, delta: {
        x: number;
        y: number;
    }) => NodeEditorAction;
    autoLayout: (layoutType: "force" | "hierarchical" | "grid", selectedOnly?: boolean) => NodeEditorAction;
};
export interface NodeEditorContextValue {
    state: NodeEditorData;
    dispatch: React.Dispatch<NodeEditorAction>;
    actions: typeof nodeEditorActions;
    isLoading: boolean;
    isSaving: boolean;
    handleSave: () => Promise<void>;
    getNodePorts: (nodeId: NodeId) => Port[];
    getPort: (nodeId: NodeId, portId: string) => Port | undefined;
    portLookupMap: Map<string, {
        node: Node;
        port: Port;
    }>;
}
export declare const NodeEditorContext: React.Context<NodeEditorContextValue | null>;
export interface NodeEditorProviderProps {
    children: React.ReactNode;
    initialState?: Partial<NodeEditorData>;
    controlledData?: NodeEditorData;
    onDataChange?: (data: NodeEditorData) => void;
    onSave?: (data: NodeEditorData) => void | Promise<void>;
    onLoad?: () => NodeEditorData | Promise<NodeEditorData>;
    settingsManager?: SettingsManager;
}
export declare const NodeEditorProvider: React.FC<NodeEditorProviderProps>;
export declare const useNodeEditor: () => NodeEditorContextValue;
