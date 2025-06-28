import { PortPosition } from '../types/portPosition';
/**
 * Hook to get dynamic port position that updates with node position
 */
export declare function useDynamicPortPosition(nodeId: string, portId: string): PortPosition | undefined;
/**
 * Hook to get dynamic connection point for a port
 */
export declare function useDynamicConnectionPoint(nodeId: string, portId: string): {
    x: number;
    y: number;
} | undefined;
