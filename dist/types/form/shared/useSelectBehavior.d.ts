import * as React from "react";
export type ValueType = string | readonly string[] | number | undefined;
export interface UseSelectBehaviorProps {
    value?: ValueType;
    defaultValue?: ValueType;
    multiple?: boolean;
    disabled?: boolean;
    onChange?: (value: ValueType) => void;
}
export interface UseSelectBehaviorReturn {
    currentValue: ValueType;
    selectedValues: string[];
    handleToggleOption: (optionValue: string) => void;
    handleRemoveTag: (optionValue: string, event: React.MouseEvent) => void;
}
export declare const useSelectBehavior: ({ value, defaultValue, multiple, disabled, onChange }: UseSelectBehaviorProps) => UseSelectBehaviorReturn;
