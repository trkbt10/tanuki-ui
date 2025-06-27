import * as React from "react";
export interface UseDocumentPointerEventsOptions {
    onMove?: (e: PointerEvent) => void;
    onUp?: (e: PointerEvent) => void;
    onCancel?: (e: PointerEvent) => void;
}
/**
 * Custom hook for managing document-level pointer events with proper cleanup
 * This pattern is commonly used for drag operations that need to continue
 * even when the pointer moves outside the original element
 */
export declare function useDocumentPointerEvents(enabled: boolean, handlers: UseDocumentPointerEventsOptions): void;
/**
 * Hook for capturing pointer during drag operations
 * This ensures that pointer events are delivered to the capturing element
 * even when the pointer moves outside its boundaries
 */
export declare function usePointerCapture(elementRef: React.RefObject<HTMLElement>, enabled: boolean, pointerId?: number): void;
/**
 * Hook for preventing default pointer events during operations
 * Useful for preventing text selection, context menus, etc. during drag operations
 */
export declare function usePreventPointerDefaults(elementRef: React.RefObject<HTMLElement>, enabled: boolean, events?: string[]): void;
/**
 * Hook that combines multiple pointer event patterns for drag operations
 */
export declare function useDragPointerEvents(elementRef: React.RefObject<HTMLElement>, enabled: boolean, options: {
    onMove?: (e: PointerEvent) => void;
    onUp?: (e: PointerEvent) => void;
    onCancel?: (e: PointerEvent) => void;
    pointerId?: number;
    capturePointer?: boolean;
    preventDefaults?: boolean;
}): void;
