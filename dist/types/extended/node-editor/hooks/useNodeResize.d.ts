export interface UseNodeResizeOptions {
    /** Minimum width for nodes */
    minWidth?: number;
    /** Minimum height for nodes */
    minHeight?: number;
    /** Whether to enable grid snapping during resize */
    snapToGrid?: boolean;
    /** Grid size for snapping */
    gridSize?: number;
}
export interface UseNodeResizeResult {
    /** Start resizing a node - only 'se' (bottom-right) is supported */
    startResize: (nodeId: string, handle: 'se', startPosition: {
        x: number;
        y: number;
    }, startSize: {
        width: number;
        height: number;
    }) => void;
    /** Check if a specific node is being resized */
    isResizing: (nodeId: string) => boolean;
    /** Get the current resize handle for a node */
    getResizeHandle: (nodeId: string) => 'se' | null;
    /** Get the current size during resize */
    getCurrentSize: (nodeId: string) => {
        width: number;
        height: number;
    } | null;
}
/**
 * Hook for managing node resize operations
 * Provides a clean interface for resize functionality
 */
export declare const useNodeResize: (options?: UseNodeResizeOptions) => UseNodeResizeResult;
