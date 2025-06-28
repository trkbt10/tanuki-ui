import { default as React } from 'react';
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: boolean;
    variant?: 'default' | 'outline' | 'filled';
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}
export declare const Textarea: React.FC<TextareaProps>;
