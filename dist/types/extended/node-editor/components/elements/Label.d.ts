import { default as React } from 'react';
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
}
export declare const Label: React.FC<LabelProps>;
