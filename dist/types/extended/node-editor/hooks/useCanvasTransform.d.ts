import { Position, Viewport } from '../types/core';
import * as React from "react";
export interface CanvasTransformOptions {
    minScale?: number;
    maxScale?: number;
    scaleStep?: number;
    enablePan?: boolean;
    enableZoom?: boolean;
}
export interface CanvasTransformResult {
    viewport: Viewport;
    clientToCanvas: (clientPos: Position) => Position;
    canvasToClient: (canvasPos: Position) => Position;
    setViewport: (viewport: Viewport) => void;
    resetViewport: () => void;
    zoomIn: () => void;
    zoomOut: () => void;
    zoomToFit: (bounds: {
        width: number;
        height: number;
    }) => void;
    panBy: (delta: Position) => void;
}
/**
 * Hook for managing canvas viewport transformations
 * Handles coordinate conversions between client and canvas space
 */
export declare function useCanvasTransform(containerRef: React.RefObject<HTMLElement>, options?: CanvasTransformOptions): CanvasTransformResult;
