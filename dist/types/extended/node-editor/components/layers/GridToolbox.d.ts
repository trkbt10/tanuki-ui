import * as React from "react";
export interface GridToolboxProps {
    className?: string;
    useFloatingContainer?: boolean;
    position?: "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
}
export declare const GridToolbox: React.FC<GridToolboxProps>;
