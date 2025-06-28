import React, { useCallback, useRef, useState, useEffect } from 'react';
import styles from './TimelineRuler.module.css';

export interface TimelineMarker {
  id: string;
  position: number;
  label?: string;
  color?: string;
}

export interface TimelineRulerProps {
  className?: string;
  duration?: number;
  currentTime?: number;
  zoom?: number;
  markers?: TimelineMarker[];
  showBeats?: boolean;
  showTime?: boolean;
  bpm?: number;
  timeSignature?: string;
  onSeek?: (time: number) => void;
  onMarkerAdd?: (position: number) => void;
  onMarkerRemove?: (id: string) => void;
  onZoomChange?: (zoom: number) => void;
  children?: React.ReactNode;
}

export const TimelineRuler: React.FC<TimelineRulerProps> = ({
  className,
  duration = 300,
  currentTime = 0,
  zoom = 1,
  markers = [],
  showBeats = true,
  showTime = true,
  bpm = 120,
  timeSignature = '4/4',
  onSeek,
  onMarkerAdd,
  onMarkerRemove,
  onZoomChange,
  children,
}) => {
  const rulerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartZoom, setDragStartZoom] = useState(1);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${mins}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  }, []);

  const getBeatPosition = useCallback((beatNumber: number) => {
    const beatsPerSecond = bpm / 60;
    return (beatNumber / beatsPerSecond / duration) * 100;
  }, [bpm, duration]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!rulerRef.current) return;
    
    const rect = rulerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const time = percentage * duration;
    
    onSeek?.(time);
  }, [duration, onSeek]);

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    if (!rulerRef.current) return;
    
    const rect = rulerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    
    onMarkerAdd?.(percentage);
  }, [onMarkerAdd]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.shiftKey) {
      setIsDragging(true);
      setDragStartX(e.clientX);
      setDragStartZoom(zoom);
      e.preventDefault();
    }
  }, [zoom]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStartX;
      const zoomDelta = deltaX / 100;
      const newZoom = Math.max(0.1, Math.min(10, dragStartZoom + zoomDelta));
      onZoomChange?.(newZoom);
    }
  }, [isDragging, dragStartX, dragStartZoom, onZoomChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
    return undefined;
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const renderTicks = () => {
    const ticks = [];
    const tickInterval = 10 / zoom;
    const numTicks = Math.floor(duration / tickInterval);

    for (let i = 0; i <= numTicks; i++) {
      const time = i * tickInterval;
      const position = (time / duration) * 100;
      const isMajor = i % 5 === 0;

      ticks.push(
        <div
          key={`tick-${i}`}
          className={`${styles.tick} ${isMajor ? styles.majorTick : ''}`}
          style={{ left: `${position}%` }}
        >
          {isMajor && showTime && (
            <span className={styles.tickLabel}>{formatTime(time)}</span>
          )}
        </div>
      );
    }

    return ticks;
  };

  const renderBeats = () => {
    if (!showBeats) return null;

    const beats = [];
    const beatsPerSecond = bpm / 60;
    const totalBeats = Math.floor(duration * beatsPerSecond);
    const [beatsPerBar] = timeSignature.split('/').map(Number);

    for (let i = 0; i <= totalBeats; i++) {
      const position = getBeatPosition(i);
      const isDownbeat = i % beatsPerBar === 0;

      beats.push(
        <div
          key={`beat-${i}`}
          className={`${styles.beat} ${isDownbeat ? styles.downbeat : ''}`}
          style={{ left: `${position}%` }}
        />
      );
    }

    return beats;
  };

  return (
    <div
      ref={rulerRef}
      className={`${styles.timelineRuler} ${className || ''}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      data-dragging={isDragging}
      style={{ transform: `scaleX(${zoom})`, transformOrigin: 'left' }}
    >
      {children || (
        <>
          <div className={styles.tickContainer}>
            {renderTicks()}
            {renderBeats()}
          </div>
          
          {markers.map((marker) => (
            <div
              key={marker.id}
              className={styles.marker}
              style={{ 
                left: `${marker.position * 100}%`,
                borderColor: marker.color || '#ff4081'
              }}
              title={marker.label}
              onClick={(e) => {
                e.stopPropagation();
                onMarkerRemove?.(marker.id);
              }}
            >
              {marker.label && (
                <span className={styles.markerLabel}>{marker.label}</span>
              )}
            </div>
          ))}
          
          <div
            className={styles.currentTimeIndicator}
            style={{ left: `${(currentTime / duration) * 100}%` }}
          />
        </>
      )}
    </div>
  );
};