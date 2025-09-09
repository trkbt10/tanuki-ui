import React from 'react';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  variant?: 'default' | 'outline' | 'filled';
}

export const Input: React.FC<InputProps> = ({
  error = false,
  variant = 'default',
  className = '',
  ...props
}) => {
  const classes = [styles.input, className].filter(Boolean).join(' ');

  return (
    <input
      className={classes}
      data-variant={variant}
      data-error={error ? 'true' : 'false'}
      {...props}
    />
  );
};
