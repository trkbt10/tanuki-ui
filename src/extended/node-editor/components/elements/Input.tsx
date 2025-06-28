import React from 'react';
import './Input.module.css';

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
  const baseClass = 'ne-input';
  const variantClass = `ne-input--${variant}`;
  const errorClass = error ? 'ne-input--error' : '';
  const classes = [baseClass, variantClass, errorClass, className].filter(Boolean).join(' ');

  return <input className={classes} {...props} />;
};