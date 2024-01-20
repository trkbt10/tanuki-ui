import type { CSSProperties, SyntheticEvent } from "react";
import * as React from "react";
import { memo, useCallback, useMemo } from "react";
import styles from "./MediaPreview.module.css";

export interface MediaPreviewProps {
  src: string;
  alt?: string;
  maxWidth?: number;
  maxHeight?: number;
  minWidth?: number;
  minHeight?: number;
  aspectRatioRange?: {
    min: number; // minimum aspect ratio (width/height)
    max: number; // maximum aspect ratio (width/height)
  };
  onLoad?: () => void;
  onError?: () => void;
  className?: string;
}

export const MediaPreview = memo<MediaPreviewProps>(({
  src,
  alt = "Media preview",
  maxWidth = 256,
  maxHeight = 256,
  minWidth = 64,
  minHeight = 64,
  aspectRatioRange = { min: 0.25, max: 4 }, // 1:4 to 4:1 ratio
  onLoad,
  onError,
  className
}) => {
  const handleLoad = useCallback((event: SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    const { naturalWidth, naturalHeight } = img;
    
    if (naturalWidth === 0 || naturalHeight === 0) {
      onError?.();
      return;
    }
    
    onLoad?.();
  }, [onLoad, onError]);

  const containerStyles: CSSProperties = useMemo(() => ({
    '--max-width': `${maxWidth}px`,
    '--max-height': `${maxHeight}px`,
    '--min-width': `${minWidth}px`,
    '--min-height': `${minHeight}px`,
    '--aspect-ratio-min': aspectRatioRange.min.toString(),
    '--aspect-ratio-max': aspectRatioRange.max.toString(),
  } as CSSProperties), [maxWidth, maxHeight, minWidth, minHeight, aspectRatioRange]);

  return (
    <div 
      className={`${styles.mediaPreviewContainer} ${className || ''}`}
      style={containerStyles}
    >
      <img
        src={src}
        alt={alt}
        className={styles.mediaPreview}
        onLoad={handleLoad}
        onError={onError}
        loading="lazy"
      />
    </div>
  );
});