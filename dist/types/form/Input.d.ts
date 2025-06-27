import { default as React } from 'react';
export type HTMLInputElementProps = React.PropsWithChildren<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    [K in `data-${string}`]?: string;
} & {
    switch?: "true" | "false";
    indeterminate?: boolean;
}>;
export declare const Input: React.ForwardRefExoticComponent<Omit<HTMLInputElementProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
