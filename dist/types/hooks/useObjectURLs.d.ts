/**
 * Hook for managing Object URLs lifecycle with automatic cleanup
 * Provides efficient memory management for file previews
 */
export declare const useObjectURLs: () => {
    createObjectURL: (file: File) => string;
    revokeObjectURL: (url: string) => void;
    revokeAllObjectURLs: () => void;
    readonly activeURLCount: number;
};
