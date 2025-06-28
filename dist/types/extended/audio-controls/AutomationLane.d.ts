import { default as React } from 'react';
export interface AutomationPoint {
    id: string;
    time: number;
    value: number;
    curve?: 'linear' | 'exponential' | 'bezier';
}
export interface AutomationLaneProps {
    className?: string;
    points?: AutomationPoint[];
    width?: number;
    height?: number;
    duration?: number;
    minValue?: number;
    maxValue?: number;
    defaultValue?: number;
    label?: string;
    color?: string;
    onPointAdd?: (point: Omit<AutomationPoint, 'id'>) => void;
    onPointUpdate?: (id: string, point: Partial<AutomationPoint>) => void;
    onPointRemove?: (id: string) => void;
    children?: React.ReactNode;
}
export declare const AutomationLane: React.FC<AutomationLaneProps>;
