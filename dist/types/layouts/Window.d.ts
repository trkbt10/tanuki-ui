import { default as React } from 'react';
export type WindowProps = {
    id?: string;
    children?: React.ReactNode;
    height?: number;
    width?: number;
    top?: number;
    left?: number;
    resizable?: boolean;
    expand?: boolean;
    fullscreen?: boolean;
    onClose?: () => void;
    title?: string;
    open?: boolean;
    style?: React.CSSProperties;
    titleBarMode?: "default" | "hidden";
    icons?: {
        close?: React.ReactNode;
        expand?: React.ReactNode;
        fullscreen?: React.ReactNode;
    };
};
export declare const Window: React.FC<WindowProps>;
export default Window;
