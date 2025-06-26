import * as React from "react";
import { useNodeEditor } from "../../contexts/NodeEditorContext";
import { useEditorActionState } from "../../contexts/EditorActionStateContext";
import { useNodeCanvas } from "../../contexts/NodeCanvasContext";
import { ConnectionView } from "./ConnectionView";
import { calculateBezierPath, getPortPosition } from "./utils/connectionUtils";
import type { Connection, Node as EditorNode } from "../../types/core";
import { classNames } from "../../../../utilities/classNames";
import styles from "../../NodeEditor.module.css";

export interface ConnectionLayerProps {
  className?: string;
}

/**
 * ConnectionLayer - Renders all connections and handles connection interactions
 */
export const ConnectionLayer: React.FC<ConnectionLayerProps> = ({ className }) => {
  const { state: nodeEditorState } = useNodeEditor();

  return (
    <svg className={classNames(styles.connectionLayer, className)}>
      {/* Render all connections */}
      {Object.values(nodeEditorState.connections).map((connection) => {
        return <ConnectionRenderer key={connection.id} connection={connection} />;
      })}

      {/* Render drag connection */}
      <DragConnection />
    </svg>
  );
};

ConnectionLayer.displayName = "ConnectionLayer";
const DragConnection = React.memo(() => {
  const { state: actionState } = useEditorActionState();
  const { state: nodeEditorState, getPort } = useNodeEditor();
  if (actionState.connectionDragState) {
    const fromPort = actionState.connectionDragState.fromPort;
    const fromNode = nodeEditorState.nodes[fromPort.nodeId];
    if (!fromNode) return null;

    // Find the actual port data using context method
    const port = getPort(fromPort.nodeId, fromPort.id);
    if (!port) return null;

    const fromPos = getPortPosition(fromNode, port);
    const toPos = actionState.connectionDragState.toPosition;

    const pathData = calculateBezierPath(fromPos, toPos, port.position, "left");

    return (
      <g className={styles.dragConnection}>
        <path
          d={pathData}
          fill="none"
          stroke="var(--accentColor, #0066cc)"
          strokeWidth={2}
          strokeDasharray="5,5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pointerEvents: "none" }}
        />
      </g>
    );
  }

  // Render disconnect drag connection
  if (actionState.connectionDisconnectState) {
    const disconnectState = actionState.connectionDisconnectState;
    const fixedNode = nodeEditorState.nodes[disconnectState.fixedPort.nodeId];
    if (!fixedNode) return null;

    const fixedPort = getPort(disconnectState.fixedPort.nodeId, disconnectState.fixedPort.id);
    if (!fixedPort) return null;

    const fixedPos = getPortPosition(fixedNode, fixedPort);
    const draggingPos = disconnectState.draggingPosition;

    const pathData = calculateBezierPath(fixedPos, draggingPos, fixedPort.position, "left");

    return (
      <g className={styles.dragConnection}>
        <path
          d={pathData}
          fill="none"
          stroke="var(--cautionColor, #ff3b30)"
          strokeWidth={3}
          strokeDasharray="8,4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pointerEvents: "none" }}
        />
      </g>
    );
  }

  return null;
});
const ConnectionRenderer = ({ connection }: { connection: Connection }) => {
  const { state: nodeEditorState, getPort } = useNodeEditor();
  const { state: actionState, dispatch: actionDispatch, actions: actionActions } = useEditorActionState();
  const { state: canvasState } = useNodeCanvas();

  // Handle connection pointer events
  const handleConnectionPointerDown = React.useCallback(
    (e: React.PointerEvent, connectionId: string) => {
      const fromNode = nodeEditorState.nodes[connection.fromNodeId];
      const toNode = nodeEditorState.nodes[connection.toNodeId];
      const fromPort = getPort(connection.fromNodeId, connection.fromPortId);
      const toPort = getPort(connection.toNodeId, connection.toPortId);

      if (!fromNode || !toNode || !fromPort || !toPort) return;

      // Calculate positions
      const fromPos = getPortPosition(fromNode, fromPort);
      const toPos = getPortPosition(toNode, toPort);
      const midPoint = {
        x: (fromPos.x + toPos.x) / 2,
        y: (fromPos.y + toPos.y) / 2,
      };

      // Get click position in canvas coordinates
      const rect = e.currentTarget.closest("svg")?.getBoundingClientRect();
      if (!rect) return;

      const clickPos = {
        x: (e.clientX - rect.left) / canvasState.viewport.scale - canvasState.viewport.offset.x,
        y: (e.clientY - rect.top) / canvasState.viewport.scale - canvasState.viewport.offset.y,
      };

      // Calculate distance from midpoint
      const distance = Math.sqrt(Math.pow(clickPos.x - midPoint.x, 2) + Math.pow(clickPos.y - midPoint.y, 2));

      const connectionLength = Math.sqrt(Math.pow(toPos.x - fromPos.x, 2) + Math.pow(toPos.y - fromPos.y, 2));

      // Select the connection
      const isMultiSelect = e.shiftKey || e.metaKey || e.ctrlKey;
      actionDispatch(actionActions.selectConnection(connectionId, isMultiSelect));
    },
    [connection, nodeEditorState, getPort, actionDispatch, actionActions, canvasState.viewport]
  );

  const handleConnectionPointerEnter = React.useCallback(
    (e: React.PointerEvent, connectionId: string) => {
      actionDispatch(actionActions.setHoveredConnection(connectionId));
    },
    [actionDispatch, actionActions]
  );

  const handleConnectionPointerLeave = React.useCallback(
    (e: React.PointerEvent, connectionId: string) => {
      actionDispatch(actionActions.setHoveredConnection(null));
    },
    [actionDispatch, actionActions]
  );
  const fromNode = nodeEditorState.nodes[connection.fromNodeId];
  const toNode = nodeEditorState.nodes[connection.toNodeId];

  const fromPort = getPort(connection.fromNodeId, connection.fromPortId);
  const toPort = getPort(connection.toNodeId, connection.toPortId);
  // Skip if nodes or ports are missing
  if (!fromNode || !toNode || !fromPort || !toPort) return null;

  // Skip if nodes are not visible
  if (fromNode.visible === false || toNode.visible === false) return null;

  // Get preview position and size for nodes during drag or resize
  const getNodePreviewData = (node: EditorNode, nodeId: string) => {
    let previewPosition = null;
    let previewSize = null;

    // Check for drag state
    if (actionState.dragState) {
      const { nodeIds, offset, affectedChildNodes } = actionState.dragState;

      // Check if this node is directly being dragged
      if (nodeIds.includes(nodeId)) {
        previewPosition = {
          x: node.position.x + offset.x,
          y: node.position.y + offset.y,
        };
      } else {
        // Check if this node is a child of a dragging group
        const isChildOfDraggingGroup = Object.entries(affectedChildNodes).some(([groupId, childIds]) =>
          childIds.includes(nodeId)
        );

        if (isChildOfDraggingGroup) {
          previewPosition = {
            x: node.position.x + offset.x,
            y: node.position.y + offset.y,
          };
        }
      }
    }

    // Check for resize state
    if (actionState.resizeState && actionState.resizeState.nodeId === nodeId) {
      previewSize = actionState.resizeState.currentSize;
    }

    return { previewPosition, previewSize };
  };

  const fromNodeData = getNodePreviewData(fromNode, connection.fromNodeId);
  const toNodeData = getNodePreviewData(toNode, connection.toNodeId);
  return (
    <ConnectionView
      key={connection.id}
      connection={connection}
      fromNode={fromNode}
      toNode={toNode}
      fromPort={fromPort}
      toPort={toPort}
      fromNodePosition={fromNodeData.previewPosition || undefined}
      toNodePosition={toNodeData.previewPosition || undefined}
      fromNodeSize={fromNodeData.previewSize || undefined}
      toNodeSize={toNodeData.previewSize || undefined}
      isSelected={actionState.selectedConnectionIds.includes(connection.id)}
      isHovered={actionState.hoveredConnectionId === connection.id}
      onPointerDown={handleConnectionPointerDown}
      onPointerEnter={handleConnectionPointerEnter}
      onPointerLeave={handleConnectionPointerLeave}
    />
  );
};
