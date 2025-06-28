import { default as React } from 'react';
export type MediaSourceProps = string | {
    src: string;
    alt?: string;
} | HTMLVideoElement | HTMLImageElement | HTMLCanvasElement | HTMLObjectElement | HTMLIFrameElement;
export declare const Media: ({ source, className }: {
    source: MediaSourceProps;
    className?: string;
}) => React.JSX.Element;
