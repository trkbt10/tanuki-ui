import React, { useCallback, useState, useRef } from 'react';
import styles from './VolumeFader.module.css';
import { useControlledValue, useDragInteraction } from './hooks';
import { formatDb, valueToPercentage, percentageToValue, clampValue } from './utils';
import type { BaseAudioControlProps, RangeControlProps, OrientationProps, DisplayProps } from './types';

export interface VolumeFaderProps extends 
  BaseAudioControlProps,
  RangeControlProps,
  OrientationProps,
  DisplayProps {
}

export const VolumeFader: React.FC<VolumeFaderProps> = ({
  className,
  value,
  min = -60,
  max = 12,
  defaultValue = 0,
  disabled = false,
  orientation = 'vertical',
  showScale = true,
  showValue = true,
  onChange,
  onChangeEnd,
  children,
}) => {
  const { value: currentValue, setValue, setValueEnd } = useControlledValue({
    value,
    defaultValue,
    onChange,
    onChangeEnd,
  });
  
  const [isFineControl, setIsFineControl] = useState(false);
  const faderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const getPercentage = useCallback((val: number) => 
    valueToPercentage(val, min, max), [min, max]);

  const getValue = useCallback((percentage: number) => 
    percentageToValue(percentage, min, max), [min, max]);

  const updateValue = useCallback((clientX: number, clientY: number) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    let percentage;

    if (orientation === 'vertical') {
      const y = clientY - rect.top;
      percentage = 100 - (y / rect.height) * 100;
    } else {
      const x = clientX - rect.left;
      percentage = (x / rect.width) * 100;
    }

    percentage = Math.max(0, Math.min(100, percentage));
    let newValue = getValue(percentage);

    if (isFineControl) {
      const currentPercentage = getPercentage(currentValue);
      const delta = (percentage - currentPercentage) * 0.1;
      newValue = getValue(currentPercentage + delta);
    }

    newValue = clampValue(newValue, min, max);
    setValue(newValue);
  }, [orientation, getValue, getPercentage, currentValue, isFineControl, min, max, setValue]);

  const { isDragging, handleMouseDown } = useDragInteraction({
    onDragStart: (e) => {
      setIsFineControl(e.ctrlKey || e.metaKey);
      updateValue(e.clientX, e.clientY);
    },
    onDragMove: (e) => {
      updateValue(e.clientX, e.clientY);
    },
    onDragEnd: () => {
      setIsFineControl(false);
      setValueEnd(currentValue);
    },
    disabled,
  });

  const handleDoubleClick = useCallback(() => {
    if (disabled) return;
    setValue(defaultValue);
    setValueEnd(defaultValue);
  }, [disabled, defaultValue, setValue, setValueEnd]);

  const percentage = getPercentage(currentValue);

  const renderScale = () => {
    if (!showScale) return null;

    const scaleMarks: React.ReactNode[] = [];
    const dbMarks = [12, 6, 0, -6, -12, -24, -48];

    dbMarks.forEach((db) => {
      if (db >= min && db <= max) {
        const markPercentage = getPercentage(db);
        scaleMarks.push(
          <div
            key={db}
            className={styles.scaleMark}
            style={orientation === 'vertical' 
              ? { bottom: `${markPercentage}%` }
              : { left: `${markPercentage}%` }
            }
          >
            <span className={styles.scaleLabel}>{db}</span>
          </div>
        );
      }
    });

    return <div className={styles.scale}>{scaleMarks}</div>;
  };

  return (
    <div
      ref={faderRef}
      className={`${styles.volumeFader} ${className || ''}`}
      data-orientation={orientation}
      data-disabled={disabled}
      data-dragging={isDragging}
    >
      {children || (
        <>
          <div
            ref={trackRef}
            className={styles.track}
            onMouseDown={handleMouseDown}
            onDoubleClick={handleDoubleClick}
          >
            <div 
              className={styles.fill}
              style={orientation === 'vertical'
                ? { height: `${percentage}%` }
                : { width: `${percentage}%` }
              }
            />
            <div
              className={styles.thumb}
              style={orientation === 'vertical'
                ? { bottom: `${percentage}%` }
                : { left: `${percentage}%` }
              }
            />
          </div>
          
          {renderScale()}
          
          {showValue && (
            <div className={styles.valueDisplay}>
              {formatDb(currentValue)}
            </div>
          )}
        </>
      )}
    </div>
  );
};