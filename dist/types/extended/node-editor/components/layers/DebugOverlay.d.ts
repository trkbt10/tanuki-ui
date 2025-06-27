import * as React from "react";
export interface DebugOverlayProps {
    /** Position of the debug overlay */
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    /** Custom className */
    className?: string;
    /** Show/hide the debug overlay */
    visible?: boolean;
    /** Which debug information to show */
    showSections?: {
        viewport?: boolean;
        nodes?: boolean;
        connections?: boolean;
        actions?: boolean;
        performance?: boolean;
    };
}
/**
 * Debug overlay component that shows internal state information
 * Useful for development and debugging
 */
export declare const DebugOverlay: React.FC<DebugOverlayProps>;
