import * as React from "react";
export interface SelectionOverlayProps {
    className?: string;
}
/**
 * SelectionOverlay - Overlay layer for selection visual feedback
 * This layer passes through all pointer events to underlying layers
 */
export declare const SelectionOverlay: React.FC<SelectionOverlayProps>;
