import * as React from "react";
import { useKeyboardShortcut, useRegisterShortcut } from "../contexts/KeyboardShortcutContext";
import { useNodeEditor } from "../contexts/NodeEditorContext";
import { useEditorActionState } from "../contexts/EditorActionStateContext";
import { useHistoryIntegration } from "./useHistoryIntegration";
import { useAutoLayout } from "./useAutoLayout";

/**
 * Hook that registers all standard node editor keyboard shortcuts
 */
export const useNodeEditorShortcuts = () => {
  const { state: nodeEditorState, dispatch: nodeEditorDispatch, actions: nodeEditorActions } = useNodeEditor();
  const { state: actionState, dispatch: actionDispatch, actions: actionActions } = useEditorActionState();
  const { performUndo, performRedo, canUndo, canRedo } = useHistoryIntegration();
  const { applyLayout } = useAutoLayout();

  // Delete selected nodes
  useRegisterShortcut(
    { key: "Delete" },
    React.useCallback(() => {
      console.log('Delete shortcut triggered');
      if (actionState.selectedNodeIds.length > 0) {
        actionState.selectedNodeIds.forEach(nodeId => {
          nodeEditorDispatch(nodeEditorActions.deleteNode(nodeId));
        });
        actionDispatch(actionActions.clearSelection());
      } else if (actionState.selectedConnectionIds.length > 0) {
        actionState.selectedConnectionIds.forEach(connectionId => {
          nodeEditorDispatch(nodeEditorActions.deleteConnection(connectionId));
        });
        actionDispatch(actionActions.clearSelection());
      }
    }, [actionState.selectedNodeIds, actionState.selectedConnectionIds, nodeEditorDispatch, nodeEditorActions, actionDispatch, actionActions])
  );

  // Backspace also deletes
  useRegisterShortcut(
    { key: "Backspace" },
    React.useCallback(() => {
      console.log('Backspace shortcut triggered');
      if (actionState.selectedNodeIds.length > 0) {
        actionState.selectedNodeIds.forEach(nodeId => {
          nodeEditorDispatch(nodeEditorActions.deleteNode(nodeId));
        });
        actionDispatch(actionActions.clearSelection());
      } else if (actionState.selectedConnectionIds.length > 0) {
        actionState.selectedConnectionIds.forEach(connectionId => {
          nodeEditorDispatch(nodeEditorActions.deleteConnection(connectionId));
        });
        actionDispatch(actionActions.clearSelection());
      }
    }, [actionState.selectedNodeIds, actionState.selectedConnectionIds, nodeEditorDispatch, nodeEditorActions, actionDispatch, actionActions])
  );

  // Select all nodes
  useRegisterShortcut(
    { key: "a", ctrl: true },
    React.useCallback(() => {
      console.log('Select All shortcut triggered');
      const allNodeIds = Object.keys(nodeEditorState.nodes);
      actionDispatch(actionActions.selectAllNodes(allNodeIds));
    }, [nodeEditorState.nodes, actionDispatch, actionActions])
  );

  // Clear selection
  useRegisterShortcut(
    { key: "Escape" },
    React.useCallback(() => {
      console.log('Escape shortcut triggered');
      actionDispatch(actionActions.clearSelection());
    }, [actionDispatch, actionActions])
  );

  // Add new node
  useRegisterShortcut(
    { key: "n", ctrl: true },
    React.useCallback(() => {
      console.log('Add Node shortcut triggered');
      const nodeId = `node-${Date.now()}`;
      const newNode = {
        title: "New Node",
        type: "default" as const,
        position: { x: 100, y: 100 },
        data: { title: "New Node" },
        ports: [
          {
            id: `port-input-${Date.now()}`,
            type: "input" as const,
            label: "Input",
            position: "left" as const,
            nodeId,
          },
          {
            id: `port-output-${Date.now()}`,
            type: "output" as const,
            label: "Output", 
            position: "right" as const,
            nodeId,
          },
        ],
      };
      nodeEditorDispatch(nodeEditorActions.addNode(newNode));
    }, [nodeEditorDispatch, nodeEditorActions])
  );

  // Duplicate selected nodes
  useRegisterShortcut(
    { key: "d", ctrl: true },
    React.useCallback(() => {
      console.log('Duplicate shortcut triggered');
      if (actionState.selectedNodeIds.length > 0) {
        // Use the built-in duplicateNodes action for consistency
        nodeEditorDispatch(nodeEditorActions.duplicateNodes(actionState.selectedNodeIds));
      }
    }, [actionState.selectedNodeIds, nodeEditorDispatch, nodeEditorActions])
  );

  // Auto-select duplicated nodes when they are created
  React.useEffect(() => {
    if (nodeEditorState.lastDuplicatedNodeIds && nodeEditorState.lastDuplicatedNodeIds.length > 0) {
      actionDispatch(actionActions.selectAllNodes(nodeEditorState.lastDuplicatedNodeIds));
      
      // Clear the lastDuplicatedNodeIds to avoid re-selection
      nodeEditorDispatch(nodeEditorActions.setNodeData({
        ...nodeEditorState,
        lastDuplicatedNodeIds: undefined,
      }));
    }
  }, [nodeEditorState.lastDuplicatedNodeIds, actionDispatch, actionActions, nodeEditorDispatch, nodeEditorActions, nodeEditorState]);

  // Save (placeholder - will be implemented with API integration)
  useRegisterShortcut(
    { key: "s", ctrl: true },
    React.useCallback((e) => {
      console.log('Save shortcut triggered');
      // TODO: Implement save functionality
      console.log('Save not yet implemented');
    }, [])
  );

  // Auto layout with force-directed algorithm
  useRegisterShortcut(
    { key: "l", ctrl: true },
    React.useCallback(() => {
      console.log('Auto Layout shortcut triggered');
      const selectedOnly = actionState.selectedNodeIds.length > 0;
      applyLayout("force", selectedOnly);
    }, [actionState.selectedNodeIds, applyLayout])
  );

  // Undo
  useRegisterShortcut(
    { key: "z", ctrl: true },
    React.useCallback(() => {
      console.log('Undo shortcut triggered');
      if (canUndo) {
        performUndo();
      }
    }, [canUndo, performUndo])
  );

  // Redo
  useRegisterShortcut(
    { key: "z", ctrl: true, shift: true },
    React.useCallback(() => {
      console.log('Redo shortcut triggered');
      if (canRedo) {
        performRedo();
      }
    }, [canRedo, performRedo])
  );

  // Alternative Redo (Ctrl+Y)
  useRegisterShortcut(
    { key: "y", ctrl: true },
    React.useCallback(() => {
      console.log('Redo (Ctrl+Y) shortcut triggered');
      if (canRedo) {
        performRedo();
      }
    }, [canRedo, performRedo])
  );
};