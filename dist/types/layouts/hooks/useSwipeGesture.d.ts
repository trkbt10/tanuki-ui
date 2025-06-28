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
export declare const useSwipeGesture: (config: SwipeGestureConfig) => {
    handleTouchStart: (e: React.TouchEvent, scrollLeft?: number) => void;
    handleTouchMove: (e: TouchEvent) => void;
    handleTouchEnd: () => void;
    swipeState: SwipeState | null;
};
export {};
