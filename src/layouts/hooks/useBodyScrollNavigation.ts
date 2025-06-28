import { useCallback, useEffect, useRef, useState } from 'react';

interface BodyScrollConfig {
  activeIndex: number;
  viewCount: number;
  isMobile: boolean;
  hasMenu: boolean;
  onIndexChange: (index: number) => void;
  enabled?: boolean;
}

export const useBodyScrollNavigation = (config: BodyScrollConfig) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isScrollingProgrammatically = useRef(false);

  // Body scroll navigation doesn't actually need body/html modifications
  // The goal is to use the browser's native document scrolling behavior
  // Our container will handle the scrolling, and the browser will naturally
  // handle things like iOS address bar hiding when users scroll the container

  // Setup intersection observer for view detection
  useEffect(() => {
    if (!config.enabled || !config.isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingProgrammatically.current) return;

        // Find the most visible view
        let mostVisible = { index: 0, ratio: 0 };
        
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-view') || '0');
          if (entry.intersectionRatio > mostVisible.ratio) {
            mostVisible = { index, ratio: entry.intersectionRatio };
          }
        });

        // Only update if significantly visible (> 50%)
        if (mostVisible.ratio > 0.5) {
          // Convert DOM index to activeIndex (-1 for menu, 0+ for content)
          const activeIndex = config.hasMenu ? mostVisible.index - 1 : mostVisible.index;
          
          if (activeIndex !== config.activeIndex) {
            config.onIndexChange(activeIndex);
          }
        }
      },
      {
        root: containerRef.current,
        threshold: [0, 0.25, 0.5, 0.75, 1.0],
      }
    );

    // Observe all views
    viewRefs.current.forEach((view) => {
      if (view) observer.observe(view);
    });

    return () => observer.disconnect();
  }, [config.enabled, config.isMobile, config.activeIndex, config.hasMenu, config.viewCount, config.onIndexChange]);

  // Scroll to specific view
  const scrollToView = useCallback((index: number) => {
    if (!config.enabled || !config.isMobile || !containerRef.current) return;

    // Convert activeIndex to DOM index
    const domIndex = config.hasMenu ? index + 1 : index;
    const targetView = viewRefs.current[domIndex];
    
    if (!targetView) return;

    isScrollingProgrammatically.current = true;
    
    // Use scrollIntoView for smooth, native scrolling behavior
    targetView.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });

    // Reset flag after scroll completes
    setTimeout(() => {
      isScrollingProgrammatically.current = false;
    }, 300);
  }, [config.enabled, config.isMobile, config.hasMenu]);

  // Auto-scroll when activeIndex changes
  useEffect(() => {
    if (!config.enabled || !config.isMobile) return;
    scrollToView(config.activeIndex);
  }, [config.activeIndex, scrollToView, config.enabled, config.isMobile]);

  // Initial scroll position setup
  useEffect(() => {
    if (!config.enabled || !config.isMobile) return;
    
    // Delay to ensure all refs are registered
    const timeoutId = setTimeout(() => {
      const firstContentViewIndex = config.hasMenu ? 1 : 0;
      const firstContentView = viewRefs.current[firstContentViewIndex];
      
      if (firstContentView) {
        // Immediately scroll to first content view (not menu)
        firstContentView.scrollIntoView({
          behavior: 'auto', // Instant scroll
          block: 'nearest',
          inline: 'start',
        });
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [config.enabled, config.isMobile, config.hasMenu, config.viewCount]);

  // Register view ref
  const registerViewRef = useCallback((index: number) => {
    return (ref: HTMLDivElement | null) => {
      viewRefs.current[index] = ref;
    };
  }, []);

  return {
    containerRef,
    registerViewRef,
    scrollToView,
    isMenuVisible: config.activeIndex === -1,
    isBodyScrollEnabled: config.enabled && config.isMobile,
  };
};