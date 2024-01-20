import * as React from "react";
import { classNames } from "../../../utilities/classNames";
import { useEditorActionState } from "../contexts/EditorActionStateContext";
import { useNodeCanvas } from "../contexts/NodeCanvasContext";
import { useNodeDefinitions } from "../contexts/NodeDefinitionContext";
import { useNodeEditor } from "../contexts/NodeEditorContext";
import { useGroupManagement } from "../hooks/useGroupManagement";
import { useNodeResize } from "../hooks/useNodeResize";
import { useVisibleNodes } from "../hooks/useVisibleNodes";
import styles from "../NodeEditor.module.css";
import type { Port } from "../types/core";
import { getPortPosition } from "../utils/connectionUtils";
import { snapMultipleToGrid } from "../utils/gridSnap";
import { NodeView } from "./NodeView";

export interface NodeLayerProps {
  className?: string;
  doubleClickToEdit?: boolean;
}

/**
 * NodeLayer - Renders all nodes with optimized performance
 */
export const NodeLayer: React.FC<NodeLayerProps> = ({ className, doubleClickToEdit = true }) => {
  const { state: nodeEditorState, dispatch: nodeEditorDispatch, actions: nodeEditorActions } = useNodeEditor();
  const { state: actionState, dispatch: actionDispatch, actions: actionActions } = useEditorActionState();
  const { state: canvasState } = useNodeCanvas();

  // Helper to get node definition
  const getNodeDef = useNodeDefinitions();

  // Initialize hooks
  const nodeResize = useNodeResize({
    minWidth: 100,
    minHeight: 40,
    snapToGrid: canvasState.gridSettings.snapToGrid,
    gridSize: canvasState.gridSettings.size,
  });

  const groupManager = useGroupManagement({
    autoUpdateMembership: true,
    membershipUpdateDelay: 200,
  });

  // Get only visible nodes for virtualization
  const visibleNodes = useVisibleNodes(nodeEditorState.nodes);

  // Memoize sorted visible nodes
  const sortedNodes = React.useMemo(() => {
    // Groups render first (lower z-index)
    return visibleNodes.sort((a, b) => {
      if (a.type === "group" && b.type !== "group") return -1;
      if (a.type !== "group" && b.type === "group") return 1;
      return 0;
    });
  }, [visibleNodes]);

  // Calculate connected ports once
  const connectedPorts = React.useMemo(() => {
    const ports = new Set<string>();
    Object.values(nodeEditorState.connections).forEach((connection) => {
      ports.add(connection.fromPortId);
      ports.add(connection.toPortId);
    });
    return ports;
  }, [nodeEditorState.connections]);

  // Update connected ports in action state only when changed
  React.useEffect(() => {
    actionDispatch(actionActions.updateConnectedPorts(connectedPorts));
  }, [connectedPorts, actionDispatch, actionActions]);

  // Event handlers
  const handleNodeContextMenu = React.useCallback(
    (e: React.MouseEvent, nodeId: string) => {
      e.preventDefault();
      e.stopPropagation();

      const position = {
        x: e.clientX,
        y: e.clientY,
      };

      actionDispatch(actionActions.showContextMenu(position, nodeId));
    },
    [actionDispatch, actionActions],
  );

  const handleNodePointerDown = React.useCallback(
    (e: React.PointerEvent, nodeId: string, isDragAllowed: boolean = true) => {
      if (e.button !== 0) return;

      e.stopPropagation();

      const clickedNode = nodeEditorState.nodes[nodeId];
      const isMultiSelect = e.shiftKey || e.metaKey || e.ctrlKey;

      if (clickedNode?.locked) {
        actionDispatch(actionActions.selectNode(nodeId, isMultiSelect));
        return;
      }

      // Get node definition to check if it's interactive
      const nodeDefinition = clickedNode ? getNodeDef.registry.get(clickedNode.type) : undefined;
      const isInteractive = nodeDefinition?.interactive;

      // For interactive nodes, check if dragging is allowed
      if (isInteractive && !isDragAllowed && !actionState.selectedNodeIds.includes(nodeId)) {
        // Just select the node without starting drag
        actionDispatch(actionActions.selectNode(nodeId, isMultiSelect));
        return;
      }

      // Determine nodes to drag
      let nodesToDrag: string[];

      if (actionState.selectedNodeIds.includes(nodeId)) {
        // Filter out locked nodes and child nodes of selected groups
        nodesToDrag = actionState.selectedNodeIds.filter((id) => {
          const node = nodeEditorState.nodes[id];
          if (!node || node.locked) return false;

          // Skip children if parent is selected
          if (node.parentId && actionState.selectedNodeIds.includes(node.parentId)) {
            return false;
          }

          return true;
        });
      } else {
        actionDispatch(actionActions.selectNode(nodeId, isMultiSelect));

        if (isMultiSelect) {
          const allSelected = [...actionState.selectedNodeIds, nodeId];
          nodesToDrag = allSelected.filter((id) => {
            const node = nodeEditorState.nodes[id];
            if (!node || node.locked) return false;

            if (node.parentId && allSelected.includes(node.parentId)) {
              return false;
            }

            return true;
          });
        } else {
          // For single node, check if it's interactive and drag is not allowed
          if (isInteractive && !isDragAllowed) {
            return; // Don't start drag
          }
          nodesToDrag = [nodeId];
        }
      }

      if (nodesToDrag.length === 0) return;

      const startPosition = {
        x: e.clientX,
        y: e.clientY,
      };

      // Collect initial positions
      const initialPositions: Record<string, { x: number; y: number }> = {};
      const affectedChildNodes: Record<string, string[]> = {};

      nodesToDrag.forEach((id) => {
        const node = nodeEditorState.nodes[id];
        if (node) {
          initialPositions[id] = { ...node.position };

          if (node.type === "group") {
            const children = groupManager.getGroupChildren(id);
            affectedChildNodes[id] = children.map((child) => child.id);

            children.forEach((child) => {
              initialPositions[child.id] = { ...child.position };
            });
          }
        }
      });

      actionDispatch(actionActions.startNodeDrag(nodesToDrag, startPosition, initialPositions, affectedChildNodes));
    },
    [actionDispatch, actionActions, actionState.selectedNodeIds, nodeEditorState.nodes, groupManager, getNodeDef],
  );

  // Port event handlers
  const handlePortPointerDown = React.useCallback(
    (e: React.PointerEvent, port: Port) => {
      e.stopPropagation();

      const node = nodeEditorState.nodes[port.nodeId];
      if (!node) return;

      const portPosition = getPortPosition(node, port);

      // Check if port is connected
      const existingConnections = Object.values(nodeEditorState.connections).filter(
        (conn) =>
          (conn.fromPortId === port.id && conn.fromNodeId === port.nodeId) ||
          (conn.toPortId === port.id && conn.toNodeId === port.nodeId),
      );

      if (existingConnections.length > 0) {
        // Handle disconnect
        const connection = existingConnections[0];
        const isFromPort = connection.fromPortId === port.id && connection.fromNodeId === port.nodeId;

        const otherNodeId = isFromPort ? connection.toNodeId : connection.fromNodeId;
        const otherPortId = isFromPort ? connection.toPortId : connection.fromPortId;
        const otherNode = nodeEditorState.nodes[otherNodeId];
        const otherPort = otherNode?.ports?.find((p) => p.id === otherPortId);

        if (otherNode && otherPort) {
          const fixedPort: Port = {
            id: otherPort.id,
            nodeId: otherNode.id,
            type: otherPort.type,
            label: otherPort.label,
            position: otherPort.position,
          };

          actionDispatch(
            actionActions.startConnectionDisconnect(
              {
                id: connection.id,
                fromNodeId: connection.fromNodeId,
                fromPortId: connection.fromPortId,
                toNodeId: connection.toNodeId,
                toPortId: connection.toPortId,
              },
              isFromPort ? "from" : "to",
              fixedPort,
              portPosition,
            ),
          );

          nodeEditorDispatch(nodeEditorActions.deleteConnection(connection.id));
        }
      } else {
        // Start new connection
        const actionPort: Port = {
          id: port.id,
          nodeId: port.nodeId,
          type: port.type,
          label: port.label,
          position: port.position,
        };
        actionDispatch(actionActions.startConnectionDrag(actionPort));
        actionDispatch(actionActions.updateConnectionDrag(portPosition, null));
      }
    },
    [nodeEditorState.connections, nodeEditorState.nodes, actionDispatch, actionActions, nodeEditorDispatch, nodeEditorActions],
  );

  const handlePortPointerUp = React.useCallback(
    (e: React.PointerEvent, port: Port) => {
      e.stopPropagation();

      // Handle reconnection from disconnect drag
      if (actionState.connectionDisconnectState) {
        const disconnectState = actionState.connectionDisconnectState;
        const fixedPort = disconnectState.fixedPort;

        const isCompatible = fixedPort.type !== port.type;
        const isSameNode = fixedPort.nodeId === port.nodeId;

        if (isCompatible && !isSameNode) {
          let newConnection;
          if (fixedPort.type === "output") {
            newConnection = {
              fromNodeId: fixedPort.nodeId,
              fromPortId: fixedPort.id,
              toNodeId: port.nodeId,
              toPortId: port.id,
            };
          } else {
            newConnection = {
              fromNodeId: port.nodeId,
              fromPortId: port.id,
              toNodeId: fixedPort.nodeId,
              toPortId: fixedPort.id,
            };
          }

          nodeEditorDispatch(nodeEditorActions.addConnection(newConnection));
        }

        actionDispatch(actionActions.endConnectionDisconnect());
        return;
      }

      // Handle new connection
      if (actionState.connectionDragState) {
        const fromPort = actionState.connectionDragState.fromPort;
        const fromNodeId = fromPort.nodeId;
        const toNodeId = port.nodeId;

        const isCompatible = fromPort.type !== port.type;

        if (fromNodeId !== toNodeId && isCompatible) {
          let connection;
          if (fromPort.type === "output") {
            connection = {
              fromNodeId: fromNodeId,
              fromPortId: fromPort.id,
              toNodeId: toNodeId,
              toPortId: port.id,
            };
          } else {
            connection = {
              fromNodeId: toNodeId,
              fromPortId: port.id,
              toNodeId: fromNodeId,
              toPortId: fromPort.id,
            };
          }

          nodeEditorDispatch(nodeEditorActions.addConnection(connection));
        }

        actionDispatch(actionActions.endConnectionDrag());
      }
    },
    [
      actionState.connectionDragState,
      actionState.connectionDisconnectState,
      actionDispatch,
      actionActions,
      nodeEditorDispatch,
      nodeEditorActions,
    ],
  );

  const handlePortPointerEnter = React.useCallback(
    (e: React.PointerEvent, port: Port) => {
      const actionPort: Port = {
        id: port.id,
        nodeId: port.nodeId,
        type: port.type,
        label: port.label,
        position: port.position,
      };
      actionDispatch(actionActions.setHoveredPort(actionPort));
    },
    [actionDispatch, actionActions],
  );

  const handlePortPointerLeave = React.useCallback(() => {
    actionDispatch(actionActions.setHoveredPort(null));
  }, [actionDispatch, actionActions]);

  // Global drag handler
  React.useEffect(() => {
    if (!actionState.dragState) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!actionState.dragState) return;
      const deltaX = (e.clientX - actionState.dragState.startPosition.x) / canvasState.viewport.scale;
      const deltaY = (e.clientY - actionState.dragState.startPosition.y) / canvasState.viewport.scale;

      actionDispatch(actionActions.updateNodeDrag({ x: deltaX, y: deltaY }));
    };

    const handlePointerUp = () => {
      if (!actionState.dragState) return;
      const { nodeIds, initialPositions, offset } = actionState.dragState;

      // Calculate new positions
      const newPositions: Record<string, { x: number; y: number }> = {};
      nodeIds.forEach((nodeId) => {
        const initialPos = initialPositions[nodeId];
        if (initialPos) {
          newPositions[nodeId] = {
            x: initialPos.x + offset.x,
            y: initialPos.y + offset.y,
          };
        }
      });

      // Apply grid snapping if enabled
      const snappedPositions = canvasState.gridSettings.snapToGrid
        ? snapMultipleToGrid(newPositions, canvasState.gridSettings, nodeIds[0])
        : newPositions;

      // Handle group movement
      const groupsToMove = nodeIds.filter((nodeId) => {
        const node = nodeEditorState.nodes[nodeId];
        return node && node.type === "group";
      });

      if (groupsToMove.length > 0) {
        groupsToMove.forEach((groupId) => {
          const initialPos = initialPositions[groupId];
          const finalPos = snappedPositions[groupId];
          if (initialPos && finalPos) {
            const delta = {
              x: finalPos.x - initialPos.x,
              y: finalPos.y - initialPos.y,
            };
            groupManager.moveGroupWithChildren(groupId, delta);
          }
        });

        // Update non-group nodes
        const nonGroupPositions: Record<string, { x: number; y: number }> = {};
        nodeIds.forEach((nodeId) => {
          const node = nodeEditorState.nodes[nodeId];
          if (node && node.type !== "group" && snappedPositions[nodeId]) {
            nonGroupPositions[nodeId] = snappedPositions[nodeId];
          }
        });

        if (Object.keys(nonGroupPositions).length > 0) {
          nodeEditorDispatch(nodeEditorActions.moveNodes(nonGroupPositions));
        }
      } else {
        nodeEditorDispatch(nodeEditorActions.moveNodes(snappedPositions));
      }

      actionDispatch(actionActions.endNodeDrag());
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { once: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [
    actionState.dragState,
    canvasState.viewport.scale,
    canvasState.gridSettings,
    actionDispatch,
    actionActions,
    nodeEditorDispatch,
    nodeEditorActions,
    nodeEditorState.nodes,
    groupManager,
  ]);

  // Global connection drag handler
  React.useEffect(() => {
    if (!actionState.connectionDragState) return;

    const canvasElement = document.querySelector('[role="application"]');
    if (!canvasElement) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvasElement.getBoundingClientRect();
      const canvasX = (e.clientX - rect.left - canvasState.viewport.offset.x) / canvasState.viewport.scale;
      const canvasY = (e.clientY - rect.top - canvasState.viewport.offset.y) / canvasState.viewport.scale;

      actionDispatch(actionActions.updateConnectionDrag({ x: canvasX, y: canvasY }, null));
    };

    const handlePointerUp = () => {
      actionDispatch(actionActions.endConnectionDrag());
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { once: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [actionState.connectionDragState, canvasState.viewport, actionDispatch, actionActions]);

  // Global connection disconnect handler
  React.useEffect(() => {
    if (!actionState.connectionDisconnectState) return;

    const canvasElement = document.querySelector('[role="application"]');
    if (!canvasElement) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvasElement.getBoundingClientRect();
      const canvasX = (e.clientX - rect.left - canvasState.viewport.offset.x) / canvasState.viewport.scale;
      const canvasY = (e.clientY - rect.top - canvasState.viewport.offset.y) / canvasState.viewport.scale;

      actionDispatch(actionActions.updateConnectionDisconnect({ x: canvasX, y: canvasY }, null));
    };

    const handlePointerUp = () => {
      actionDispatch(actionActions.endConnectionDisconnect());
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { once: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [actionState.connectionDisconnectState, canvasState.viewport, actionDispatch, actionActions]);

  return (
    <div className={classNames(styles.nodeLayer, className)}>
      {sortedNodes.map((node) => (
        <NodeView
          key={node.id}
          node={node}
          isSelected={actionState.selectedNodeIds.includes(node.id)}
          isDragging={actionState.dragState?.nodeIds.includes(node.id) ?? false}
          dragOffset={actionState.dragState?.nodeIds.includes(node.id) ? actionState.dragState.offset : undefined}
          onPointerDown={handleNodePointerDown}
          onContextMenu={handleNodeContextMenu}
          onPortPointerDown={handlePortPointerDown}
          onPortPointerUp={handlePortPointerUp}
          onPortPointerEnter={handlePortPointerEnter}
          onPortPointerLeave={handlePortPointerLeave}
          connectingPort={
            actionState.connectionDragState?.fromPort
              ? {
                  id: actionState.connectionDragState.fromPort.id,
                  type: actionState.connectionDragState.fromPort.type,
                  label: actionState.connectionDragState.fromPort.label,
                  nodeId: actionState.connectionDragState.fromPort.nodeId,
                  position: actionState.connectionDragState.fromPort.position,
                }
              : undefined
          }
          hoveredPort={
            actionState.hoveredPort
              ? {
                  id: actionState.hoveredPort.id,
                  type: actionState.hoveredPort.type,
                  label: actionState.hoveredPort.label,
                  nodeId: actionState.hoveredPort.nodeId,
                  position: actionState.hoveredPort.position,
                }
              : undefined
          }
          connectedPorts={connectedPorts}
        />
      ))}
    </div>
  );
};

NodeLayer.displayName = "NodeLayer";
