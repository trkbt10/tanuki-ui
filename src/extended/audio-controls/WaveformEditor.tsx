import React, { useCallback, useState, useRef, useEffect } from 'react';
import styles from './WaveformEditor.module.css';

export interface WaveformEditorProps {
  className?: string;
  waveformData?: number[];
  width?: number;
  height?: number;
  selectionStart?: number;
  selectionEnd?: number;
  playheadPosition?: number;
  zoomLevel?: number;
  onSelectionChange?: (start: number, end: number) => void;
  onCut?: (start: number, end: number) => void;
  onCopy?: (start: number, end: number) => void;
  onPaste?: (position: number) => void;
  onFade?: (start: number, end: number, type: 'in' | 'out') => void;
  children?: React.ReactNode;
}

export const WaveformEditor: React.FC<WaveformEditorProps> = ({
  className,
  waveformData = [],
  width = 800,
  height = 200,
  selectionStart,
  selectionEnd,
  playheadPosition = 0,
  zoomLevel = 1,
  onSelectionChange,
  onCut,
  onCopy,
  onPaste,
  onFade,
  children,
}) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [localSelectionStart, setLocalSelectionStart] = useState<number | null>(null);
  const [localSelectionEnd, setLocalSelectionEnd] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || waveformData.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    const samplesPerPixel = Math.max(1, Math.floor(waveformData.length / (width * zoomLevel)));
    const halfHeight = height / 2;

    ctx.strokeStyle = getComputedStyle(canvas).getPropertyValue('--waveform-color') || '#4caf50';
    ctx.lineWidth = 1;
    ctx.beginPath();

    for (let x = 0; x < width; x++) {
      const sampleIndex = Math.floor(x * samplesPerPixel);
      if (sampleIndex < waveformData.length) {
        const sample = waveformData[sampleIndex];
        const y = halfHeight - (sample * halfHeight);
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
    }

    ctx.stroke();

    ctx.strokeStyle = getComputedStyle(canvas).getPropertyValue('--waveform-center-line') || '#666';
    ctx.beginPath();
    ctx.moveTo(0, halfHeight);
    ctx.lineTo(width, halfHeight);
    ctx.stroke();

    const start = selectionStart ?? localSelectionStart;
    const end = selectionEnd ?? localSelectionEnd;
    
    if (start !== null && end !== null) {
      const startX = (start / waveformData.length) * width;
      const endX = (end / waveformData.length) * width;
      
      ctx.fillStyle = getComputedStyle(canvas).getPropertyValue('--selection-color') || 'rgba(33, 150, 243, 0.3)';
      ctx.fillRect(startX, 0, endX - startX, height);
    }
  }, [waveformData, width, height, zoomLevel, selectionStart, selectionEnd, localSelectionStart, localSelectionEnd]);

  useEffect(() => {
    drawWaveform();
  }, [drawWaveform]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const position = (x / width) * waveformData.length;
    
    setIsSelecting(true);
    setLocalSelectionStart(position);
    setLocalSelectionEnd(position);
  }, [width, waveformData.length]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isSelecting || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const position = Math.max(0, Math.min(waveformData.length, (x / width) * waveformData.length));
    
    setLocalSelectionEnd(position);
    
    if (localSelectionStart !== null) {
      const start = Math.min(localSelectionStart, position);
      const end = Math.max(localSelectionStart, position);
      onSelectionChange?.(start, end);
    }
  }, [isSelecting, width, waveformData.length, localSelectionStart, onSelectionChange]);

  const handleMouseUp = useCallback(() => {
    setIsSelecting(false);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const start = selectionStart ?? localSelectionStart;
    const end = selectionEnd ?? localSelectionEnd;
    
    if (start === null || end === null) return;
    
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'x':
          e.preventDefault();
          onCut?.(start, end);
          break;
        case 'c':
          e.preventDefault();
          onCopy?.(start, end);
          break;
        case 'v':
          e.preventDefault();
          onPaste?.(start);
          break;
        case 'd':
          e.preventDefault();
          onCopy?.(start, end);
          onPaste?.(end);
          break;
      }
    }
  }, [selectionStart, selectionEnd, localSelectionStart, localSelectionEnd, onCut, onCopy, onPaste]);

  return (
    <div
      ref={containerRef}
      className={`${styles.waveformEditor} ${className || ''}`}
      style={{ width, height }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {children || (
        <>
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className={styles.canvas}
          />
          
          {playheadPosition !== null && (
            <div
              className={styles.playhead}
              style={{ left: `${(playheadPosition / waveformData.length) * 100}%` }}
            />
          )}
        </>
      )}
    </div>
  );
};