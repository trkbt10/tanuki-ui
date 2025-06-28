import { default as React } from 'react';
export interface WaveformEditorProps {
    className?: string;
    waveformData?: number[];
    width?: number;
    height?: number;
    selectionStart?: number;
    selectionEnd?: number;
    playheadPosition?: number;
    zoomLevel?: number;
    onSelectionChange?: (start: number, end: number) => void;
    onCut?: (start: number, end: number) => void;
    onCopy?: (start: number, end: number) => void;
    onPaste?: (position: number) => void;
    onFade?: (start: number, end: number, type: 'in' | 'out') => void;
    children?: React.ReactNode;
}
export declare const WaveformEditor: React.FC<WaveformEditorProps>;
