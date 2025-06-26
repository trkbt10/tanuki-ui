import * as React from "react";
import type { EditorPortPositions, NodePortPositions, PortPosition } from "../types/portPosition";

/**
 * Context value for port positions
 */
export interface PortPositionContextValue {
  /** All computed port positions */
  portPositions: EditorPortPositions;
  /** Get port position for a specific port */
  getPortPosition: (nodeId: string, portId: string) => PortPosition | undefined;
  /** Get all port positions for a node */
  getNodePortPositions: (nodeId: string) => NodePortPositions | undefined;
}

/**
 * Context for accessing pre-computed port positions
 */
export const PortPositionContext = React.createContext<PortPositionContextValue | null>(null);

/**
 * Provider component for port positions
 */
export interface PortPositionProviderProps {
  portPositions: EditorPortPositions;
  children: React.ReactNode;
}

export const PortPositionProvider: React.FC<PortPositionProviderProps> = ({
  portPositions,
  children,
}) => {
  const value = React.useMemo<PortPositionContextValue>(() => ({
    portPositions,
    getPortPosition: (nodeId: string, portId: string) => {
      return portPositions.get(nodeId)?.get(portId);
    },
    getNodePortPositions: (nodeId: string) => {
      return portPositions.get(nodeId);
    },
  }), [portPositions]);

  return (
    <PortPositionContext.Provider value={value}>
      {children}
    </PortPositionContext.Provider>
  );
};

/**
 * Hook to access port positions
 */
export function usePortPositions(): PortPositionContextValue {
  const context = React.useContext(PortPositionContext);
  if (!context) {
    throw new Error("usePortPositions must be used within a PortPositionProvider");
  }
  return context;
}

/**
 * Hook to get a specific port position
 */
export function usePortPosition(nodeId: string, portId: string): PortPosition | undefined {
  const { getPortPosition } = usePortPositions();
  return React.useMemo(
    () => getPortPosition(nodeId, portId),
    [getPortPosition, nodeId, portId]
  );
}

/**
 * Hook to get all port positions for a node
 */
export function useNodePortPositions(nodeId: string): NodePortPositions | undefined {
  const { getNodePortPositions } = usePortPositions();
  return React.useMemo(
    () => getNodePortPositions(nodeId),
    [getNodePortPositions, nodeId]
  );
}