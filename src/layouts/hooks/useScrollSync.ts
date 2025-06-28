import { useCallback, useEffect, useRef } from 'react';

interface ScrollSyncConfig {
  activeIndex: number;
  viewCount: number;
  isMobile: boolean;
  hasMenu: boolean;
  onIndexChange: (index: number) => void;
  getViewWidth: (index?: number) => number;
  getViewOffset?: (index: number) => number;
  dynamicSizing?: boolean;
  onMenuProgress?: (progress: number) => void;
}

export const useScrollSync = (config: ScrollSyncConfig) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingProgrammatically = useRef(false);

  const scrollToIndex = useCallback((index: number, smooth = true) => {
    if (!scrollContainerRef.current) return;

    let targetX: number;
    if (config.dynamicSizing && config.getViewOffset && !config.isMobile) {
      targetX = config.getViewOffset(index);
    } else {
      const viewWidth = config.getViewWidth();
      const menuOffset = config.isMobile && config.hasMenu ? 1 : 0;
      // For index >= 0 (content views), add menuOffset to position correctly
      // For index -1 (menu), scroll to position 0
      targetX = index === -1 ? 0 : (index + menuOffset) * viewWidth;
    }

    isScrollingProgrammatically.current = true;
    scrollContainerRef.current.scrollTo({
      left: targetX,
      behavior: 'auto', // Always instant to avoid bounce
    });

    setTimeout(() => {
      isScrollingProgrammatically.current = false;
    }, 100);
  }, [config.dynamicSizing, config.getViewOffset, config.isMobile, config.hasMenu, config.getViewWidth]);

  // Sync scroll position with activeIndex changes only
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    scrollToIndex(config.activeIndex, false);
  }, [config.activeIndex, scrollToIndex]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout | undefined;

    const handleScroll = () => {
      if (isScrollingProgrammatically.current) return;

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Immediate feedback for menu progress on mobile
      if (config.isMobile && config.hasMenu && config.onMenuProgress) {
        const scrollX = container.scrollLeft;
        const viewWidth = config.getViewWidth();
        const menuWidth = Math.min(window.innerWidth * 0.8, 320);
        
        if (scrollX < menuWidth) {
          // Menu is visible, calculate progress
          const progress = Math.max(0, (menuWidth - scrollX) / menuWidth);
          config.onMenuProgress(progress);
        } else {
          config.onMenuProgress(0);
        }
      }
      
      // Removed index change detection to prevent infinite scroll loops
      // This hook now only handles: activeIndex → scroll position (one-way)
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      container.removeEventListener('scroll', handleScroll);
    };
  }, [config]);

  return {
    scrollContainerRef,
    scrollToIndex,
  };
};