import { InputHTMLAttributes } from 'react';
import * as React from "react";
export interface MediaInputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: "preview" | "files";
    maxPreviewWidth?: number;
    maxPreviewHeight?: number;
    minPreviewWidth?: number;
    minPreviewHeight?: number;
    aspectRatioRange?: {
        min: number;
        max: number;
    };
    locale?: string;
}
export declare const MediaInput: React.NamedExoticComponent<MediaInputProps & React.RefAttributes<HTMLInputElement>>;
