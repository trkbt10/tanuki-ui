import * as React from "react";
export interface SelectInputProps {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    isOpen?: boolean;
    className?: string;
}
export declare const SelectInput: React.ForwardRefExoticComponent<SelectInputProps & React.RefAttributes<HTMLDivElement | null>>;
