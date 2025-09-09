import * as React from "react";
import type { Node, NodeEditorData, NodeId, Port } from "../../types/core";
import type { nodeEditorActions as actions } from "./actions";

export interface NodeEditorContextValue {
  state: NodeEditorData;
  dispatch: React.Dispatch<ReturnType<typeof import('./actions')['nodeEditorActions']['addNode']>> | React.Dispatch<any>;
  actions: typeof actions;
  isLoading: boolean;
  isSaving: boolean;
  handleSave: () => Promise<void>;
  getNodePorts: (nodeId: NodeId) => Port[];
  getPort: (nodeId: NodeId, portId: string) => Port | undefined;
  portLookupMap: Map<string, { node: Node; port: Port }>;
}

export const NodeEditorContext = React.createContext<NodeEditorContextValue | null>(null);

export const useNodeEditor = (): NodeEditorContextValue => {
  const context = React.useContext(NodeEditorContext);
  if (!context) throw new Error("useNodeEditor must be used within a NodeEditorProvider");
  return context;
};

export type { NodeEditorData };

