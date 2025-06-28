import { default as React } from 'react';
export interface XyPadProps {
    className?: string;
    x?: number;
    y?: number;
    minX?: number;
    maxX?: number;
    minY?: number;
    maxY?: number;
    defaultX?: number;
    defaultY?: number;
    size?: number;
    labelX?: string;
    labelY?: string;
    disabled?: boolean;
    onChange?: (x: number, y: number) => void;
    onChangeEnd?: (x: number, y: number) => void;
    children?: React.ReactNode;
}
export declare const XyPad: React.FC<XyPadProps>;
