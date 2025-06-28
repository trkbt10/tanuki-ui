/**
 * Hook that provides pre-bound action creators for the Canvas
 * No need to call dispatch manually - actions are automatically dispatched
 */
export declare function useCanvasActions(): {
    setViewport: (viewport: Parameters<(viewport: import('..').Viewport) => import('../contexts/NodeCanvasContext').NodeCanvasAction>[0]) => void;
    panViewport: (delta: Parameters<(delta: {
        x: number;
        y: number;
    }) => import('../contexts/NodeCanvasContext').NodeCanvasAction>[0]) => void;
    zoomViewport: (scale: Parameters<(scale: number, center?: {
        x: number;
        y: number;
    }) => import('../contexts/NodeCanvasContext').NodeCanvasAction>[0], center?: Parameters<(scale: number, center?: {
        x: number;
        y: number;
    }) => import('../contexts/NodeCanvasContext').NodeCanvasAction>[1]) => void;
    resetViewport: () => void;
    startPan: (position: Parameters<(position: {
        x: number;
        y: number;
    }) => import('../contexts/NodeCanvasContext').NodeCanvasAction>[0]) => void;
    updatePan: (position: Parameters<(position: {
        x: number;
        y: number;
    }) => import('../contexts/NodeCanvasContext').NodeCanvasAction>[0]) => void;
    endPan: () => void;
};
/**
 * Hook that provides both state and pre-bound actions for the Canvas
 * Convenient alternative to useNodeCanvas when you need both state and actions
 */
export declare function useCanvasState(): {
    state: import('../contexts/NodeCanvasContext').NodeCanvasState;
    actions: {
        setViewport: (viewport: Parameters<(viewport: import('..').Viewport) => import('../contexts/NodeCanvasContext').NodeCanvasAction>[0]) => void;
        panViewport: (delta: Parameters<(delta: {
            x: number;
            y: number;
        }) => import('../contexts/NodeCanvasContext').NodeCanvasAction>[0]) => void;
        zoomViewport: (scale: Parameters<(scale: number, center?: {
            x: number;
            y: number;
        }) => import('../contexts/NodeCanvasContext').NodeCanvasAction>[0], center?: Parameters<(scale: number, center?: {
            x: number;
            y: number;
        }) => import('../contexts/NodeCanvasContext').NodeCanvasAction>[1]) => void;
        resetViewport: () => void;
        startPan: (position: Parameters<(position: {
            x: number;
            y: number;
        }) => import('../contexts/NodeCanvasContext').NodeCanvasAction>[0]) => void;
        updatePan: (position: Parameters<(position: {
            x: number;
            y: number;
        }) => import('../contexts/NodeCanvasContext').NodeCanvasAction>[0]) => void;
        endPan: () => void;
    };
};
