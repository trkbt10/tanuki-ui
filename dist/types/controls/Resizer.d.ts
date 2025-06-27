import * as React from "react";
export type OnResize = (params: {
    x: number;
    y: number;
    width: number;
    height: number;
}, final: boolean) => void;
export declare const useResizer: (ref: React.RefObject<HTMLDivElement>, onResize: OnResize) => void;
export declare const Resizer: React.FC<{
    onResize: OnResize;
    max?: number;
    min?: number;
    step?: number;
    originX?: number;
    originY?: number;
    autoplace?: boolean;
}>;
export declare const resize: (deltaX: number, deltaY: number, originX: number, originY: number) => {
    x: number;
    y: number;
    width: number;
    height: number;
};
