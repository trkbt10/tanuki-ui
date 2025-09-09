import React from 'react';
import styles from './Label.module.css';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({
  required = false,
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  const classes = [styles.label, className].filter(Boolean).join(' ');

  return (
    <label className={classes} data-disabled={disabled ? 'true' : 'false'} {...props}>
      {children}
      {required && <span className={styles.required}>*</span>}
    </label>
  );
};
