import { default as React } from 'react';
export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: 'horizontal' | 'vertical';
    variant?: 'default' | 'subtle' | 'elevated';
    size?: 'small' | 'medium' | 'large';
    children: React.ReactNode;
}
export declare const Toolbar: React.FC<ToolbarProps>;
export interface ToolbarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export declare const ToolbarGroup: React.FC<ToolbarGroupProps>;
export interface ToolbarSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
}
export declare const ToolbarSeparator: React.FC<ToolbarSeparatorProps>;
