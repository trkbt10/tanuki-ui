/**
 * Hook that integrates history tracking with node editor state changes
 */
export declare const useHistoryIntegration: () => {
    dispatchWithHistory: (action: any) => void;
    performUndo: () => boolean;
    performRedo: () => boolean;
    canUndo: boolean;
    canRedo: boolean;
};
