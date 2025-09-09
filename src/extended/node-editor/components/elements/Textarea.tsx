import React from 'react';
import styles from './Textarea.module.css';

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
  const classes = [styles.textarea, className].filter(Boolean).join(' ');

  return (
    <textarea
      className={classes}
      data-variant={variant}
      data-error={error ? 'true' : 'false'}
      data-resize={resize}
      {...props}
    />
  );
};
