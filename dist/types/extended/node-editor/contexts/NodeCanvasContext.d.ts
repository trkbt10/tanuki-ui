import { Position, Viewport, GridSettings } from '../types/core';
import * as React from "react";
export interface PanState {
    isPanning: boolean;
    startPosition: Position | null;
}
export interface NodeCanvasState {
    viewport: Viewport;
    gridSettings: GridSettings;
    isSpacePanning: boolean;
    panState: PanState;
}
export type NodeCanvasAction = {
    type: "SET_VIEWPORT";
    payload: {
        viewport: Viewport;
    };
} | {
    type: "PAN_VIEWPORT";
    payload: {
        delta: Position;
    };
} | {
    type: "ZOOM_VIEWPORT";
    payload: {
        scale: number;
        center?: Position;
    };
} | {
    type: "RESET_VIEWPORT";
} | {
    type: "UPDATE_GRID_SETTINGS";
    payload: {
        settings: Partial<GridSettings>;
    };
} | {
    type: "SET_SPACE_PANNING";
    payload: {
        isSpacePanning: boolean;
    };
} | {
    type: "START_PAN";
    payload: {
        position: Position;
    };
} | {
    type: "UPDATE_PAN";
    payload: {
        position: Position;
    };
} | {
    type: "END_PAN";
};
export declare const nodeCanvasReducer: (state: NodeCanvasState, action: NodeCanvasAction) => NodeCanvasState;
export declare const defaultNodeCanvasState: NodeCanvasState;
export declare const nodeCanvasActions: {
    setViewport: (viewport: Viewport) => NodeCanvasAction;
    panViewport: (delta: {
        x: number;
        y: number;
    }) => NodeCanvasAction;
    zoomViewport: (scale: number, center?: {
        x: number;
        y: number;
    }) => NodeCanvasAction;
    resetViewport: () => NodeCanvasAction;
    updateGridSettings: (settings: Partial<GridSettings>) => NodeCanvasAction;
    setSpacePanning: (isSpacePanning: boolean) => NodeCanvasAction;
    startPan: (position: {
        x: number;
        y: number;
    }) => NodeCanvasAction;
    updatePan: (position: {
        x: number;
        y: number;
    }) => NodeCanvasAction;
    endPan: () => NodeCanvasAction;
};
export declare const createCanvasUtils: (canvasRef: React.RefObject<HTMLDivElement | null>, viewport: Viewport) => {
    screenToCanvas: (screenX: number, screenY: number) => Position;
    canvasToScreen: (canvasX: number, canvasY: number) => Position;
};
export interface NodeCanvasContextValue {
    state: NodeCanvasState;
    dispatch: React.Dispatch<NodeCanvasAction>;
    actions: typeof nodeCanvasActions;
    canvasRef: React.RefObject<HTMLDivElement | null>;
    utils: ReturnType<typeof createCanvasUtils>;
}
export declare const NodeCanvasContext: React.Context<NodeCanvasContextValue | null>;
export interface NodeCanvasProviderProps {
    children: React.ReactNode;
    initialState?: Partial<NodeCanvasState>;
}
export declare const NodeCanvasProvider: React.FC<NodeCanvasProviderProps>;
export declare const useNodeCanvas: () => NodeCanvasContextValue;
