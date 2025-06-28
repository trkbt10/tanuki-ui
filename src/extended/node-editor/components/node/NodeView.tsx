import * as React from "react";
import type { Node, Position, Port } from "../../types/core";
import { useInlineEditing } from "../../contexts/InlineEditingContext";
import { useNodeEditor } from "../../contexts/NodeEditorContext";
import { useNodeDefinition } from "../../contexts/NodeDefinitionContext";
import { useExternalDataRef } from "../../contexts/ExternalDataContext";
import { useExternalData } from "../../hooks/useExternalData";
import { DefaultNodeRenderer } from "./renderers/DefaultRenderers";
import { classNames } from "../elements";
import styles from "../../NodeEditor.module.css";
import { PortView } from "../connection/ports/PortView";
import { ResizeHandle } from "../parts/ResizeHandle";
import { useEditorActionState } from "../../contexts/EditorActionStateContext";
import { useNodeResize } from "../../hooks/useNodeResize";
import { useGroupManagement } from "../../hooks/useGroupManagement";

export interface CustomNodeRendererProps {
  node: Node;
  isSelected: boolean;
  isDragging: boolean;
  isEditing: boolean;
  externalData: unknown;
  isLoadingExternalData: boolean;
  externalDataError: Error | null;
  onStartEdit: () => void;
  onUpdateNode: (updates: Partial<Node>) => void;
}

export interface NodeViewProps {
  node: Node;
  isSelected: boolean;
  isDragging: boolean;
  isResizing?: boolean;
  dragOffset?: Position;
  onPointerDown: (e: React.PointerEvent, nodeId: string, isDragAllowed?: boolean) => void;
  onContextMenu: (e: React.MouseEvent, nodeId: string) => void;
  onPortPointerDown?: (e: React.PointerEvent, port: Port) => void;
  onPortPointerUp?: (e: React.PointerEvent, port: Port) => void;
  onPortPointerEnter?: (e: React.PointerEvent, port: Port) => void;
  onPortPointerLeave?: (e: React.PointerEvent, port: Port) => void;
  connectingPort?: Port;
  hoveredPort?: Port;
  connectedPorts?: Set<string>;
  nodeRenderer?: (props: CustomNodeRendererProps) => React.ReactNode;
  externalData?: unknown;
  onUpdateNode?: (updates: Partial<Node>) => void;
}

// Optimized NodeView component with CSS transform for dragging
const NodeViewComponent: React.FC<NodeViewProps> = ({
  node,
  isSelected,
  isDragging,
  dragOffset,
  onPointerDown,
  onContextMenu,
  onPortPointerDown,
  onPortPointerUp,
  onPortPointerEnter,
  onPortPointerLeave,
  connectingPort,
  hoveredPort,
  connectedPorts,
  nodeRenderer,
  externalData,
  onUpdateNode,
}) => {
  const { dispatch: nodeEditorDispatch, actions: nodeEditorActions, getNodePorts } = useNodeEditor();
  const { state: actionState } = useEditorActionState();
  const { isEditing, startEditing, updateValue, confirmEdit, cancelEdit, state: editingState } = useInlineEditing();
  const nodeResize = useNodeResize();
  const groupManager = useGroupManagement({ autoUpdateMembership: false });
  const nodeDefinition = useNodeDefinition(node.type);
  const externalDataRef = useExternalDataRef(node.id);
  const externalDataState = useExternalData(node, externalDataRef);

  // Reference to the DOM element for direct transform updates
  const nodeRef = React.useRef<HTMLDivElement>(null);

  // Check if this node is being resized
  const isResizing = nodeResize.isResizing(node.id);
  const currentResizeHandle = nodeResize.getResizeHandle(node.id);

  // Group-related state
  const groupChildren = node.type === "group" ? groupManager.getGroupChildren(node.id) : [];
  const hasChildren = groupChildren.length > 0;

  // Base position (without drag offset)
  const basePosition = React.useMemo(
    () => ({
      x: node.position.x,
      y: node.position.y,
    }),
    [node.position.x, node.position.y]
  );

  // Apply drag transform via CSS for performance
  React.useLayoutEffect(() => {
    if (!nodeRef.current) return;

    let transformX = basePosition.x;
    let transformY = basePosition.y;

    // Apply drag offset if dragging
    if (isDragging && dragOffset) {
      transformX += dragOffset.x;
      transformY += dragOffset.y;
    } else if (actionState.dragState) {
      // Check if this is a child being dragged
      const { affectedChildNodes, offset } = actionState.dragState;
      const isChildOfDraggingGroup = Object.entries(affectedChildNodes).some(([groupId, childIds]) =>
        childIds.includes(node.id)
      );

      if (isChildOfDraggingGroup) {
        transformX += offset.x;
        transformY += offset.y;
      }
    }

    // Apply transform directly to DOM for performance
    nodeRef.current.style.transform = `translate(${transformX}px, ${transformY}px)`;
  }, [basePosition, isDragging, dragOffset, actionState.dragState, node.id]);

  // Calculate actual size including resize state
  const size = React.useMemo(() => {
    const baseSize = {
      width: node.size?.width || 150,
      height: node.size?.height || 50,
    };
    const currentSize = nodeResize.getCurrentSize(node.id);
    if (isResizing && currentSize) {
      return currentSize;
    }
    return baseSize;
  }, [node.size, isResizing, nodeResize, node.id]);

  // Get visual style class based on node state
  const visualStyleClass = React.useMemo(() => {
    const visualState = node.data.visualState;
    switch (visualState) {
      case "info":
        return styles.nodeInfo;
      case "success":
        return styles.nodeSuccess;
      case "warning":
        return styles.nodeWarning;
      case "error":
        return styles.nodeError;
      case "disabled":
        return styles.nodeDisabled;
      default:
        return null;
    }
  }, [node.data.visualState]);

  // Memoized event handlers
  const handleTitleDoubleClick = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!node.locked) {
        const currentTitle = node.data.title || `Node ${node.id.slice(0, 6)}`;
        startEditing(node.id, "title", currentTitle);
      }
    },
    [node.id, node.data.title, node.locked, startEditing]
  );

  const handleEditingChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateValue(e.target.value);
    },
    [updateValue]
  );

  const handleEditingKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        nodeEditorDispatch(
          nodeEditorActions.updateNode(node.id, {
            data: {
              ...node.data,
              title: editingState.currentValue,
            },
          })
        );
        confirmEdit();
      } else if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        cancelEdit();
      }
    },
    [editingState.currentValue, node.id, node.data, nodeEditorDispatch, nodeEditorActions, confirmEdit, cancelEdit]
  );

  const handleEditingBlur = React.useCallback(() => {
    nodeEditorDispatch(
      nodeEditorActions.updateNode(node.id, {
        data: {
          ...node.data,
          title: editingState.currentValue,
        },
      })
    );
    confirmEdit();
  }, [editingState.currentValue, node.id, node.data, nodeEditorDispatch, nodeEditorActions, confirmEdit]);

  const handleUpdateNode = React.useCallback(
    (updates: Partial<Node>) => {
      nodeEditorDispatch(nodeEditorActions.updateNode(node.id, updates));
    },
    [node.id, nodeEditorDispatch, nodeEditorActions]
  );

  const handleResizeStart = React.useCallback(
    (e: React.PointerEvent, handle: "se") => {
      e.stopPropagation();
      e.preventDefault();

      if (node.locked) return;

      const currentSize = {
        width: node.size?.width || 150,
        height: node.size?.height || 50,
      };

      nodeResize.startResize(node.id, handle, { x: e.clientX, y: e.clientY }, currentSize);
    },
    [node.id, node.size, node.locked, nodeResize]
  );

  // Check if we should use custom renderer
  const useCustomRenderer = nodeDefinition?.renderNode && !isEditing(node.id, "title");

  // Custom renderer props
  const customRenderProps = React.useMemo(
    () => ({
      node,
      isSelected,
      isDragging,
      isEditing: isEditing(node.id, "title"),
      externalData: externalDataState.data,
      isLoadingExternalData: externalDataState.isLoading,
      externalDataError: externalDataState.error,
      onStartEdit: () => startEditing(node.id, "title", node.data.title || ""),
      onUpdateNode: handleUpdateNode,
    }),
    [node, isSelected, isDragging, externalDataState, startEditing, handleUpdateNode, isEditing]
  );

  // Calculate child dragging state
  const isChildDragging = React.useMemo(() => {
    if (!actionState.dragState) return false;
    const { affectedChildNodes } = actionState.dragState;
    return Object.entries(affectedChildNodes).some(([groupId, childIds]) => childIds.includes(node.id));
  }, [actionState.dragState, node.id]);

  // Handle pointer down on node
  const handleNodePointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      // Check if this is an interactive node from the definition
      const isInteractive = nodeDefinition?.interactive;

      // For interactive nodes, check if we're clicking on the drag handle area
      if (isInteractive && !isSelected) {
        const target = e.target as HTMLElement;
        const isDragHandle = target.closest('[data-drag-handle="true"]');

        // Only allow dragging from drag handle for interactive nodes when not multi-selected
        onPointerDown(e, node.id, !!isDragHandle);
      } else {
        // For non-interactive nodes or when selected, allow dragging from anywhere
        onPointerDown(e, node.id, true);
      }
    },
    [nodeDefinition?.interactive, node.id, isSelected, onPointerDown]
  );

  return (
    <div
      ref={nodeRef}
      className={classNames(
        styles.nodeView,
        node.type === "group" && styles.groupNode,
        node.type === "group" && hasChildren && styles.groupHasChildren,
        isSelected && styles.selected,
        (isDragging || isChildDragging) && styles.dragging,
        isResizing && styles.resizing,
        node.locked && styles.locked,
        visualStyleClass || undefined
      )}
      style={{
        width: size.width,
        height: size.height,
        zIndex: isDragging || isResizing ? 1000 : node.type === "group" ? 1 : 2,
      }}
      onPointerDown={handleNodePointerDown}
      onContextMenu={(e) => onContextMenu(e, node.id)}
      data-node-id={node.id}
    >
      {useCustomRenderer && nodeDefinition?.renderNode ? (
        <div className={styles.customNodeContent}>{nodeDefinition.renderNode(customRenderProps)}</div>
      ) : (
        <>
          <div
            className={classNames(
              styles.nodeHeader,
              nodeDefinition?.interactive && !isSelected && styles.interactiveDragHandle
            )}
            data-drag-handle={nodeDefinition?.interactive ? "true" : "false"}
          >
            {node.locked && <span className={styles.lockIcon}>🔒</span>}
            {isEditing(node.id, "title") ? (
              <input
                id={`node-title-${node.id}`}
                name="nodeTitle"
                className={styles.nodeTitleInput}
                type="text"
                value={editingState.currentValue}
                onChange={handleEditingChange}
                onKeyDown={handleEditingKeyDown}
                onBlur={handleEditingBlur}
                autoFocus
                onClick={(e) => e.stopPropagation()}
                aria-label="Node title"
              />
            ) : (
              <span className={styles.nodeTitle} onDoubleClick={handleTitleDoubleClick}>
                {node.data.title || `Node ${node.id.slice(0, 6)}`}
              </span>
            )}
          </div>

          <div className={styles.nodeContent}>
            {node.type === "group" ? (
              <GroupContent node={node} childCount={groupChildren.length} />
            ) : (
              node.data.content || "Empty node"
            )}
          </div>
        </>
      )}

      {/* Render ports */}
      {(() => {
        const ports = getNodePorts(node.id);
        if (!ports || ports.length === 0) return null;

        const portsByPosition = ports.reduce((acc: Record<string, Port[]>, port: Port) => {
          if (!acc[port.position]) {
            acc[port.position] = [];
          }
          acc[port.position].push(port);
          return acc;
        }, {} as Record<string, Port[]>);

        return (
          <div className={styles.nodePorts}>
            {ports.map((port: Port) => {
              return (
                <PortView
                  key={port.id}
                  port={port}
                  onPointerDown={onPortPointerDown}
                  onPointerUp={onPortPointerUp}
                  onPointerEnter={onPortPointerEnter}
                  onPointerLeave={onPortPointerLeave}
                  isConnecting={actionState.connectionDragState?.fromPort.id === port.id}
                  isConnectable={actionState.connectablePortIds.has(port.id)}
                  isCandidate={actionState.connectionDragState?.candidatePort?.id === port.id}
                  isHovered={hoveredPort?.id === port.id}
                  isConnected={connectedPorts?.has(port.id)}
                />
              );
            })}
          </div>
        );
      })()}

      {/* Render resize handle when selected and not locked */}
      {isSelected && !node.locked && (
        <ResizeHandle position="se" onResizeStart={handleResizeStart} isResizing={currentResizeHandle === "se"} />
      )}
    </div>
  );
};

const GroupContent: React.FC<{ node: Node; childCount: number }> = ({ node, childCount }) => {
  if (!node.expanded) {
    return (
      <div className={styles.groupCollapsed}>
        {childCount > 0 ? `${childCount} nodes - Click to expand` : "Empty group - Drop nodes here"}
      </div>
    );
  }

  return (
    <div className={styles.groupExpanded}>
      {childCount > 0 ? `Contains ${childCount} nodes` : "Empty group - Drop nodes here"}
    </div>
  );
};

// Custom comparison function for memo
const areEqual = (prevProps: NodeViewProps, nextProps: NodeViewProps): boolean => {
  // Always re-render if basic properties change
  if (
    prevProps.node.id !== nextProps.node.id ||
    prevProps.isSelected !== nextProps.isSelected ||
    prevProps.isDragging !== nextProps.isDragging ||
    prevProps.isResizing !== nextProps.isResizing
  ) {
    return false;
  }

  // Check node data changes
  if (
    prevProps.node.position.x !== nextProps.node.position.x ||
    prevProps.node.position.y !== nextProps.node.position.y ||
    prevProps.node.size?.width !== nextProps.node.size?.width ||
    prevProps.node.size?.height !== nextProps.node.size?.height ||
    prevProps.node.locked !== nextProps.node.locked ||
    prevProps.node.data !== nextProps.node.data
  ) {
    return false;
  }

  // Check drag offset changes
  if (prevProps.dragOffset?.x !== nextProps.dragOffset?.x || prevProps.dragOffset?.y !== nextProps.dragOffset?.y) {
    return false;
  }

  // Check port-related changes
  if (
    prevProps.connectingPort?.id !== nextProps.connectingPort?.id ||
    prevProps.hoveredPort?.id !== nextProps.hoveredPort?.id
  ) {
    return false;
  }

  // Check if connected ports have changed for this node
  if (prevProps.node.ports) {
    for (const port of prevProps.node.ports) {
      const prevConnected = prevProps.connectedPorts?.has(port.id) ?? false;
      const nextConnected = nextProps.connectedPorts?.has(port.id) ?? false;
      if (prevConnected !== nextConnected) {
        return false;
      }
    }
  }

  // Props are equal, skip re-render
  return true;
};

// Export memoized component
export const NodeView = React.memo(NodeViewComponent, areEqual);

NodeView.displayName = "NodeView";
