import { useCallback, useEffect } from 'react';

export interface UseKeyboardShortcutOptions {
  key?: string;
  callback: () => void;
  disabled?: boolean;
  preventDefault?: boolean;
  target?: 'document' | 'body';
  condition?: (e: KeyboardEvent) => boolean;
}

export function useKeyboardShortcut({
  key,
  callback,
  disabled = false,
  preventDefault = true,
  target = 'document',
  condition,
}: UseKeyboardShortcutOptions) {
  const handleKeyDown = useCallback((e: Event) => {
    const keyEvent = e as KeyboardEvent;
    if (!key || disabled) return;
    
    const element = keyEvent.target as HTMLElement;
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') return;
    
    const keyMatches = keyEvent.key.toLowerCase() === key.toLowerCase() || 
                      keyEvent.code === key ||
                      (key === 'Space' && keyEvent.code === 'Space');
    
    if (keyMatches && (!condition || condition(keyEvent))) {
      if (preventDefault) {
        keyEvent.preventDefault();
      }
      callback();
    }
  }, [key, callback, disabled, preventDefault, condition]);

  useEffect(() => {
    if (key && !disabled) {
      const targetElement = target === 'document' ? document : document.body;
      targetElement.addEventListener('keydown', handleKeyDown);
      
      return () => {
        targetElement.removeEventListener('keydown', handleKeyDown);
      };
    }
    return undefined;
  }, [key, disabled, handleKeyDown, target]);
}