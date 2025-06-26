import * as React from "react";
import type { Node } from "../types/core";
import { useNodeEditor } from "../contexts/NodeEditorContext";
import { useNodeDefinition } from "../contexts/NodeDefinitionContext";
import { useExternalDataRef } from "../contexts/ExternalDataContext";
import { useExternalData } from "../hooks/useExternalData";
import { DefaultInspectorRenderer } from "../components/node/renderers/DefaultRenderers";

export interface NodeInspectorProps {
  node: Node;
}

export const NodeInspector: React.FC<NodeInspectorProps> = React.memo(
  ({ node }) => {
    const { dispatch: nodeEditorDispatch, actions: nodeEditorActions } = useNodeEditor();
    const nodeDefinition = useNodeDefinition(node.type);
    const externalDataRef = useExternalDataRef(node.id);
    const externalDataState = useExternalData(node, externalDataRef);
    // Handle node updates - Memoized to prevent recreation on every render
    const handleUpdateNode = React.useCallback(
      (updates: Partial<Node>) => {
        nodeEditorDispatch(nodeEditorActions.updateNode(node.id, updates));
      },
      [node.id, nodeEditorDispatch, nodeEditorActions]
    );

    // Handle external data updates
    const handleUpdateExternalData = React.useCallback(
      async (data: unknown) => {
        if (externalDataState.update) {
          await externalDataState.update(data);
        }
      },
      [externalDataState.update]
    );

    // Handle node deletion
    const handleDeleteNode = React.useCallback(() => {
      nodeEditorDispatch(nodeEditorActions.deleteNode(node.id));
    }, [node.id, nodeEditorDispatch, nodeEditorActions]);

    // Inspector render props - Only recreate when dependencies actually change
    const inspectorProps = React.useMemo(
      () => ({
        node,
        externalData: externalDataState.data,
        isLoadingExternalData: externalDataState.isLoading,
        externalDataError: externalDataState.error,
        onUpdateNode: handleUpdateNode,
        onUpdateExternalData: handleUpdateExternalData,
        onDeleteNode: handleDeleteNode,
      }),
      [
        node,
        externalDataState.data,
        externalDataState.isLoading,
        externalDataState.error,
        handleUpdateNode,
        handleUpdateExternalData,
        handleDeleteNode,
      ]
    );

    // Use custom renderer if available
    if (nodeDefinition?.renderInspector) {
      return <>{nodeDefinition.renderInspector(inspectorProps)}</>;
    }
    // Use default renderer
    return <DefaultInspectorRenderer {...inspectorProps} />;
  },
  (prevProps, nextProps) => {
    // Custom comparison function for memo
    // Only re-render if the node ID changes or critical node properties change
    return (
      prevProps.node.id === nextProps.node.id &&
      prevProps.node.type === nextProps.node.type &&
      prevProps.node.data === nextProps.node.data &&
      prevProps.node.position === nextProps.node.position &&
      prevProps.node.locked === nextProps.node.locked &&
      prevProps.node.visible === nextProps.node.visible
    );
  }
);

NodeInspector.displayName = "NodeInspector";
