interface MenuOverlayConfig {
    menuWidth: number | string;
    swipeVelocityThreshold: number;
}
export declare const useMenuOverlay: (config: MenuOverlayConfig) => {
    menuRef: import('react').RefObject<HTMLDivElement | null>;
    isMenuOverlay: boolean;
    showMobileMenu: boolean;
    openMenuOverlay: () => void;
    closeMenuOverlay: () => void;
    updateMenuTransform: (progress: number) => void;
    finalizeMenuPosition: (deltaX: number, velocity: number) => void;
};
export {};
