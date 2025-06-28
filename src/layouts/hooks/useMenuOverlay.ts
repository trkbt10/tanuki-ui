import { useCallback, useRef, useState } from 'react';

interface MenuOverlayConfig {
  menuWidth: number | string;
  swipeVelocityThreshold: number;
}

export const useMenuOverlay = (config: MenuOverlayConfig) => {
  const [isMenuOverlay, setIsMenuOverlay] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const openMenuOverlay = useCallback(() => {
    setIsMenuOverlay(true);
  }, []);

  const closeMenuOverlay = useCallback(() => {
    setIsMenuOverlay(false);
    setShowMobileMenu(false);
    if (menuRef.current) {
      menuRef.current.style.transition = '';
      menuRef.current.style.transform = 'translateX(-100%)';
    }
  }, []);

  const updateMenuTransform = useCallback((progress: number) => {
    if (menuRef.current) {
      setShowMobileMenu(progress > 0.1);
      menuRef.current.style.transform = `translateX(${-100 + progress * 100}%)`;
      menuRef.current.style.transition = 'none';
    }
  }, []);

  const finalizeMenuPosition = useCallback((deltaX: number, velocity: number) => {
    const menuWidth = typeof config.menuWidth === 'number' ? config.menuWidth : 280;
    const threshold = menuWidth * 0.5;

    if (deltaX > threshold || velocity > config.swipeVelocityThreshold) {
      setShowMobileMenu(true);
      if (menuRef.current) {
        menuRef.current.style.transition = '';
        menuRef.current.style.transform = 'translateX(0)';
      }
    } else {
      closeMenuOverlay();
    }
  }, [config.menuWidth, config.swipeVelocityThreshold, closeMenuOverlay]);

  return {
    menuRef,
    isMenuOverlay,
    showMobileMenu,
    openMenuOverlay,
    closeMenuOverlay,
    updateMenuTransform,
    finalizeMenuPosition,
  };
};