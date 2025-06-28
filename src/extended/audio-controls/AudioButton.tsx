import React, { useCallback } from 'react';
import styles from './AudioButton.module.css';
import { useKeyboardShortcut } from './hooks';
import type { BaseAudioControlProps, SizeVariantProps, AudioButtonVariant, KeyboardShortcutProps } from './types';

export interface AudioButtonProps extends 
  BaseAudioControlProps,
  SizeVariantProps,
  AudioButtonVariant,
  KeyboardShortcutProps {
  shape?: 'circle' | 'square';
  onClick?: () => void;
  onDoubleClick?: () => void;
  onRightClick?: () => void;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  className,
  variant = 'toggle',
  isActive = false,
  isArmed = false,
  isRecording = false,
  isSoloed = false,
  disabled = false,
  size = 'medium',
  shape = 'circle',
  keyBinding,
  onClick,
  onDoubleClick,
  onRightClick,
  children,
}) => {
  const handleClick = useCallback(() => {
    if (disabled || (variant === 'mute' && isSoloed)) return;
    onClick?.();
  }, [disabled, variant, isSoloed, onClick]);

  const handleDoubleClick = useCallback(() => {
    if (disabled) return;
    onDoubleClick?.();
  }, [disabled, onDoubleClick]);

  const handleRightClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled) return;
    onRightClick?.();
  }, [disabled, onRightClick]);

  useKeyboardShortcut({
    key: keyBinding,
    callback: handleClick,
    disabled,
  });

  const getVariantClass = () => {
    switch (variant) {
      case 'play': return styles.playVariant;
      case 'stop': return styles.stopVariant;
      case 'record': return styles.recordVariant;
      case 'mute': return styles.muteVariant;
      case 'solo': return styles.soloVariant;
      default: return styles.toggleVariant;
    }
  };

  const renderIcon = () => {
    if (children) return children;
    
    switch (variant) {
      case 'play':
        return (
          <svg viewBox="0 0 24 24" className={styles.icon}>
            {isActive ? (
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            ) : (
              <path d="M8 5v14l11-7z" />
            )}
          </svg>
        );
      case 'stop':
        return (
          <svg viewBox="0 0 24 24" className={styles.icon}>
            <rect x="6" y="6" width="12" height="12" />
          </svg>
        );
      case 'record':
        return (
          <svg viewBox="0 0 24 24" className={styles.icon}>
            <circle cx="12" cy="12" r="8" />
          </svg>
        );
      case 'mute':
        return <span className={styles.label}>M</span>;
      case 'solo':
        return <span className={styles.label}>S</span>;
      default:
        return <span className={styles.label}>T</span>;
    }
  };

  return (
    <button
      className={`${styles.audioButton} ${getVariantClass()} ${className || ''}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleRightClick}
      disabled={disabled || (variant === 'mute' && isSoloed)}
      data-size={size}
      data-shape={shape}
      data-active={isActive}
      data-armed={isArmed}
      data-recording={isRecording}
      data-soloed={isSoloed}
      aria-label={`${variant} button`}
      type="button"
    >
      {renderIcon()}
    </button>
  );
};