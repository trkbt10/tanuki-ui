import * as React from "react";
import { useNodeDefinitionList } from "../contexts/NodeDefinitionContext";
import { useEditorActionState } from "../contexts/EditorActionStateContext";
import { useNodeCanvas } from "../contexts/NodeCanvasContext";
import { useNodeEditor } from "../contexts/NodeEditorContext";
import { FloatingContainer } from "./parts/FloatingContainer";
import styles from "./Toolbar.module.css";
import editorStyles from "../NodeEditor.module.css";

export interface ToolbarProps {
  className?: string;
  floating?: boolean;
  position?: "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export const Toolbar: React.FC<ToolbarProps> = ({
  className,
  floating = false,
  position = "top"
}) => {
  const nodeDefinitions = useNodeDefinitionList();
  const { actions: actionActions, dispatch: actionDispatch } = useEditorActionState();
  const { state: canvasState } = useNodeCanvas();
  const { dispatch, actions } = useNodeEditor();
  
  // Get common node types for quick access
  const commonNodeTypes = React.useMemo(() => {
    return nodeDefinitions.filter(def => 
      ["standard", "input", "output", "process", "group"].includes(def.type)
    ).slice(0, 5); // Limit to 5 most common types
  }, [nodeDefinitions]);

  const handleToolbarNodeCreate = React.useCallback((nodeType: string) => {
    const nodeDefinition = nodeDefinitions.find(def => def.type === nodeType);
    if (!nodeDefinition) {
      console.warn(`Node definition not found for type: ${nodeType}`);
      return;
    }

    // Calculate center position of current viewport
    const viewport = canvasState.viewport;
    const centerX = (-viewport.offset.x + window.innerWidth / 2) / viewport.scale;
    const centerY = (-viewport.offset.y + window.innerHeight / 2) / viewport.scale;
    
    // Create unique node ID
    const nodeId = `${nodeType}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Create new node with definition defaults
    const newNode = {
      id: nodeId,
      type: nodeType,
      position: { x: centerX, y: centerY },
      size: nodeDefinition.defaultSize || { width: 150, height: 50 },
      data: nodeDefinition.defaultData || { title: nodeDefinition.displayName },
      ports: nodeDefinition.ports?.map(portDef => ({
        ...portDef,
        nodeId,
      })) || [],
    };

    // Add node to editor
    dispatch(actions.addNode(newNode));
    
    // Select the new node
    actionDispatch(actionActions.selectNode(nodeId, false));
  }, [nodeDefinitions, canvasState.viewport, dispatch, actions, actionDispatch, actionActions]);

  const showNodeSearchMenu = React.useCallback(() => {
    // Show context menu at center of viewport
    const viewport = canvasState.viewport;
    const centerScreenX = window.innerWidth / 2;
    const centerScreenY = window.innerHeight / 2;
    
    // Convert screen position to canvas position
    const canvasX = (-viewport.offset.x + centerScreenX) / viewport.scale;
    const canvasY = (-viewport.offset.y + centerScreenY) / viewport.scale;

    actionDispatch(actionActions.showContextMenu(
      { x: centerScreenX, y: centerScreenY },
      undefined,
      { x: canvasX, y: canvasY }
    ));
  }, [canvasState.viewport, actionDispatch, actionActions]);

  const toolbarContent = (
    <>
      {/* Quick node creation buttons */}
      {commonNodeTypes.map(nodeType => (
        <button
          key={nodeType.type}
          className={editorStyles.toolButton}
          onClick={() => handleToolbarNodeCreate(nodeType.type)}
          title={`Add ${nodeType.displayName}`}
          aria-label={`Add ${nodeType.displayName}`}
        >
          {nodeType.icon ? (
            <span className={styles.toolbarIcon}>{nodeType.icon}</span>
          ) : (
            <span className={styles.toolbarIconText}>
              {nodeType.displayName.charAt(0).toUpperCase()}
            </span>
          )}
        </button>
      ))}
      
      {/* Separator */}
      {commonNodeTypes.length > 0 && (
        <div className={styles.toolbarSeparator} />
      )}
      
      {/* More nodes button - opens node search menu */}
      <button
        className={editorStyles.toolButton}
        onClick={showNodeSearchMenu}
        title="Add Node..."
        aria-label="Add Node..."
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M8 3a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2H9v3a1 1 0 1 1-2 0V9H4a1 1 0 0 1 0-2h3V4a1 1 0 0 1 1-1z"/>
        </svg>
      </button>
    </>
  );

  if (floating) {
    return (
      <FloatingContainer position={position} className={className}>
        {toolbarContent}
      </FloatingContainer>
    );
  }

  return (
    <div className={`${editorStyles.topToolbar} ${className || ""}`}>
      {toolbarContent}
    </div>
  );
};