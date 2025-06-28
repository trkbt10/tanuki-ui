import { EditorPortPositions, NodePortPositions, PortPosition } from '../types/portPosition';
import * as React from "react";
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
    /** Compute port position dynamically */
    computePortPosition: (node: any, port: any) => PortPosition;
}
/**
 * Context for accessing pre-computed port positions
 */
export declare const PortPositionContext: React.Context<PortPositionContextValue | null>;
/**
 * Provider component for port positions
 */
export interface PortPositionProviderProps {
    portPositions: EditorPortPositions;
    children: React.ReactNode;
}
export declare const PortPositionProvider: React.FC<PortPositionProviderProps>;
/**
 * Hook to access port positions
 */
export declare function usePortPositions(): PortPositionContextValue;
/**
 * Hook to get a specific port position
 */
export declare function usePortPosition(nodeId: string, portId: string): PortPosition | undefined;
/**
 * Hook to get all port positions for a node
 */
export declare function useNodePortPositions(nodeId: string): NodePortPositions | undefined;
