import { default as React } from 'react';
export interface StepSequencerProps {
    className?: string;
    steps?: number;
    tracks?: number;
    pattern?: boolean[][];
    currentStep?: number;
    isPlaying?: boolean;
    trackLabels?: string[];
    onStepToggle?: (track: number, step: number, active: boolean) => void;
    onPatternChange?: (pattern: boolean[][]) => void;
    children?: React.ReactNode;
}
export declare const StepSequencer: React.FC<StepSequencerProps>;
