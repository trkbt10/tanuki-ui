import type { Node, Port, Position } from "../types/core";
import { getNodeSize, getNodeBoundingBox } from "./boundingBoxUtils";
import { getDistance } from "./vectorUtils";
import { createPortsByPositionMap } from "./lookupUtils";

// Constants for port calculations
const PORT_MARGIN = 8; // Distance beyond port's visual boundary

/**
 * Calculate port offset for multiple ports on the same side
 */
function calculatePortOffset(
  port: Port,
  portsOnSameSide: Port[],
  dimension: number
): number {
  const totalPorts = portsOnSameSide.length;
  
  if (totalPorts === 1) {
    return dimension / 2;
  }
  
  const portIndex = portsOnSameSide.findIndex(p => p.id === port.id);
  
  if (totalPorts === 2) {
    const positions = [0.3333, 0.6667];
    return dimension * positions[portIndex];
  }
  
  // For 3+ ports, distribute evenly with padding
  const padding = 20;
  const availableSpace = dimension - (padding * 2);
  const step = availableSpace / (totalPorts - 1);
  const absolutePosition = padding + (step * portIndex);
  
  // Clamp to reasonable bounds
  const minPos = dimension * 0.1;
  const maxPos = dimension * 0.9;
  return Math.max(minPos, Math.min(maxPos, absolutePosition));
}

/**
 * Calculate the absolute position of a port on a node
 * Adds margin based on port type and position for better connection visuals
 * Supports multiple ports on the same side with proper spacing
 */
export const getPortPosition = (node: Node, port: Port): Position => {
  const { width, height } = getNodeSize(node);
  const { left, top } = getNodeBoundingBox(node);
  
  // Group ports by position for efficient multi-port calculations
  const portsByPosition = createPortsByPositionMap(node.ports || []);
  const portsOnSameSide = portsByPosition.get(port.position) || [port];

  switch (port.position) {
    case "left":
      return {
        x: left - PORT_MARGIN,
        y: top + calculatePortOffset(port, portsOnSameSide, height),
      };
    case "right":
      return {
        x: left + width + PORT_MARGIN,
        y: top + calculatePortOffset(port, portsOnSameSide, height),
      };
    case "top":
      return {
        x: left + calculatePortOffset(port, portsOnSameSide, width),
        y: top - PORT_MARGIN,
      };
    case "bottom":
      return {
        x: left + calculatePortOffset(port, portsOnSameSide, width),
        y: top + height + PORT_MARGIN,
      };
    default:
      return {
        x: left + width + PORT_MARGIN,
        y: top + height / 2,
      };
  }
};

/**
 * Calculate a bezier curve path between two points
 * Creates a smooth curve that enters/exits ports horizontally or vertically based on port position
 */
export const calculateBezierPath = (
  from: Position,
  to: Position,
  fromPortPosition?: "left" | "right" | "top" | "bottom",
  toPortPosition?: "left" | "right" | "top" | "bottom"
): string => {
  // Calculate control point offset based on distance and port positions
  const distance = getDistance(from, to);
  
  // Dynamic offset based on distance and port configuration
  const minOffset = 40;
  const maxOffset = 120;
  let offset = Math.max(minOffset, Math.min(maxOffset, distance * 0.5));
  
  // Increase offset for opposite-facing ports for smoother curves
  const isOppositeFacing = (
    (fromPortPosition === 'right' && toPortPosition === 'left') ||
    (fromPortPosition === 'left' && toPortPosition === 'right') ||
    (fromPortPosition === 'top' && toPortPosition === 'bottom') ||
    (fromPortPosition === 'bottom' && toPortPosition === 'top')
  );
  
  if (isOppositeFacing) {
    offset = Math.max(offset, distance * 0.4);
  }

  // Determine control points based on port positions
  let cp1x = from.x;
  let cp1y = from.y;
  let cp2x = to.x;
  let cp2y = to.y;

  // From port control point
  switch (fromPortPosition) {
    case "left":
      cp1x = from.x - offset;
      break;
    case "right":
      cp1x = from.x + offset;
      break;
    case "top":
      cp1y = from.y - offset;
      break;
    case "bottom":
      cp1y = from.y + offset;
      break;
    default:
      // Default to right if not specified
      cp1x = from.x + offset;
  }

  // To port control point
  switch (toPortPosition) {
    case "left":
      cp2x = to.x - offset;
      break;
    case "right":
      cp2x = to.x + offset;
      break;
    case "top":
      cp2y = to.y - offset;
      break;
    case "bottom":
      cp2y = to.y + offset;
      break;
    default:
      // Default to left if not specified
      cp2x = to.x - offset;
  }

  // Create SVG path
  return `M ${from.x} ${from.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${to.x} ${to.y}`;
};

/**
 * Calculate the midpoint of a bezier curve (approximation)
 */
export const getConnectionMidpoint = (
  from: Position,
  to: Position
): Position => {
  return {
    x: (from.x + to.x) / 2,
    y: (from.y + to.y) / 2,
  };
};

/**
 * Check if a point is near a connection line
 * Used for connection selection and interaction
 */
export const isPointNearConnection = (
  point: Position,
  from: Position,
  to: Position,
  threshold: number = 10
): boolean => {
  // Simple distance from line segment calculation
  const A = point.x - from.x;
  const B = point.y - from.y;
  const C = to.x - from.x;
  const D = to.y - from.y;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  let param = -1;

  if (lenSq !== 0) {
    param = dot / lenSq;
  }

  let xx, yy;

  if (param < 0) {
    xx = from.x;
    yy = from.y;
  } else if (param > 1) {
    xx = to.x;
    yy = to.y;
  } else {
    xx = from.x + param * C;
    yy = from.y + param * D;
  }

  const dx = point.x - xx;
  const dy = point.y - yy;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance <= threshold;
};

/**
 * Interpolate between two colors based on a factor (0-1)
 * Used for visual feedback during connection editing
 */
export const interpolateColor = (
  color1: string,
  color2: string,
  factor: number
): string => {
  // Simple hex color interpolation
  const c1 = parseInt(color1.slice(1), 16);
  const c2 = parseInt(color2.slice(1), 16);

  const r1 = (c1 >> 16) & 0xff;
  const g1 = (c1 >> 8) & 0xff;
  const b1 = c1 & 0xff;

  const r2 = (c2 >> 16) & 0xff;
  const g2 = (c2 >> 8) & 0xff;
  const b2 = c2 & 0xff;

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};