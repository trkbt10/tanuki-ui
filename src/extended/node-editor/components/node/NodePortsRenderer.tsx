import * as React from "react";
import type { Port } from "../../types/core";
import type { ConnectablePortsResult } from "../../utils/connectablePortPlanner";
import { isPortConnectable } from "../../utils/nodeLayerHelpers";
import { PortView } from "../connection/ports/PortView";
import { useOptionalRenderers } from "../../contexts/RendererContext";
import { useEditorActionState } from "../../contexts/EditorActionStateContext";
import styles from "./NodeView.module.css";

export interface NodePortsRendererProps {
  ports: Port[];
  onPortPointerDown?: (e: React.PointerEvent, port: Port) => void;
  onPortPointerUp?: (e: React.PointerEvent, port: Port) => void;
  onPortPointerEnter?: (e: React.PointerEvent, port: Port) => void;
  onPortPointerLeave?: (e: React.PointerEvent, port: Port) => void;
  hoveredPort?: Port;
  connectedPorts?: Set<string>;
  connectablePorts?: ConnectablePortsResult;
}

/**
 * Renders ports for a node
 */
export const NodePortsRenderer: React.FC<NodePortsRendererProps> = ({
  ports,
  onPortPointerDown,
  onPortPointerUp,
  onPortPointerEnter,
  onPortPointerLeave,
  hoveredPort,
  connectedPorts,
  connectablePorts,
}) => {
  const renderers = useOptionalRenderers();
  const PortComponent = renderers?.port ?? PortView;
  const { state: actionState } = useEditorActionState();

  if (!ports || ports.length === 0) return null;

  return (
    <div className={styles.nodePorts}>
      {ports.map((port: Port) => {
        const connectable = isPortConnectable(port, connectablePorts);
        return (
          <PortComponent
            key={port.id}
            port={port}
            onPointerDown={onPortPointerDown}
            onPointerUp={onPortPointerUp}
            onPointerEnter={onPortPointerEnter}
            onPointerLeave={onPortPointerLeave}
            isConnecting={actionState.connectionDragState?.fromPort.id === port.id}
            isConnectable={connectable}
            isCandidate={actionState.connectionDragState?.candidatePort?.id === port.id}
            isHovered={hoveredPort?.id === port.id}
            isConnected={connectedPorts?.has(port.id)}
          />
        );
      })}
    </div>
  );
};
