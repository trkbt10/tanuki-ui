import React, { useCallback, useState, useRef } from 'react';
import styles from './AutomationLane.module.css';

export interface AutomationPoint {
  id: string;
  time: number;
  value: number;
  curve?: 'linear' | 'exponential' | 'bezier';
}

export interface AutomationLaneProps {
  className?: string;
  points?: AutomationPoint[];
  width?: number;
  height?: number;
  duration?: number;
  minValue?: number;
  maxValue?: number;
  defaultValue?: number;
  label?: string;
  color?: string;
  onPointAdd?: (point: Omit<AutomationPoint, 'id'>) => void;
  onPointUpdate?: (id: string, point: Partial<AutomationPoint>) => void;
  onPointRemove?: (id: string) => void;
  children?: React.ReactNode;
}

export const AutomationLane: React.FC<AutomationLaneProps> = ({
  className,
  points = [],
  width = 800,
  height = 100,
  duration = 10,
  minValue = 0,
  maxValue = 100,
  defaultValue = 50,
  label = 'Parameter',
  color = '#2196f3',
  onPointAdd,
  onPointUpdate,
  onPointRemove,
  children,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const valueToY = useCallback((value: number) => {
    const range = maxValue - minValue;
    const normalized = (value - minValue) / range;
    return height - (normalized * height);
  }, [minValue, maxValue, height]);

  const yToValue = useCallback((y: number) => {
    const normalized = (height - y) / height;
    return normalized * (maxValue - minValue) + minValue;
  }, [minValue, maxValue, height]);

  const timeToX = useCallback((time: number) => {
    return (time / duration) * width;
  }, [duration, width]);

  const xToTime = useCallback((x: number) => {
    return (x / width) * duration;
  }, [duration, width]);

  const handleSvgClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current || selectedPoint) return;
    
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (e.altKey) {
      const time = xToTime(x);
      const value = yToValue(y);
      
      onPointAdd?.({
        time,
        value,
        curve: 'linear',
      });
    }
  }, [selectedPoint, xToTime, yToValue, onPointAdd]);

  const handlePointMouseDown = useCallback((e: React.MouseEvent, pointId: string) => {
    e.stopPropagation();
    setSelectedPoint(pointId);
    setIsDragging(true);
    
    if (e.shiftKey) {
      onPointRemove?.(pointId);
      setSelectedPoint(null);
      setIsDragging(false);
    }
  }, [onPointRemove]);

  const renderPath = () => {
    if (points.length === 0) return null;
    
    const sortedPoints = [...points].sort((a, b) => a.time - b.time);
    
    if (sortedPoints.length === 1) {
      const point = sortedPoints[0];
      const x = timeToX(point.time);
      const y = valueToY(point.value);
      return `M 0,${valueToY(defaultValue)} L ${x},${y} L ${width},${y}`;
    }
    
    let path = `M ${timeToX(sortedPoints[0].time)},${valueToY(sortedPoints[0].value)}`;
    
    for (let i = 1; i < sortedPoints.length; i++) {
      const prev = sortedPoints[i - 1];
      const curr = sortedPoints[i];
      const x1 = timeToX(prev.time);
      const y1 = valueToY(prev.value);
      const x2 = timeToX(curr.time);
      const y2 = valueToY(curr.value);
      
      if (curr.curve === 'bezier') {
        const cx = (x1 + x2) / 2;
        path += ` Q ${cx},${y1} ${x2},${y2}`;
      } else {
        path += ` L ${x2},${y2}`;
      }
    }
    
    return path;
  };

  return (
    <div className={`${styles.automationLane} ${className || ''}`} style={{ width, height }}>
      {children || (
        <>
          <div className={styles.header}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>
              {selectedPoint 
                ? points.find(p => p.id === selectedPoint)?.value.toFixed(1) 
                : defaultValue.toFixed(1)}
            </span>
          </div>
          
          <svg
            ref={svgRef}
            width={width}
            height={height}
            className={styles.svg}
            onClick={handleSvgClick}
          >
            <line
              x1={0}
              y1={valueToY(defaultValue)}
              x2={width}
              y2={valueToY(defaultValue)}
              className={styles.defaultLine}
            />
            
            <path
              d={renderPath() || undefined}
              fill="none"
              stroke={color}
              strokeWidth="2"
              className={styles.automationPath}
            />
            
            {points.map((point) => {
              const x = timeToX(point.time);
              const y = valueToY(point.value);
              
              return (
                <circle
                  key={point.id}
                  cx={x}
                  cy={y}
                  r="6"
                  className={styles.point}
                  data-selected={selectedPoint === point.id}
                  onMouseDown={(e) => handlePointMouseDown(e, point.id)}
                  style={{ fill: color }}
                />
              );
            })}
          </svg>
          
          <div className={styles.hint}>Alt+click to add point, Shift+click to remove</div>
        </>
      )}
    </div>
  );
};