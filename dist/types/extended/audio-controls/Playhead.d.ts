import { default as React } from 'react';
export interface PlayheadProps {
    className?: string;
    position?: number;
    duration?: number;
    height?: number | string;
    color?: string;
    showTime?: boolean;
    scrubSpeed?: number;
    onSeek?: (time: number) => void;
    onScrub?: (time: number) => void;
    children?: React.ReactNode;
}
export declare const Playhead: React.FC<PlayheadProps>;
