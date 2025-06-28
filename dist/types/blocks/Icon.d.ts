import { FC, default as React } from 'react';
export declare const Icon: FC<{
    src: string;
    width?: number | string;
    height?: number | string;
    size?: number;
}>;
export declare const CloseIcon: FC<{
    size?: number;
}>;
export declare const IndeterminateIcon: FC<{
    size?: number;
}>;
export declare const Checkmark: {
    ({ size }: {
        size?: number;
    }): React.JSX.Element;
    displayName: string;
};
