import * as React from "react";
import { useSwipeNavigationRefactored } from "./hooks/useSwipeNavigation";
import { SwipeIndicators } from "./components/SwipeIndicators";
import { SwipeNavigationConfig } from "./types/swipe-navigation";
import { useViewDimensions, useViewMeasurement } from "./hooks/useViewDimensions";
import classes from "./SwipeNavigation.module.css";

export interface SwipeNavigationProps {
  // Main content views
  children: React.ReactNode | React.ReactNode[];

  // Optional sticky menu (leftmost)
  menu?: React.ReactNode;
  menuWidth?: number | string;
  menuVisible?: boolean;

  // View settings
  activeView?: number;
  defaultView?: number;
  onViewChange?: (index: number) => void;

  // Behavior
  swipeEnabled?: boolean;
  edgeSwipeWidth?: number;
  swipeThreshold?: number;
  swipeVelocityThreshold?: number;

  // Responsive
  desktopBreakpoint?: number;

  // Styling
  className?: string;
  viewClassName?: string;
  menuClassName?: string;

  // Animation
  transitionDuration?: number;
  transitionTimingFunction?: string;

  // Indicators
  showIndicators?: boolean;

  // Dynamic sizing
  dynamicSizing?: boolean;
  defaultViewWidth?: number;
}

export const SwipeNavigation: React.FC<SwipeNavigationProps> = ({
  children,
  menu,
  menuWidth = 280,
  menuVisible = true,
  activeView: controlledActiveView,
  defaultView = 0,
  onViewChange,
  swipeEnabled = true,
  edgeSwipeWidth = 20,
  swipeThreshold = 0.25,
  swipeVelocityThreshold = 0.5,
  desktopBreakpoint = 768,
  className,
  viewClassName,
  menuClassName,
  transitionDuration = 150,
  transitionTimingFunction = "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  showIndicators = false,
  dynamicSizing = false,
  defaultViewWidth = 400,
}) => {
  const views = React.Children.toArray(children);
  const viewCount = views.length;

  const config: SwipeNavigationConfig = React.useMemo(
    () => ({
      viewCount,
      hasMenu: !!menu,
      menuWidth,
      menuVisible,
      swipeEnabled,
      edgeSwipeWidth,
      swipeThreshold,
      swipeVelocityThreshold,
      desktopBreakpoint,
      controlledActiveView,
      defaultView,
      onViewChange,
      transitionDuration,
      transitionTimingFunction,
      dynamicSizing,
      defaultViewWidth,
    }),
    [
      viewCount,
      menu,
      menuWidth,
      menuVisible,
      swipeEnabled,
      edgeSwipeWidth,
      swipeThreshold,
      swipeVelocityThreshold,
      desktopBreakpoint,
      controlledActiveView,
      defaultView,
      onViewChange,
      transitionDuration,
      transitionTimingFunction,
      dynamicSizing,
      defaultViewWidth,
    ]
  );

  const {
    containerRef,
    scrollContainerRef,
    menuRef,
    isMobile,
    activeViewIndex,
    setActiveViewIndex,
    menuProgress,
    handleTouchStart,
    handleTouchEnd,
  } = useSwipeNavigationRefactored(config);

  const { updateViewDimension, getViewWidth, getViewOffset, containerWidth, dimensionCache } = useViewDimensions({
    viewCount,
    isMobile,
    hasMenu: !!menu,
    menuWidth,
    defaultViewWidth,
    dynamicSizing,
  });

  const computedMenuWidth = React.useMemo(() => (typeof menuWidth === "number" ? `${menuWidth}px` : menuWidth), [menuWidth]);

  const containerClasses = React.useMemo(
    () =>
      [
        classes.container,
        isMobile && classes.mobile,
        !isMobile && viewCount === 1 && classes.singleView,
        !isMobile && dynamicSizing && classes.dynamicSizing,
        isMobile && menu && menuProgress > 0.1 && classes.menuActive,
        className,
      ]
        .filter(Boolean)
        .join(" "),
    [isMobile, viewCount, dynamicSizing, menu, menuProgress, className]
  );

  const menuClasses = React.useMemo(() => [classes.menu, menuClassName].filter(Boolean).join(" "), [menuClassName]);

  const customProperties = React.useMemo(
    () =>
      ({
        "--menu-width": computedMenuWidth,
        "--transition-duration": `${transitionDuration}ms`,
        "--transition-timing": transitionTimingFunction,
        "--view-count": viewCount,
        "--container-width": dynamicSizing && !isMobile ? `${containerWidth}px` : undefined,
        "--menu-progress": menuProgress,
      } as React.CSSProperties),
    [
      computedMenuWidth,
      transitionDuration,
      transitionTimingFunction,
      viewCount,
      containerWidth,
      dynamicSizing,
      isMobile,
      menuProgress,
    ]
  );

  return (
    <div ref={containerRef} className={containerClasses} style={customProperties}>
      {/* Desktop Menu */}
      {menu && !isMobile && menuVisible && (
        <div ref={menuRef} className={menuClasses} data-menu="desktop">
          {menu}
        </div>
      )}

      {/* Scroll Container */}
      <div
        ref={scrollContainerRef}
        className={classes.scrollContainer}
        onTouchStart={swipeEnabled && isMobile ? handleTouchStart : undefined}
        onTouchEnd={swipeEnabled && isMobile ? handleTouchEnd : undefined}
      >
        {/* Mobile: Menu as inline view */}
        {menu && isMobile && (
          <div
            className={[classes.view, classes.menuView, viewClassName].filter(Boolean).join(" ")}
            data-view="menu"
            style={{
              width: `min(80vw, 320px)`,
              flexShrink: 0,
            }}
          >
            {menu}
          </div>
        )}

        {/* Content Views */}
        {views.map((view, index) => {
          const { measureRef } = useViewMeasurement(
            index,
            updateViewDimension,
            dynamicSizing && !isMobile && viewCount > 1
          );

          const viewStyle: React.CSSProperties = {};
          const hasMeasuredWidth = dimensionCache.has(index);
          
          if (dynamicSizing && !isMobile && viewCount > 1 && hasMeasuredWidth) {
            const width = getViewWidth(index);
            const offset = getViewOffset(index);
            viewStyle.width = width;
            viewStyle.transform = `translateX(${offset}px)`;
            viewStyle.position = "absolute";
            viewStyle.left = 0;
          }

          return (
            <div
              key={index}
              ref={measureRef}
              className={[classes.view, viewClassName].filter(Boolean).join(" ")}
              data-view={index}
              data-active={index === activeViewIndex}
              style={viewStyle}
            >
              {view}
            </div>
          );
        })}
      </div>

      {/* Indicators */}
      {showIndicators && (
        <SwipeIndicators count={viewCount} activeIndex={Math.max(0, activeViewIndex ?? 0)} onIndexChange={setActiveViewIndex} />
      )}
    </div>
  );
};

SwipeNavigation.displayName = "SwipeNavigation";
