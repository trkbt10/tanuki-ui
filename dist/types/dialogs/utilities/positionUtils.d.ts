export interface BoundingRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface ViewportInfo {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface PositionConfig {
    padding?: number;
    arrowOffset?: number;
    maxWidth?: number;
    maxHeight?: number;
}
export interface PositionResult {
    x: number;
    y: number;
    width: number;
    height: number;
    placement: 'top' | 'bottom' | 'left' | 'right';
}
export declare function getViewportInfo(): ViewportInfo;
export declare function calculateMenuDimensions(viewport: ViewportInfo, config?: PositionConfig): {
    width: number;
    height: number;
};
export declare function determineOptimalPlacement(target: BoundingRect, menuDimensions: {
    width: number;
    height: number;
}, viewport: ViewportInfo, config?: PositionConfig): 'top' | 'bottom' | 'left' | 'right';
export declare function calculateMenuPosition(target: BoundingRect, menuDimensions: {
    width: number;
    height: number;
}, placement: 'top' | 'bottom' | 'left' | 'right', viewport: ViewportInfo, config?: PositionConfig): {
    x: number;
    y: number;
};
export declare function calculateContextualMenuPosition(target: BoundingRect, viewport?: ViewportInfo, config?: PositionConfig): PositionResult;
export interface ContextMenuPosition {
    x: number;
    y: number;
}
/**
 * Calculate the optimal position for a context menu to ensure it stays within viewport
 * while avoiding overlapping with the pointer position
 * @param pointerX - The X coordinate of the pointer
 * @param pointerY - The Y coordinate of the pointer
 * @param menuWidth - The width of the context menu
 * @param menuHeight - The height of the context menu
 * @param viewport - The viewport information (defaults to current viewport)
 * @param offset - Offset from the pointer position (defaults to 4px)
 * @returns The calculated position for the context menu
 */
export declare function calculateContextMenuPosition(pointerX: number, pointerY: number, menuWidth: number, menuHeight: number, viewport?: ViewportInfo, offset?: number): ContextMenuPosition;
