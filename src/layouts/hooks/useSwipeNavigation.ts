import React, { useCallback, useRef } from 'react';
import { useResponsive } from './useResponsive';
import { useActiveView } from './useActiveView';
import { useScrollSync } from './useScrollSync';
import { SwipeNavigationConfig } from '../types/swipe-navigation';

export const useSwipeNavigationRefactored = (config: SwipeNavigationConfig) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [menuProgress, setMenuProgress] = React.useState(0);
  
  const isMobile = useResponsive(config.desktopBreakpoint);
  
  const { activeViewIndex, setActiveViewIndex } = useActiveView({
    viewCount: config.viewCount,
    controlled: config.controlledActiveView,
    defaultView: config.defaultView,
    onChange: config.onViewChange,
    hasMenu: config.hasMenu,
  });
  
  const getViewWidth = useCallback((index?: number) => {
    return isMobile ? window.innerWidth : config.defaultViewWidth;
  }, [isMobile, config.defaultViewWidth]);
  
  const { scrollContainerRef } = useScrollSync({
    activeIndex: activeViewIndex,
    viewCount: config.viewCount,
    isMobile,
    hasMenu: config.hasMenu,
    onIndexChange: setActiveViewIndex,
    getViewWidth,
    dynamicSizing: config.dynamicSizing,
    onMenuProgress: setMenuProgress,
  });
  
  const menuRef = useRef<HTMLDivElement>(null);
  
  const handleViewChange = useCallback((index: number) => {
    setActiveViewIndex(index);
  }, [setActiveViewIndex]);
  
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // Simple touch handling - detailed gesture handling can be added later if needed
  }, []);  
  
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    // Simple touch handling - detailed gesture handling can be added later if needed
  }, []);
  
  
  
  return {
    containerRef,
    scrollContainerRef,
    menuRef,
    isMobile,
    activeViewIndex,
    setActiveViewIndex: handleViewChange,
    menuProgress,
    handleTouchStart,
    handleTouchEnd,
  };
};