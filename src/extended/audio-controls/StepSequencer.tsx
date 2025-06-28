import React, { useCallback, useState } from 'react';
import styles from './StepSequencer.module.css';

export interface StepSequencerProps {
  className?: string;
  steps?: number;
  tracks?: number;
  pattern?: boolean[][];
  currentStep?: number;
  isPlaying?: boolean;
  trackLabels?: string[];
  onStepToggle?: (track: number, step: number, active: boolean) => void;
  onPatternChange?: (pattern: boolean[][]) => void;
  children?: React.ReactNode;
}

export const StepSequencer: React.FC<StepSequencerProps> = ({
  className,
  steps = 16,
  tracks = 8,
  pattern: controlledPattern,
  currentStep = -1,
  isPlaying = false,
  trackLabels = [],
  onStepToggle,
  onPatternChange,
  children,
}) => {
  const [internalPattern, setInternalPattern] = useState<boolean[][]>(() => 
    Array(tracks).fill(null).map(() => Array(steps).fill(false))
  );

  const pattern = controlledPattern || internalPattern;

  const handleStepClick = useCallback((track: number, step: number) => {
    const newValue = !pattern[track][step];
    
    if (controlledPattern) {
      onStepToggle?.(track, step, newValue);
    } else {
      const newPattern = pattern.map((row, i) => 
        i === track ? row.map((val, j) => j === step ? newValue : val) : row
      );
      setInternalPattern(newPattern);
      onPatternChange?.(newPattern);
    }
  }, [pattern, controlledPattern, onStepToggle, onPatternChange]);

  const handleClearTrack = useCallback((track: number) => {
    if (controlledPattern) {
      for (let step = 0; step < steps; step++) {
        onStepToggle?.(track, step, false);
      }
    } else {
      const newPattern = pattern.map((row, i) => 
        i === track ? Array(steps).fill(false) : row
      );
      setInternalPattern(newPattern);
      onPatternChange?.(newPattern);
    }
  }, [pattern, controlledPattern, steps, onStepToggle, onPatternChange]);

  return (
    <div className={`${styles.stepSequencer} ${className || ''}`}>
      {children || (
        <>
          <div className={styles.header}>
            <div className={styles.trackLabelHeader} />
            {Array.from({ length: steps }, (_, i) => (
              <div
                key={i}
                className={styles.stepHeader}
                data-current={currentStep === i && isPlaying}
              >
                {(i % 4) === 0 ? (i / 4) + 1 : ''}
              </div>
            ))}
          </div>
          
          {Array.from({ length: tracks }, (_, trackIndex) => (
            <div key={trackIndex} className={styles.track}>
              <div className={styles.trackLabel}>
                <span>{trackLabels[trackIndex] || `Track ${trackIndex + 1}`}</span>
                <button
                  className={styles.clearButton}
                  onClick={() => handleClearTrack(trackIndex)}
                  aria-label={`Clear track ${trackIndex + 1}`}
                >
                  ×
                </button>
              </div>
              
              {Array.from({ length: steps }, (_, stepIndex) => (
                <button
                  key={stepIndex}
                  className={styles.step}
                  data-active={pattern[trackIndex]?.[stepIndex]}
                  data-current={currentStep === stepIndex && isPlaying}
                  data-beat={stepIndex % 4 === 0}
                  onClick={() => handleStepClick(trackIndex, stepIndex)}
                  aria-label={`Track ${trackIndex + 1}, Step ${stepIndex + 1}`}
                />
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
};