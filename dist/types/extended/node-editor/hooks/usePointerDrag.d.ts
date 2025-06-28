import { Position } from '../types/core';
import * as React from "react";
export interface PointerDragOptions<T = unknown> {
    onStart?: (event: PointerEvent, data: T) => void;
    onMove?: (event: PointerEvent, delta: Position, data: T) => void;
    onEnd?: (event: PointerEvent, delta: Position, data: T) => void;
    scale?: number;
    threshold?: number;
    disabled?: boolean;
}
export interface PointerDragState {
    isDragging: boolean;
    dragStarted: boolean;
    delta: Position;
}
/**
 * Generic hook for handling pointer drag operations
 * Consolidates drag logic used across nodes, connections, and resize operations
 */
export declare function usePointerDrag<T = unknown>(options: PointerDragOptions<T>): {
    startDrag: (event: React.PointerEvent | PointerEvent, data: T) => void;
    dragState: PointerDragState;
};
