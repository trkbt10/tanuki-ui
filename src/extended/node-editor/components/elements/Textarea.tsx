import React from 'react';
import './Textarea.module.css';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  variant?: 'default' | 'outline' | 'filled';
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const Textarea: React.FC<TextareaProps> = ({
  error = false,
  variant = 'default',
  resize = 'vertical',
  className = '',
  ...props
}) => {
  const baseClass = 'ne-textarea';
  const variantClass = `ne-textarea--${variant}`;
  const errorClass = error ? 'ne-textarea--error' : '';
  const resizeClass = `ne-textarea--resize-${resize}`;
  const classes = [baseClass, variantClass, errorClass, resizeClass, className].filter(Boolean).join(' ');

  return <textarea className={classes} {...props} />;
};