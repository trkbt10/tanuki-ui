export interface UseKeyboardShortcutOptions {
    key?: string;
    callback: () => void;
    disabled?: boolean;
    preventDefault?: boolean;
    target?: 'document' | 'body';
    condition?: (e: KeyboardEvent) => boolean;
}
export declare function useKeyboardShortcut({ key, callback, disabled, preventDefault, target, condition, }: UseKeyboardShortcutOptions): void;
