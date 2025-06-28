import { ReactNode } from 'react';
export interface BaseAudioControlProps {
    className?: string;
    disabled?: boolean;
    children?: ReactNode;
}
export interface SizeVariantProps {
    size?: 'small' | 'medium' | 'large';
}
export interface ValueControlProps<T = number> {
    value?: T;
    defaultValue?: T;
    onChange?: (value: T) => void;
    onChangeEnd?: (value: T) => void;
}
export interface RangeControlProps extends ValueControlProps<number> {
    min?: number;
    max?: number;
}
export interface AudioButtonVariant {
    variant?: 'play' | 'stop' | 'record' | 'toggle' | 'mute' | 'solo';
    isActive?: boolean;
    isArmed?: boolean;
    isRecording?: boolean;
    isSoloed?: boolean;
}
export interface KeyboardShortcutProps {
    keyBinding?: string;
}
export interface OrientationProps {
    orientation?: 'vertical' | 'horizontal';
}
export interface DisplayProps {
    showValue?: boolean;
    showScale?: boolean;
}
export type AudioControlSize = 'small' | 'medium' | 'large';
export type AudioControlShape = 'circle' | 'square';
export type AudioControlVariant = 'play' | 'stop' | 'record' | 'toggle' | 'mute' | 'solo';
