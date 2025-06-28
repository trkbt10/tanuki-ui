export interface PointerInteractionConfig<T> {
    /**
     * The state that triggers the interaction
     */
    interactionState: T | null | undefined;
    /**
     * Canvas viewport configuration
     */
    viewport: {
        offset: {
            x: number;
            y: number;
        };
        scale: number;
    };
    /**
     * Callback for pointer move events with canvas coordinates
     */
    onPointerMove: (canvasPosition: {
        x: number;
        y: number;
    }, event: PointerEvent) => void;
    /**
     * Callback for pointer up events
     */
    onPointerUp: (event: PointerEvent) => void;
    /**
     * Optional selector for the canvas element (defaults to '[role="application"]')
     */
    canvasSelector?: string;
    /**
     * Optional configuration for pointer move event listener
     */
    pointerMoveOptions?: AddEventListenerOptions;
}
/**
 * Custom hook for handling pointer interactions on the canvas
 * Provides abstracted pointer tracking with automatic canvas coordinate conversion
 */
export declare function usePointerInteraction<T>({ interactionState, viewport, onPointerMove, onPointerUp, canvasSelector, pointerMoveOptions, }: PointerInteractionConfig<T>): void;
