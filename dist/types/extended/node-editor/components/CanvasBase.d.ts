import * as React from "react";
export interface CanvasBaseProps {
    children: React.ReactNode;
    className?: string;
    showGrid?: boolean;
}
/**
 * CanvasBase - The lowest layer component that handles pan, zoom, and drag operations
 * This component receives events and provides visual support with grid display
 * Does not trap events unless necessary for its own operations
 */
export declare const CanvasBase: React.FC<CanvasBaseProps>;
