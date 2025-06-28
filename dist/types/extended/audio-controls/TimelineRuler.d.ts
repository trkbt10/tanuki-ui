import { default as React } from 'react';
export interface TimelineMarker {
    id: string;
    position: number;
    label?: string;
    color?: string;
}
export interface TimelineRulerProps {
    className?: string;
    duration?: number;
    currentTime?: number;
    zoom?: number;
    markers?: TimelineMarker[];
    showBeats?: boolean;
    showTime?: boolean;
    bpm?: number;
    timeSignature?: string;
    onSeek?: (time: number) => void;
    onMarkerAdd?: (position: number) => void;
    onMarkerRemove?: (id: string) => void;
    onZoomChange?: (zoom: number) => void;
    children?: React.ReactNode;
}
export declare const TimelineRuler: React.FC<TimelineRulerProps>;
