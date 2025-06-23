import * as React from "react";
import { useSidebarLayout, type MobileView, type MobileSidebarMode } from "./hooks";
import classes from "./SidebarLayout.module.css";

type SidebarLayoutProps = {
  aside: React.ReactNode;
  children: React.ReactNode;
  asideId?: string;
  minAsideWidth?: number;
  maxAsideWidth?: number;
  mobileView?: MobileView;
  defaultMobileView?: MobileView;
  mobileBreakpoint?: number;
  onMobileViewChange?: (view: MobileView) => void;
  mobileSidebarMode?: MobileSidebarMode;
  mobileOverlayMaxWidth?: number;
  mobileOverlayDimBackground?: boolean;
};

export const SidebarLayout: React.FC<SidebarLayoutProps> = (props) => {
  const {
    aside,
    children,
    minAsideWidth = 120,
    maxAsideWidth = 480,
    defaultMobileView = "main",
    mobileBreakpoint = 768,
    mobileSidebarMode = "fullscreen",
    mobileOverlayMaxWidth = 320,
    mobileOverlayDimBackground = true,
    ...rest
  } = props;

  const config = {
    minAsideWidth,
    maxAsideWidth,
    asideId: props.asideId,
    mobileBreakpoint,
    mobileSidebarMode,
    mobileOverlayMaxWidth,
    mobileOverlayDimBackground,
    defaultMobileView,
  };

  const {
    resizerRef,
    containerRef,
    viewsContainerRef,
    isMobile,
    asideWidth,
    mobileSidebarWidth,
    currentMobileView,
    updateMobileView,
  } = useSidebarLayout(config, props.mobileView, props.onMobileViewChange);

  const isOverlay = mobileSidebarMode === "overlay";
  const baseClasses = `${classes.base}${isMobile ? ` ${classes.mobile}` : ''}${isOverlay ? ` ${classes.overlay}` : ''}`;

  return (
    <div 
      className={baseClasses}
      ref={containerRef}
      data-sidebar-base
      style={isMobile ? { '--mobile-sidebar-width': `${mobileSidebarWidth}px` } as React.CSSProperties : undefined}
    >
      {!isMobile ? (
        <>
          <aside className={classes.aside} style={{ width: asideWidth }} aria-label={config.asideId} id={config.asideId}>
            {aside}
          </aside>
          <div
            className={classes.resizer}
            ref={resizerRef}
            role="separator"
            aria-orientation="vertical"
            tabIndex={0}
            aria-label="resize"
            style={{ left: asideWidth - 4 }}
          />
          <main className={classes.main}>{children}</main>
        </>
      ) : (
        <>
          {isOverlay && mobileOverlayDimBackground && (
            <div 
              className={classes.overlayBackdrop} 
              data-visible={currentMobileView === "aside" ? "true" : "false"}
              onClick={() => updateMobileView("main")} 
            />
          )}
          <div 
            className={classes.mobileViewsContainer} 
            ref={viewsContainerRef}
            style={{ viewTransitionName: 'sidebar-layout' } as React.CSSProperties}
          >
            <aside 
              className={`${classes.aside} ${classes.mobileView}`} 
              data-sidebar="aside"
              data-active={currentMobileView === "aside" ? "true" : "false"}
              aria-label={config.asideId} 
              id={config.asideId}
            >
              {aside}
            </aside>
            <main className={`${classes.main} ${classes.mobileView}`}>{children}</main>
          </div>
        </>
      )}
    </div>
  );
};
SidebarLayout.displayName = "SidebarLayout";
