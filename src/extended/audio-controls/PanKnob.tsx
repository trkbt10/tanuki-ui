import React, { useCallback, useState, useRef } from 'react';
import styles from './PanKnob.module.css';
import { useControlledValue, useDragInteraction } from './hooks';
import { formatPan, clampValue } from './utils';
import type { BaseAudioControlProps, RangeControlProps, SizeVariantProps, DisplayProps } from './types';

export interface PanKnobProps extends 
  BaseAudioControlProps,
  RangeControlProps,
  SizeVariantProps,
  DisplayProps {
}

export const PanKnob: React.FC<PanKnobProps> = ({
  className,
  value,
  min = -100,
  max = 100,
  defaultValue = 0,
  disabled = false,
  size = 'medium',
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
  
  const [dragStartY, setDragStartY] = useState(0);
  const [dragStartValue, setDragStartValue] = useState(0);
  const knobRef = useRef<HTMLDivElement>(null);

  const valueToAngle = useCallback((val: number) => {
    const range = max - min;
    const percentage = (val - min) / range;
    return (percentage * 270) - 135;
  }, [min, max]);


  const updateValueFromAngle = useCallback((clientX: number, clientY: number) => {
    if (!knobRef.current) return;
    
    const rect = knobRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    angle = (angle + 90 + 360) % 360;
    
    if (angle > 315 || angle < 45) {
      angle = angle > 315 ? angle - 360 : angle;
    } else if (angle >= 45 && angle <= 135) {
      angle = Math.max(-135, Math.min(135, angle - 90));
    } else if (angle > 135 && angle <= 225) {
      angle = 135;
    } else {
      angle = -135;
    }
    
    const normalizedAngle = (angle + 135) / 270;
    let newValue = min + normalizedAngle * (max - min);
    newValue = clampValue(newValue, min, max);
    
    setValue(newValue);
  }, [min, max, setValue]);

  const updateValue = useCallback((deltaY: number) => {
    const sensitivity = 0.5;
    const range = max - min;
    const valueDelta = (deltaY * range * sensitivity) / 100;
    let newValue = dragStartValue - valueDelta;
    
    newValue = clampValue(newValue, min, max);
    setValue(newValue);
  }, [dragStartValue, min, max, setValue]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (disabled) return;
    
    if (e.button === 1 || (e.button === 0 && e.ctrlKey)) {
      setValue(defaultValue);
      setValueEnd(defaultValue);
      return;
    }
  }, [disabled, defaultValue, setValue, setValueEnd]);

  const { isDragging, handleMouseDown: handleDrag } = useDragInteraction({
    onDragStart: (e) => {
      if (e.shiftKey) {
        setDragStartY(e.clientY);
        setDragStartValue(currentValue);
      } else {
        updateValueFromAngle(e.clientX, e.clientY);
        setDragStartY(e.clientY);
        setDragStartValue(currentValue);
      }
    },
    onDragMove: (e) => {
      if (e.shiftKey) {
        const deltaY = e.clientY - dragStartY;
        updateValue(deltaY);
      } else {
        updateValueFromAngle(e.clientX, e.clientY);
      }
    },
    onDragEnd: () => {
      setValueEnd(currentValue);
    },
    disabled,
  });

  const combinedMouseDown = useCallback((e: React.MouseEvent) => {
    handleMouseDown(e);
    if (e.button === 0 && !e.ctrlKey) {
      handleDrag(e);
    }
  }, [handleMouseDown, handleDrag]);

  const angle = valueToAngle(currentValue);

  return (
    <div
      ref={knobRef}
      className={`${styles.panKnob} ${className || ''}`}
      data-size={size}
      data-disabled={disabled}
      data-dragging={isDragging}
    >
      {children || (
        <>
          <div
            className={styles.knob}
            onMouseDown={combinedMouseDown}
            style={{ transform: `rotate(${angle}deg)` }}
          >
            <div className={styles.indicator} />
            <div className={styles.centerDot} />
          </div>
          
          <div className={styles.scale}>
            <div className={styles.scaleMarkLeft} />
            <div className={styles.scaleMarkCenter} />
            <div className={styles.scaleMarkRight} />
          </div>
          
          {showValue && (
            <div className={styles.valueDisplay}>
              {formatPan(currentValue)}
            </div>
          )}
        </>
      )}
    </div>
  );
};