interface MediaInputMessages {
    clickToSelect: string;
    orDragAndDrop: string;
    dropFilesHere: string;
}
/**
 * Hook for MediaInput internationalization
 * Automatically detects browser language and provides appropriate messages
 */
export declare const useMediaInputI18n: (customLocale?: string) => {
    locale: string;
    messages: MediaInputMessages;
    getSelectText: (isDragActive: boolean) => string;
};
export {};
