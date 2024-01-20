import * as React from "react";
import type { Connection, Node, Port } from "../types/core";
import { calculateBezierPath, getPortPosition } from "../utils/connectionUtils";
import { classNames } from "../../../utilities/classNames";
import styles from "../NodeEditor.module.css";

export interface ConnectionViewProps {
  connection: Connection;
  fromNode: Node;
  toNode: Node;
  fromPort: Port;
  toPort: Port;
  isSelected: boolean;
  isHovered: boolean;
  isDragging?: boolean;
  dragProgress?: number; // 0-1 for visual feedback during disconnect
  // Optional override positions for preview during drag
  fromNodePosition?: { x: number; y: number };
  toNodePosition?: { x: number; y: number };
  fromNodeSize?: { width: number; height: number };
  toNodeSize?: { width: number; height: number };
  onPointerDown?: (e: React.PointerEvent, connectionId: string) => void;
  onPointerEnter?: (e: React.PointerEvent, connectionId: string) => void;
  onPointerLeave?: (e: React.PointerEvent, connectionId: string) => void;
}

/**
 * ConnectionView - Renders a single connection between two ports
 */
const ConnectionViewComponent: React.FC<ConnectionViewProps> = ({
  connection,
  fromNode,
  toNode,
  fromPort,
  toPort,
  isSelected,
  isHovered,
  isDragging,
  dragProgress = 0,
  fromNodePosition,
  toNodePosition,
  fromNodeSize,
  toNodeSize,
  onPointerDown,
  onPointerEnter,
  onPointerLeave,
}) => {
  // Calculate port positions (use override positions for drag preview)
  const fromPosition = React.useMemo(() => {
    const nodeForCalc = fromNodePosition ? {
      ...fromNode,
      position: fromNodePosition,
      size: fromNodeSize || fromNode.size
    } : fromNode;
    return getPortPosition(nodeForCalc, fromPort);
  }, [
    fromNode, 
    fromPort, 
    fromNodePosition?.x, 
    fromNodePosition?.y, 
    fromNodeSize?.width, 
    fromNodeSize?.height
  ]);
  
  const toPosition = React.useMemo(() => {
    const nodeForCalc = toNodePosition ? {
      ...toNode,
      position: toNodePosition,
      size: toNodeSize || toNode.size
    } : toNode;
    return getPortPosition(nodeForCalc, toPort);
  }, [
    toNode, 
    toPort, 
    toNodePosition?.x, 
    toNodePosition?.y, 
    toNodeSize?.width, 
    toNodeSize?.height
  ]);

  // Calculate bezier path (recalculate when positions change)
  const pathData = React.useMemo(
    () => calculateBezierPath(fromPosition, toPosition, fromPort.position, toPort.position),
    [fromPosition.x, fromPosition.y, toPosition.x, toPosition.y, fromPort.position, toPort.position]
  );

  // Calculate color based on state
  const strokeColor = React.useMemo(() => {
    if (isDragging && dragProgress > 0) {
      // Interpolate to warning color during drag
      const normalColor = "var(--connectionColor, #999)";
      const warningColor = "var(--cautionColor, #ff3b30)";
      return dragProgress > 0.5 ? warningColor : normalColor;
    }
    if (isSelected) return "var(--accentColor, #0066cc)";
    if (isHovered) return "var(--connectionHoverColor, #666)";
    return "var(--connectionColor, #999)";
  }, [isDragging, dragProgress, isSelected, isHovered]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    onPointerDown?.(e, connection.id);
  };

  const handlePointerEnter = (e: React.PointerEvent) => {
    onPointerEnter?.(e, connection.id);
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    onPointerLeave?.(e, connection.id);
  };

  return (
    <g
      className={classNames(
        styles.connectionGroup,
        isSelected && styles.connectionSelected,
        isHovered && styles.connectionHovered,
        isDragging && styles.connectionDragging
      )}
      data-connection-id={connection.id}
    >
      {/* Invisible wider path for easier interaction */}
      <path
        d={pathData}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
        style={{ cursor: "pointer" }}
        onPointerDown={handlePointerDown}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      />
      
      {/* Visible connection line */}
      <path
        d={pathData}
        fill="none"
        stroke={strokeColor}
        strokeWidth={isSelected || isHovered ? 3 : 2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transition: "stroke 0.2s, stroke-width 0.2s",
          pointerEvents: "none",
        }}
      />
      
      {/* Arrow marker at the end */}
      <defs>
        <marker
          id={`arrow-${connection.id}`}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path
            d="M 0 0 L 10 5 L 0 10 z"
            fill={strokeColor}
            style={{ transition: "fill 0.2s" }}
          />
        </marker>
      </defs>
      
      {/* Apply arrow marker to the visible path */}
      <path
        d={pathData}
        fill="none"
        stroke="transparent"
        markerEnd={`url(#arrow-${connection.id})`}
        style={{ pointerEvents: "none" }}
      />
    </g>
  );
};

// Custom comparison function for memo
const areEqual = (prevProps: ConnectionViewProps, nextProps: ConnectionViewProps): boolean => {
  // Always re-render if basic properties change
  if (
    prevProps.connection.id !== nextProps.connection.id ||
    prevProps.isSelected !== nextProps.isSelected ||
    prevProps.isHovered !== nextProps.isHovered ||
    prevProps.isDragging !== nextProps.isDragging ||
    prevProps.dragProgress !== nextProps.dragProgress
  ) {
    return false;
  }

  // Check node position changes (both actual and preview positions)
  if (
    prevProps.fromNode.position.x !== nextProps.fromNode.position.x ||
    prevProps.fromNode.position.y !== nextProps.fromNode.position.y ||
    prevProps.toNode.position.x !== nextProps.toNode.position.x ||
    prevProps.toNode.position.y !== nextProps.toNode.position.y ||
    prevProps.fromNodePosition?.x !== nextProps.fromNodePosition?.x ||
    prevProps.fromNodePosition?.y !== nextProps.fromNodePosition?.y ||
    prevProps.toNodePosition?.x !== nextProps.toNodePosition?.x ||
    prevProps.toNodePosition?.y !== nextProps.toNodePosition?.y
  ) {
    return false;
  }

  // Check node size changes (both actual and preview sizes)
  if (
    prevProps.fromNode.size?.width !== nextProps.fromNode.size?.width ||
    prevProps.fromNode.size?.height !== nextProps.fromNode.size?.height ||
    prevProps.toNode.size?.width !== nextProps.toNode.size?.width ||
    prevProps.toNode.size?.height !== nextProps.toNode.size?.height ||
    prevProps.fromNodeSize?.width !== nextProps.fromNodeSize?.width ||
    prevProps.fromNodeSize?.height !== nextProps.fromNodeSize?.height ||
    prevProps.toNodeSize?.width !== nextProps.toNodeSize?.width ||
    prevProps.toNodeSize?.height !== nextProps.toNodeSize?.height
  ) {
    return false;
  }

  // Check port position changes
  if (
    prevProps.fromPort.position !== nextProps.fromPort.position ||
    prevProps.toPort.position !== nextProps.toPort.position
  ) {
    return false;
  }

  // Props are equal, skip re-render
  return true;
};

// Export memoized component
export const ConnectionView = React.memo(ConnectionViewComponent, areEqual);

ConnectionView.displayName = "ConnectionView";