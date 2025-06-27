import * as React from "react";
export interface HorizontalDividerProps {
    onResize: (deltaX: number) => void;
    className?: string;
}
export declare const HorizontalDivider: React.FC<HorizontalDividerProps>;
