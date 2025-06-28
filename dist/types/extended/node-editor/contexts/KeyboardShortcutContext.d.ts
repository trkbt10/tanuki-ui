import * as React from "react";
export type KeyboardShortcut = {
    key: string;
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    meta?: boolean;
};
export type ShortcutHandler = (e: KeyboardEvent) => void;
export interface KeyboardShortcutState {
    shortcuts: Map<string, ShortcutHandler>;
    isEnabled: boolean;
}
export type KeyboardShortcutAction = {
    type: "REGISTER_SHORTCUT";
    payload: {
        shortcut: KeyboardShortcut;
        handler: ShortcutHandler;
    };
} | {
    type: "UNREGISTER_SHORTCUT";
    payload: {
        shortcut: KeyboardShortcut;
    };
} | {
    type: "ENABLE_SHORTCUTS";
} | {
    type: "DISABLE_SHORTCUTS";
};
export declare const keyboardShortcutReducer: (state: KeyboardShortcutState, action: KeyboardShortcutAction) => KeyboardShortcutState;
export declare const defaultKeyboardShortcutState: KeyboardShortcutState;
export declare const keyboardShortcutActions: {
    registerShortcut: (shortcut: KeyboardShortcut, handler: ShortcutHandler) => KeyboardShortcutAction;
    unregisterShortcut: (shortcut: KeyboardShortcut) => KeyboardShortcutAction;
    enableShortcuts: () => KeyboardShortcutAction;
    disableShortcuts: () => KeyboardShortcutAction;
};
export interface KeyboardShortcutContextValue {
    state: KeyboardShortcutState;
    dispatch: React.Dispatch<KeyboardShortcutAction>;
    actions: typeof keyboardShortcutActions;
    registerShortcut: (shortcut: KeyboardShortcut, handler: ShortcutHandler) => void;
    unregisterShortcut: (shortcut: KeyboardShortcut) => void;
}
export declare const KeyboardShortcutContext: React.Context<KeyboardShortcutContextValue | null>;
export interface KeyboardShortcutProviderProps {
    children: React.ReactNode;
    initialState?: Partial<KeyboardShortcutState>;
}
export declare const KeyboardShortcutProvider: React.FC<KeyboardShortcutProviderProps>;
export declare const useKeyboardShortcut: () => KeyboardShortcutContextValue;
export declare const useRegisterShortcut: (shortcut: KeyboardShortcut, handler: ShortcutHandler, deps?: React.DependencyList) => void;
