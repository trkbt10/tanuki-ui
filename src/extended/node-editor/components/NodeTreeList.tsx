import * as React from "react";
import { useNodeEditor } from "../contexts/NodeEditorContext";
import { useEditorActionState } from "../contexts/EditorActionStateContext";
import { useNodeDefinitionList } from "../contexts/NodeDefinitionContext";
import { Node, NodeId } from "../types/core";
import { getNodeIcon } from "../utils/nodeUtils";
import { CloseIcon } from "./elements";
import styles from "./NodeTreeList.module.css";

interface DragState {
  draggingNodeId: NodeId | null;
  dragOverNodeId: NodeId | null;
  dragOverPosition: "before" | "inside" | "after" | null;
}

interface NodeTreeItemProps {
  node: Node;
  level: number;
  isSelected: boolean;
  onSelect: (nodeId: NodeId, multiSelect: boolean) => void;
  onToggleVisibility?: (nodeId: NodeId) => void;
  onToggleExpand?: (nodeId: NodeId) => void;
  onDeleteNode?: (nodeId: NodeId) => void;
  childNodes: Node[];
  dragState: DragState;
  onNodeDrop: (draggedNodeId: NodeId, targetNodeId: NodeId, position: "before" | "inside" | "after") => void;
  onDragStateChange: (state: Partial<DragState>) => void;
}

const NodeTreeItem: React.FC<NodeTreeItemProps> = ({
  node,
  level,
  isSelected,
  onSelect,
  onToggleVisibility,
  onToggleExpand,
  onDeleteNode,
  childNodes,
  dragState,
  onNodeDrop,
  onDragStateChange
}) => {
  const nodeDefinitions = useNodeDefinitionList();
  const hasChildren = node.type === "group" && childNodes.length > 0;
  const isExpanded = node.type === "group" && node.expanded !== false;
  const isGroup = node.type === "group";
  
  const isDragging = dragState.draggingNodeId === node.id;
  const isDragOver = dragState.dragOverNodeId === node.id;
  const dragOverPosition = isDragOver ? dragState.dragOverPosition : null;
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(node.id, e.ctrlKey || e.metaKey);
  };
  
  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleExpand && hasChildren) {
      onToggleExpand(node.id);
    }
  };
  
  const handleToggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleVisibility) {
      onToggleVisibility(node.id);
    }
  };
  
  const handleDeleteNode = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDeleteNode) {
      onDeleteNode(node.id);
    }
  };
  
  
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("nodeId", node.id);
    onDragStateChange({ draggingNodeId: node.id });
  };
  
  const handleDragEnd = () => {
    onDragStateChange({ 
      draggingNodeId: null, 
      dragOverNodeId: null, 
      dragOverPosition: null 
    });
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (dragState.draggingNodeId === node.id) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const height = rect.height;
    
    let position: "before" | "inside" | "after";
    
    if (isGroup && y > height * 0.25 && y < height * 0.75) {
      position = "inside";
    } else if (y < height / 2) {
      position = "before";
    } else {
      position = "after";
    }
    
    if (dragState.dragOverNodeId !== node.id || dragState.dragOverPosition !== position) {
      onDragStateChange({ 
        dragOverNodeId: node.id, 
        dragOverPosition: position 
      });
    }
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    if (e.currentTarget === e.target) {
      onDragStateChange({ 
        dragOverNodeId: null, 
        dragOverPosition: null 
      });
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const draggedNodeId = e.dataTransfer.getData("nodeId");
    if (draggedNodeId && dragState.dragOverPosition) {
      onNodeDrop(draggedNodeId, node.id, dragState.dragOverPosition);
    }
    
    onDragStateChange({ 
      draggingNodeId: null, 
      dragOverNodeId: null, 
      dragOverPosition: null 
    });
  };
  
  return (
    <>
      {isDragOver && dragOverPosition === "before" && (
        <div className={styles.dropIndicator} style={{ marginLeft: `${level * 16 + 8}px` }} />
      )}
      <div
        className={`${styles.treeItem} ${isSelected ? styles.selected : ""} ${isDragging ? styles.dragging : ""} ${isDragOver && dragOverPosition === "inside" ? styles.dragOverInside : ""}`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleClick}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {hasChildren && (
          <button
            className={styles.expandButton}
            onClick={handleToggleExpand}
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="currentColor"
              style={{
                transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.2s"
              }}
            >
              <path d="M2 1l4 3-4 3V1z" />
            </svg>
          </button>
        )}
        
        <span className={styles.nodeIcon}>{getNodeIcon(node.type, nodeDefinitions)}</span>
        
        <span className={styles.nodeName}>
          {node.data?.title || node.type}
        </span>
        
        <button
          className={styles.visibilityButton}
          onClick={handleToggleVisibility}
          aria-label={node.visible !== false ? "Hide" : "Show"}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            {node.visible !== false ? (
              <path d="M8 3C4.5 3 1.73 5.11 1 8c.73 2.89 3.5 5 7 5s6.27-2.11 7-5c-.73-2.89-3.5-5-7-5zm0 8.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-5.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
            ) : (
              <>
                <path d="M8 3C4.5 3 1.73 5.11 1 8c.73 2.89 3.5 5 7 5s6.27-2.11 7-5c-.73-2.89-3.5-5-7-5zm0 8.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-5.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" opacity="0.3" />
                <path d="M2 2l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
        
        <button
          className={styles.deleteButton}
          onClick={handleDeleteNode}
          aria-label="Delete node"
        >
          <CloseIcon size={12} />
        </button>
      </div>
      
      {hasChildren && isExpanded && (
        childNodes.map(childNode => (
          <ConnectedNodeTreeItem
            key={childNode.id}
            nodeId={childNode.id}
            level={level + 1}
            dragState={dragState}
            onNodeDrop={onNodeDrop}
            onDragStateChange={onDragStateChange}
          />
        ))
      )}
      {isDragOver && dragOverPosition === "after" && (
        <div className={styles.dropIndicator} style={{ marginLeft: `${level * 16 + 8}px` }} />
      )}
    </>
  );
};

interface ConnectedNodeTreeItemProps {
  nodeId: NodeId;
  level: number;
  dragState: DragState;
  onNodeDrop: (draggedNodeId: NodeId, targetNodeId: NodeId, position: "before" | "inside" | "after") => void;
  onDragStateChange: (state: Partial<DragState>) => void;
}

const ConnectedNodeTreeItem: React.FC<ConnectedNodeTreeItemProps> = ({ 
  nodeId, 
  level,
  dragState,
  onNodeDrop,
  onDragStateChange
}) => {
  const { state: editorState, dispatch, actions } = useNodeEditor();
  const { state: actionState, dispatch: actionDispatch, actions: actionActions } = useEditorActionState();
  
  const node = editorState.nodes[nodeId];
  if (!node) return null;
  
  const isSelected = actionState.selectedNodeIds.includes(nodeId);
  const childNodes = Object.values(editorState.nodes).filter(n => n.parentId === nodeId);
  
  const handleSelect = React.useCallback((nodeId: NodeId, multiSelect: boolean) => {
    actionDispatch(actionActions.selectNode(nodeId, multiSelect));
  }, [actionDispatch, actionActions]);
  
  const handleToggleVisibility = React.useCallback((nodeId: NodeId) => {
    const node = editorState.nodes[nodeId];
    if (node) {
      dispatch(actions.updateNode(nodeId, { visible: node.visible === false }));
    }
  }, [editorState.nodes, dispatch, actions]);
  
  const handleToggleExpand = React.useCallback((nodeId: NodeId) => {
    const node = editorState.nodes[nodeId];
    if (node && node.type === "group") {
      dispatch(actions.updateNode(nodeId, { expanded: !node.expanded }));
    }
  }, [editorState.nodes, dispatch, actions]);
  
  const handleDeleteNode = React.useCallback((nodeId: NodeId) => {
    dispatch(actions.deleteNode(nodeId));
  }, [dispatch, actions]);
  
  return (
    <NodeTreeItem
      node={node}
      level={level}
      isSelected={isSelected}
      onSelect={handleSelect}
      onToggleVisibility={handleToggleVisibility}
      onToggleExpand={handleToggleExpand}
      onDeleteNode={handleDeleteNode}
      childNodes={childNodes}
      dragState={dragState}
      onNodeDrop={onNodeDrop}
      onDragStateChange={onDragStateChange}
    />
  );
};

export interface NodeTreeListProps {
  className?: string;
}

export const NodeTreeList: React.FC<NodeTreeListProps> = ({ className }) => {
  const { state: editorState, dispatch: editorDispatch, actions: editorActions } = useNodeEditor();
  const { dispatch: actionDispatch, actions: actionActions } = useEditorActionState();
  
  const [dragState, setDragState] = React.useState<DragState>({
    draggingNodeId: null,
    dragOverNodeId: null,
    dragOverPosition: null
  });
  
  // Get root level nodes (nodes without parent)
  const rootNodes = React.useMemo(() => {
    return Object.values(editorState.nodes).filter(node => !node.parentId);
  }, [editorState.nodes]);
  
  // Sort nodes by type and name
  const sortedRootNodes = React.useMemo(() => {
    return [...rootNodes].sort((a, b) => {
      // Groups first
      if (a.type === "group" && b.type !== "group") return -1;
      if (a.type !== "group" && b.type === "group") return 1;
      
      // Then by title
      const titleA = a.data?.title || a.type;
      const titleB = b.data?.title || b.type;
      return titleA.localeCompare(titleB);
    });
  }, [rootNodes]);
  
  const handleDeselectAll = React.useCallback(() => {
    actionDispatch(actionActions.clearSelection());
  }, [actionDispatch, actionActions]);
  
  const handleDragStateChange = React.useCallback((state: Partial<DragState>) => {
    setDragState(prev => ({ ...prev, ...state }));
  }, []);
  
  const handleNodeDrop = React.useCallback((draggedNodeId: NodeId, targetNodeId: NodeId, position: "before" | "inside" | "after") => {
    const draggedNode = editorState.nodes[draggedNodeId];
    const targetNode = editorState.nodes[targetNodeId];
    
    if (!draggedNode || !targetNode) return;
    
    // Prevent dropping a node onto itself or its children
    const isDescendant = (nodeId: NodeId, ancestorId: NodeId): boolean => {
      const node = editorState.nodes[nodeId];
      if (!node) return false;
      if (node.parentId === ancestorId) return true;
      if (node.parentId) return isDescendant(node.parentId, ancestorId);
      return false;
    };
    
    if (draggedNodeId === targetNodeId || isDescendant(targetNodeId, draggedNodeId)) {
      return;
    }
    
    // Handle different drop positions
    if (position === "inside" && targetNode.type === "group") {
      // Drop inside a group
      editorDispatch(editorActions.updateNode(draggedNodeId, { parentId: targetNodeId }));
      
      // Expand the group if it's not already expanded
      if (!targetNode.expanded) {
        editorDispatch(editorActions.updateNode(targetNodeId, { expanded: true }));
      }
    } else {
      // Drop before or after a node
      const targetParentId = targetNode.parentId || undefined;
      
      // Update the dragged node's parent
      editorDispatch(editorActions.updateNode(draggedNodeId, { parentId: targetParentId }));
      
      // TODO: Implement sibling ordering if needed
      // This would require adding an order/index property to nodes
    }
  }, [editorState.nodes, editorDispatch, editorActions]);
  
  return (
    <div className={`${styles.nodeTreeList} ${className || ""}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>Layers</h3>
        <div className={styles.nodeCount}>
          {Object.keys(editorState.nodes).length} nodes
        </div>
      </div>
      
      <div className={styles.treeContainer} onClick={handleDeselectAll}>
        {sortedRootNodes.length === 0 ? (
          <div className={styles.emptyState}>
            No nodes yet
          </div>
        ) : (
          sortedRootNodes.map(node => (
            <ConnectedNodeTreeItem
              key={node.id}
              nodeId={node.id}
              level={0}
              dragState={dragState}
              onNodeDrop={handleNodeDrop}
              onDragStateChange={handleDragStateChange}
            />
          ))
        )}
      </div>
    </div>
  );
};