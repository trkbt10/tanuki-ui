import { default as React } from 'react';
export interface SwitchInputProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
    label?: string;
    id?: string;
    className?: string;
}
export declare const SwitchInput: React.FC<SwitchInputProps>;
