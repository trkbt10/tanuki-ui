import * as React from 'react';
import { useCallback, useMemo, useState } from 'react';
import { useResizeObserver } from '../../hooks/useResizeObserver';

interface ViewDimensionState {
  cache: Map<number, number>;
  offsets: number[];
  totalWidth: number;
}

interface UseViewDimensionsConfig {
  viewCount: number;
  isMobile: boolean;
  hasMenu: boolean;
  menuWidth: number | string;
  defaultViewWidth?: number;
  dynamicSizing?: boolean;
}

export const useViewDimensions = (config: UseViewDimensionsConfig) => {
  const [dimensionState, setDimensionState] = useState<ViewDimensionState>(() => ({
    cache: new Map<number, number>(),
    offsets: [],
    totalWidth: 0,
  }));

  const updateViewDimension = useCallback((viewIndex: number, width: number) => {
    if (!config.dynamicSizing || config.isMobile) return;

    setDimensionState((prev) => {
      const prevWidth = prev.cache.get(viewIndex);
      if (prevWidth === width) return prev;

      const newCache = new Map(prev.cache);
      newCache.set(viewIndex, width);

      const offsets: number[] = [];
      let totalWidth = 0;

      for (let i = 0; i < config.viewCount; i++) {
        offsets[i] = totalWidth;
        const viewWidth = newCache.get(i) ?? config.defaultViewWidth ?? 400;
        totalWidth += viewWidth;
      }

      return {
        cache: newCache,
        offsets,
        totalWidth,
      };
    });
  }, [config.dynamicSizing, config.isMobile, config.viewCount, config.defaultViewWidth]);

  const getViewWidth = useCallback((viewIndex: number) => {
    if (config.isMobile) {
      return window.innerWidth;
    }

    if (!config.dynamicSizing || config.viewCount === 1) {
      return config.defaultViewWidth ?? 400;
    }

    return dimensionState.cache.get(viewIndex) ?? config.defaultViewWidth ?? 400;
  }, [config.isMobile, config.dynamicSizing, config.viewCount, config.defaultViewWidth, dimensionState.cache]);

  const getViewOffset = useCallback((viewIndex: number) => {
    if (config.isMobile) {
      const menuOffset = config.hasMenu ? 1 : 0;
      return (viewIndex + menuOffset) * window.innerWidth;
    }

    if (!config.dynamicSizing || config.viewCount === 1) {
      return viewIndex * (config.defaultViewWidth ?? 400);
    }

    return dimensionState.offsets[viewIndex] ?? 0;
  }, [config.isMobile, config.hasMenu, config.dynamicSizing, config.viewCount, config.defaultViewWidth, dimensionState.offsets]);

  const containerWidth = useMemo(() => {
    if (config.isMobile) {
      const menuOffset = config.hasMenu ? 1 : 0;
      return (config.viewCount + menuOffset) * window.innerWidth;
    }

    if (!config.dynamicSizing || config.viewCount === 1) {
      return config.viewCount * (config.defaultViewWidth ?? 400);
    }

    return dimensionState.totalWidth;
  }, [config.isMobile, config.hasMenu, config.viewCount, config.dynamicSizing, config.defaultViewWidth, dimensionState.totalWidth]);

  return {
    updateViewDimension,
    getViewWidth,
    getViewOffset,
    containerWidth,
    dimensionCache: dimensionState.cache,
  };
};

export const useViewMeasurement = (
  viewIndex: number,
  onDimensionChange: (index: number, width: number) => void,
  enabled: boolean = true
) => {
  const measureRef = React.useRef<HTMLDivElement>(null);
  const { rect } = useResizeObserver(measureRef, { box: 'border-box' });

  const lastReportedWidth = React.useRef<number>(0);

  React.useEffect(() => {
    if (!enabled || !rect) return;
    
    const width = rect.width;
    if (width > 0 && Math.abs(width - lastReportedWidth.current) > 1) {
      lastReportedWidth.current = width;
      onDimensionChange(viewIndex, width);
    }
  }, [rect, viewIndex, onDimensionChange, enabled]);

  return { measureRef };
};