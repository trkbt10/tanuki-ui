import * as React from "react";
export interface MinimapProps {
    width?: number;
    height?: number;
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    className?: string;
    /** Show/hide the minimap */
    visible?: boolean;
    /** Scale factor for minimap rendering */
    scale?: number;
}
export declare const Minimap: React.FC<MinimapProps>;
