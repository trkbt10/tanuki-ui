import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./ViewSwitcher.module.css";

export interface ViewSwitcherItem {
  label: React.ReactNode;
  component: React.ComponentType<any>;
  key?: string;
}

export interface ViewSwitcherProps {
  items: ViewSwitcherItem[];
  defaultSelected?: number;
  onViewChange?: (index: number) => void;
  header?: React.ReactNode;
  currentIndex?: number;
  controlled?: boolean;
}

export const ViewSwitcher = React.memo(({ 
  items, 
  defaultSelected = 0, 
  onViewChange,
  header,
  currentIndex: controlledIndex,
  controlled = false
}: ViewSwitcherProps) => {
  const [internalIndex, setInternalIndex] = useState(defaultSelected);
  const currentIndex = controlled && controlledIndex !== undefined ? controlledIndex : internalIndex;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const viewsContainerRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  // Touch state
  const touchStateRef = useRef<{
    startX: number;
    startY: number;
    currentX: number;
    isDragging: boolean;
    direction: "horizontal" | "vertical" | null;
  } | null>(null);

  // Setup body overflow control
  useEffect(() => {
    const originalOverflowX = document.body.style.overflowX;
    document.body.style.overflowX = "hidden";

    return () => {
      document.body.style.overflowX = originalOverflowX;
    };
  }, []);

  // Move to specific view with snapping
  const snapToView = useCallback((index: number, animate = true) => {
    if (!viewsContainerRef.current || isAnimatingRef.current) return;

    const container = viewsContainerRef.current;
    const targetX = -index * window.innerWidth;

    if (animate) {
      isAnimatingRef.current = true;
      container.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      container.style.transform = `translateX(${targetX}px)`;

      setTimeout(() => {
        isAnimatingRef.current = false;
        if (container) {
          container.style.transition = "";
        }
      }, 300);
    } else {
      container.style.transition = "";
      container.style.transform = `translateX(${targetX}px)`;
    }
  }, []);

  // Initialize position
  useEffect(() => {
    snapToView(currentIndex, false);
  }, [snapToView, currentIndex]);

  // Update index helper
  const updateIndex = useCallback((newIndex: number) => {
    if (!controlled) {
      setInternalIndex(newIndex);
    }
  }, [controlled]);

  // Touch handlers
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (isAnimatingRef.current) return;

      const touch = e.touches[0];
      touchStateRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        currentX: touch.clientX,
        isDragging: false,
        direction: null,
      };
    },
    [],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!touchStateRef.current || !viewsContainerRef.current || isAnimatingRef.current) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStateRef.current.startX;
      const deltaY = touch.clientY - touchStateRef.current.startY;

      touchStateRef.current.currentX = touch.clientX;

      // Determine direction on first significant movement
      if (!touchStateRef.current.direction && (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8)) {
        touchStateRef.current.direction = Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";

        if (touchStateRef.current.direction === "horizontal") {
          touchStateRef.current.isDragging = true;
        }
      }

      // Only handle horizontal dragging
      if (touchStateRef.current.direction === "horizontal" && touchStateRef.current.isDragging) {
        e.preventDefault();

        const container = viewsContainerRef.current;
        const baseOffset = -currentIndex * window.innerWidth;
        let adjustedDeltaX = deltaX;

        // Add resistance at boundaries
        if ((currentIndex === 0 && deltaX > 0) || (currentIndex === items.length - 1 && deltaX < 0)) {
          adjustedDeltaX = deltaX * 0.25;
        }

        container.style.transform = `translateX(${baseOffset + adjustedDeltaX}px)`;
      }
    },
    [currentIndex, items.length],
  );

  const handleTouchEnd = useCallback(() => {
    if (!touchStateRef.current || !touchStateRef.current.isDragging || isAnimatingRef.current) {
      touchStateRef.current = null;
      return;
    }

    const deltaX = touchStateRef.current.currentX - touchStateRef.current.startX;
    const threshold = window.innerWidth * 0.25;
    let newIndex = currentIndex;

    // Determine if we should switch views
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && currentIndex > 0) {
        newIndex = currentIndex - 1;
      } else if (deltaX < 0 && currentIndex < items.length - 1) {
        newIndex = currentIndex + 1;
      }
    }

    // Always snap to a view (current or new)
    updateIndex(newIndex);
    snapToView(newIndex, true);

    if (newIndex !== currentIndex) {
      onViewChange?.(newIndex);
    }

    touchStateRef.current = null;
  }, [currentIndex, items.length, snapToView, onViewChange, updateIndex]);

  // Setup touch event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    container.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Render all views
  const allViews = useMemo(() => {
    return items.map((item, index) => {
      const Component = item.component;
      const isActive = index === currentIndex;
      const isAdjacent = Math.abs(index - currentIndex) <= 1;

      return (
        <div key={item.key || index} className={styles.view} aria-hidden={!isActive}>
          {isAdjacent && Component ? <Component /> : null}
        </div>
      );
    });
  }, [items, currentIndex]);

  return (
    <div ref={containerRef} className={styles.container}>
      {header && (
        <div className={styles.controls}>
          {header}
        </div>
      )}
      <div ref={viewsContainerRef} className={styles.viewsContainer}>
        {allViews}
      </div>
    </div>
  );
});

ViewSwitcher.displayName = "ViewSwitcher";
