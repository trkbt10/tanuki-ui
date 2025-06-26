import * as React from "react";
import type { Node, Port } from "../types/core";
import type { PortPosition } from "../types/portPosition";
import { computeNodePortPositions } from "../utils/computePortPositions";
import { useNodeEditor } from "../contexts/NodeEditorContext";

/**
 * Hook to get dynamic port position that updates with node position
 */
export function useDynamicPortPosition(nodeId: string, portId: string): PortPosition | undefined {
  const { state, getNodePorts } = useNodeEditor();
  
  return React.useMemo(() => {
    const node = state.nodes[nodeId];
    if (!node) return undefined;
    
    // Create a node with ports for calculation
    const nodeWithPorts = {
      ...node,
      ports: getNodePorts(nodeId),
    };
    
    const positions = computeNodePortPositions(nodeWithPorts);
    return positions.get(portId);
  }, [
    state.nodes[nodeId]?.position.x,
    state.nodes[nodeId]?.position.y,
    state.nodes[nodeId]?.size?.width,
    state.nodes[nodeId]?.size?.height,
    nodeId,
    portId,
    getNodePorts,
  ]);
}

/**
 * Hook to get dynamic connection point for a port
 */
export function useDynamicConnectionPoint(nodeId: string, portId: string): { x: number; y: number } | undefined {
  const position = useDynamicPortPosition(nodeId, portId);
  return position?.connectionPoint;
}