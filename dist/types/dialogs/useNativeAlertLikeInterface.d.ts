import * as React from "react";
export declare const useNativeAlertLikeInterface: () => {
    confirm: (message?: string) => Promise<any>;
    alert: (message?: any) => Promise<undefined>;
    prompt: (message?: string, defaultValue?: string) => Promise<string | null>;
    Outlet: () => React.JSX.Element;
};
