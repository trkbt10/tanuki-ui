import type { Node, Port, Position, Size } from "../types/core";
import { getNodeSize, getNodeBoundingBox } from "./boundingBoxUtils";
import { createPortsByPositionMap } from "./lookupUtils";

/**
 * Port position calculation constants
 */
export const PORT_CONFIG = {
  VISUAL_SIZE: 12, // Size of the port circle
  MARGIN: 8, // Distance beyond port's visual boundary for connections
  PADDING: 20, // Padding from node edges when positioning multiple ports
} as const;

/**
 * Calculate the relative position offset for a port among multiple ports on the same side
 * Returns a value between 0 and 1 representing the position along the side
 */
export function calculatePortRelativeOffset(
  port: Port,
  portsOnSameSide: Port[]
): number {
  const totalPorts = portsOnSameSide.length;

  if (totalPorts === 1) {
    return 0.5; // Center position
  }

  const portIndex = portsOnSameSide.findIndex((p) => p.id === port.id);

  if (totalPorts === 2) {
    // Use consistent positions for 2 ports
    const positions = [0.3333, 0.6667];
    return positions[portIndex] || 0.5;
  }

  // For 3+ ports, distribute evenly with padding
  // Calculate relative padding (as fraction of total dimension)
  const relativePadding = 0.1; // 10% padding from each edge
  const availableSpace = 1 - (relativePadding * 2);
  const step = availableSpace / (totalPorts - 1);
  const relativePosition = relativePadding + (step * portIndex);

  // Clamp to reasonable bounds
  return Math.max(0.1, Math.min(0.9, relativePosition));
}

/**
 * Calculate the absolute position of a port within a node's coordinate system
 * This is used for rendering the port visually within the node
 */
export function calculatePortRenderPosition(
  port: Port,
  nodeSize: Size,
  portsOnSameSide: Port[]
): { x: number; y: number; transform?: string } {
  const relativeOffset = calculatePortRelativeOffset(port, portsOnSameSide);
  const halfPortSize = PORT_CONFIG.VISUAL_SIZE / 2;

  switch (port.position) {
    case "left":
      return {
        x: -halfPortSize,
        y: nodeSize.height * relativeOffset,
        transform: "translateY(-50%)",
      };
    case "right":
      return {
        x: nodeSize.width - halfPortSize,
        y: nodeSize.height * relativeOffset,
        transform: "translateY(-50%)",
      };
    case "top":
      return {
        x: nodeSize.width * relativeOffset,
        y: -halfPortSize,
        transform: "translateX(-50%)",
      };
    case "bottom":
      return {
        x: nodeSize.width * relativeOffset,
        y: nodeSize.height - halfPortSize,
        transform: "translateX(-50%)",
      };
    default:
      return {
        x: nodeSize.width - halfPortSize,
        y: nodeSize.height * 0.5,
        transform: "translateY(-50%)",
      };
  }
}

/**
 * Calculate the absolute position of a port in canvas coordinates
 * This is used for drawing connections between ports
 */
export function calculatePortConnectionPosition(
  node: Node,
  port: Port,
  allPorts?: Port[]
): Position {
  const nodeSize = getNodeSize(node);
  const { left, top } = getNodeBoundingBox(node);

  // Use provided ports array or fall back to node.ports for backward compatibility
  const ports = allPorts || node.ports || [];
  
  // Group ports by position for efficient multi-port calculations
  const portsByPosition = createPortsByPositionMap(ports);
  const portsOnSameSide = portsByPosition.get(port.position) || [port];

  const relativeOffset = calculatePortRelativeOffset(port, portsOnSameSide);

  switch (port.position) {
    case "left":
      return {
        x: left - PORT_CONFIG.MARGIN,
        y: top + (nodeSize.height * relativeOffset),
      };
    case "right":
      return {
        x: left + nodeSize.width + PORT_CONFIG.MARGIN,
        y: top + (nodeSize.height * relativeOffset),
      };
    case "top":
      return {
        x: left + (nodeSize.width * relativeOffset),
        y: top - PORT_CONFIG.MARGIN,
      };
    case "bottom":
      return {
        x: left + (nodeSize.width * relativeOffset),
        y: top + nodeSize.height + PORT_CONFIG.MARGIN,
      };
    default:
      return {
        x: left + nodeSize.width + PORT_CONFIG.MARGIN,
        y: top + (nodeSize.height * 0.5),
      };
  }
}

/**
 * Get all ports for a node, grouped by position
 * Useful for calculating port positions when you need context about other ports
 */
export function getPortsGroupedByPosition(node: Node): Map<string, Port[]> {
  const ports = node.ports || [];
  return createPortsByPositionMap(ports);
}