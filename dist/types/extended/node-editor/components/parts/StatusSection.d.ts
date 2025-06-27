import * as React from "react";
export interface StatusSectionProps {
    label: string;
    value: React.ReactNode;
    className?: string;
    labelClassName?: string;
    valueClassName?: string;
}
export declare const StatusSection: React.FC<StatusSectionProps>;
export declare const statusSectionStyles: CSSModuleClasses;
