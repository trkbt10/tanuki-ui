import { Dialog } from '../Dialog';
import * as React from "react";
export type PopupLayoutProps = React.PropsWithChildren<{
    variant?: "alert" | "drawer" | string;
    potal?: boolean;
    animationName?: string;
    direction?: "ltr" | "rtl" | "ttb" | "btt";
}> & React.ComponentPropsWithRef<typeof Dialog>;
export declare const PopupLayout: React.MemoExoticComponent<({ potal, open, onClose, onCancel, children, variant, animationName, direction }: PopupLayoutProps) => React.JSX.Element>;
