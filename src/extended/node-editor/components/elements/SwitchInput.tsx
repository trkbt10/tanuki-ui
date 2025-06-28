import React from 'react';
import './SwitchInput.module.css';

export interface SwitchInputProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  label?: string;
  id?: string;
  className?: string;
}

export const SwitchInput: React.FC<SwitchInputProps> = ({
  checked,
  onChange,
  disabled = false,
  size = 'medium',
  label,
  id,
  className = '',
}) => {
  const baseClass = 'ne-switch';
  const sizeClass = `ne-switch--${size}`;
  const checkedClass = checked ? 'ne-switch--checked' : '';
  const disabledClass = disabled ? 'ne-switch--disabled' : '';
  const classes = [baseClass, sizeClass, checkedClass, disabledClass, className].filter(Boolean).join(' ');

  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="ne-switch-container">
      <div
        className={classes}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        id={id}
      >
        <div className="ne-switch__track">
          <div className="ne-switch__thumb" />
        </div>
      </div>
      {label && (
        <label 
          htmlFor={id} 
          className={`ne-switch-label ${disabled ? 'ne-switch-label--disabled' : ''}`}
          onClick={handleClick}
        >
          {label}
        </label>
      )}
    </div>
  );
};