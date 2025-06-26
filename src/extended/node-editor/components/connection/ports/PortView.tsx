import * as React from "react";
import type { Port } from "../../../types/core";
import { classNames } from "../../../../../utilities/classNames";
import { calculatePortRenderPosition, getPortsGroupedByPosition } from "../../../utils/portPositionUtils";
import styles from "./PortView.module.css";

export interface PortViewProps {
  port: Port;
  nodeWidth?: number;
  nodeHeight?: number;
  /** All ports on the node (used for position calculation) */
  allPorts?: Port[];
  onPointerDown?: (e: React.PointerEvent, port: Port) => void;
  onPointerUp?: (e: React.PointerEvent, port: Port) => void;
  onPointerEnter?: (e: React.PointerEvent, port: Port) => void;
  onPointerLeave?: (e: React.PointerEvent, port: Port) => void;
  isConnecting?: boolean;
  isHovered?: boolean;
  isConnected?: boolean;
}

/**
 * PortView - Renders a connection port on a node
 * Handles port interactions for creating connections
 */
export const PortView: React.FC<PortViewProps> = ({
  port,
  nodeWidth = 150,
  nodeHeight = 50,
  allPorts,
  onPointerDown,
  onPointerUp,
  onPointerEnter,
  onPointerLeave,
  isConnecting = false,
  isHovered = false,
  isConnected = false,
}) => {
  // Calculate port position using the centralized position calculation
  const getPortPosition = (): React.CSSProperties => {
    const nodeSize = { width: nodeWidth, height: nodeHeight };
    
    // Get all ports on the same side as this port
    const portsGroupedByPosition = allPorts ? 
      getPortsGroupedByPosition({ ports: allPorts } as any) : 
      new Map([[port.position, [port]]]);
    
    const portsOnSameSide = portsGroupedByPosition.get(port.position) || [port];
    
    // Calculate position using the centralized function
    const { x, y, transform } = calculatePortRenderPosition(port, nodeSize, portsOnSameSide);
    
    return {
      left: x,
      top: y,
      transform,
      position: 'absolute',
    };
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