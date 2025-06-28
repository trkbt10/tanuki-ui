export interface SwipeNavigationConfig {
  viewCount: number;
  hasMenu: boolean;
  menuWidth: number | string;
  menuVisible: boolean;
  swipeEnabled: boolean;
  edgeSwipeWidth: number;
  swipeThreshold: number;
  swipeVelocityThreshold: number;
  desktopBreakpoint: number;
  controlledActiveView?: number;
  defaultView: number;
  onViewChange?: (index: number) => void;
  transitionDuration: number;
  transitionTimingFunction: string;
  dynamicSizing: boolean;
  defaultViewWidth: number;
}

export interface SwipeNavigationViewport {
  isMobile: boolean;
  mobileViewWidth: number;
  desktopViewWidth: number;
}

export const SWIPE_NAVIGATION_CONSTANTS = {
  DESKTOP_VIEW_WIDTH: 400,
  SCROLL_DEBOUNCE_MS: 150,
  TOUCH_MOVEMENT_THRESHOLD: 5,
  PROGRAMMATIC_SCROLL_TIMEOUT: 500,
  SCROLL_TOLERANCE: 5,
  MENU_OVERLAY_PROGRESS_THRESHOLD: 0.1,
  MENU_OPEN_THRESHOLD: 0.5,
} as const;