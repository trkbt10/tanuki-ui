import { useCallback, useState } from 'react';

interface ActiveViewConfig {
  viewCount: number;
  controlled?: number;
  defaultView: number;
  onChange?: (index: number) => void;
  hasMenu?: boolean;
}

export const useActiveView = (config: ActiveViewConfig) => {
  const [internalActiveView, setInternalActiveView] = useState(config.defaultView);
  
  const isControlled = config.controlled !== undefined;
  const activeViewIndex = isControlled ? (config.controlled ?? config.defaultView) : internalActiveView;

  const setActiveViewIndex = useCallback((index: number) => {
    // Allow menu index (-1) on mobile if menu exists
    const minIndex = config.hasMenu ? -1 : 0;
    if (index < minIndex || index >= config.viewCount) return;
    if (index === activeViewIndex) return;

    if (!isControlled) {
      setInternalActiveView(index);
    }
    config.onChange?.(index);
  }, [isControlled, activeViewIndex, config]);

  return {
    activeViewIndex,
    setActiveViewIndex,
  };
};