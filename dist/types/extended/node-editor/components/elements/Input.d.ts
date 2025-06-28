import { default as React } from 'react';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    variant?: 'default' | 'outline' | 'filled';
}
export declare const Input: React.FC<InputProps>;
