import React, { useCallback, useState, useRef, useEffect } from 'react';
import styles from './Playhead.module.css';

export interface PlayheadProps {
  className?: string;
  position?: number;
  duration?: number;
  height?: number | string;
  color?: string;
  showTime?: boolean;
  scrubSpeed?: number;
  onSeek?: (time: number) => void;
  onScrub?: (time: number) => void;
  children?: React.ReactNode;
}

export const Playhead: React.FC<PlayheadProps> = ({
  className,
  position = 0,
  duration = 300,
  height = '100%',
  color = '#2196f3',
  showTime = true,
  scrubSpeed = 1,
  onSeek,
  onScrub,
  children,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartPosition, setDragStartPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartPosition(position);
    setIsScrubbing(e.shiftKey);
    e.preventDefault();
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const deltaX = e.clientX - dragStartX;
    const deltaPercentage = deltaX / containerRect.width;
    
    let newPosition = dragStartPosition + (deltaPercentage * duration);
    
    if (isScrubbing) {
      newPosition = dragStartPosition + (deltaPercentage * duration * scrubSpeed * 0.1);
    }
    
    newPosition = Math.max(0, Math.min(duration, newPosition));
    
    if (isScrubbing) {
      onScrub?.(newPosition);
    } else {
      onSeek?.(newPosition);
    }
  }, [isDragging, dragStartX, dragStartPosition, duration, isScrubbing, scrubSpeed, onSeek, onScrub]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsScrubbing(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = isScrubbing ? 'ew-resize' : 'grabbing';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'auto';
      };
    }
    return undefined;
  }, [isDragging, isScrubbing, handleMouseMove, handleMouseUp]);

  const percentage = (position / duration) * 100;

  return (
    <div
      ref={containerRef}
      className={`${styles.playheadContainer} ${className || ''}`}
      style={{ height }}
    >
      <div
        ref={playheadRef}
        className={styles.playhead}
        style={{ 
          left: `${percentage}%`,
          backgroundColor: color
        }}
        onMouseDown={handleMouseDown}
        data-dragging={isDragging}
        data-scrubbing={isScrubbing}
      >
        {children || (
          <>
            <div className={styles.handle} />
            {showTime && (
              <div className={styles.timeDisplay}>
                {formatTime(position)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};