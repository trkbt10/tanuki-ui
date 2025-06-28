import * as React from "react";
export interface SelectTagsProps {
    selectedValues: string[];
    getOptionLabel: (value: string) => string;
    onRemoveTag?: (value: string, event: React.MouseEvent) => void;
    placeholder?: string;
    multiple?: boolean;
    disabled?: boolean;
    renderSelected?: (value: string) => React.ReactNode;
}
export declare const SelectTags: React.FC<SelectTagsProps>;
