import * as React from "react";
import type { Node } from "../types/core";
import { useNodeEditor } from "../contexts/NodeEditorContext";
import { useEditorActionState } from "../contexts/EditorActionStateContext";
import { useNodeDefinition } from "../contexts/NodeDefinitionContext";
import { useExternalDataRef } from "../contexts/ExternalDataContext";
import { useExternalData } from "../hooks/useExternalData";
import { DefaultInspectorRenderer } from "../components/node/renderers/DefaultRenderers";
import { calculateAlignmentPositions } from "../utils/alignmentUtils";

export interface NodeInspectorProps {
  node: Node;
}

export const NodeInspector: React.FC<NodeInspectorProps> = React.memo(
  ({ node }) => {
    const { state: nodeEditorState, dispatch: nodeEditorDispatch, actions: nodeEditorActions } = useNodeEditor();
    const { state: actionState } = useEditorActionState();
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

    // Get all selected nodes for alignment
    const selectedNodes = actionState.selectedNodeIds.map((id) => nodeEditorState.nodes[id]).filter(Boolean);

    // Handle alignment operations
    const handleAlignNodes = React.useCallback(
      (alignmentType: string, nodes: Node[]) => {
        const positionUpdates = calculateAlignmentPositions(nodes, alignmentType);
        if (Object.keys(positionUpdates).length > 0) {
          nodeEditorDispatch(nodeEditorActions.moveNodes(positionUpdates));
        }
      },
      [nodeEditorDispatch, nodeEditorActions]
    );

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
        selectedNodes,
        onAlignNodes: handleAlignNodes,
      }),
      [
        node,
        externalDataState.data,
        externalDataState.isLoading,
        externalDataState.error,
        handleUpdateNode,
        handleUpdateExternalData,
        handleDeleteNode,
        selectedNodes,
        handleAlignNodes,
      ]
    );

    return (
      <>
        {/* Custom inspector first */}
        {nodeDefinition?.renderInspector && (
          <div style={{ marginBottom: "16px" }}>
            {nodeDefinition.renderInspector(inspectorProps)}
          </div>
        )}
        {/* Always show default Node Properties */}
        <DefaultInspectorRenderer {...inspectorProps} />
      </>
    );
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
