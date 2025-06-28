import { default as React } from 'react';
export interface MetronomeToggleProps {
    className?: string;
    isActive?: boolean;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
    bpm?: number;
    timeSignature?: string;
    onToggle?: (active: boolean) => void;
    onBpmChange?: (bpm: number) => void;
    onTimeSignatureChange?: (signature: string) => void;
    children?: React.ReactNode;
}
export declare const MetronomeToggle: React.FC<MetronomeToggleProps>;
