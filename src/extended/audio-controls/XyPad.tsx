import React, { useCallback, useState, useRef, useEffect } from 'react';
import styles from './XyPad.module.css';

export interface XyPadProps {
  className?: string;
  x?: number;
  y?: number;
  minX?: number;
  maxX?: number;
  minY?: number;
  maxY?: number;
  defaultX?: number;
  defaultY?: number;
  size?: number;
  labelX?: string;
  labelY?: string;
  disabled?: boolean;
  onChange?: (x: number, y: number) => void;
  onChangeEnd?: (x: number, y: number) => void;
  children?: React.ReactNode;
}

export const XyPad: React.FC<XyPadProps> = ({
  className,
  x,
  y,
  minX = 0,
  maxX = 100,
  minY = 0,
  maxY = 100,
  defaultX = 50,
  defaultY = 50,
  size = 200,
  labelX = 'X',
  labelY = 'Y',
  disabled = false,
  onChange,
  onChangeEnd,
  children,
}) => {
  const [internalX, setInternalX] = useState(x ?? defaultX);
  const [internalY, setInternalY] = useState(y ?? defaultY);
  const [isDragging, setIsDragging] = useState(false);
  const padRef = useRef<HTMLDivElement>(null);

  const currentX = x ?? internalX;
  const currentY = y ?? internalY;

  const valueToPosition = useCallback((value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100;
  }, []);

  const positionToValue = useCallback((position: number, min: number, max: number) => {
    return (position / 100) * (max - min) + min;
  }, []);

  const updateValues = useCallback((clientX: number, clientY: number) => {
    if (!padRef.current) return;

    const rect = padRef.current.getBoundingClientRect();
    const relX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const relY = Math.max(0, Math.min(rect.height, clientY - rect.top));

    const percentX = (relX / rect.width) * 100;
    const percentY = 100 - ((relY / rect.height) * 100);

    const newX = positionToValue(percentX, minX, maxX);
    const newY = positionToValue(percentY, minY, maxY);

    if (x === undefined) {
      setInternalX(newX);
    }
    if (y === undefined) {
      setInternalY(newY);
    }

    onChange?.(newX, newY);
  }, [x, y, minX, maxX, minY, maxY, positionToValue, onChange]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (disabled) return;
    
    setIsDragging(true);
    updateValues(e.clientX, e.clientY);
    e.preventDefault();
  }, [disabled, updateValues]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    updateValues(e.clientX, e.clientY);
  }, [isDragging, updateValues]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      onChangeEnd?.(currentX, currentY);
    }
  }, [isDragging, currentX, currentY, onChangeEnd]);

  const handleDoubleClick = useCallback(() => {
    if (disabled) return;

    if (x === undefined) {
      setInternalX(defaultX);
    }
    if (y === undefined) {
      setInternalY(defaultY);
    }

    onChange?.(defaultX, defaultY);
    onChangeEnd?.(defaultX, defaultY);
  }, [disabled, x, y, defaultX, defaultY, onChange, onChangeEnd]);

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

  const posX = valueToPosition(currentX, minX, maxX);
  const posY = 100 - valueToPosition(currentY, minY, maxY);

  return (
    <div className={`${styles.xyPad} ${className || ''}`} style={{ width: size, height: size }}>
      {children || (
        <>
          <div
            ref={padRef}
            className={styles.padArea}
            onMouseDown={handleMouseDown}
            onDoubleClick={handleDoubleClick}
            data-disabled={disabled}
            data-dragging={isDragging}
          >
            <div className={styles.gridLines}>
              <div className={styles.gridVertical} />
              <div className={styles.gridHorizontal} />
            </div>
            
            <div
              className={styles.position}
              style={{ left: `${posX}%`, top: `${posY}%` }}
            >
              <div className={styles.crosshair}>
                <div className={styles.crosshairH} />
                <div className={styles.crosshairV} />
              </div>
            </div>
          </div>
          
          <div className={styles.labels}>
            <div className={styles.labelX}>
              {labelX}: {currentX.toFixed(1)}
            </div>
            <div className={styles.labelY}>
              {labelY}: {currentY.toFixed(1)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};