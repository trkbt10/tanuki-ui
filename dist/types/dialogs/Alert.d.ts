import { PropsWithChildren, default as React } from 'react';
import { PopupLayoutProps } from './parts/PopupLayout';
export type AlertAction = {
    key: string;
    value: string;
    variant?: string;
};
export declare const Alert: {
    ({ actions, onSelect, isLoading, children, title, error, description, direction, ...props }: PopupLayoutProps & PropsWithChildren<{
        title?: string;
        description?: string;
        onSelect?: (actionType: string) => void;
        mark?: string;
        isLoading?: boolean;
        aspectRatio?: string;
        error?: Error;
        direction?: string;
        actions?: AlertAction[];
    }>): React.JSX.Element;
    displayName: string;
};
