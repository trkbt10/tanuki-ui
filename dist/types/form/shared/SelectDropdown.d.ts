import * as React from "react";
export interface SelectOption {
    value: string;
    label: string;
}
export interface SelectDropdownProps {
    isOpen: boolean;
    position: 'top' | 'bottom';
    dialogPosition: {
        top: number;
        left: number;
        width: number;
    };
    options: SelectOption[];
    selectedValues: string[];
    multiple?: boolean;
    searchTerm: string;
    onSearchChange: (term: string) => void;
    onOptionToggle: (value: string) => void;
    onClose: () => void;
    searchPlaceholder?: string;
    noOptionsMessage?: string;
    noMatchingMessage?: string;
}
export declare const SelectDropdown: React.ForwardRefExoticComponent<SelectDropdownProps & React.RefAttributes<HTMLDialogElement | null>>;
