import { useCallback, useRef } from 'react';

interface SwipeState {
  startX: number;
  startY: number;
  startScrollX: number;
  currentX: number;
  isDragging: boolean;
  direction: 'horizontal' | 'vertical' | null;
  startTime: number;
}

interface SwipeGestureConfig {
  onSwipeStart?: (state: SwipeState) => void;
  onSwipeMove?: (state: SwipeState, deltaX: number, deltaY: number) => void;
  onSwipeEnd?: (state: SwipeState, deltaX: number, velocity: number) => void;
  edgeSwipeWidth?: number;
  enabled?: boolean;
}

export const useSwipeGesture = (config: SwipeGestureConfig) => {
  const swipeStateRef = useRef<SwipeState | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent, scrollLeft?: number) => {
    if (!config.enabled) return;

    const touch = e.touches[0];
    const state: SwipeState = {
      startX: touch.clientX,
      startY: touch.clientY,
      startScrollX: scrollLeft || 0,
      currentX: touch.clientX,
      isDragging: false,
      direction: null,
      startTime: Date.now(),
    };

    swipeStateRef.current = state;
    config.onSwipeStart?.(state);
  }, [config]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!swipeStateRef.current || !config.enabled) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - swipeStateRef.current.startX;
    const deltaY = touch.clientY - swipeStateRef.current.startY;

    swipeStateRef.current.currentX = touch.clientX;

    if (!swipeStateRef.current.direction && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
      swipeStateRef.current.direction = Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical';
      
      if (swipeStateRef.current.direction === 'horizontal') {
        swipeStateRef.current.isDragging = true;
      }
    }

    if (swipeStateRef.current.isDragging) {
      config.onSwipeMove?.(swipeStateRef.current, deltaX, deltaY);
    }
  }, [config]);

  const handleTouchEnd = useCallback(() => {
    if (!swipeStateRef.current) return;

    const deltaX = swipeStateRef.current.currentX - swipeStateRef.current.startX;
    const deltaTime = Date.now() - swipeStateRef.current.startTime;
    const velocity = Math.abs(deltaX) / deltaTime;

    config.onSwipeEnd?.(swipeStateRef.current, deltaX, velocity);
    swipeStateRef.current = null;
  }, [config]);

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    swipeState: swipeStateRef.current,
  };
};