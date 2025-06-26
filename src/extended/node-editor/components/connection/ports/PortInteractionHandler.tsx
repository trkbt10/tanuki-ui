import * as React from "react";
import { Port, PortId, NodeId, Position } from "../../../types/core";
import { useNodeEditor } from "../../../contexts/NodeEditorContext";
import { useEditorActionState } from "../../../contexts/EditorActionStateContext";
import { useNodeCanvas } from "../../../contexts/NodeCanvasContext";
import { useNodeDefinitions } from "../../../contexts/NodeDefinitionContext";
import { usePointerDrag } from "../../../hooks/usePointerDrag";
import { calculateConnectablePorts } from "../../../utils/connectionValidation";

export interface PortInteractionHandlerProps {
  port: Port;
  node: { id: NodeId; position: Position };
  children: (props: {
    onPointerDown: (e: React.PointerEvent) => void;
    onPointerEnter: (e: React.PointerEvent) => void;
    onPointerLeave: (e: React.PointerEvent) => void;
    isHovered: boolean;
    isConnecting: boolean;
    isConnectable: boolean;
    isCandidate: boolean;
    isConnected: boolean;
  }) => React.ReactNode;
}

/**
 * Handles all port interaction logic including connections and hover states
 */
export const PortInteractionHandler: React.FC<PortInteractionHandlerProps> = ({
  port,
  node,
  children,
}) => {
  const { state: nodeEditorState, actions, dispatch } = useNodeEditor();
  const { state: actionState, dispatch: actionDispatch, actions: actionActions } = useEditorActionState();
  const { state: canvasState } = useNodeCanvas();
  const { registry } = useNodeDefinitions();

  // Check port states
  const isHovered = actionState.hoveredPort?.id === port.id;
  const isConnecting = actionState.connectionDragState?.fromPort.id === port.id;
  const isConnectable = actionState.connectablePortIds.has(port.id);
  const isCandidate = actionState.connectionDragState?.candidatePort?.id === port.id;
  const isConnected = actionState.connectedPorts.has(port.id);

  // Convert to Port for actions
  const actionPort: Port = {
    id: port.id,
    nodeId: port.nodeId,
    type: port.type,
    label: port.label,
    position: port.position,
  };

  // Get port element position for connection dragging
  const getPortElementPosition = React.useCallback((portElement: HTMLElement): Position => {
    const rect = portElement.getBoundingClientRect();
    const containerRect = portElement.closest('[data-node-layer]')?.getBoundingClientRect();
    
    if (!containerRect) return { x: 0, y: 0 };

    return {
      x: (rect.left + rect.width / 2 - containerRect.left) / canvasState.viewport.scale - canvasState.viewport.offset.x,
      y: (rect.top + rect.height / 2 - containerRect.top) / canvasState.viewport.scale - canvasState.viewport.offset.y,
    };
  }, [canvasState.viewport]);

  // Handle connection drag
  const handleConnectionDragStart = React.useCallback((event: PointerEvent, portElement: HTMLElement) => {
    const portPos = getPortElementPosition(portElement);
    
    // Calculate connectable ports based on fromPort
    const connectablePorts = calculateConnectablePorts(
      actionPort,
      nodeEditorState.nodes,
      registry,
      nodeEditorState.connections
    );
    
    // Start connection drag and update connectable ports
    actionDispatch(actionActions.startConnectionDrag(actionPort));
    actionDispatch(actionActions.updateConnectablePorts(connectablePorts));
  }, [actionPort, getPortElementPosition, actionDispatch, actionActions, nodeEditorState.nodes, nodeEditorState.connections, registry]);

  const handleConnectionDragMove = React.useCallback((event: PointerEvent, delta: Position) => {
    const currentPos = {
      x: event.clientX,
      y: event.clientY,
    };

    // Convert to canvas coordinates
    const containerRect = document.querySelector('[data-node-layer]')?.getBoundingClientRect();
    if (!containerRect) return;

    const canvasPos = {
      x: (currentPos.x - containerRect.left) / canvasState.viewport.scale - canvasState.viewport.offset.x,
      y: (currentPos.y - containerRect.top) / canvasState.viewport.scale - canvasState.viewport.offset.y,
    };

    actionDispatch(actionActions.updateConnectionDrag(canvasPos, null));
  }, [canvasState.viewport, actionDispatch, actionActions]);

  const handleConnectionDragEnd = React.useCallback((event: PointerEvent) => {
    if (!actionState.connectionDragState) return;

    const { fromPort, candidatePort } = actionState.connectionDragState;

    if (candidatePort && fromPort.id !== candidatePort.id) {
      // Check if we can create a connection
      const canConnect = 
        fromPort.type !== candidatePort.type && // Different port types
        fromPort.nodeId !== candidatePort.nodeId; // Different nodes

      if (canConnect) {
        // Create the connection
        const connection = {
          fromNodeId: fromPort.type === "output" ? fromPort.nodeId : candidatePort.nodeId,
          fromPortId: fromPort.type === "output" ? fromPort.id : candidatePort.id,
          toNodeId: fromPort.type === "input" ? fromPort.nodeId : candidatePort.nodeId,
          toPortId: fromPort.type === "input" ? fromPort.id : candidatePort.id,
        };

        dispatch(actions.addConnection(connection));
      }
    }

    // Clear drag state and connectable ports
    actionDispatch(actionActions.endConnectionDrag());
    actionDispatch(actionActions.updateConnectablePorts(new Set()));
  }, [actionState.connectionDragState, dispatch, actions, actionDispatch, actionActions]);

  const { startDrag } = usePointerDrag({
    onStart: handleConnectionDragStart,
    onMove: handleConnectionDragMove,
    onEnd: handleConnectionDragEnd,
    threshold: 2,
  });

  // Event handlers
  const handlePointerDown = React.useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    const portElement = e.currentTarget as HTMLElement;
    startDrag(e, portElement);
  }, [startDrag]);

  const handlePointerEnter = React.useCallback((e: React.PointerEvent) => {
    actionDispatch(actionActions.setHoveredPort(actionPort));

    // Update candidate port if we're dragging a connection and this port is connectable
    if (actionState.connectionDragState && 
        actionState.connectionDragState.fromPort.id !== port.id &&
        isConnectable) {
      actionDispatch(actionActions.updateConnectionDrag(
        actionState.connectionDragState.toPosition,
        actionPort
      ));
    }
  }, [actionPort, port, actionState.connectionDragState, isConnectable, actionDispatch, actionActions]);

  const handlePointerLeave = React.useCallback((e: React.PointerEvent) => {
    actionDispatch(actionActions.setHoveredPort(null));

    // Clear candidate port if we're dragging
    if (actionState.connectionDragState?.candidatePort?.id === port.id) {
      actionDispatch(actionActions.updateConnectionDrag(
        actionState.connectionDragState.toPosition,
        null
      ));
    }
  }, [port.id, actionState.connectionDragState, actionDispatch, actionActions]);

  return (
    <>
      {children({
        onPointerDown: handlePointerDown,
        onPointerEnter: handlePointerEnter,
        onPointerLeave: handlePointerLeave,
        isHovered,
        isConnecting,
        isConnectable,
        isCandidate,
        isConnected,
      })}
    </>
  );
};