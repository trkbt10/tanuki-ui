import { ValueType } from './shared';
import * as React from "react";
export type DataListProps = {
    value?: ValueType;
    defaultValue?: ValueType;
    name?: string;
    list?: string;
    placeholder?: string;
    multiple?: boolean;
    disabled?: boolean;
    renderSelected?: (value: string, option?: HTMLOptionElement) => React.ReactNode;
    onChange?: (value: ValueType) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'name' | 'list' | 'placeholder' | 'multiple' | 'disabled' | 'onChange'>;
export declare const DataList: ({ value, defaultValue, name, list, renderSelected, placeholder, multiple, disabled, onChange, ...props }: DataListProps) => React.JSX.Element;
