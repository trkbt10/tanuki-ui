import * as React from "react";
type BoundingRect = {
    x: number;
    y: number;
    height: number;
    width: number;
};
export declare const useMeasure: <T extends HTMLElement = HTMLElement>(ref: React.RefObject<T | null>) => readonly [BoundingRect | undefined, () => void];
export {};
