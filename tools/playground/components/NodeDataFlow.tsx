import * as React from "react";
import type { NodeEditorData } from "../../src/extended/node-editor/types/core";

interface NodeDataFlowProps {
  editorData: NodeEditorData | null;
  onDataUpdate: (nodeId: string, data: any) => void;
}

export const useNodeDataFlow = (editorData: NodeEditorData | null) => {
  const [nodeValues, setNodeValues] = React.useState<Record<string, any>>({});

  // Function to get connected value for a specific node and port
  const getConnectedValue = React.useCallback((nodeId: string, portId: string) => {
    if (!editorData) return null;

    // Find connections where this node is the target
    const connection = Object.values(editorData.connections).find(
      conn => conn.toNodeId === nodeId && conn.toPortId === portId
    );

    if (!connection) return null;

    // Get the source node
    const sourceNode = editorData.nodes[connection.fromNodeId];
    if (!sourceNode) return null;

    // Get value from nodeValues or node data
    const value = nodeValues[connection.fromNodeId] || sourceNode.data;

    // Handle different output types
    if (connection.fromPortId === "color" && value?.color) {
      return value.color;
    }
    if (connection.fromPortId === "value" && value?.value !== undefined) {
      return value.value;
    }

    return null;
  }, [editorData, nodeValues]);

  // Function to update node value
  const updateNodeValue = React.useCallback((nodeId: string, value: any) => {
    setNodeValues(prev => ({
      ...prev,
      [nodeId]: value
    }));
  }, []);

  return { getConnectedValue, updateNodeValue, nodeValues };
};