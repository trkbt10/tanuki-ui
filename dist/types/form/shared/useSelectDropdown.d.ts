import * as React from "react";
export interface UseSelectDropdownProps {
    onClose?: () => void;
}
export interface UseSelectDropdownReturn {
    isOpen: boolean;
    searchTerm: string;
    dropdownPosition: 'bottom' | 'top';
    dialogPosition: {
        top: number;
        left: number;
        width: number;
    };
    containerRef: React.RefObject<HTMLDivElement | null>;
    dialogRef: React.RefObject<HTMLDialogElement | null>;
    openDialog: () => void;
    closeDialog: () => void;
    setSearchTerm: (term: string) => void;
}
export declare const useSelectDropdown: ({ onClose }?: UseSelectDropdownProps) => UseSelectDropdownReturn;
