import { PopupLayout } from './parts/PopupLayout';
import * as React from "react";
export declare const Prompt: {
    ({ isLoading, onSelect, message, defaultValue, open, onClose, potal, onCancel, }: React.ComponentPropsWithRef<typeof PopupLayout> & {
        onSelect: (value: string) => void;
        onCancel: () => void;
        isLoading?: boolean;
        message: string;
        defaultValue?: string;
    }): React.JSX.Element;
    displayName: string;
};
