import { useState, useEffect } from "react";

export const useComputedStyle = (element: Element | null): CSSStyleDeclaration | null => {
  const [style, setStyle] = useState<CSSStyleDeclaration | null>(null);

  useEffect(() => {
    if (!element) {
      setStyle(null);
      return;
    }
    const maxUpdateInterval = 1000; // Maximum interval to force update
    let lastUpdateTime = 0;

    const updateStyle = () => {
      const now = Date.now();
      if (now - lastUpdateTime < maxUpdateInterval) {
        return; // Skip update if within the interval
      }
      lastUpdateTime = now;
      const computedStyle = window.getComputedStyle(element);
      setStyle(computedStyle);
    };

    updateStyle();

    const resizeObserver = new ResizeObserver(() => {
      updateStyle();
    });

    resizeObserver.observe(element);
    updateStyle();

    return () => {
      resizeObserver.disconnect();
    };
  }, [element]);

  return style;
};
