import React, { useCallback, useState, useRef, useEffect } from 'react';
import styles from './LoopToggle.module.css';

export interface LoopToggleProps {
  className?: string;
  isLooping?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  onToggle?: (looping: boolean) => void;
  onRangeSelect?: (start: number, end: number) => void;
  children?: React.ReactNode;
}

export const LoopToggle: React.FC<LoopToggleProps> = ({
  className,
  isLooping = false,
  disabled = false,
  size = 'medium',
  onToggle,
  onRangeSelect,
  children,
}) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    if (disabled) return;
    onToggle?.(!isLooping);
  }, [disabled, isLooping, onToggle]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.altKey && containerRef.current) {
      e.preventDefault();
      setIsSelecting(true);
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setSelectionStart(x);
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isSelecting && selectionStart !== null && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const start = Math.min(selectionStart, x) / width;
      const end = Math.max(selectionStart, x) / width;
      
      if (end - start > 0.05) {
        onRangeSelect?.(start, end);
      }
    }
  }, [isSelecting, selectionStart, onRangeSelect]);

  const handleMouseUp = useCallback(() => {
    setIsSelecting(false);
    setSelectionStart(null);
  }, []);

  useEffect(() => {
    if (isSelecting) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
    return undefined;
  }, [isSelecting, handleMouseMove, handleMouseUp]);

  return (
    <div 
      ref={containerRef}
      className={`${styles.loopToggle} ${className || ''}`}
      data-selecting={isSelecting}
    >
      <button
        className={styles.button}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        disabled={disabled}
        data-size={size}
        data-looping={isLooping}
        aria-label={isLooping ? 'Disable Loop' : 'Enable Loop'}
        type="button"
        title="Loop (Alt+drag to select range)"
      >
        {children || (
          <svg 
            viewBox="0 0 24 24" 
            className={styles.icon}
            aria-hidden="true"
          >
            <path d="M12 4V2L8 6l4 4V8c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 17.03 20 15.57 20 14c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v2l4-4-4-4v2z" />
          </svg>
        )}
      </button>
    </div>
  );
};