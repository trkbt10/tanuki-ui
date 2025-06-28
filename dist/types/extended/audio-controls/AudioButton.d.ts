import { default as React } from 'react';
import { BaseAudioControlProps, SizeVariantProps, AudioButtonVariant, KeyboardShortcutProps } from './types';
export interface AudioButtonProps extends BaseAudioControlProps, SizeVariantProps, AudioButtonVariant, KeyboardShortcutProps {
    shape?: 'circle' | 'square';
    onClick?: () => void;
    onDoubleClick?: () => void;
    onRightClick?: () => void;
}
export declare const AudioButton: React.FC<AudioButtonProps>;
