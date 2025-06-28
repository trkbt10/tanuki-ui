import * as React from "react";
export interface ToolbarProps {
    className?: string;
    floating?: boolean;
    position?: "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
}
export declare const Toolbar: React.FC<ToolbarProps>;
