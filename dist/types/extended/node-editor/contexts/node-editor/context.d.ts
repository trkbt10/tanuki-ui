import { Node, NodeEditorData, NodeId, Port } from '../../types/core';
import { nodeEditorActions as actions } from './actions';
import * as React from "react";
export interface NodeEditorContextValue {
    state: NodeEditorData;
    dispatch: React.Dispatch<ReturnType<typeof import('./actions')['nodeEditorActions']['addNode']>> | React.Dispatch<any>;
    actions: typeof actions;
    isLoading: boolean;
    isSaving: boolean;
    handleSave: () => Promise<void>;
    /**
     * Returns ordered ports for a node, suitable for UI rendering.
     * Preserves definition order and applies node-specific overrides.
     * Note: For random access by (nodeId, portId) in hot paths, prefer `portLookupMap`.
     */
    getNodePorts: (nodeId: NodeId) => Port[];
    /**
     * O(1) lookup map for ports. Key format: "nodeId:portId".
     * Recomputed when nodes/definitions change. Do not mutate.
     * Use this for frequent single-port lookups (connections, hit tests, drags).
     */
    portLookupMap: Map<string, {
        node: Node;
        port: Port;
    }>;
}
export declare const NodeEditorContext: React.Context<NodeEditorContextValue | null>;
export declare const useNodeEditor: () => NodeEditorContextValue;
export type { NodeEditorData };
