import { default as React } from 'react';
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
    weight?: 'normal' | 'medium' | 'semibold' | 'bold';
    color?: 'primary' | 'secondary' | 'muted';
    children: React.ReactNode;
}
export declare const Heading: React.FC<HeadingProps>;
export declare const H1: React.FC<Omit<HeadingProps, 'level'>>;
export declare const H2: React.FC<Omit<HeadingProps, 'level'>>;
export declare const H3: React.FC<Omit<HeadingProps, 'level'>>;
export declare const H4: React.FC<Omit<HeadingProps, 'level'>>;
export declare const H5: React.FC<Omit<HeadingProps, 'level'>>;
export declare const H6: React.FC<Omit<HeadingProps, 'level'>>;
