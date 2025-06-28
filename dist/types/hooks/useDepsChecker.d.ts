interface DepsCheckerOptions {
    enabled?: boolean;
    skipInitialRenders?: number;
    componentName?: string;
}
/**
 * Development hook for tracking prop changes and identifying unnecessary re-renders.
 * Logs detailed information about prop changes after initial stabilization.
 */
export declare const useDepsChecker: (props: {
    [key: string]: any;
}, options?: DepsCheckerOptions) => void;
export {};
