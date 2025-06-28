import { SwipeNavigationConfig } from '../types/swipe-navigation';
import * as React from 'react';
export declare const useSwipeNavigationRefactored: (config: SwipeNavigationConfig) => {
    containerRef: React.RefObject<HTMLDivElement | null>;
    scrollContainerRef: React.RefObject<HTMLDivElement | null>;
    menuRef: React.RefObject<HTMLDivElement | null>;
    isMobile: boolean;
    activeViewIndex: number;
    setActiveViewIndex: (index: number) => void;
    menuProgress: number;
    handleTouchStart: (e: React.TouchEvent) => void;
    handleTouchEnd: (e: React.TouchEvent) => void;
};
