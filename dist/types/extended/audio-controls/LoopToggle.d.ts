import { default as React } from 'react';
export interface LoopToggleProps {
    className?: string;
    isLooping?: boolean;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
    onToggle?: (looping: boolean) => void;
    onRangeSelect?: (start: number, end: number) => void;
    children?: React.ReactNode;
}
export declare const LoopToggle: React.FC<LoopToggleProps>;
