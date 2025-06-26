import * as React from "react";
import type { Port } from "../../types/core";
import { classNames } from "../../../../utilities/classNames";
import styles from "../../NodeEditor.module.css";

export interface PortViewProps {
  port: Port;
  nodeWidth?: number;
  nodeHeight?: number;
  onPointerDown?: (e: React.PointerEvent, port: Port) => void;
  onPointerUp?: (e: React.PointerEvent, port: Port) => void;
  onPointerEnter?: (e: React.PointerEvent, port: Port) => void;
  onPointerLeave?: (e: React.PointerEvent, port: Port) => void;
  isConnecting?: boolean;
  isHovered?: boolean;
  isConnected?: boolean;
  /** Index of this port among ports on the same side (0-based) */
  portIndexOnSide?: number;
  /** Total number of ports on the same side */
  totalPortsOnSide?: number;
}

/**
 * PortView - Renders a connection port on a node
 * Handles port interactions for creating connections
 */
export const PortView: React.FC<PortViewProps> = ({
  port,
  nodeWidth = 150,
  nodeHeight = 50,
  onPointerDown,
  onPointerUp,
  onPointerEnter,
  onPointerLeave,
  isConnecting = false,
  isHovered = false,
  isConnected = false,
  portIndexOnSide = 0,
  totalPortsOnSide = 1,
}) => {
  // Calculate port position based on node dimensions and port position
  const getPortPosition = (): React.CSSProperties => {
    const portSize = 12;
    const offset = portSize / 2;
    
    // Calculate position for multiple ports on the same side
    const calculateMultiPortPosition = (isVertical: boolean): string => {
      if (totalPortsOnSide === 1) {
        return "50%";
      }
      
      // Add padding from edges (20px from each side)
      const padding = 20;
      const availableSpace = isVertical ? nodeHeight - (padding * 2) : nodeWidth - (padding * 2);
      
      if (totalPortsOnSide === 2) {
        // For 2 ports, place them at 1/3 and 2/3
        const positions = [33.33, 66.67];
        return `${positions[portIndexOnSide]}%`;
      } else {
        // For 3+ ports, distribute evenly with padding
        const step = availableSpace / (totalPortsOnSide - 1);
        const absolutePosition = padding + (step * portIndexOnSide);
        const percentage = (absolutePosition / (isVertical ? nodeHeight : nodeWidth)) * 100;
        return `${Math.max(10, Math.min(90, percentage))}%`; // Clamp between 10% and 90%
      }
    };
    
    switch (port.position) {
      case "left":
        return {
          left: -offset,
          top: calculateMultiPortPosition(true),
          transform: "translateY(-50%)",
        };
      case "right":
        return {
          right: -offset,
          top: calculateMultiPortPosition(true),
          transform: "translateY(-50%)",
        };
      case "top":
        return {
          top: -offset,
          left: calculateMultiPortPosition(false),
          transform: "translateX(-50%)",
        };
      case "bottom":
        return {
          bottom: -offset,
          left: calculateMultiPortPosition(false),
          transform: "translateX(-50%)",
        };
      default:
        return {};
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    onPointerDown?.(e, port);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.stopPropagation();
    onPointerUp?.(e, port);
  };

  const handlePointerEnter = (e: React.PointerEvent) => {
    onPointerEnter?.(e, port);
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    onPointerLeave?.(e, port);
  };

  return (
    <div
      className={classNames(
        styles.port,
        styles[`port${port.type.charAt(0).toUpperCase()}${port.type.slice(1)}`],
        styles[`port${port.position.charAt(0).toUpperCase()}${port.position.slice(1)}`],
        isConnecting && styles.portConnecting,
        isHovered && styles.portHovered,
        isConnected && styles.portConnected
      )}
      style={getPortPosition()}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      data-port-id={port.id}
      data-port-type={port.type}
      data-node-id={port.nodeId}
      title={port.label}
    >
      <div className={styles.portInner} />
      {port.label && (
        <span 
          className={classNames(
            styles.portLabel,
            styles[`portLabel${port.position.charAt(0).toUpperCase()}${port.position.slice(1)}`]
          )}
        >
          {port.label}
        </span>
      )}
    </div>
  );
};

PortView.displayName = "PortView";