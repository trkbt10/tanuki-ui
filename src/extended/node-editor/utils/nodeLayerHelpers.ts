import type { Port, Node, Connection, GridSettings } from "../types/core";

/**
 * Check if a port has any connections
 */
export function getPortConnections(
  port: Port,
  connections: Record<string, Connection>
): Connection[] {
  return Object.values(connections).filter(
    (conn) =>
      (conn.fromPortId === port.id && conn.fromNodeId === port.nodeId) ||
      (conn.toPortId === port.id && conn.toNodeId === port.nodeId)
  );
}

/**
 * Determine which nodes should be dragged
 */
export function getNodesToDrag(
  nodeId: string,
  isMultiSelect: boolean,
  selectedNodeIds: string[],
  nodes: Record<string, Node>,
  isInteractive: boolean,
  isDragAllowed: boolean
): string[] {
  const clickedNode = nodes[nodeId];
  if (!clickedNode || clickedNode.locked) return [];

  // For interactive nodes, check if dragging is allowed
  if (isInteractive && !isDragAllowed && !selectedNodeIds.includes(nodeId)) {
    return [];
  }

  let nodesToDrag: string[];

  if (selectedNodeIds.includes(nodeId)) {
    // Filter out locked nodes and child nodes of selected groups
    nodesToDrag = selectedNodeIds.filter((id) => {
      const node = nodes[id];
      if (!node || node.locked) return false;

      // Skip children if parent is selected
      if (node.parentId && selectedNodeIds.includes(node.parentId)) {
        return false;
      }

      return true;
    });
  } else {
    if (isMultiSelect) {
      const allSelected = [...selectedNodeIds, nodeId];
      nodesToDrag = allSelected.filter((id) => {
        const node = nodes[id];
        if (!node || node.locked) return false;

        if (node.parentId && allSelected.includes(node.parentId)) {
          return false;
        }

        return true;
      });
    } else {
      // For single node, check if it's interactive and drag is not allowed
      if (isInteractive && !isDragAllowed) {
        return []; // Don't start drag
      }
      nodesToDrag = [nodeId];
    }
  }

  return nodesToDrag;
}

/**
 * Create a connection object based on port types
 */
export function createConnection(
  fromPort: Port,
  toPort: Port
): { fromNodeId: string; fromPortId: string; toNodeId: string; toPortId: string } | null {
  // Check compatibility
  if (fromPort.type === toPort.type) return null;
  if (fromPort.nodeId === toPort.nodeId) return null;

  if (fromPort.type === "output") {
    return {
      fromNodeId: fromPort.nodeId,
      fromPortId: fromPort.id,
      toNodeId: toPort.nodeId,
      toPortId: toPort.id,
    };
  } else {
    return {
      fromNodeId: toPort.nodeId,
      fromPortId: toPort.id,
      toNodeId: fromPort.nodeId,
      toPortId: fromPort.id,
    };
  }
}

/**
 * Check if a reconnection is valid
 */
export function isValidReconnection(
  fixedPort: Port,
  targetPort: Port
): boolean {
  const isCompatible = fixedPort.type !== targetPort.type;
  const isSameNode = fixedPort.nodeId === targetPort.nodeId;
  return isCompatible && !isSameNode;
}

/**
 * Collect initial positions for dragging nodes
 */
export function collectInitialPositions(
  nodeIds: string[],
  nodes: Record<string, Node>,
  getGroupChildren: (groupId: string) => Node[]
): {
  initialPositions: Record<string, { x: number; y: number }>;
  affectedChildNodes: Record<string, string[]>;
} {
  const initialPositions: Record<string, { x: number; y: number }> = {};
  const affectedChildNodes: Record<string, string[]> = {};

  nodeIds.forEach((id) => {
    const node = nodes[id];
    if (node) {
      initialPositions[id] = { ...node.position };

      if (node.type === "group") {
        const children = getGroupChildren(id);
        affectedChildNodes[id] = children.map((child) => child.id);

        children.forEach((child) => {
          initialPositions[child.id] = { ...child.position };
        });
      }
    }
  });

  return { initialPositions, affectedChildNodes };
}

/**
 * Calculate new positions for nodes after dragging
 */
export function calculateNewPositions(
  nodeIds: string[],
  initialPositions: Record<string, { x: number; y: number }>,
  offset: { x: number; y: number }
): Record<string, { x: number; y: number }> {
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

  return newPositions;
}

/**
 * Handle group movement with children
 */
export function handleGroupMovement(
  nodeIds: string[],
  nodes: Record<string, Node>,
  snappedPositions: Record<string, { x: number; y: number }>,
  initialPositions: Record<string, { x: number; y: number }>,
  moveGroupWithChildren: (groupId: string, delta: { x: number; y: number }) => void
): Record<string, { x: number; y: number }> {
  const groupsToMove = nodeIds.filter((nodeId) => {
    const node = nodes[nodeId];
    return node && node.type === "group";
  });

  if (groupsToMove.length === 0) {
    return snappedPositions;
  }

  // Move groups with their children
  groupsToMove.forEach((groupId) => {
    const initialPos = initialPositions[groupId];
    const finalPos = snappedPositions[groupId];
    if (initialPos && finalPos) {
      const delta = {
        x: finalPos.x - initialPos.x,
        y: finalPos.y - initialPos.y,
      };
      moveGroupWithChildren(groupId, delta);
    }
  });

  // Return non-group positions
  const nonGroupPositions: Record<string, { x: number; y: number }> = {};
  nodeIds.forEach((nodeId) => {
    const node = nodes[nodeId];
    if (node && node.type !== "group" && snappedPositions[nodeId]) {
      nonGroupPositions[nodeId] = snappedPositions[nodeId];
    }
  });

  return nonGroupPositions;
}

/**
 * Get the other port information for a connection
 */
export function getOtherPortInfo(
  connection: Connection,
  port: Port,
  nodes: Record<string, Node>,
  getNodePorts: (nodeId: string) => Port[]
): { otherNode: Node; otherPort: Port; isFromPort: boolean } | null {
  const isFromPort = connection.fromPortId === port.id && connection.fromNodeId === port.nodeId;
  const otherNodeId = isFromPort ? connection.toNodeId : connection.fromNodeId;
  const otherPortId = isFromPort ? connection.toPortId : connection.fromPortId;
  const otherNode = nodes[otherNodeId];

  if (!otherNode) return null;

  const otherNodePorts = getNodePorts(otherNodeId);
  const otherPort = otherNodePorts.find((p) => p.id === otherPortId);

  if (!otherPort) return null;

  return { otherNode, otherPort, isFromPort };
}