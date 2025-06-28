import { useState, useCallback, useEffect } from 'react';

export interface UseDragInteractionOptions {
  onDragStart?: (e: React.MouseEvent) => void;
  onDragMove?: (e: MouseEvent) => void;
  onDragEnd?: () => void;
  disabled?: boolean;
  cursor?: string;
}

export function useDragInteraction({
  onDragStart,
  onDragMove,
  onDragEnd,
  disabled = false,
  cursor = 'ns-resize',
}: UseDragInteractionOptions) {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (disabled) return;
    
    setIsDragging(true);
    onDragStart?.(e);
    e.preventDefault();
  }, [disabled, onDragStart]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    onDragMove?.(e);
  }, [isDragging, onDragMove]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      onDragEnd?.();
    }
  }, [isDragging, onDragEnd]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      if (cursor) {
        document.body.style.cursor = cursor;
      }
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        if (cursor) {
          document.body.style.cursor = 'auto';
        }
      };
    }
    return undefined;
  }, [isDragging, handleMouseMove, handleMouseUp, cursor]);

  return {
    isDragging,
    handleMouseDown,
  };
}