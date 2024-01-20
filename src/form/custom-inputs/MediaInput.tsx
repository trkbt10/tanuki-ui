import type { InputHTMLAttributes, DragEvent } from "react";
import * as React from "react";
import { forwardRef, memo, useCallback, useMemo, useState } from "react";
import { isBase64 } from "../../utilities/isBase64";
import { isURL } from "../../utilities/isURL";
import { useObjectURLs } from "../../hooks/useObjectURLs";
import { useMediaInputI18n } from "../../hooks/useMediaInputI18n";
import { MediaPreview } from "./MediaPreview";
import { isRelativeURL } from "../../utilities/isRelativeURL";
import style from "../input.module.css";

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

export const MediaInput = memo(
  forwardRef<HTMLInputElement, MediaInputProps>(({ 
    defaultValue, 
    value, 
    variant = "preview",
    maxPreviewWidth = 96,
    maxPreviewHeight = 96,
    minPreviewWidth = 48,
    minPreviewHeight = 48,
    aspectRatioRange = { min: 0.25, max: 4 },
    locale,
    ...props 
  }, ref) => {
    const [changed, setChanged] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isDragActive, setIsDragActive] = useState(false);
    const { createObjectURL, revokeAllObjectURLs } = useObjectURLs();
    const { getSelectText } = useMediaInputI18n(locale);
    const filePreviewable = useMemo(() => {
      return props.accept?.split(",").some((type) => type.trim().startsWith("image"));
    }, [props.accept]);
    const initialSrc = useMemo(() => {
      if (typeof defaultValue !== "string") {
        return undefined;
      }
      if (isRelativeURL(defaultValue)) {
        return defaultValue;
      }
      if (isURL(defaultValue)) {
        return defaultValue;
      }
      if (isBase64(defaultValue)) {
        return defaultValue;
      }
      return undefined;
    }, [defaultValue]);

    const previewUrls = useMemo(() => {
      return selectedFiles.map(createObjectURL);
    }, [selectedFiles, createObjectURL]);
    const handleFiles = useCallback((files: FileList | null) => {
      if (!files || files.length === 0) {
        setSelectedFiles([]);
        setChanged(false);
        revokeAllObjectURLs();
        return [];
      }

      const filesArray = Array.from(files);
      
      // Clean up previous URLs before setting new files
      revokeAllObjectURLs();
      setSelectedFiles(filesArray);
      setChanged(true);
      return filesArray;
    }, [revokeAllObjectURLs]);

    const changeFileHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback(
      (e) => {
        if (!(e.target instanceof HTMLInputElement)) {
          return;
        }
        
        handleFiles(e.target.files);
        props.onChange?.(e);
      },
      [props.onChange, handleFiles],
    );

    const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(true);
    }, []);

    const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      // Only set to false if we're leaving the entire drop zone
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        setIsDragActive(false);
      }
    }, []);

    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      
      const files = e.dataTransfer.files;
      handleFiles(files);
      
      // Create a synthetic change event for consistency
      if (props.onChange) {
        const syntheticEvent = {
          target: { files },
          currentTarget: { files }
        } as React.ChangeEvent<HTMLInputElement>;
        props.onChange(syntheticEvent);
      }
    }, [handleFiles, props.onChange]);
    const hasFiles = selectedFiles.length > 0 || (!changed && initialSrc);
    const isPreviewMode = variant === "preview";

    // Files mode - render like normal file input
    if (!isPreviewMode) {
      return (
        <>
          {!changed && (
            <input 
              type="hidden" 
              name={props.name} 
              defaultValue={defaultValue} 
              value={value} 
            />
          )}
          <input 
            type="file" 
            {...props} 
            name={changed ? props.name : undefined} 
            onChange={changeFileHandler} 
            ref={ref}
            className={style.input}
            data-variant="files"
          />
        </>
      );
    }

    // Preview mode - render with preview functionality
    return (
      <div 
        className={`${style.mediaInput} ${
          isDragActive ? style.mediaInputDragActive : ''
        } ${
          hasFiles ? style.mediaInputHasFiles : ''
        }`}
        data-variant="preview"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className={style.mediaInputPreview}>
          {/* Preview selected files */}
          {filePreviewable && previewUrls.map((url, i) => (
            <MediaPreview
              key={`selected-${i}`}
              src={url}
              alt={`Selected file ${i + 1}`}
              maxWidth={maxPreviewWidth}
              maxHeight={maxPreviewHeight}
              minWidth={minPreviewWidth}
              minHeight={minPreviewHeight}
              aspectRatioRange={aspectRatioRange}
            />
          ))}
          
          {/* Preview initial value if no files selected */}
          {!changed && initialSrc && filePreviewable && (
            <MediaPreview
              src={initialSrc}
              alt="Current file"
              maxWidth={maxPreviewWidth}
              maxHeight={maxPreviewHeight}
              minWidth={minPreviewWidth}
              minHeight={minPreviewHeight}
              aspectRatioRange={aspectRatioRange}
            />
          )}
          
          {/* Empty state placeholder */}
          {!hasFiles && (
            <div className={style.mediaInputEmpty}>
              {getSelectText(isDragActive)}
            </div>
          )}
        </div>
        
        {/* Hidden input for preserving initial value */}
        {!changed && (
          <input 
            type="hidden" 
            name={props.name} 
            defaultValue={defaultValue} 
            value={value} 
          />
        )}
        
        {/* File input */}
        <input 
          type="file" 
          {...props} 
          name={changed ? props.name : undefined} 
          onChange={changeFileHandler} 
          ref={ref}
          className={style.mediaInputFile}
          aria-label={hasFiles ? `${selectedFiles.length} files selected` : 'Select files'}
        />
      </div>
    );
  }),
);
