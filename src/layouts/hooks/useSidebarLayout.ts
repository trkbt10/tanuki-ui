import { useCallback, useEffect, useRef, useState } from "react";
import { useObservePointer, type PointerInfo } from "../../hooks/usePointerObserver";
import type { MobileView, SidebarLayoutConfig } from "./types";

const useStateWithStorage = (key: string | undefined, initialValue: number) => {
  const [value, setValue] = useState<number>(initialValue);

  useEffect(() => {
    if (!key || typeof window === "undefined") return;
    
    const saved = window.localStorage.getItem(key);
    if (saved) {
      const num = Number(saved);
      if (!isNaN(num)) setValue(Math.min(Math.max(num, 120), 480));
    }
  }, [key]);

  useEffect(() => {
    if (!key || typeof window === "undefined") return;
    window.localStorage.setItem(key, String(value));
  }, [value, key]);

  return [value, setValue] as const;
};

export const useSidebarLayout = (
  config: SidebarLayoutConfig,
  mobileView?: MobileView,
  onMobileViewChange?: (view: MobileView) => void
) => {
  // Refs
  const resizerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewsContainerRef = useRef<HTMLDivElement>(null);
  
  // Desktop state
  const storageKey = config.asideId ? `SidebarLayout:width:${config.asideId}` : undefined;
  const [asideWidth, setAsideWidth] = useStateWithStorage(storageKey, 240);
  const isDragging = useRef(false);
  const baseRect = useRef<DOMRect | null>(null);
  
  // Mobile state
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSidebarWidth, setMobileSidebarWidth] = useState(0);
  const [internalMobileView, setInternalMobileView] = useState<MobileView>(config.defaultMobileView);
  const touchStateRef = useRef<{
    startX: number;
    startY: number;
    currentX: number;
    isDragging: boolean;
    direction: "horizontal" | "vertical" | null;
  } | null>(null);
  
  const isControlled = mobileView !== undefined;
  const currentMobileView = isControlled ? mobileView : internalMobileView;

  // Update mobile view
  const updateMobileView = useCallback((nextView: MobileView) => {
    if (!isControlled) setInternalMobileView(nextView);
    onMobileViewChange?.(nextView);
  }, [isControlled, onMobileViewChange]);

  // Combined resize and mobile detection effect
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < config.mobileBreakpoint);
      
      if (config.mobileSidebarMode === "overlay") {
        setMobileSidebarWidth(Math.min(config.mobileOverlayMaxWidth, width));
      } else {
        setMobileSidebarWidth(width);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [config.mobileBreakpoint, config.mobileSidebarMode, config.mobileOverlayMaxWidth]);

  // Desktop resize handler
  const handlePointer = useCallback((info: PointerInfo) => {
    if (info.type === "pointerdown") {
      isDragging.current = true;
      baseRect.current = document.querySelector('[data-sidebar-base]')?.getBoundingClientRect() ?? null;
    } else if (info.type === "pointermove" && isDragging.current && baseRect.current) {
      const newWidth = Math.min(Math.max(info.pageX - baseRect.current.left, config.minAsideWidth), config.maxAsideWidth);
      setAsideWidth(newWidth);
    } else if (info.type === "pointerend") {
      isDragging.current = false;
      baseRect.current = null;
    }
  }, [config.minAsideWidth, config.maxAsideWidth]);

  useObservePointer(resizerRef, handlePointer);

  // Mobile touch handlers
  const handleTouch = useCallback((e: TouchEvent) => {
    if (!isMobile) return;

    const touch = e.touches[0];
    
    if (e.type === "touchstart") {
      touchStateRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        currentX: touch.clientX,
        isDragging: false,
        direction: null,
      };
    } else if (e.type === "touchmove" && touchStateRef.current) {
      const deltaX = touch.clientX - touchStateRef.current.startX;
      const deltaY = touch.clientY - touchStateRef.current.startY;
      touchStateRef.current.currentX = touch.clientX;

      if (!touchStateRef.current.direction && (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8)) {
        touchStateRef.current.direction = Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";
        if (touchStateRef.current.direction === "horizontal") {
          touchStateRef.current.isDragging = true;
        }
      }

      if (touchStateRef.current.direction === "horizontal" && touchStateRef.current.isDragging && viewsContainerRef.current) {
        e.preventDefault();
        
        if (config.mobileSidebarMode === "overlay") {
          // オーバーレイモードでは個別制御
          const aside = viewsContainerRef.current.querySelector('[data-sidebar="aside"]') as HTMLElement;
          if (aside) {
            let translateX = currentMobileView === "aside" ? deltaX : -mobileSidebarWidth + deltaX;
            // 境界での抵抗感
            if ((currentMobileView === "aside" && deltaX < 0) || (currentMobileView === "main" && deltaX > 0)) {
              if (currentMobileView === "main" && deltaX < mobileSidebarWidth) {
                translateX = -mobileSidebarWidth + deltaX;
              } else {
                translateX = deltaX * 0.25;
              }
            }
            aside.style.transform = `translateX(${Math.max(-mobileSidebarWidth, Math.min(0, translateX))}px)`;
          }
        } else {
          // フルスクリーンモードでは従来通り
          const baseOffset = currentMobileView === "aside" ? 0 : -mobileSidebarWidth;
          const adjustedDeltaX = ((currentMobileView === "aside" && deltaX > 0) || (currentMobileView === "main" && deltaX < 0)) 
            ? deltaX * 0.25 : deltaX;
          viewsContainerRef.current.style.transform = `translateX(${baseOffset + adjustedDeltaX}px)`;
        }
      }
    } else if (e.type === "touchend" && touchStateRef.current?.isDragging) {
      const deltaX = touchStateRef.current.currentX - touchStateRef.current.startX;
      const threshold = window.innerWidth * 0.25;
      
      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0 && currentMobileView === "main") updateMobileView("aside");
        else if (deltaX < 0 && currentMobileView === "aside") updateMobileView("main");
      }

      if (viewsContainerRef.current) {
        if (config.mobileSidebarMode === "overlay") {
          // オーバーレイモードでは個別制御
          const aside = viewsContainerRef.current.querySelector('[data-sidebar="aside"]') as HTMLElement;
          if (aside) {
            aside.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            aside.style.transform = currentMobileView === "aside" ? "translateX(0)" : "translateX(-100%)";
            setTimeout(() => {
              if (aside) aside.style.transition = "";
            }, 300);
          }
        } else {
          // フルスクリーンモードでは従来通り
          const targetX = currentMobileView === "aside" ? 0 : -mobileSidebarWidth;
          viewsContainerRef.current.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
          viewsContainerRef.current.style.transform = `translateX(${targetX}px)`;
          setTimeout(() => {
            if (viewsContainerRef.current) viewsContainerRef.current.style.transition = "";
          }, 300);
        }
      }
      touchStateRef.current = null;
    }
  }, [isMobile, currentMobileView, mobileSidebarWidth, updateMobileView]);

  // Touch event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const events = ["touchstart", "touchmove", "touchend", "touchcancel"] as const;
    events.forEach(event => {
      container.addEventListener(event, handleTouch as EventListener, { passive: event === "touchstart" });
    });

    return () => {
      events.forEach(event => {
        container.removeEventListener(event, handleTouch as EventListener);
      });
    };
  }, [handleTouch]);

  // Update view position
  useEffect(() => {
    if (!viewsContainerRef.current || !isMobile) return;
    
    if (config.mobileSidebarMode === "overlay") {
      // オーバーレイモードでは個別に制御
      const aside = viewsContainerRef.current.querySelector('[data-sidebar="aside"]') as HTMLElement;
      if (aside) {
        aside.setAttribute('data-active', currentMobileView === "aside" ? "true" : "false");
      }
    } else {
      // フルスクリーンモードでは従来通り
      const targetX = currentMobileView === "aside" ? 0 : -mobileSidebarWidth;
      viewsContainerRef.current.style.transform = `translateX(${targetX}px)`;
    }
  }, [currentMobileView, isMobile, mobileSidebarWidth, config.mobileSidebarMode]);

  return {
    // Refs
    resizerRef,
    containerRef,
    viewsContainerRef,
    
    // State
    isMobile,
    asideWidth,
    mobileSidebarWidth,
    currentMobileView,
    updateMobileView,
    
    // Config
    config,
  };
};