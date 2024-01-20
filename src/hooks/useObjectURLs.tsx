import { useCallback, useEffect, useRef } from "react";

/**
 * Hook for managing Object URLs lifecycle with automatic cleanup
 * Provides efficient memory management for file previews
 */
export const useObjectURLs = () => {
  const urlsRef = useRef<Set<string>>(new Set());

  const createObjectURL = useCallback((file: File): string => {
    const url = URL.createObjectURL(file);
    urlsRef.current.add(url);
    return url;
  }, []);

  const revokeObjectURL = useCallback((url: string): void => {
    if (urlsRef.current.has(url)) {
      URL.revokeObjectURL(url);
      urlsRef.current.delete(url);
    }
  }, []);

  const revokeAllObjectURLs = useCallback((): void => {
    urlsRef.current.forEach(url => URL.revokeObjectURL(url));
    urlsRef.current.clear();
  }, []);

  // Cleanup all URLs on unmount
  useEffect(() => {
    return () => {
      urlsRef.current.forEach(url => URL.revokeObjectURL(url));
      urlsRef.current.clear();
    };
  }, []);

  return {
    createObjectURL,
    revokeObjectURL,
    revokeAllObjectURLs,
    get activeURLCount() {
      return urlsRef.current.size;
    }
  };
};