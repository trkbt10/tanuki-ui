import { default as React } from 'react';
export interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large' | 'fullscreen';
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    className?: string;
}
export declare const Dialog: React.FC<DialogProps>;
