import * as React from "react";
export interface MediaPreviewProps {
    src: string;
    alt?: string;
    maxWidth?: number;
    maxHeight?: number;
    minWidth?: number;
    minHeight?: number;
    aspectRatioRange?: {
        min: number;
        max: number;
    };
    onLoad?: () => void;
    onError?: () => void;
    className?: string;
}
export declare const MediaPreview: React.NamedExoticComponent<MediaPreviewProps>;
