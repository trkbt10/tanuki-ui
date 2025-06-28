export interface ViewportInfo {
    width: number;
    height: number;
    scrollX: number;
    scrollY: number;
}
export interface Position {
    x: number;
    y: number;
}
/**
 * Get viewport information
 */
export declare function getViewportInfo(): ViewportInfo;
/**
 * Calculate optimal position for a context menu to avoid viewport overflow
 */
export declare function calculateContextMenuPosition(x: number, y: number, menuWidth: number, menuHeight: number, viewport: ViewportInfo): Position;
