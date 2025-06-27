import * as React from "react";
export interface FloatingContainerProps {
    position?: "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
    className?: string;
    children?: React.ReactNode;
}
export declare const FloatingContainer: React.FC<FloatingContainerProps>;
