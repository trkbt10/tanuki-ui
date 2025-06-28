import * as React from "react";
export interface SelectableOption {
    value: string;
    label: string;
}
export interface UseSelectableOptionsProps {
    children: React.ReactNode;
    value?: string | readonly string[];
    defaultValue?: string | readonly string[];
    multiple?: boolean;
}
export interface UseSelectableOptionsReturn {
    options: SelectableOption[];
    selectedValues: string[];
    handleToggleOption: (value: string, checked: boolean) => void;
    handleToggleAll: (checked: boolean) => void;
    isCheckedAll: boolean;
    isCheckedPartially: boolean;
}
export declare const useSelectableOptions: ({ children, value, defaultValue, multiple }: UseSelectableOptionsProps) => UseSelectableOptionsReturn;
