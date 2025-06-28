import * as React from 'react';
interface UseViewDimensionsConfig {
    viewCount: number;
    isMobile: boolean;
    hasMenu: boolean;
    menuWidth: number | string;
    defaultViewWidth?: number;
    dynamicSizing?: boolean;
}
export declare const useViewDimensions: (config: UseViewDimensionsConfig) => {
    updateViewDimension: (viewIndex: number, width: number) => void;
    getViewWidth: (viewIndex: number) => number;
    getViewOffset: (viewIndex: number) => number;
    containerWidth: number;
    dimensionCache: Map<number, number>;
};
export declare const useViewMeasurement: (viewIndex: number, onDimensionChange: (index: number, width: number) => void, enabled?: boolean) => {
    measureRef: React.RefObject<HTMLDivElement | null>;
};
export {};
