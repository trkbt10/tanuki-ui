import React, { useCallback, useState } from 'react';
import styles from './MetronomeToggle.module.css';

export interface MetronomeToggleProps {
  className?: string;
  isActive?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  bpm?: number;
  timeSignature?: string;
  onToggle?: (active: boolean) => void;
  onBpmChange?: (bpm: number) => void;
  onTimeSignatureChange?: (signature: string) => void;
  children?: React.ReactNode;
}

export const MetronomeToggle: React.FC<MetronomeToggleProps> = ({
  className,
  isActive = false,
  disabled = false,
  size = 'medium',
  bpm = 120,
  timeSignature = '4/4',
  onToggle,
  onBpmChange,
  onTimeSignatureChange,
  children,
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [tempBpm, setTempBpm] = useState(bpm.toString());
  const [tempTimeSignature, setTempTimeSignature] = useState(timeSignature);

  const handleClick = useCallback(() => {
    if (disabled) return;
    onToggle?.(!isActive);
  }, [disabled, isActive, onToggle]);

  const handleRightClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled) return;
    setShowSettings(!showSettings);
  }, [disabled, showSettings]);

  const handleBpmSubmit = useCallback(() => {
    const newBpm = parseInt(tempBpm, 10);
    if (!isNaN(newBpm) && newBpm > 0 && newBpm <= 999) {
      onBpmChange?.(newBpm);
    }
  }, [tempBpm, onBpmChange]);

  const handleTimeSignatureSubmit = useCallback(() => {
    if (/^\d+\/\d+$/.test(tempTimeSignature)) {
      onTimeSignatureChange?.(tempTimeSignature);
    }
  }, [tempTimeSignature, onTimeSignatureChange]);

  return (
    <div className={`${styles.metronomeToggle} ${className || ''}`}>
      <button
        className={styles.button}
        onClick={handleClick}
        onContextMenu={handleRightClick}
        disabled={disabled}
        data-size={size}
        data-active={isActive}
        aria-label={isActive ? 'Disable Metronome' : 'Enable Metronome'}
        type="button"
        title="Metronome (right-click for settings)"
      >
        {children || (
          <svg 
            viewBox="0 0 24 24" 
            className={styles.icon}
            aria-hidden="true"
          >
            <path d="M12 2L4 20h16L12 2zm0 6l4 8H8l4-8z" />
            {isActive && (
              <circle 
                cx="12" 
                cy="14" 
                r="2" 
                className={styles.beat}
              />
            )}
          </svg>
        )}
      </button>
      
      {showSettings && (
        <div className={styles.settings}>
          <div className={styles.settingRow}>
            <label htmlFor="bpm">BPM:</label>
            <input
              id="bpm"
              type="number"
              min="1"
              max="999"
              value={tempBpm}
              onChange={(e) => setTempBpm(e.target.value)}
              onBlur={handleBpmSubmit}
              onKeyDown={(e) => e.key === 'Enter' && handleBpmSubmit()}
              className={styles.input}
            />
          </div>
          <div className={styles.settingRow}>
            <label htmlFor="timeSig">Time:</label>
            <input
              id="timeSig"
              type="text"
              value={tempTimeSignature}
              onChange={(e) => setTempTimeSignature(e.target.value)}
              onBlur={handleTimeSignatureSubmit}
              onKeyDown={(e) => e.key === 'Enter' && handleTimeSignatureSubmit()}
              className={styles.input}
              pattern="\d+/\d+"
            />
          </div>
          <button
            className={styles.closeButton}
            onClick={() => setShowSettings(false)}
            aria-label="Close settings"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};